"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { ToastContainer } from "@/components/Toast";

export function Navbar() {
  const { items } = useCart();
  const { user, logout, isHydrated } = useAuth();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar animate-fade-in">
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/store" className="logo gradient-text">ShopNova</Link>
<<<<<<< HEAD
          <div className="nav-links">
            <Link href="/store" className="nav-link">Loja</Link>
            
            {/* O link de Gestão só é visível se o usuário for Vendedor */}
            {isHydrated && user?.role === "vendedor" && (
              <Link 
                href="/gestao" 
                className="nav-link"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(99, 102, 241, 0.15)",
                  padding: "6px 14px",
                  borderRadius: "var(--radius-full)",
                  border: "1px solid rgba(99, 102, 241, 0.35)",
                  color: "#a5b4fc",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
              >
                <span>⚡</span>
                <span>Gestão</span>
              </Link>
            )}

            {isHydrated && user ? (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--text-secondary)",
                    background: "rgba(255,255,255,0.05)",
                    padding: "4px 10px",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {user.role === "vendedor" ? "🏢 Lojista" : "🛍️ Comprador"}
                </span>
                <button
                  onClick={logout}
                  style={{
                    background: "transparent",
                    color: "var(--text-secondary)",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "var(--danger)")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  Sair
                </button>
              </div>
            ) : (
              <Link href="/login" className="nav-link">Entrar</Link>
            )}

            <Link href="/cart" className="btn-primary" style={{ padding: "8px 18px", fontSize: "0.9rem" }}>
              Carrinho ({itemCount})
=======

          {/* Desktop links */}
          <div className="nav-links nav-desktop">
            <Link href="/login" className="nav-link">Entrar</Link>
            <Link href="/cart" className="btn-primary">
              🛒 Carrinho ({itemCount})
>>>>>>> 2e3ba7d78f21a50404ac62478f1cd891a842c69f
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
