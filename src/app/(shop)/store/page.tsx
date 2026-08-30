"use client";

import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const { addToCart } = useCart();

  return (
    <div className="container" style={{ padding: "40px 24px" }}>
      <header style={{ marginBottom: "40px", textAlign: "center" }}>
        <h1 className="gradient-text" style={{ fontSize: "2.5rem", marginBottom: "16px" }}>
          Descubra Produtos Incríveis
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>
          Escolha seus itens favoritos e adicione ao carrinho para comprar.
        </p>
      </header>

      <div className="grid-auto">
        {products.map((product) => (
          <div key={product.id} className="card animate-fade-in" style={{ padding: "24px", display: "flex", flexDirection: "column" }}>
            <div className="flex-center" style={{ fontSize: "4rem", marginBottom: "20px", background: "var(--bg-primary)", padding: "20px", borderRadius: "var(--radius-md)" }}>
              {product.image}
            </div>
            
            <h2 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>{product.name}</h2>
            
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", flexGrow: 1, marginBottom: "16px" }}>
              {product.description}
            </p>
            
            <div className="flex-between" style={{ marginTop: "auto" }}>
              <span style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--success)" }}>
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
              <button 
                className="btn-secondary" 
                style={{ padding: "8px 16px" }}
                onClick={() => {
                  addToCart(product);
                  alert(`${product.name} adicionado ao carrinho!`);
                }}
              >
                Comprar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
