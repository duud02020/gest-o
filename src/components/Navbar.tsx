"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ToastContainer } from "@/components/Toast";

export function Navbar() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar animate-fade-in">
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/store" className="logo gradient-text">ShopNova</Link>

          {/* Desktop links */}
          <div className="nav-links nav-desktop">
            <Link href="/login" className="nav-link">Entrar</Link>
            <Link href="/cart" className="btn-primary">
              🛒 Carrinho ({itemCount})
            </Link>
          </div>

          {/* Hamburguer mobile */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Abrir menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Menu mobile dropdown */}
        {menuOpen && (
          <div className="nav-mobile-menu">
            <Link href="/store" className="nav-mobile-link" onClick={() => setMenuOpen(false)}>
              🏪 Loja
            </Link>
            <Link href="/login" className="nav-mobile-link" onClick={() => setMenuOpen(false)}>
              👤 Entrar
            </Link>
            <Link href="/cart" className="nav-mobile-link" onClick={() => setMenuOpen(false)}>
              🛒 Carrinho ({itemCount})
            </Link>
            <Link href="/admin" className="nav-mobile-link" onClick={() => setMenuOpen(false)}>
              ⚙️ Admin
            </Link>
          </div>
        )}
      </nav>
      <ToastContainer />
    </>
  );
}
