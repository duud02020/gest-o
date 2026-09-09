"use client";

import React, { useState } from "react";
import { useOrders } from "@/context/OrderContext";
import { Order, OrderStatus } from "@/data/orders";

export function OrdersView() {
  const { orders, updateOrderStatus, deleteOrder } = useOrders();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("Todos");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const statuses: (OrderStatus | "Todos")[] = [
    "Todos",
    "Pendente",
    "Aprovado",
    "Em Separação",
    "Enviado",
    "Entregue",
    "Cancelado",
  ];

  const formatBRL = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return isoString;
    }
  };

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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "Todos" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "1.9rem", fontWeight: 800, marginBottom: "4px" }}>
            Gestão de Pedidos & Faturamento
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Total de {orders.length} pedidos registrados (integrados com o checkout da loja).
          </p>
        </div>
      </div>

      {/* Barra de Filtros & Abas de Status */}
      <div className="card" style={{ padding: "18px 22px", background: "var(--bg-secondary)", display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 280px" }}>
            <input
              type="text"
              placeholder="Buscar por código (#SN-...), cliente ou e-mail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 16px",
                background: "var(--bg-primary)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "var(--radius-sm)",
                color: "#fff",
                outline: "none",
                fontSize: "0.9rem",
              }}
            />
          </div>
        </div>

        {/* Status Pill Tabs */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
          {statuses.map((st) => {
            const isActive = statusFilter === st;
            const count =
              st === "Todos"
                ? orders.length
                : orders.filter((o) => o.status === st).length;

            return (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "999px",
                  fontSize: "0.82rem",
                  fontWeight: isActive ? 600 : 400,
                  background: isActive ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "var(--bg-primary)",
                  color: isActive ? "#fff" : "var(--text-secondary)",
                  border: isActive ? "none" : "1px solid rgba(255,255,255,0.08)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                }}
              >
                <span>{st}</span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    padding: "1px 6px",
                    borderRadius: "999px",
                    background: isActive ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tabela de Pedidos */}
      <div className="card" style={{ padding: "20px", background: "var(--bg-secondary)", overflowX: "auto" }}>
        {filteredOrders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>📑</div>
            <p>Nenhum pedido encontrado com os filtros atuais.</p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", color: "var(--text-secondary)" }}>
                <th style={{ padding: "12px 14px" }}>Código</th>
                <th style={{ padding: "12px 14px" }}>Data</th>
                <th style={{ padding: "12px 14px" }}>Cliente</th>
                <th style={{ padding: "12px 14px" }}>Pagamento</th>
                <th style={{ padding: "12px 14px" }}>Total</th>
                <th style={{ padding: "12px 14px" }}>Status Atual</th>
                <th style={{ padding: "12px 14px", textAlign: "right" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
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
                    <td style={{ padding: "14px", fontWeight: 700, color: "#a5b4fc" }}>
                      {order.code}
                    </td>
                    <td style={{ padding: "14px", color: "var(--text-secondary)", fontSize: "0.82rem" }}>
                      {formatDate(order.createdAt)}
                    </td>
                    <td style={{ padding: "14px" }}>
                      <div style={{ fontWeight: 600, color: "#fff" }}>{order.customer.name}</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                        {order.customer.email}
                      </div>
                    </td>
                    <td style={{ padding: "14px", color: "var(--text-secondary)" }}>
                      {order.paymentMethod}
                    </td>
                    <td style={{ padding: "14px", fontWeight: 700, color: "#fff" }}>
                      {formatBRL(order.total)}
                    </td>
                    <td style={{ padding: "14px" }}>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        style={{
                          background: badge.bg,
                          color: badge.text,
                          border: `1px solid ${badge.border}`,
                          padding: "4px 8px",
                          borderRadius: "999px",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          outline: "none",
                        }}
                      >
                        <option value="Pendente">Pendente</option>
                        <option value="Aprovado">Aprovado</option>
                        <option value="Em Separação">Em Separação</option>
                        <option value="Enviado">Enviado</option>
                        <option value="Entregue">Entregue</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    </td>
                    <td style={{ padding: "14px", textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "8px" }}>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          style={{
                            padding: "6px 12px",
                            background: "rgba(99, 102, 241, 0.12)",
                            color: "#a5b4fc",
                            borderRadius: "6px",
                            fontSize: "0.82rem",
                            border: "1px solid rgba(99, 102, 241, 0.25)",
                          }}
                        >
                          Ver Detalhes
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Deseja excluir o pedido ${order.code}?`)) {
                              deleteOrder(order.id);
                            }
                          }}
                          style={{
                            padding: "6px 12px",
                            background: "rgba(239, 68, 68, 0.12)",
                            color: "#f87171",
                            borderRadius: "6px",
                            fontSize: "0.82rem",
                            border: "1px solid rgba(239, 68, 68, 0.25)",
                          }}
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal de Detalhes do Pedido */}
      {selectedOrder && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="card animate-fade-in"
            style={{
              width: "100%",
              maxWidth: "600px",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "#161922",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              padding: "32px",
              boxShadow: "0 25px 50px rgba(0,0,0,0.8)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 700 }}>
                  Pedido {selectedOrder.code}
                </h2>
                <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                  Registrado em {formatDate(selectedOrder.createdAt)}
                </div>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{ background: "none", color: "var(--text-secondary)", fontSize: "1.4rem" }}
              >
                ✕
              </button>
            </div>

            {/* Informações do Cliente */}
            <div style={{ background: "var(--bg-primary)", padding: "16px", borderRadius: "8px", marginBottom: "20px" }}>
              <h4 style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "8px" }}>
                Dados do Comprador
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "0.88rem" }}>
                <div><strong>Nome:</strong> {selectedOrder.customer.name}</div>
                <div><strong>E-mail:</strong> {selectedOrder.customer.email}</div>
                <div><strong>Telefone:</strong> {selectedOrder.customer.phone || "Não informado"}</div>
                <div><strong>Cidade/UF:</strong> {selectedOrder.customer.city || "São Paulo"}/{selectedOrder.customer.state || "SP"}</div>
              </div>
            </div>

            {/* Itens do Pedido */}
            <div style={{ marginBottom: "20px" }}>
              <h4 style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "12px" }}>
                Itens Comprados ({selectedOrder.items.length})
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {selectedOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      background: "rgba(255,255,255,0.02)",
                      borderRadius: "6px",
                      border: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ fontSize: "1.5rem" }}>{item.image || "📦"}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{item.name}</div>
                        <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                          Qtd: {item.quantity} x {formatBRL(item.price)}
                        </div>
                      </div>
                    </div>
                    <div style={{ fontWeight: 700, color: "#fff" }}>
                      {formatBRL(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumo Financeiro & Status */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "16px", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", color: "var(--text-secondary)" }}>
                <span>Método de Pagamento</span>
                <span style={{ color: "#fff" }}>{selectedOrder.paymentMethod}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", fontSize: "1.1rem", fontWeight: 700 }}>
                <span>Total do Pedido</span>
                <span style={{ color: "#10b981" }}>{formatBRL(selectedOrder.total)}</span>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "6px" }}>
                  Alterar Status do Pedido:
                </label>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => {
                    const newSt = e.target.value as OrderStatus;
                    updateOrderStatus(selectedOrder.id, newSt);
                    setSelectedOrder({ ...selectedOrder, status: newSt });
                  }}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    background: "var(--bg-primary)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "var(--radius-sm)",
                    color: "#fff",
                    outline: "none",
                  }}
                >
                  <option value="Pendente">Pendente</option>
                  <option value="Aprovado">Aprovado</option>
                  <option value="Em Separação">Em Separação</option>
                  <option value="Enviado">Enviado</option>
                  <option value="Entregue">Entregue</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Concluir Visualização
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
