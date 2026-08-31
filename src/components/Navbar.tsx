"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ToastContainer } from "@/components/Toast";

export function Navbar() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className="navbar animate-fade-in">
        <div className="container">
          <Link href="/store" className="logo gradient-text">ShopNova</Link>
          <div className="nav-links">
            <Link href="/login" className="nav-link">Entrar</Link>
            <Link href="/cart" className="btn-primary">
              Carrinho ({itemCount})
            </Link>
          </div>
        </div>
      </nav>
      <ToastContainer />
    </>
  );
}
