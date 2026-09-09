"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { ToastContainer } from "@/components/Toast";

export function Navbar() {
  const { items } = useCart();
  const { user, logout, isHydrated } = useAuth();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className="navbar animate-fade-in">
        <div className="container">
          <Link href="/store" className="logo gradient-text">ShopNova</Link>
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
            </Link>
          </div>
        </div>
      </nav>
      <ToastContainer />


    </>
  );
}
