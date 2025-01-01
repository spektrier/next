import React from "react";
import styles from "./Cart.module.css";
import { Product } from "@/app/models/interfaces";

interface CardProps{
  product: Product, 
  remove: (productId: string) => void
}

const Card = ({product,remove}:CardProps) => {
  return (

    <div className={styles.card}>
      <h2 className={styles.title}>{product.title}</h2>
      <img src={product.image} alt={product.title} className={styles.image} />      
      <p className={styles.price}>{product.price}€</p>          
      <p className={styles.description}>{product.description}</p>    
      <button onClick={() => {
        remove(product.id);
      }} className={styles.button}>Remover</button> 

    </div>
  );
};

export default Card;