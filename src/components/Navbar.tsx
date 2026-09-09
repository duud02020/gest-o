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
            <Link href="/store" className="nav-link">Loja</Link>
            <Link 
              href="/gestao" 
              className="nav-link"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(99, 102, 241, 0.12)",
                padding: "6px 14px",
                borderRadius: "var(--radius-full)",
                border: "1px solid rgba(99, 102, 241, 0.3)",
                color: "#a5b4fc",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              <span>⚡</span>
              <span>Gestão</span>
            </Link>
            <Link href="/login" className="nav-link">Entrar</Link>
            <Link href="/cart" className="btn-primary" style={{ padding: "8px 18px", fontSize: "0.9rem" }}>
              Carrinho ({itemCount})
            </Link>
          </div>
        </div>
      </nav>
      <ToastContainer />

    </>
  );
}
