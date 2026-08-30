"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, total } = useCart();

  return (
    <div className="container" style={{ padding: "40px 24px" }}>
      <h1 className="gradient-text" style={{ fontSize: "2.5rem", marginBottom: "32px" }}>
        Seu Carrinho
      </h1>

      {items.length === 0 ? (
        <div className="card animate-fade-in" style={{ padding: "40px", textAlign: "center" }}>
          <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🛒</div>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>Seu carrinho está vazio</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>
            Volte para a vitrine e escolha alguns produtos incríveis.
          </p>
          <Link href="/" className="btn-primary">
            Voltar para a Vitrine
          </Link>
        </div>
      ) : (
        <div className="grid-auto" style={{ gridTemplateColumns: "1fr 350px", gap: "32px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {items.map((item) => (
              <div key={item.id} className="card animate-fade-in" style={{ padding: "20px", display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{ fontSize: "3rem", background: "var(--bg-primary)", padding: "10px", borderRadius: "var(--radius-sm)" }}>
                  {item.image}
                </div>
                <div style={{ flexGrow: 1 }}>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "4px" }}>{item.name}</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Qtd: {item.quantity}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--success)", marginBottom: "8px" }}>
                    R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    style={{ color: "var(--danger)", background: "transparent", fontSize: "0.9rem", textDecoration: "underline" }}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="card" style={{ padding: "24px", position: "sticky", top: "100px" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "24px" }}>Resumo do Pedido</h3>
            <div className="flex-between" style={{ marginBottom: "16px", color: "var(--text-secondary)" }}>
              <span>Subtotal</span>
              <span>R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex-between" style={{ marginBottom: "24px", color: "var(--text-secondary)" }}>
              <span>Frete</span>
              <span style={{ color: "var(--success)" }}>Grátis</span>
            </div>
            <div className="flex-between" style={{ marginBottom: "32px", fontSize: "1.25rem", fontWeight: 700, borderTop: "1px solid var(--border-color)", paddingTop: "16px" }}>
              <span>Total</span>
              <span>R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
            <Link href="/checkout" className="btn-primary" style={{ width: "100%" }}>
              Finalizar Compra
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
