"use client";

import React, { useState } from "react";
import { useProducts } from "@/context/ProductContext";
import { Product } from "@/data/products";

export function ProductsView() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Todos");
  const [stockFilter, setStockFilter] = useState("Todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const initialForm = {
    name: "",
    description: "",
    price: 0,
    category: "Eletrônicos",
    image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviews: 15,
    installments: "10x sem juros",
    shipping: "Frete grátis",
    availability: "Em estoque",
    stock: 20,
  };

  const [formData, setFormData] = useState(initialForm);

  const categories = ["Todos", ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))];

  const formatBRL = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  const openNewModal = () => {
    setEditingProduct(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      image: p.image,
      rating: p.rating || 5,
      reviews: p.reviews || 0,
      installments: p.installments || "12x sem juros",
      shipping: p.shipping || "Frete grátis",
      availability: p.availability || "Em estoque",
      stock: p.stock !== undefined ? p.stock : 10,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productPayload = {
      ...formData,
      priceFormatted: formatBRL(formData.price),
      availability: formData.stock <= 0 ? "Esgotado" : formData.stock <= 5 ? "Poucas unidades" : "Em estoque",
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productPayload);
    } else {
      addProduct(productPayload);
    }

    setIsModalOpen(false);
    setEditingProduct(null);
  };

  // Filtragem
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === "Todos" || p.category === categoryFilter;

    let matchesStock = true;
    if (stockFilter === "low") matchesStock = (p.stock ?? 10) <= 5;
    if (stockFilter === "out") matchesStock = (p.stock ?? 10) === 0;
    if (stockFilter === "in") matchesStock = (p.stock ?? 10) > 5;

    return matchesSearch && matchesCategory && matchesStock;
  });

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "1.9rem", fontWeight: 800, marginBottom: "4px" }}>
            Gestão de Produtos & Estoque
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Total de {products.length} itens cadastrados no catálogo da loja.
          </p>
        </div>
        <button className="btn-primary" onClick={openNewModal} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span>+</span>
          <span>Cadastrar Produto</span>
        </button>
      </div>

      {/* Barra de Filtros */}
      <div
        className="card"
        style={{
          padding: "18px 22px",
          background: "var(--bg-secondary)",
          display: "flex",
          gap: "16px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 240px", position: "relative" }}>
          <input
            type="text"
            placeholder="Buscar por nome ou categoria..."
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

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
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
            {categories.map((c) => (
              <option key={c} value={c}>
                Categoria: {c}
              </option>
            ))}
          </select>

          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
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
            <option value="Todos">Estoque: Todos</option>
            <option value="in">Normal (&gt; 5 un.)</option>
            <option value="low">Baixo (≤ 5 un.)</option>
            <option value="out">Esgotado (0 un.)</option>
          </select>
        </div>
      </div>

      {/* Tabela de Produtos */}
      <div className="card" style={{ padding: "20px", background: "var(--bg-secondary)", overflowX: "auto" }}>
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>📦</div>
            <p>Nenhum produto encontrado com os filtros selecionados.</p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", color: "var(--text-secondary)" }}>
                <th style={{ padding: "12px 14px" }}>Produto</th>
                <th style={{ padding: "12px 14px" }}>Categoria</th>
                <th style={{ padding: "12px 14px" }}>Preço</th>
                <th style={{ padding: "12px 14px" }}>Estoque</th>
                <th style={{ padding: "12px 14px" }}>Status</th>
                <th style={{ padding: "12px 14px", textAlign: "right" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => {
                const stock = p.stock !== undefined ? p.stock : 12;
                const isLowStock = stock <= 5 && stock > 0;
                const isOutOfStock = stock === 0;

                return (
                  <tr
                    key={p.id}
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      transition: "background 0.2s ease",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                    onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "12px 14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <img
                          src={p.image}
                          alt={p.name}
                          style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "8px",
                            objectFit: "cover",
                            background: "var(--bg-primary)",
                          }}
                        />
                        <div>
                          <div style={{ fontWeight: 600, color: "#fff" }}>{p.name}</div>
                          <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                            {p.description.slice(0, 50)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "12px 14px", color: "var(--text-secondary)" }}>
                      <span
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          padding: "4px 8px",
                          borderRadius: "6px",
                          fontSize: "0.8rem",
                        }}
                      >
                        {p.category}
                      </span>
                    </td>
                    <td style={{ padding: "12px 14px", fontWeight: 700, color: "#fff" }}>
                      {formatBRL(p.price)}
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      <span
                        style={{
                          fontWeight: 600,
                          color: isOutOfStock ? "#ef4444" : isLowStock ? "#fbbf24" : "#10b981",
                        }}
                      >
                        {stock} un.
                      </span>
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      <span
                        style={{
                          fontSize: "0.78rem",
                          padding: "3px 8px",
                          borderRadius: "999px",
                          background: isOutOfStock
                            ? "rgba(239, 68, 68, 0.15)"
                            : isLowStock
                            ? "rgba(245, 158, 11, 0.15)"
                            : "rgba(16, 185, 129, 0.15)",
                          color: isOutOfStock ? "#f87171" : isLowStock ? "#fbbf24" : "#34d399",
                          border: `1px solid ${
                            isOutOfStock
                              ? "rgba(239, 68, 68, 0.3)"
                              : isLowStock
                              ? "rgba(245, 158, 11, 0.3)"
                              : "rgba(16, 185, 129, 0.3)"
                          }`,
                        }}
                      >
                        {p.availability}
                      </span>
                    </td>
                    <td style={{ padding: "12px 14px", textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "8px" }}>
                        <button
                          onClick={() => openEditModal(p)}
                          style={{
                            padding: "6px 12px",
                            background: "rgba(99, 102, 241, 0.12)",
                            color: "#a5b4fc",
                            borderRadius: "6px",
                            fontSize: "0.82rem",
                            border: "1px solid rgba(99, 102, 241, 0.25)",
                          }}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Deseja realmente remover o produto "${p.name}"?`)) {
                              deleteProduct(p.id);
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

      {/* Modal de Cadastro / Edição */}
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
              maxWidth: "640px",
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
              <h2 style={{ fontSize: "1.4rem", fontWeight: 700 }}>
                {editingProduct ? "Editar Produto" : "Novo Produto para o Catálogo"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: "none", color: "var(--text-secondary)", fontSize: "1.4rem" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Nome do Produto</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Câmera Mirrorless 4K"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Descrição Completa</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Detalhes técnicos, diferenciais e informações..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={labelStyle}>Preço (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Quantidade em Estoque</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={labelStyle}>Categoria</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Informática, Áudio, etc."
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Parcelamento</label>
                  <input
                    type="text"
                    placeholder="Ex: 12x sem juros"
                    value={formData.installments}
                    onChange={(e) => setFormData({ ...formData, installments: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>URL da Imagem</label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  style={inputStyle}
                />
              </div>

              {/* Preview da Imagem */}
              {formData.image && (
                <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px", background: "var(--bg-primary)", borderRadius: "8px" }}>
                  <img
                    src={formData.image}
                    alt="Preview"
                    style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    Pré-visualização da imagem no catálogo
                  </div>
                </div>
              )}

              <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                  {editingProduct ? "Salvar Alterações" : "Adicionar ao Catálogo"}
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                  style={{ flex: 1 }}
                >
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
