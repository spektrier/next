import React from "react";
import styles from "./Card.module.css";
import { Product } from "@/app/models/interfaces";

interface CardProps {
  product: Product,    
  addToCart: (product: Product) => void
}

const Card = ({ product, addToCart }: CardProps) => {
  return (
    <div className={styles.cardContainer}>
      <h2 className={styles.cardTitle}>{product.title}</h2>
      <article>
      <img 
        src={product.image} 
        alt={product.title} 
        className={styles.cardImage}
      />  
      </article>
      <article>    
      <p className={styles.cardPrice}>{product.price}€</p>
      <button 
        onClick={() => addToCart(product)}
        className={styles.cardButton}
      >
        + Adicionar
      </button>      
      <p className={styles.cardDescription}>{product.description}</p>    
      </article>
    </div>
  );
};

export default Card;