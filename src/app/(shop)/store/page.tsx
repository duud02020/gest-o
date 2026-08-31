"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { showToast } from "@/components/Toast";

export default function StorePage() {
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container" style={{ padding: "40px 24px" }}>
      {/* Header */}
      <header style={{ marginBottom: "40px", textAlign: "center" }}>
        <h1 className="gradient-text" style={{ fontSize: "2.5rem", marginBottom: "16px" }}>
          Descubra Produtos Incríveis
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginBottom: "28px" }}>
          Escolha seus itens favoritos e adicione ao carrinho para comprar.
        </p>

        {/* Barra de Pesquisa */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "var(--bg-secondary)",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: "9999px",
            padding: "12px 24px",
            maxWidth: "480px",
            margin: "0 auto",
            boxShadow: "0 0 0 0 rgba(99,102,241,0)",
            transition: "box-shadow 0.3s ease",
          }}
          onFocus={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 3px rgba(99,102,241,0.25)";
          }}
          onBlur={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 0 rgba(99,102,241,0)";
          }}
        >
          <span style={{ fontSize: "1.2rem", color: "var(--text-secondary)" }}>🔍</span>
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--text-primary)",
              fontSize: "1rem",
              width: "100%",
              fontFamily: "'Outfit','Segoe UI',sans-serif",
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-secondary)",
                cursor: "pointer",
                fontSize: "1.1rem",
                padding: 0,
              }}
            >
              ✕
            </button>
          )}
        </div>
      </header>

      {/* Resultados */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-secondary)" }}>
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🔎</div>
          <p style={{ fontSize: "1.1rem" }}>Nenhum produto encontrado para &quot;{search}&quot;</p>
        </div>
      ) : (
        <div className="grid-auto">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="card animate-fade-in"
              style={{ padding: "24px", display: "flex", flexDirection: "column" }}
            >
              <div
                className="flex-center"
                style={{
                  fontSize: "4rem",
                  marginBottom: "20px",
                  background: "var(--bg-primary)",
                  padding: "20px",
                  borderRadius: "var(--radius-md)",
                }}
              >
                {product.image}
              </div>

              <h2 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>{product.name}</h2>

              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", flexGrow: 1, marginBottom: "16px" }}>
                {product.description}
              </p>

              <div className="flex-between" style={{ marginTop: "auto" }}>
                <span style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--success)" }}>
                  R$ {product.price.toFixed(2).replace(".", ",")}
                </span>
                <button
                  className="btn-secondary"
                  style={{ padding: "8px 16px" }}
                  onClick={() => {
                    addToCart(product);
                    showToast(`${product.name} adicionado!`, "✅");
                  }}
                >
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
