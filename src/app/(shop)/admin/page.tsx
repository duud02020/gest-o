"use client";

import { useState } from "react";
import { useProducts } from "@/context/ProductContext";
import type { Product } from "@/data/products";

type Tab = "dashboard" | "products" | "ai";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 80px)", background: "var(--bg-primary)" }}>
      {/* Sidebar */}
      <aside style={{ width: "260px", background: "var(--bg-secondary)", borderRight: "1px solid rgba(255,255,255,0.05)", padding: "32px 16px" }}>
        <h2 className="gradient-text" style={{ fontSize: "1.5rem", marginBottom: "32px", paddingLeft: "12px" }}>Painel Admin</h2>
        
        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <SidebarButton active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} icon="📊" text="Dashboard" />
          <SidebarButton active={activeTab === "products"} onClick={() => setActiveTab("products")} icon="📦" text="Produtos" />
          <SidebarButton active={activeTab === "ai"} onClick={() => setActiveTab("ai")} icon="🤖" text="IA Analítica" />
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "40px 48px", overflowY: "auto" }}>
        {activeTab === "dashboard" && <DashboardTab />}
        {activeTab === "products" && <ProductsTab />}
        {activeTab === "ai" && <AiTab />}
      </main>
    </div>
  );
}

function SidebarButton({ active, onClick, icon, text }: { active: boolean, onClick: () => void, icon: string, text: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "100%",
        padding: "12px 16px",
        borderRadius: "var(--radius-sm)",
        border: "none",
        background: active ? "rgba(99, 102, 241, 0.15)" : "transparent",
        color: active ? "var(--accent)" : "var(--text-secondary)",
        cursor: "pointer",
        textAlign: "left",
        fontSize: "1rem",
        fontWeight: active ? 600 : 400,
        transition: "all 0.2s ease",
      }}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </button>
  );
}

// ---------------------------------------------------------
// TABS COMPONENTS
// ---------------------------------------------------------

function DashboardTab() {
  const { products } = useProducts();
  const mockRevenue = "R$ 45.320,00";
  const mockOrders = 124;
  const mockVisits = "4.5k";

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "8px" }}>Visão Geral</h1>
        <p style={{ color: "var(--text-secondary)" }}>Acompanhe o desempenho da sua loja hoje.</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "40px" }}>
        <StatCard title="Faturamento Bruto" value={mockRevenue} subtitle="+12% que ontem" color="#10b981" />
        <StatCard title="Pedidos Realizados" value={mockOrders.toString()} subtitle="8 pedidos aguardando pagamento" color="#6366f1" />
        <StatCard title="Visitantes Únicos" value={mockVisits} subtitle="Pico às 14:00" color="#f59e0b" />
      </div>

      <div className="card" style={{ padding: "24px", background: "var(--bg-secondary)" }}>
        <h3 style={{ marginBottom: "16px", fontSize: "1.2rem" }}>Resumo do Estoque</h3>
        <p style={{ color: "var(--text-secondary)" }}>
          Você tem atualmente <strong>{products.length}</strong> produtos cadastrados na plataforma.
        </p>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, color }: { title: string, value: string, subtitle: string, color: string }) {
  return (
    <div className="card" style={{ padding: "24px", background: "var(--bg-secondary)", borderTop: `4px solid ${color}` }}>
      <h3 style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "12px", fontWeight: 400 }}>{title}</h3>
      <div style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "8px" }}>{value}</div>
      <div style={{ fontSize: "0.85rem", color: color }}>{subtitle}</div>
    </div>
  );
}

