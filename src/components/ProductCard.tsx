"use client";

import { useCart } from "@/context/CartContext";
import { showToast } from "@/components/Toast";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    showToast(`${product.name} adicionado ao carrinho!`, "✅");
  };

  // Render rating stars (full ★, half ☆) based on rating/5
  const renderStars = () => {
    const full = Math.floor(product.rating);
    const half = product.rating - full >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return (
      <span style={{ color: "#ffd700", marginRight: "8px" }}>
        {"★".repeat(full)}{half ? "☆" : ""}{"☆".repeat(empty)}
        <span style={{ color: "var(--text-secondary)", marginLeft: "4px" }}>({product.reviews})</span>
      </span>
    );
  };

  return (
    <div
      className="card animate-fade-in"
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg-primary)",
        borderRadius: "var(--radius-md)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "var(--radius-sm)",
          marginBottom: "16px",
        }}
      />
      <h2 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>{product.name}</h2>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", flexGrow: 1, marginBottom: "12px" }}>
        {product.description}
      </p>
      <div style={{ marginBottom: "8px" }}>{renderStars()}</div>
      <div style={{ fontSize: "0.95rem", color: "var(--success)", marginBottom: "4px" }}>{product.priceFormatted}</div>
      <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "8px" }}>{product.installments}</div>
      <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "4px" }}>{product.shipping}</div>
      <div style={{ fontSize: "0.85rem", color: product.availability === "Em estoque" ? "var(--success)" : "var(--danger)" , marginBottom: "12px" }}>{product.availability}</div>
      <button
        className="btn-primary"
        style={{ padding: "8px 16px", width: "100%" }}
        onClick={handleAdd}
      >
        Adicionar ao carrinho
      </button>
    </div>
  );
}
