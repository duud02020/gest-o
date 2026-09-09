"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useProducts } from "@/context/ProductContext";
import { useOrders } from "@/context/OrderContext";

import { DashboardView } from "@/components/gestao/DashboardView";
import { ProductsView } from "@/components/gestao/ProductsView";
import { OrdersView } from "@/components/gestao/OrdersView";
import { CustomersView } from "@/components/gestao/CustomersView";
import { CouponsView } from "@/components/gestao/CouponsView";
import { AnalyticsView } from "@/components/gestao/AnalyticsView";
import { SettingsView } from "@/components/gestao/SettingsView";

import { useAuth } from "@/context/AuthContext";

export type GestaoTab =
  | "dashboard"
  | "products"
  | "orders"
  | "customers"
  | "coupons"
  | "analytics"
  | "settings";

export default function GestaoPage() {
  const [activeTab, setActiveTab] = useState<GestaoTab>("dashboard");
  const { products } = useProducts();
  const { orders } = useOrders();
  const { user, isHydrated } = useAuth();

  const lowStockCount = products.filter(
    (p) => (p.stock !== undefined ? p.stock <= 5 : false)
  ).length;

  // Bloqueio de Acesso para Comprador
  if (isHydrated && user?.role === "comprador") {
    return (
      <div className="container flex-center" style={{ minHeight: "75vh", padding: "40px 24px" }}>
        <div
          className="card animate-fade-in"
          style={{
            padding: "48px 36px",
            textAlign: "center",
            maxWidth: "540px",
            background: "var(--bg-secondary)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
          }}
        >
          <div style={{ fontSize: "4.5rem", marginBottom: "16px" }}>🚫</div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#f87171", marginBottom: "12px" }}>
            Acesso Restrito à Gestão
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "28px" }}>
            Você está conectado como <strong>Comprador</strong> ({user.email}). O módulo de Gestão e Administração é exclusivo para lojistas e vendedores da ShopNova.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/store" className="btn-primary" style={{ padding: "12px 24px" }}>
              🛍️ Ir para a Loja
            </Link>
            <Link
              href="/login"
              className="btn-secondary"
              style={{ padding: "12px 24px", borderColor: "rgba(255,255,255,0.15)" }}
            >
              🔄 Trocar de Conta (Vendedor)
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 75px)", background: "var(--bg-primary)" }}>

      {/* Sidebar de Gestão */}
      <aside
        style={{
          width: "270px",
          background: "var(--bg-secondary)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          padding: "28px 16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div>
          {/* Topo da Sidebar */}
          <div style={{ padding: "0 12px", marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <span style={{ fontSize: "1.3rem" }}>⚡</span>
              <span className="gradient-text" style={{ fontSize: "1.3rem", fontWeight: 800 }}>
                ShopNova Gestão
              </span>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.78rem" }}>
              Painel Administrativo v2.5
            </p>
          </div>

          {/* Menu de Navegação */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <SidebarItem
              active={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
              icon="📊"
              text="Visão Geral"
            />
            <SidebarItem
              active={activeTab === "products"}
              onClick={() => setActiveTab("products")}
              icon="📦"
              text="Produtos & Estoque"
              badge={lowStockCount > 0 ? `${lowStockCount} alertas` : `${products.length}`}
              badgeColor={lowStockCount > 0 ? "#fbbf24" : undefined}
            />
            <SidebarItem
              active={activeTab === "orders"}
              onClick={() => setActiveTab("orders")}
              icon="📑"
              text="Pedidos & Vendas"
              badge={`${orders.length}`}
            />
            <SidebarItem
              active={activeTab === "customers"}
              onClick={() => setActiveTab("customers")}
              icon="👥"
              text="Clientes & CRM"
            />
            <SidebarItem
              active={activeTab === "coupons"}
              onClick={() => setActiveTab("coupons")}
              icon="🏷️"
              text="Cupons & Descontos"
            />
            <SidebarItem
              active={activeTab === "analytics"}
              onClick={() => setActiveTab("analytics")}
              icon="🤖"
              text="IA & Analytics"
              highlight
            />
            <SidebarItem
              active={activeTab === "settings"}
              onClick={() => setActiveTab("settings")}
              icon="⚙️"
              text="Configurações"
            />
          </nav>
        </div>

        {/* Rodapé da Sidebar com Botão para a Loja */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "16px", paddingLeft: "8px", paddingRight: "8px" }}>
          <Link
            href="/store"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "10px",
              borderRadius: "var(--radius-sm)",
              background: "rgba(255,255,255,0.04)",
              color: "var(--text-secondary)",
              fontSize: "0.85rem",
              fontWeight: 500,
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(99, 102, 241, 0.15)";
              (e.currentTarget as HTMLElement).style.color = "#a5b4fc";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
            }}
          >
            <span>🏪</span>
            <span>Voltar para a Loja</span>
          </Link>
        </div>
      </aside>

      {/* Conteúdo Principal do Módulo de Gestão */}
      <main style={{ flex: 1, padding: "36px 44px", overflowY: "auto", maxWidth: "1400px" }}>
        {activeTab === "dashboard" && (
          <DashboardView onNavigateTab={(tab) => setActiveTab(tab)} />
        )}
        {activeTab === "products" && <ProductsView />}
        {activeTab === "orders" && <OrdersView />}
        {activeTab === "customers" && <CustomersView />}
        {activeTab === "coupons" && <CouponsView />}
        {activeTab === "analytics" && <AnalyticsView />}
        {activeTab === "settings" && <SettingsView />}
      </main>
    </div>
  );
}

function SidebarItem({
  active,
  onClick,
  icon,
  text,
  badge,
  badgeColor,
  highlight,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  text: string;
  badge?: string;
  badgeColor?: string;
  highlight?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "11px 14px",
        borderRadius: "var(--radius-sm)",
        border: "none",
        background: active
          ? "linear-gradient(90deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.08) 100%)"
          : "transparent",
        color: active ? "#fff" : "var(--text-secondary)",
        cursor: "pointer",
        textAlign: "left",
        fontSize: "0.92rem",
        fontWeight: active ? 600 : 400,
        transition: "all 0.2s ease",
        borderLeft: active ? "3px solid var(--accent-primary)" : "3px solid transparent",
      }}
      onMouseOver={(e) => {
        if (!active) {
          e.currentTarget.style.background = "rgba(255,255,255,0.03)";
          e.currentTarget.style.color = "#fff";
        }
      }}
      onMouseOut={(e) => {
        if (!active) {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "var(--text-secondary)";
        }
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "1.1rem" }}>{icon}</span>
        <span>{text}</span>
      </div>

      {badge && (
        <span
          style={{
            fontSize: "0.75rem",
            padding: "2px 8px",
            borderRadius: "999px",
            background: badgeColor ? "rgba(245, 158, 11, 0.15)" : "rgba(255,255,255,0.08)",
            color: badgeColor || "var(--text-secondary)",
            fontWeight: 600,
          }}
        >
          {badge}
        </span>
      )}

      {highlight && !badge && (
        <span
          style={{
            fontSize: "0.68rem",
            padding: "2px 6px",
            borderRadius: "4px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff",
            fontWeight: 700,
          }}
        >
          NOVO
        </span>
      )}
    </button>
  );
}