function AiTab() {
  const { products } = useProducts();
  const mostExpensive = products.length > 0 ? [...products].sort((a, b) => b.price - a.price)[0].name : "Nenhum";

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "8px", display: "flex", alignItems: "center", gap: "12px" }}>
          <span>Inteligência Analítica</span>
          <span style={{ fontSize: "0.8rem", background: "var(--accent)", color: "#fff", padding: "4px 8px", borderRadius: "12px" }}>BETA</span>
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>Descubra insights ocultos nos seus dados através de Inteligência Artificial.</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        
        {/* Painel de Insights */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <InsightCard 
            icon="🔥" 
            title="Produto em Alta" 
            text={`Simulamos que "${mostExpensive}" teve um aumento de 45% nas buscas nas últimas 24h. Considere colocá-lo na página inicial!`} 
          />
          <InsightCard 
            icon="⚠️" 
            title="Alerta de Abandono" 
            text="20% dos clientes estão abandonando o carrinho na hora de calcular o frete. Oferecer 'Frete Fixo' pode melhorar a conversão." 
          />
          <InsightCard 
            icon="💡" 
            title="Sugestão de Promoção" 
            text="Criar um combo (Celular + Fone) pode aumentar seu ticket médio em R$ 150,00." 
          />
        </div>

        {/* Chat IA (Mock) */}
        <div className="card" style={{ display: "flex", flexDirection: "column", background: "var(--bg-secondary)", overflow: "hidden" }}>
          <div style={{ padding: "20px", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.2)" }}>
            <h3 style={{ fontSize: "1.1rem" }}>Pergunte à IA (Simulação)</h3>
          </div>
          
          <div style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column", gap: "16px", minHeight: "300px" }}>
            <div style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", padding: "16px", borderRadius: "var(--radius-md) var(--radius-md) var(--radius-md) 0", alignSelf: "flex-start", maxWidth: "85%" }}>
              <p style={{ fontSize: "0.95rem", lineHeight: "1.5" }}>Olá! Eu sou sua IA Analítica. Analisei sua loja e estou pronta para responder dúvidas sobre estoque, vendas ou dar ideias de marketing. O que deseja saber?</p>
            </div>
          </div>
          
          <div style={{ padding: "16px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ display: "flex", gap: "12px", background: "var(--bg-primary)", padding: "8px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.1)" }}>
              <input type="text" placeholder="Qual produto deu mais lucro hoje?..." style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", padding: "8px 16px" }} disabled />
              <button className="btn-primary" style={{ padding: "8px 24px", borderRadius: "999px" }} disabled>Enviar</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function InsightCard({ icon, title, text }: { icon: string, title: string, text: string }) {
  return (
    <div className="card" style={{ padding: "20px", background: "var(--bg-secondary)", display: "flex", gap: "16px" }}>
      <div style={{ fontSize: "2rem", background: "rgba(255,255,255,0.05)", padding: "16px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {icon}
      </div>
      <div>
        <h4 style={{ fontSize: "1.1rem", marginBottom: "8px", color: "var(--text-primary)" }}>{title}</h4>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.5" }}>{text}</p>
      </div>
    </div>
  );
}

function ProductsTab() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Omit<Product, "id" | "priceFormatted">>({
    name: "", description: "", price: 0, image: "", rating: 5, reviews: 0,
    installments: "", shipping: "Frete grátis", availability: "Em estoque", category: "",
  });

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name, description: product.description, price: product.price,
      image: product.image, rating: product.rating, reviews: product.reviews,
      installments: product.installments, shipping: product.shipping,
      availability: product.availability, category: product.category,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productToSave = { ...formData, priceFormatted: formatPrice(formData.price) };
    if (editingId) {
      updateProduct(editingId, productToSave);
      setEditingId(null);
    } else {
      addProduct(productToSave);
    }
    setFormData({
      name: "", description: "", price: 0, image: "", rating: 5, reviews: 0,
      installments: "", shipping: "Frete grátis", availability: "Em estoque", category: "",
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
    <div className="animate-fade-in">
      <header style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "8px" }}>Gestão de Produtos</h1>
        <p style={{ color: "var(--text-secondary)" }}>Adicione, edite ou remova produtos do seu catálogo.</p>
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
                <label style={labelStyle}>Nº Avaliações</label>
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
                <button type="button" className="btn-secondary" onClick={() => setEditingId(null)} style={{ flex: 1 }}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Lista */}
        <div>
          <h2 style={{ marginBottom: "20px", fontSize: "1.2rem" }}>Produtos Cadastrados ({products.length})</h2>
          {products.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center", background: "var(--bg-secondary)", borderRadius: "var(--radius-md)", color: "var(--text-secondary)" }}>
              Nenhum produto cadastrado.
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
                    <button className="btn-secondary" style={{ padding: "6px 12px", fontSize: "0.85rem" }} onClick={() => handleEdit(p)}>Editar</button>
                    <button className="btn-secondary" style={{ padding: "6px 12px", fontSize: "0.85rem", color: "var(--danger)", borderColor: "rgba(239, 68, 68, 0.3)" }} onClick={() => deleteProduct(p.id)}>Excluir</button>
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
