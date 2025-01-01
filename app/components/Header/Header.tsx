import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';


export default function Header() {
  return (
    <header className = {styles.header}>
        <h1>Loja Online</h1>
        <nav className = {styles.nav}>
            <Link href = "/">Home </Link>
            <Link href = "/produtos">Produtos </Link>
            <Link href = "/tecnologias">Tecnologias </Link>
        </nav>
    </header>
  )
}