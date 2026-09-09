"use client";

import React, { useState } from "react";
import { useOrders } from "@/context/OrderContext";

export function CustomersView() {
  const { customers } = useOrders();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Todos");

  const formatBRL = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  const totalSpentAll = customers.reduce((acc, c) => acc + c.totalSpent, 0);
  const vipCount = customers.filter((c) => c.status === "VIP").length;
  const avgCustomerValue = customers.length > 0 ? totalSpentAll / customers.length : 0;

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "Todos" || c.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "1.9rem", fontWeight: 800, marginBottom: "4px" }}>
          Gestão de Clientes & CRM
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          Acompanhe o comportamento de compra e retenção dos clientes da loja.
        </p>
      </div>

      {/* Cards de Métricas de Clientes */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "18px" }}>
        <div className="card" style={{ padding: "20px", background: "var(--bg-secondary)", borderTop: "3px solid #6366f1" }}>
          <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "8px" }}>Total de Clientes</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 700 }}>{customers.length}</div>
          <div style={{ fontSize: "0.8rem", color: "#10b981", marginTop: "4px" }}>Base ativa</div>
        </div>

        <div className="card" style={{ padding: "20px", background: "var(--bg-secondary)", borderTop: "3px solid #8b5cf6" }}>
          <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "8px" }}>Clientes VIP (3+ compras)</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 700 }}>{vipCount}</div>
          <div style={{ fontSize: "0.8rem", color: "#a5b4fc", marginTop: "4px" }}>Alta fidelidade</div>
        </div>

        <div className="card" style={{ padding: "20px", background: "var(--bg-secondary)", borderTop: "3px solid #10b981" }}>
          <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "8px" }}>LTV Médio por Cliente</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 700 }}>{formatBRL(avgCustomerValue)}</div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "4px" }}>Volume médio gasto</div>
        </div>
      </div>

      {/* Filtros */}
      <div className="card" style={{ padding: "18px 22px", background: "var(--bg-secondary)", display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 280px" }}>
          <input
            type="text"
            placeholder="Buscar por nome, e-mail ou telefone..."
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

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            padding: "10px 14px",
            background: "var(--bg-primary)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "var(--radius-sm)",
            color: "#fff",
            outline: "none",
            fontSize: "0.9rem",
          }}
        >
          <option value="Todos">Status: Todos</option>
          <option value="VIP">Apenas VIP</option>
          <option value="Ativo">Apenas Ativos</option>
          <option value="Inativo">Inativos</option>
        </select>
      </div>

      {/* Tabela de Clientes */}
      <div className="card" style={{ padding: "20px", background: "var(--bg-secondary)", overflowX: "auto" }}>
        {filteredCustomers.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
            Nenhum cliente localizado.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", color: "var(--text-secondary)" }}>
                <th style={{ padding: "12px 14px" }}>Cliente</th>
                <th style={{ padding: "12px 14px" }}>Contato</th>
                <th style={{ padding: "12px 14px" }}>Pedidos</th>
                <th style={{ padding: "12px 14px" }}>Total Gasto (LTV)</th>
                <th style={{ padding: "12px 14px" }}>Última Compra</th>
                <th style={{ padding: "12px 14px" }}>Perfil</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((cust) => {
                const isVip = cust.status === "VIP";
                return (
                  <tr
                    key={cust.id}
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      transition: "background 0.2s ease",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                    onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            background: isVip
                              ? "linear-gradient(135deg, #f59e0b, #d97706)"
                              : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                            color: "#fff",
                          }}
                        >
                          {cust.name.slice(0, 1)}
                        </div>
                        <span style={{ fontWeight: 600, color: "#fff" }}>{cust.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px", color: "var(--text-secondary)" }}>
                      <div>{cust.email}</div>
                      <div style={{ fontSize: "0.78rem" }}>{cust.phone}</div>
                    </td>
                    <td style={{ padding: "14px", fontWeight: 600 }}>
                      {cust.ordersCount} compras
                    </td>
                    <td style={{ padding: "14px", fontWeight: 700, color: "#10b981" }}>
                      {formatBRL(cust.totalSpent)}
                    </td>
                    <td style={{ padding: "14px", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                      {cust.lastOrderDate}
                    </td>
                    <td style={{ padding: "14px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "3px 10px",
                          borderRadius: "999px",
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          background: isVip
                            ? "rgba(245, 158, 11, 0.15)"
                            : "rgba(99, 102, 241, 0.15)",
                          color: isVip ? "#fbbf24" : "#a5b4fc",
                          border: `1px solid ${isVip ? "rgba(245, 158, 11, 0.3)" : "rgba(99, 102, 241, 0.3)"}`,
                        }}
                      >
                        {cust.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
