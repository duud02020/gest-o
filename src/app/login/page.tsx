"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(isLogin ? "Login simulado com sucesso!" : "Conta criada com sucesso!");
    // Aqui redirecionaria o usuário
    window.location.href = "/";
  };

  return (
    <div className="container flex-center" style={{ minHeight: "80vh" }}>
      <div className="card animate-fade-in" style={{ padding: "40px", width: "100%", maxWidth: "450px" }}>
        <h1 className="gradient-text" style={{ fontSize: "2rem", marginBottom: "8px", textAlign: "center" }}>
          {isLogin ? "Bem-vindo de volta" : "Crie sua conta"}
        </h1>
        <p style={{ color: "var(--text-secondary)", textAlign: "center", marginBottom: "32px" }}>
          {isLogin ? "Faça login para acessar suas compras." : "Cadastre-se para aproveitar as ofertas."}
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {!isLogin && (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Nome Completo</label>
              <input 
                required
                type="text" 
                placeholder="Seu nome"
                style={{ padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "white" }}
              />
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>E-mail</label>
            <input 
              required
              type="email" 
              placeholder="seu@email.com"
              style={{ padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "white" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Senha</label>
            <input 
              required
              type="password" 
              placeholder="••••••••"
              style={{ padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", background: "var(--bg-primary)", color: "white" }}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "8px", justifyContent: "center" }}>
            {isLogin ? "Entrar" : "Cadastrar"}
          </button>
        </form>

        <div style={{ marginTop: "32px", textAlign: "center", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: "var(--accent-primary)", background: "transparent", marginLeft: "8px", fontWeight: 600, textDecoration: "underline" }}
          >
            {isLogin ? "Criar agora" : "Fazer login"}
          </button>
        </div>
      </div>
    </div>
  );
}
