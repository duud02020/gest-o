"use client";

import { useState } from "react";
import { useProducts } from "@/context/ProductContext";
import type { Product } from "@/data/products";

export default function AdminPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Omit<Product, "id" | "priceFormatted">>({
    name: "",
    description: "",
    price: 0,
    image: "",
    rating: 5,
    reviews: 0,
    installments: "",
    shipping: "Frete grátis",
    availability: "Em estoque",
    category: "",
  });

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      rating: product.rating,
      reviews: product.reviews,
      installments: product.installments,
      shipping: product.shipping,
      availability: product.availability,
      category: product.category,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productToSave = {
      ...formData,
      priceFormatted: formatPrice(formData.price),
    };

    if (editingId) {
      updateProduct(editingId, productToSave);
      setEditingId(null);
    } else {
      addProduct(productToSave);
    }
    
    // Reset form
    setFormData({
      name: "",
      description: "",
      price: 0,
      image: "",
      rating: 5,
      reviews: 0,
      installments: "",
      shipping: "Frete grátis",
      availability: "Em estoque",
      category: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" || name === "rating" || name === "reviews" ? Number(value) : value,
    }));
  };

  return (
    <div className="container" style={{ padding: "40px 24px" }}>
      <header style={{ marginBottom: "40px" }}>
        <h1 className="gradient-text" style={{ fontSize: "2rem" }}>Gerenciamento de Estoque</h1>
        <p style={{ color: "var(--text-secondary)" }}>Adicione, edite ou remova produtos da vitrine.</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "40px", alignItems: "start" }}>
        
        {/* Formulário */}
        <div className="card" style={{ padding: "24px", background: "var(--bg-secondary)" }}>
          <h2 style={{ marginBottom: "20px", fontSize: "1.2rem" }}>
            {editingId ? "Editar Produto" : "Novo Produto"}
          </h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            
            <input name="name" placeholder="Nome do produto" value={formData.name} onChange={handleChange} required style={inputStyle} />
            <textarea name="description" placeholder="Descrição curta" value={formData.description} onChange={handleChange} required style={{ ...inputStyle, minHeight: "80px" }} />
            
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Preço (R$)</label>
                <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Categoria</label>
                <input name="category" placeholder="Ex: Eletrônicos" value={formData.category} onChange={handleChange} required style={inputStyle} />
              </div>
            </div>

            <input name="image" placeholder="URL da imagem (ex: https://picsum.photos/...)" value={formData.image} onChange={handleChange} required style={inputStyle} />
            
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Avaliação (0-5)</label>
                <input type="number" step="0.1" max="5" name="rating" value={formData.rating} onChange={handleChange} required style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Nº de Avaliações</label>
                <input type="number" name="reviews" value={formData.reviews} onChange={handleChange} required style={inputStyle} />
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Parcelamento</label>
                <input name="installments" placeholder="Ex: 12x R$ 50,00" value={formData.installments} onChange={handleChange} required style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Frete</label>
                <input name="shipping" placeholder="Ex: Frete grátis" value={formData.shipping} onChange={handleChange} required style={inputStyle} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Disponibilidade</label>
              <select name="availability" value={formData.availability} onChange={handleChange} style={inputStyle}>
                <option value="Em estoque">Em estoque</option>
                <option value="Esgotado">Esgotado</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                {editingId ? "Salvar" : "Adicionar"}
              </button>
              {editingId && (
                <button type="button" className="btn-secondary" onClick={() => { setEditingId(null); }} style={{ flex: 1 }}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Lista de Produtos */}
        <div>
          <h2 style={{ marginBottom: "20px", fontSize: "1.2rem" }}>Produtos Cadastrados ({products.length})</h2>
          {products.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center", background: "var(--bg-secondary)", borderRadius: "var(--radius-md)", color: "var(--text-secondary)" }}>
              Nenhum produto cadastrado. Adicione o primeiro!
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {products.map(p => (
                <div key={p.id} className="card flex-between" style={{ padding: "16px", background: "var(--bg-primary)" }}>
                  <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <img src={p.image} alt={p.name} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "var(--radius-sm)" }} />
                    <div>
                      <h3 style={{ fontSize: "1rem" }}>{p.name}</h3>
                      <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>{p.priceFormatted} • {p.availability}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button className="btn-secondary" style={{ padding: "6px 12px", fontSize: "0.85rem" }} onClick={() => handleEdit(p)}>
                      Editar
                    </button>
                    <button className="btn-secondary" style={{ padding: "6px 12px", fontSize: "0.85rem", color: "var(--danger)", borderColor: "rgba(239, 68, 68, 0.3)" }} onClick={() => deleteProduct(p.id)}>
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  background: "var(--bg-primary)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "var(--radius-sm)",
  color: "var(--text-primary)",
  fontFamily: "inherit",
};

const labelStyle = {
  display: "block",
  fontSize: "0.8rem",
  color: "var(--text-secondary)",
  marginBottom: "4px",
};
