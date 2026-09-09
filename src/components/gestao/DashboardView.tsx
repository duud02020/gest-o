"use client";

import React from "react";
import { useProducts } from "@/context/ProductContext";
import { useOrders } from "@/context/OrderContext";
import { OrderStatus } from "@/data/orders";

interface DashboardViewProps {
  onNavigateTab: (tab: "products" | "orders" | "customers" | "coupons" | "analytics") => void;
}

export function DashboardView({ onNavigateTab }: DashboardViewProps) {
  const { products } = useProducts();
  const { orders, customers } = useOrders();

  // Cálculos financeiros reais baseados nos pedidos registrados
  const totalRevenue = orders
    .filter((o) => o.status !== "Cancelado")
    .reduce((sum, o) => sum + o.total, 0);

  const totalOrdersCount = orders.length;
  const approvedOrdersCount = orders.filter((o) => o.status !== "Cancelado").length;
  const averageTicket = approvedOrdersCount > 0 ? totalRevenue / approvedOrdersCount : 0;
  const lowStockCount = products.filter((p) => (p.stock !== undefined ? p.stock <= 5 : false)).length;

  const formatBRL = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  // Vendas simuladas dos últimos 7 dias para gráfico SVG interativo
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Hoje"];
  const salesHistory = [2400, 3800, 3100, 5200, 4800, 7100, Math.max(1200, Math.round(totalRevenue * 0.35))];
  const maxSale = Math.max(...salesHistory, 8000);

  // Status badge styling helper
  const getStatusBadgeStyle = (status: OrderStatus) => {
    switch (status) {
      case "Aprovado":
        return { bg: "rgba(16, 185, 129, 0.15)", text: "#34d399", border: "rgba(16, 185, 129, 0.3)" };
      case "Em Separação":
        return { bg: "rgba(245, 158, 11, 0.15)", text: "#fbbf24", border: "rgba(245, 158, 11, 0.3)" };
      case "Enviado":
        return { bg: "rgba(99, 102, 241, 0.15)", text: "#818cf8", border: "rgba(99, 102, 241, 0.3)" };
      case "Entregue":
        return { bg: "rgba(59, 130, 246, 0.15)", text: "#60a5fa", border: "rgba(59, 130, 246, 0.3)" };
      case "Cancelado":
        return { bg: "rgba(239, 68, 68, 0.15)", text: "#f87171", border: "rgba(239, 68, 68, 0.3)" };
      default:
        return { bg: "rgba(156, 163, 175, 0.15)", text: "#d1d5db", border: "rgba(156, 163, 175, 0.3)" };
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* Header com Saudações e Ações Rápidas */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "1.9rem", fontWeight: 800, marginBottom: "6px" }}>
            Painel de Controle Empresarial
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Visão consolidada de vendas, estoque e operação em tempo real.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className="btn-secondary"
            onClick={() => onNavigateTab("products")}
            style={{ fontSize: "0.85rem", padding: "8px 18px" }}
          >
            + Novo Produto
          </button>
          <button
            className="btn-primary"
            onClick={() => onNavigateTab("orders")}
            style={{ fontSize: "0.85rem", padding: "8px 18px" }}
          >
            Ver Todos Pedidos
          </button>
        </div>
      </div>

      {/* Grid de KPIs Principais */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
        <div
          className="card"
          style={{
            padding: "22px",
            background: "linear-gradient(145deg, #181b24, #13161d)",
            borderTop: "3px solid #10b981",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Faturamento Total
            </span>
            <span style={{ fontSize: "1.4rem" }}>💰</span>
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "#fff", marginBottom: "6px" }}>
            {formatBRL(totalRevenue)}
          </div>
          <div style={{ fontSize: "0.82rem", color: "#10b981", display: "flex", alignItems: "center", gap: "4px" }}>
            <span>↑ 18.4%</span>
            <span style={{ color: "var(--text-secondary)" }}>vs. mês anterior</span>
          </div>
        </div>

        <div
          className="card"
          style={{
            padding: "22px",
            background: "linear-gradient(145deg, #181b24, #13161d)",
            borderTop: "3px solid #6366f1",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Pedidos Totais
            </span>
            <span style={{ fontSize: "1.4rem" }}>📦</span>
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "#fff", marginBottom: "6px" }}>
            {totalOrdersCount}
          </div>
          <div style={{ fontSize: "0.82rem", color: "#6366f1", display: "flex", alignItems: "center", gap: "4px" }}>
            <span>{orders.filter((o) => o.status === "Em Separação" || o.status === "Pendente").length}</span>
            <span style={{ color: "var(--text-secondary)" }}>em andamento</span>
          </div>
        </div>

        <div
          className="card"
          style={{
            padding: "22px",
            background: "linear-gradient(145deg, #181b24, #13161d)",
            borderTop: "3px solid #8b5cf6",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Ticket Médio
            </span>
            <span style={{ fontSize: "1.4rem" }}>📊</span>
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "#fff", marginBottom: "6px" }}>
            {formatBRL(averageTicket)}
          </div>
          <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
            Calculado por compra aprovada
          </div>
        </div>

        <div
          className="card"
          style={{
            padding: "22px",
            background: "linear-gradient(145deg, #181b24, #13161d)",
            borderTop: "3px solid #f59e0b",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Alerta de Estoque
            </span>
            <span style={{ fontSize: "1.4rem" }}>⚠️</span>
          </div>
          <div style={{ fontSize: "1.85rem", fontWeight: 800, color: lowStockCount > 0 ? "#fbbf24" : "#fff", marginBottom: "6px" }}>
            {lowStockCount} {lowStockCount === 1 ? "item" : "itens"}
          </div>
          <div style={{ fontSize: "0.82rem", color: lowStockCount > 0 ? "#fbbf24" : "#10b981" }}>
            {lowStockCount > 0 ? "Requer reposição imediata" : "Estoque regularizado"}
          </div>
        </div>
      </div>

      {/* Seção Central: Gráfico de Vendas + Distribuição de Categorias */}
      <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: "24px", alignItems: "stretch" }}>
        {/* Gráfico de Barras Elegante em SVG Puro */}
        <div className="card" style={{ padding: "26px", background: "var(--bg-secondary)", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "4px" }}>
                Desempenho de Faturamento Semanal
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                Comparativo diário de volume negociado
              </p>
            </div>
            <span style={{ fontSize: "0.8rem", background: "rgba(99, 102, 241, 0.15)", color: "#a5b4fc", padding: "4px 10px", borderRadius: "999px" }}>
              Últimos 7 dias
            </span>
          </div>

          <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: "16px", minHeight: "200px", paddingBottom: "10px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {salesHistory.map((val, idx) => {
              const heightPercent = Math.max(15, Math.round((val / maxSale) * 100));
              const isToday = idx === salesHistory.length - 1;
              return (
                <div key={idx} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end", gap: "8px" }}>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>
                    R${(val / 1000).toFixed(1)}k
                  </span>
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "40px",
                      height: `${heightPercent}%`,
                      borderRadius: "6px 6px 0 0",
                      background: isToday
                        ? "linear-gradient(180deg, #8b5cf6 0%, #6366f1 100%)"
                        : "linear-gradient(180deg, rgba(99,102,241,0.6) 0%, rgba(99,102,241,0.2) 100%)",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      boxShadow: isToday ? "0 0 16px rgba(139, 92, 246, 0.4)" : "none",
                    }}
                    title={`${days[idx]}: ${formatBRL(val)}`}
                  />
                  <span style={{ fontSize: "0.8rem", fontWeight: isToday ? 700 : 400, color: isToday ? "#a5b4fc" : "var(--text-secondary)" }}>
                    {days[idx]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Resumo Rápido da Operação */}
        <div className="card" style={{ padding: "26px", background: "var(--bg-secondary)", display: "flex", flexDirection: "column", gap: "18px" }}>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>Resumo Operacional</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "var(--bg-primary)", borderRadius: "var(--radius-sm)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "1.2rem" }}>👥</span>
                <div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>Clientes na Base</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{customers.length} cadastrados</div>
                </div>
              </div>
              <button onClick={() => onNavigateTab("customers")} style={{ color: "#a5b4fc", background: "none", fontSize: "0.85rem", fontWeight: 600 }}>
                Ver lista →
              </button>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "var(--bg-primary)", borderRadius: "var(--radius-sm)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "1.2rem" }}>🏷️</span>
                <div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>Campanhas & Cupons</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Cupons de desconto ativos</div>
                </div>
              </div>
              <button onClick={() => onNavigateTab("coupons")} style={{ color: "#a5b4fc", background: "none", fontSize: "0.85rem", fontWeight: 600 }}>
                Gerenciar →
              </button>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "var(--bg-primary)", borderRadius: "var(--radius-sm)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "1.2rem" }}>💡</span>
                <div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>IA & Analytics</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Recomendações automáticas</div>
                </div>
              </div>
              <button onClick={() => onNavigateTab("analytics")} style={{ color: "#a5b4fc", background: "none", fontSize: "0.85rem", fontWeight: 600 }}>
                Explorar →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Últimos Pedidos Recebidos */}
      <div className="card" style={{ padding: "26px", background: "var(--bg-secondary)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Últimos Pedidos Registrados</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
              Pedidos integrados em tempo real com o fluxo do carrinho e checkout
            </p>
          </div>
          <button
            onClick={() => onNavigateTab("orders")}
            className="btn-secondary"
            style={{ padding: "6px 14px", fontSize: "0.85rem" }}
          >
            Ver todos ({orders.length})
          </button>
        </div>

        {orders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "30px", color: "var(--text-secondary)" }}>
            Nenhum pedido registrado até o momento.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", color: "var(--text-secondary)" }}>
                  <th style={{ padding: "12px 16px" }}>Pedido</th>
                  <th style={{ padding: "12px 16px" }}>Cliente</th>
                  <th style={{ padding: "12px 16px" }}>Itens</th>
                  <th style={{ padding: "12px 16px" }}>Pagamento</th>
                  <th style={{ padding: "12px 16px" }}>Total</th>
                  <th style={{ padding: "12px 16px" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => {
                  const badge = getStatusBadgeStyle(order.status);
                  return (
                    <tr
                      key={order.id}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        transition: "background 0.2s ease",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                      onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ padding: "14px 16px", fontWeight: 700, color: "#a5b4fc" }}>
                        {order.code}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ fontWeight: 600 }}>{order.customer.name}</div>
                        <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                          {order.customer.city ? `${order.customer.city}/${order.customer.state}` : order.customer.email}
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px", color: "var(--text-secondary)" }}>
                        {order.items.length} {order.items.length === 1 ? "item" : "itens"}
                      </td>
                      <td style={{ padding: "14px 16px", color: "var(--text-secondary)" }}>
                        {order.paymentMethod}
                      </td>
                      <td style={{ padding: "14px 16px", fontWeight: 700, color: "#fff" }}>
                        {formatBRL(order.total)}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "4px 10px",
                            borderRadius: "999px",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            background: badge.bg,
                            color: badge.text,
                            border: `1px solid ${badge.border}`,
                          }}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
