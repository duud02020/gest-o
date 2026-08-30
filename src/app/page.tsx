"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(isLogin ? "Login realizado com sucesso!" : "Conta criada com sucesso!");
    router.push("/store");
  };

  return (
    <div className="flex-center" style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
      
      {/* Container Principal do Card */}
      <div 
        style={{ 
          display: "flex", 
          width: "900px", 
          height: "500px", 
          background: "var(--bg-secondary)", 
          borderRadius: "var(--radius-lg)", 
          boxShadow: "var(--shadow-lg)", 
          overflow: "hidden",
          position: "relative"
        }}
      >
        
        {/* Painel da Esquerda (Tema Compras) */}
        <div 
          style={{ 
            width: "40%", 
            background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
            color: "white",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            transition: "left 0.6s ease-in-out",
            zIndex: 10,
            position: "absolute",
            height: "100%",
            left: isLogin ? "0%" : "60%"
          }}
        >
          <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🛍️</div>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "16px" }}>
            {isLogin ? "Novo por aqui?" : "Bem-vindo de volta!"}
          </h2>
          <p style={{ fontSize: "1rem", opacity: 0.9, marginBottom: "32px" }}>
            {isLogin 
              ? "Cadastre-se agora e descubra ofertas exclusivas nos melhores produtos." 
              : "Acesse sua conta para continuar comprando seus itens favoritos."}
          </p>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            style={{ 
              background: "transparent", 
              border: "2px solid white", 
              color: "white", 
              padding: "10px 32px", 
              borderRadius: "var(--radius-full)",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "var(--accent-primary)"; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "white"; }}
          >
            {isLogin ? "CRIAR CONTA" : "ENTRAR"}
          </button>
        </div>

        {/* Painel da Direita (Formulário) */}
        <div 
          style={{ 
            width: "60%", 
            padding: "40px 60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "absolute",
            height: "100%",
            transition: "left 0.6s ease-in-out",
            left: isLogin ? "40%" : "0%"
          }}
        >
          <h2 className="gradient-text" style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "32px", textAlign: "center" }}>
            {isLogin ? "ACESSE SUA CONTA" : "CRIA SUA CONTA"}
          </h2>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            
            {/* Input Nome (Só no Cadastro) */}
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              background: "var(--bg-elevated)", 
              borderRadius: "var(--radius-md)", 
              padding: "12px 16px",
              opacity: isLogin ? 0 : 1,
              maxHeight: isLogin ? 0 : "100px",
              overflow: "hidden",
              transition: "all 0.4s ease",
              border: "1px solid var(--border-color)"
            }}>
              <span style={{ marginRight: "12px", color: "var(--text-secondary)" }}>👤</span>
              <input 
                type="text" 
                placeholder="NOME" 
                required={!isLogin}
                style={{ background: "transparent", border: "none", color: "white", width: "100%", outline: "none" }}
              />
            </div>

            {/* Input E-mail */}
            <div style={{ display: "flex", alignItems: "center", background: "var(--bg-elevated)", borderRadius: "var(--radius-md)", padding: "12px 16px", border: "1px solid var(--border-color)" }}>
              <span style={{ marginRight: "12px", color: "var(--text-secondary)" }}>✉️</span>
              <input 
                type="email" 
                placeholder="E-MAIL" 
                required
                style={{ background: "transparent", border: "none", color: "white", width: "100%", outline: "none" }}
              />
            </div>

            {/* Input Senha */}
            <div style={{ display: "flex", alignItems: "center", background: "var(--bg-elevated)", borderRadius: "var(--radius-md)", padding: "12px 16px", border: "1px solid var(--border-color)" }}>
              <span style={{ marginRight: "12px", color: "var(--text-secondary)" }}>🔒</span>
              <input 
                type="password" 
                placeholder="SENHA" 
                required
                style={{ background: "transparent", border: "none", color: "white", width: "100%", outline: "none" }}
              />
            </div>

            <button 
              type="submit" 
              className="btn-primary" 
              style={{ marginTop: "16px", padding: "14px", width: "100%", justifyContent: "center", letterSpacing: "1px" }}
            >
              {isLogin ? "ENTRAR" : "CADASTRAR"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
