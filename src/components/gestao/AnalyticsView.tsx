"use client";

import React, { useState } from "react";
import { useProducts } from "@/context/ProductContext";
import { useOrders } from "@/context/OrderContext";

export function AnalyticsView() {
  const { products } = useProducts();
  const { orders } = useOrders();

  const [question, setQuestion] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { sender: "ai" | "user"; text: string }[]
  >([
    {
      sender: "ai",
      text: "Olá! Sou seu copiloto analítico ShopNova AI. Analisei seu catálogo e volume de pedidos em tempo real. Como posso te auxiliar na gestão do seu negócio hoje?",
    },
  ]);

  const totalRevenue = orders
    .filter((o) => o.status !== "Cancelado")
    .reduce((sum, o) => sum + o.total, 0);

  const mostExpensive =
    products.length > 0
      ? [...products].sort((a, b) => b.price - a.price)[0]
      : null;

  const lowStockProducts = products.filter(
    (p) => (p.stock !== undefined ? p.stock <= 5 : false)
  );

  const formatBRL = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userText = question;
    const lower = userText.toLowerCase();
    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setQuestion("");

    // Resposta contextual baseada nos dados reais
    setTimeout(() => {
      let aiResponse = "";
      if (lower.includes("faturamento") || lower.includes("vendas") || lower.includes("receita")) {
        aiResponse = `Seu faturamento atual consolidado é de ${formatBRL(
          totalRevenue
        )} em um total de ${orders.length} pedidos. Seu ticket médio está em ${formatBRL(
          orders.length > 0 ? totalRevenue / orders.length : 0
        )}.`;
      } else if (lower.includes("estoque") || lower.includes("acabar") || lower.includes("reposição")) {
        if (lowStockProducts.length > 0) {
          aiResponse = `Atenção: Identifiquei ${
            lowStockProducts.length
          } produto(s) com estoque crítico (≤ 5 un.): ${lowStockProducts
            .map((p) => `"${p.name}" (${p.stock} un.)`)
            .join(", ")}. Recomendo emitir ordem de compra para fornecedores.`;
        } else {
          aiResponse = `Excelente notícia: Todos os ${products.length} produtos do seu inventário estão com estoque saudável acima de 5 unidades.`;
        }
      } else if (lower.includes("caro") || lower.includes("ticket") || lower.includes("produto")) {
        aiResponse = mostExpensive
          ? `O item de maior valor unitário no seu catálogo é "${mostExpensive.name}", custando ${formatBRL(
              mostExpensive.price
            )} (${mostExpensive.category}). Considere promovê-lo com parcelamento em destaque.`
          : "Nenhum produto cadastrado no catálogo.";
      } else {
        aiResponse = `Analisando os dados da loja: você possui ${products.length} itens no catálogo e ${orders.length} pedidos. Uma ótima estratégia é criar cupons de frete fixo ou desconto percentual para produtos da categoria de maior saída.`;
      }

      setChatMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    }, 600);
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "1.9rem", fontWeight: 800, marginBottom: "4px", display: "flex", alignItems: "center", gap: "10px" }}>
          <span>Inteligência Analítica & IA</span>
          <span style={{ fontSize: "0.75rem", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", padding: "3px 10px", borderRadius: "999px" }}>
            POWERED BY SHOPNOVA AI
          </span>
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          Diagnóstico de gargalos, previsibilidade de receita e recomendações estratégicas.
        </p>
      </div>

      {/* Grid de Insights Estratégicos */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
        <div className="card" style={{ padding: "24px", background: "var(--bg-secondary)", display: "flex", gap: "16px" }}>
          <div style={{ fontSize: "2rem", background: "rgba(99, 102, 241, 0.15)", width: "56px", height: "56px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            🔥
          </div>
          <div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "6px" }}>Produto de Maior Ticket</h4>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              {mostExpensive
                ? `"${mostExpensive.name}" representa o topo do catálogo (${formatBRL(mostExpensive.price)}). Campanhas de remarketing para ele tendem a alavancar a margem bruta.`
                : "Cadastre produtos para habilitar este insight."}
            </p>
          </div>
        </div>

        <div className="card" style={{ padding: "24px", background: "var(--bg-secondary)", display: "flex", gap: "16px" }}>
          <div style={{ fontSize: "2rem", background: "rgba(245, 158, 11, 0.15)", width: "56px", height: "56px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            ⚠️
          </div>
          <div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "6px" }}>Previsão de Ruptura</h4>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              {lowStockProducts.length > 0
                ? `${lowStockProducts.length} produto(s) podem ter o estoque zerado nos próximos dias no ritmo atual de pedidos.`
                : "Nenhum risco de ruptura de estoque detectado nas próximas 72 horas."}
            </p>
          </div>
        </div>

        <div className="card" style={{ padding: "24px", background: "var(--bg-secondary)", display: "flex", gap: "16px" }}>
          <div style={{ fontSize: "2rem", background: "rgba(16, 185, 129, 0.15)", width: "56px", height: "56px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            💡
          </div>
          <div>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "6px" }}>Oportunidade de Upsell</h4>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              Clientes que compram produtos de Informática respondem positivamente a ofertas combinadas com Fones e Acessórios com 10% OFF.
            </p>
          </div>
        </div>
      </div>

      {/* Assistente Interativo de IA */}
      <div
        className="card"
        style={{
          background: "var(--bg-secondary)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          border: "1px solid rgba(99, 102, 241, 0.25)",
        }}
      >
        <div
          style={{
            padding: "18px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "linear-gradient(90deg, rgba(99,102,241,0.1), transparent)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{ fontSize: "1.3rem" }}>🤖</span>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Assistente Virtual do Gestor</h3>
            <span style={{ fontSize: "0.78rem", color: "#10b981" }}>● Online & conectado aos dados da loja</span>
          </div>
        </div>

        <div
          style={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            minHeight: "260px",
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              style={{
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                maxWidth: "80%",
                background:
                  msg.sender === "user"
                    ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                    : "rgba(255,255,255,0.05)",
                color: "#fff",
                padding: "14px 18px",
                borderRadius:
                  msg.sender === "user"
                    ? "16px 16px 4px 16px"
                    : "16px 16px 16px 4px",
                border: msg.sender === "ai" ? "1px solid rgba(255,255,255,0.08)" : "none",
                fontSize: "0.92rem",
                lineHeight: 1.5,
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Sugestões Rápidas */}
        <div style={{ padding: "0 24px 12px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["Qual o faturamento total?", "Quais produtos estão acabando?", "Dicas para vender mais"].map((hint) => (
            <button
              key={hint}
              onClick={() => setQuestion(hint)}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "4px 12px",
                borderRadius: "999px",
                fontSize: "0.78rem",
                color: "var(--text-secondary)",
                cursor: "pointer",
              }}
            >
              {hint}
            </button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleAsk} style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "12px" }}>
          <input
            type="text"
            placeholder="Faça uma pergunta sobre finanças, produtos ou clientes..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={{
              flex: 1,
              padding: "12px 18px",
              background: "var(--bg-primary)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "999px",
              color: "#fff",
              outline: "none",
              fontSize: "0.9rem",
            }}
          />
          <button type="submit" className="btn-primary" style={{ padding: "12px 24px", borderRadius: "999px" }}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
