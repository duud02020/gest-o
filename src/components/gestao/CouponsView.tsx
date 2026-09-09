"use client";

import React, { useState } from "react";
import { useOrders } from "@/context/OrderContext";

export function CouponsView() {
  const { coupons, addCoupon, toggleCoupon, deleteCoupon } = useOrders();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    code: "",
    type: "percentage" as "percentage" | "fixed",
    value: 10,
    minOrderValue: 100,
    expiresAt: "2026-12-31",
    active: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCoupon({
      ...formData,
      code: formData.code.toUpperCase().trim(),
    });
    setIsModalOpen(false);
    setFormData({
      code: "",
      type: "percentage",
      value: 10,
      minOrderValue: 100,
      expiresAt: "2026-12-31",
      active: true,
    });
  };

  const formatBRL = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "1.9rem", fontWeight: 800, marginBottom: "4px" }}>
            Campanhas & Cupons de Desconto
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Crie incentivos promocionais para alavancar a taxa de conversão da sua loja.
          </p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          + Criar Novo Cupom
        </button>
      </div>

      {/* Grid de Cupons */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="card"
            style={{
              padding: "24px",
              background: "var(--bg-secondary)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              border: coupon.active ? "1px solid rgba(99, 102, 241, 0.3)" : "1px solid rgba(255,255,255,0.06)",
              opacity: coupon.active ? 1 : 0.6,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div
                style={{
                  background: "rgba(99, 102, 241, 0.15)",
                  color: "#a5b4fc",
                  border: "1px dashed rgba(99, 102, 241, 0.4)",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  letterSpacing: "1px",
                }}
              >
                {coupon.code}
              </div>
              <button
                onClick={() => toggleCoupon(coupon.id)}
                style={{
                  padding: "4px 10px",
                  borderRadius: "999px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  background: coupon.active ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                  color: coupon.active ? "#34d399" : "#f87171",
                  border: `1px solid ${coupon.active ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
                }}
              >
                {coupon.active ? "Ativo" : "Pausado"}
              </button>
            </div>

            <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#fff" }}>
              {coupon.type === "percentage" ? `${coupon.value}% OFF` : `${formatBRL(coupon.value)} OFF`}
            </div>

            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "6px" }}>
              <div>
                Pedido mínimo: <strong>{formatBRL(coupon.minOrderValue || 0)}</strong>
              </div>
              <div>
                Usos registrados: <strong>{coupon.usageCount} vezes</strong>
              </div>
              <div>
                Válido até: <strong>{coupon.expiresAt}</strong>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "12px" }}>
              <button
                onClick={() => {
                  if (confirm(`Deseja remover o cupom ${coupon.code}?`)) {
                    deleteCoupon(coupon.id);
                  }
                }}
                style={{
                  background: "transparent",
                  color: "var(--danger)",
                  fontSize: "0.85rem",
                  textDecoration: "underline",
                }}
              >
                Excluir Cupom
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Criar Cupom */}
      {isModalOpen && (
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
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="card animate-fade-in"
            style={{
              width: "100%",
              maxWidth: "500px",
              background: "#161922",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              padding: "32px",
              boxShadow: "0 25px 50px rgba(0,0,0,0.8)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700 }}>Novo Cupom Promocional</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: "none", color: "var(--text-secondary)", fontSize: "1.4rem" }}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Código do Cupom</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: PROMO15"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>Tipo de Desconto</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    style={inputStyle}
                  >
                    <option value="percentage">Porcentagem (%)</option>
                    <option value="fixed">Valor Fixo (R$)</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Valor ({formData.type === "percentage" ? "%" : "R$"})</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>Valor Mínimo do Pedido (R$)</label>
                  <input
                    type="number"
                    value={formData.minOrderValue}
                    onChange={(e) => setFormData({ ...formData, minOrderValue: parseFloat(e.target.value) || 0 })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Válido até</label>
                  <input
                    type="date"
                    required
                    value={formData.expiresAt}
                    onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                  Salvar Cupom
                </button>
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)} style={{ flex: 1 }}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  background: "var(--bg-primary)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "var(--radius-sm)",
  color: "#fff",
  fontSize: "0.9rem",
  outline: "none",
  fontFamily: "inherit",
};

const labelStyle = {
  display: "block",
  fontSize: "0.8rem",
  color: "var(--text-secondary)",
  marginBottom: "5px",
  fontWeight: 500,
};
