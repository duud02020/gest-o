"use client";

import React, { useState } from "react";

export function SettingsView() {
  const [saved, setSaved] = useState(false);
  const [storeSettings, setStoreSettings] = useState({
    storeName: "ShopNova Comércio Eletrônico",
    cnpj: "12.345.678/0001-90",
    email: "contato@shopnova.com.br",
    phone: "(11) 4002-8922",
    freeShippingThreshold: 200,
    currency: "BRL (R$)",
    notifyNewOrder: true,
    notifyLowStock: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "1.9rem", fontWeight: 800, marginBottom: "4px" }}>
          Configurações da Loja
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          Gerencie os parâmetros operacionais, dados fiscais e políticas de frete.
        </p>
      </div>

      {saved && (
        <div
          style={{
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#34d399",
            padding: "14px 20px",
            borderRadius: "var(--radius-md)",
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span>✅</span>
          <span>Configurações salvas com sucesso!</span>
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Dados da Empresa */}
        <div className="card" style={{ padding: "28px", background: "var(--bg-secondary)" }}>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "18px" }}>
            Dados Cadastrais
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Razão Social / Nome Fantasia</label>
              <input
                type="text"
                value={storeSettings.storeName}
                onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>CNPJ / CPF</label>
              <input
                type="text"
                value={storeSettings.cnpj}
                onChange={(e) => setStoreSettings({ ...storeSettings, cnpj: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>E-mail Comercial</label>
              <input
                type="email"
                value={storeSettings.email}
                onChange={(e) => setStoreSettings({ ...storeSettings, email: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Telefone de Suporte</label>
              <input
                type="text"
                value={storeSettings.phone}
                onChange={(e) => setStoreSettings({ ...storeSettings, phone: e.target.value })}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Políticas de Venda & Frete */}
        <div className="card" style={{ padding: "28px", background: "var(--bg-secondary)" }}>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "18px" }}>
            Políticas Operacionais & Frete
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Frete Grátis acima de (R$)</label>
              <input
                type="number"
                value={storeSettings.freeShippingThreshold}
                onChange={(e) => setStoreSettings({ ...storeSettings, freeShippingThreshold: parseFloat(e.target.value) || 0 })}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Moeda Padrão</label>
              <input
                type="text"
                disabled
                value={storeSettings.currency}
                style={{ ...inputStyle, opacity: 0.7, cursor: "not-allowed" }}
              />
            </div>
          </div>

          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={storeSettings.notifyNewOrder}
                onChange={(e) => setStoreSettings({ ...storeSettings, notifyNewOrder: e.target.checked })}
                style={{ width: "18px", height: "18px", accentColor: "#6366f1" }}
              />
              <span>Receber alertas instantâneos a cada novo pedido realizado</span>
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={storeSettings.notifyLowStock}
                onChange={(e) => setStoreSettings({ ...storeSettings, notifyLowStock: e.target.checked })}
                style={{ width: "18px", height: "18px", accentColor: "#6366f1" }}
              />
              <span>Avisar quando um produto atingir estoque crítico (≤ 5 unidades)</span>
            </label>
          </div>
        </div>

        <div>
          <button type="submit" className="btn-primary" style={{ padding: "14px 32px" }}>
            Salvar Todas as Configurações
          </button>
        </div>
      </form>
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
