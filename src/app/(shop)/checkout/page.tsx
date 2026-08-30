"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="container flex-center" style={{ minHeight: "60vh" }}>
        <div className="card animate-fade-in" style={{ padding: "40px", textAlign: "center", maxWidth: "500px" }}>
          <div style={{ fontSize: "5rem", marginBottom: "20px", color: "var(--success)" }}>✅</div>
          <h1 style={{ fontSize: "2rem", marginBottom: "16px" }}>Pedido Confirmado!</h1>
          <p style={{ color: "var(--text-secondary)", marginBottom: "32px" }}>
            Obrigado por comprar conosco. Seu pedido foi processado com sucesso.
          </p>
          <Link href="/" className="btn-primary">
            Voltar para a Loja
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: "40px 24px", textAlign: "center" }}>
        <h2>Seu carrinho está vazio.</h2>
        <Link href="/" className="btn-primary" style={{ marginTop: "24px" }}>Voltar</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "40px 24px" }}>
      <h1 className="gradient-text" style={{ fontSize: "2.5rem", marginBottom: "32px" }}>
        Finalizar Compra
      </h1>

      <div className="grid-auto" style={{ gridTemplateColumns: "1fr 400px", gap: "32px", alignItems: "start" }}>
        <form onSubmit={handleCheckout} className="card animate-fade-in" style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <h2 style={{ fontSize: "1.5rem" }}>Dados de Pagamento (Simulação)</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Nome no Cartão</label>
            <input 
              required
              type="text" 
              placeholder="João da Silva"
              style={{ padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "white" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Número do Cartão</label>
            <input 
              required
              type="text" 
              placeholder="0000 0000 0000 0000"
              style={{ padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "white" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Validade</label>
              <input 
                required
                type="text" 
                placeholder="MM/AA"
                style={{ padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "white" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>CVV</label>
              <input 
                required
                type="text" 
                placeholder="123"
                style={{ padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "white" }}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: "16px", justifyContent: "center" }}>
            Confirmar Pagamento
          </button>
        </form>
        
        <div className="card" style={{ padding: "24px", position: "sticky", top: "100px" }}>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "24px" }}>Resumo</h3>
          <div className="flex-between" style={{ marginBottom: "16px", color: "var(--text-secondary)" }}>
            <span>Itens ({items.length})</span>
            <span>R$ {total.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="flex-between" style={{ marginBottom: "32px", fontSize: "1.25rem", fontWeight: 700, borderTop: "1px solid var(--border-color)", paddingTop: "16px" }}>
            <span>Total a Pagar</span>
            <span>R$ {total.toFixed(2).replace('.', ',')}</span>
          </div>
          <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", textAlign: "center" }}>
            Ambiente seguro. Seus dados estão criptografados.
          </div>
        </div>
      </div>
    </div>
  );
}
