'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Card from '../components/Card/Card';
import CardCart from '../components/Card/Cart';
import { Product } from '../models/interfaces';

export default function ProductsPage() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR<Product[]>('/api/products', fetcher);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  const buy = () => {
    fetch("/api/deisishop/buy", {
      method: "POST",
      body: JSON.stringify({
        products: cart.map(product => product.id),
        name: "",
        student: false,
        coupon: ""
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(() => {
      setCart([]);
    })
    .catch(() => {
      console.log("error ao comprar");
    });
  }

  useEffect(() => {
    if(data) {
      const newFilteredData = data.filter((product) => {
        return product.title.toLowerCase().includes(search.toLowerCase())
      })
      setFilteredData(newFilteredData)
    }
  }, [search, data])

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(product: Product) {
    setCart(prevCart => [...prevCart, product])
  }

  function remove(productId: string) {
    setCart(prevCart => {
      const index = prevCart.findIndex(item => item.id === productId)
      if (index !== -1) {
        const newCart = [...prevCart]
        newCart.splice(index, 1)
        return newCart
      }
      return prevCart
    })
  }

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div>
      <input
        placeholder="Pesquise um product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      {filteredData.map((product) => (
     <Card 
     key={product.id}
     product={product}
     addToCart={addToCart}
   />
      ))}

      <h1>Carrinho de Compras</h1>
      {cart.map((product) => (
        <CardCart 
          key={product.id} 
          product={product} 
          remove={remove}
        />
      ))}
      
      {cart.length > 0 && (
        <button onClick={buy}>
          Comprar
        </button>
      )}
    </div>
  );
}