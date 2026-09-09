"use client";

import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { createOrder } = useOrders();
  const [createdOrderCode, setCreatedOrderCode] = useState<string | null>(null);

  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "São Paulo",
    state: "SP",
    paymentMethod: "Cartão de Crédito" as "Cartão de Crédito" | "PIX" | "Boleto",
  });

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    const order = createOrder({
      customer: {
        name: customerData.name || "Cliente ShopNova",
        email: customerData.email || "cliente@exemplo.com",
        phone: customerData.phone,
        city: customerData.city,
        state: customerData.state,
      },
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        image: i.image,
      })),
      total,
      paymentMethod: customerData.paymentMethod,
    });

    clearCart();
    setCreatedOrderCode(order.code);
  };

  if (createdOrderCode) {
    return (
      <div className="container flex-center" style={{ minHeight: "65vh" }}>
        <div className="card animate-fade-in" style={{ padding: "40px", textAlign: "center", maxWidth: "520px" }}>
          <div style={{ fontSize: "4.5rem", marginBottom: "16px", color: "var(--success)" }}>✅</div>
          <h1 style={{ fontSize: "2rem", marginBottom: "12px" }}>Pedido Confirmado!</h1>
          <div
            style={{
              display: "inline-block",
              background: "rgba(99, 102, 241, 0.15)",
              color: "#a5b4fc",
              padding: "6px 16px",
              borderRadius: "999px",
              fontSize: "1.1rem",
              fontWeight: 700,
              marginBottom: "16px",
              border: "1px solid rgba(99, 102, 241, 0.3)",
            }}
          >
            Código: {createdOrderCode}
          </div>
          <p style={{ color: "var(--text-secondary)", marginBottom: "28px", lineHeight: "1.6" }}>
            Obrigado por comprar conosco! O pedido foi registrado e já está visível no painel administrativo de gestão.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <Link href="/store" className="btn-primary">
              Voltar para a Loja
            </Link>
            <Link href="/gestao" className="btn-secondary">
              Ver na Gestão
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: "60px 24px", textAlign: "center" }}>
        <div style={{ fontSize: "3.5rem", marginBottom: "16px" }}>🛒</div>
        <h2 style={{ marginBottom: "12px" }}>Seu carrinho está vazio.</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>Adicione produtos para finalizar sua compra.</p>
        <Link href="/store" className="btn-primary">Ir para a Loja</Link>
      </div>
    );
  }


  return (
    <div className="container" style={{ padding: "40px 24px" }}>
      <h1 className="gradient-text" style={{ fontSize: "2.5rem", marginBottom: "32px" }}>
        Finalizar Compra
      </h1>

      <div className="grid-auto" style={{ gridTemplateColumns: "1fr 400px", gap: "32px", alignItems: "start" }}>
        <form onSubmit={handleCheckout} className="card animate-fade-in" style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <h2 style={{ fontSize: "1.4rem" }}>Identificação do Comprador</h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Seu Nome Completo</label>
              <input 
                required
                type="text" 
                placeholder="Ex: João da Silva"
                value={customerData.name}
                onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                style={{ padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "white" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>E-mail</label>
              <input 
                required
                type="email" 
                placeholder="Ex: joao@email.com"
                value={customerData.email}
                onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                style={{ padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "white" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Telefone / WhatsApp</label>
              <input 
                type="text" 
                placeholder="(11) 99999-9999"
                value={customerData.phone}
                onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                style={{ padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "white" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Forma de Pagamento</label>
              <select
                value={customerData.paymentMethod}
                onChange={(e) => setCustomerData({ ...customerData, paymentMethod: e.target.value as any })}
                style={{ padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "white" }}
              >
                <option value="Cartão de Crédito">Cartão de Crédito</option>
                <option value="PIX">PIX (Aprovação Instantânea)</option>
                <option value="Boleto">Boleto Bancário</option>
              </select>
            </div>
          </div>

          <h2 style={{ fontSize: "1.4rem", marginTop: "10px" }}>Dados de Pagamento (Simulação)</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Número do Cartão / Chave</label>
            <input 
              required
              type="text" 
              placeholder="0000 0000 0000 0000"
              defaultValue="4532 8921 7732 1092"
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
                defaultValue="12/28"
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
