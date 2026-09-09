"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<"comprador" | "vendedor">("comprador");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const effectiveEmail = email.trim() || (role === "vendedor" ? "admin@shopnova.com" : "cliente@exemplo.com");
    const effectiveName = name.trim() || (role === "vendedor" ? "Gestor ShopNova" : "Cliente");
    
    login(role, effectiveEmail, effectiveName);

    if (role === "vendedor") {
      router.push("/gestao");
    } else {
      router.push("/store");
    }
  };


  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <div style={styles.page}>
        <div style={styles.card}>

          {/* Painel Esquerdo - Temático e Dinâmico */}
          <div style={styles.leftPanel(isLogin)}>
            <div style={styles.icon}>
              {role === "vendedor" ? "📊" : "🛍️"}
            </div>
            <h2 style={styles.leftTitle}>
              {role === "vendedor"
                ? isLogin
                  ? "Portal do Lojista"
                  : "Venda na ShopNova!"
                : isLogin
                ? "Bem-vindo de volta!"
                : "Novo por aqui?"}
            </h2>
            <p style={styles.leftText}>
              {role === "vendedor"
                ? isLogin
                  ? "Acesse o painel de gestão para gerenciar produtos, pedidos e acompanhar relatórios."
                  : "Crie sua conta de lojista e comece a vender seus produtos para milhares de clientes."
                : isLogin
                ? "Entre na sua conta para continuar descobrindo ofertas e comprando seus itens favoritos."
                : "Cadastre-se agora e tenha acesso às melhores ofertas em tecnologia e eletrônicos."}
            </p>
            <button
              style={styles.switchBtn}
              onClick={() => setIsLogin(!isLogin)}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.color = "#6366f1";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "white";
              }}
            >
              {isLogin ? "CRIAR CONTA" : "ENTRAR"}
            </button>
          </div>

          {/* Painel Direito - Formulário */}
          <div style={styles.rightPanel(isLogin)}>
            <h2 style={styles.formTitle}>
              {isLogin ? "ACESSE SUA CONTA" : "CRIE SUA CONTA"}
            </h2>

            {/* Seletor de Perfil: Comprador vs Vendedor */}
            <div style={styles.roleContainer}>
              <button
                type="button"
                onClick={() => setRole("comprador")}
                style={{
                  ...styles.roleButton,
                  ...(role === "comprador" ? styles.roleButtonActive : styles.roleButtonInactive),
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>🛍️</span>
                <span>Comprador</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("vendedor")}
                style={{
                  ...styles.roleButton,
                  ...(role === "vendedor" ? styles.roleButtonActive : styles.roleButtonInactive),
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>🏢</span>
                <span>Vendedor / Gestão</span>
              </button>
            </div>

            <p style={styles.roleSubtext}>
              {role === "vendedor"
                ? "● Acesso direto ao Painel de Gestão e Administração da Loja"
                : "● Acesso à vitrine de produtos e carrinho de compras"}
            </p>

            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              {/* Campo Nome (só no cadastro) */}
              {!isLogin && (
                <div style={styles.inputRow}>
                  <span style={styles.inputIcon}>👤</span>
                  <input
                    type="text"
                    placeholder={role === "vendedor" ? "NOME DA LOJA / RESPONSÁVEL" : "SEU NOME COMPLETO"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                    style={styles.input}
                  />
                </div>
              )}

              {/* Campo Email */}
              <div style={styles.inputRow}>
                <span style={styles.inputIcon}>✉️</span>
                <input
                  type="email"
                  placeholder="E‑MAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>

              {/* Campo Senha */}
              <div style={styles.inputRow}>
                <span style={styles.inputIcon}>🔒</span>
                <input
                  type="password"
                  placeholder="SENHA"
                  defaultValue="******"
                  required
                  style={styles.input}
                />
              </div>

              <button
                type="submit"
                style={styles.submitBtn}
                onMouseOver={(e) => {
                  e.currentTarget.style.opacity = "0.92";
                  e.currentTarget.style.transform = "scale(1.01)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {role === "vendedor"
                  ? isLogin
                    ? "ENTRAR NO PAINEL DE GESTÃO"
                    : "CADASTRAR COMO VENDEDOR"
                  : isLogin
                  ? "ENTRAR NA LOJA"
                  : "CADASTRAR COMO COMPRADOR"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f1115 0%, #1a1d24 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Outfit', 'Segoe UI', sans-serif",
    padding: "20px",
  } as React.CSSProperties,

  card: {
    display: "flex",
    width: "min(940px, 100%)",
    minHeight: "560px",
    background: "#1a1d24",
    borderRadius: "24px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
    overflow: "hidden",
    position: "relative",
    border: "1px solid rgba(255,255,255,0.06)",
  } as React.CSSProperties,

  leftPanel: (isLogin: boolean) => ({
    width: "42%",
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    color: "white",
    padding: "48px 40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    position: "absolute",
    height: "100%",
    left: isLogin ? "0%" : "58%",
    transition: "left 0.55s cubic-bezier(0.77,0,0.175,1)",
    zIndex: 10,
  } as React.CSSProperties),

  rightPanel: (isLogin: boolean) => ({
    width: "58%",
    padding: "44px 50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "absolute",
    height: "100%",
    left: isLogin ? "42%" : "0%",
    transition: "left 0.55s cubic-bezier(0.77,0,0.175,1)",
    background: "#1a1d24",
  } as React.CSSProperties),

  icon: {
    fontSize: "4.2rem",
    marginBottom: "16px",
  } as React.CSSProperties,

  leftTitle: {
    fontSize: "1.75rem",
    fontWeight: 700,
    marginBottom: "12px",
    color: "white",
  } as React.CSSProperties,

  leftText: {
    fontSize: "0.92rem",
    opacity: 0.92,
    marginBottom: "32px",
    lineHeight: 1.6,
    color: "white",
  } as React.CSSProperties,

  switchBtn: {
    background: "transparent",
    border: "2px solid white",
    color: "white",
    padding: "10px 36px",
    borderRadius: "9999px",
    fontWeight: 700,
    fontSize: "0.9rem",
    cursor: "pointer",
    letterSpacing: "0.5px",
    fontFamily: "inherit",
    transition: "all 0.2s ease",
  } as React.CSSProperties,

  formTitle: {
    fontSize: "1.6rem",
    fontWeight: 800,
    marginBottom: "18px",
    textAlign: "center",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    letterSpacing: "0.5px",
  } as React.CSSProperties,

  roleContainer: {
    display: "flex",
    background: "#12141a",
    padding: "4px",
    borderRadius: "14px",
    marginBottom: "10px",
    border: "1px solid rgba(255,255,255,0.06)",
    gap: "6px",
  } as React.CSSProperties,

  roleButton: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "10px 14px",
    borderRadius: "10px",
    fontSize: "0.88rem",
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
    fontFamily: "inherit",
    transition: "all 0.25s ease",
  } as React.CSSProperties,

  roleButtonActive: {
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#ffffff",
    boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)",
  } as React.CSSProperties,

  roleButtonInactive: {
    background: "transparent",
    color: "#a0a5b1",
  } as React.CSSProperties,

  roleSubtext: {
    fontSize: "0.78rem",
    color: "#a5b4fc",
    marginBottom: "18px",
    textAlign: "center",
    fontWeight: 500,
  } as React.CSSProperties,

  inputRow: {
    display: "flex",
    alignItems: "center",
    background: "#252a33",
    borderRadius: "12px",
    padding: "12px 16px",
    border: "1px solid rgba(255,255,255,0.08)",
    marginBottom: "14px",
  } as React.CSSProperties,

  inputIcon: {
    marginRight: "12px",
    fontSize: "1.1rem",
  } as React.CSSProperties,

  input: {
    background: "transparent",
    border: "none",
    color: "#f0f2f5",
    width: "100%",
    outline: "none",
    fontSize: "0.92rem",
    fontFamily: "inherit",
  } as React.CSSProperties,

  submitBtn: {
    marginTop: "8px",
    padding: "13px",
    width: "100%",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "white",
    border: "none",
    borderRadius: "9999px",
    fontWeight: 700,
    fontSize: "0.95rem",
    cursor: "pointer",
    fontFamily: "inherit",
    letterSpacing: "0.5px",
    boxShadow: "0 4px 16px rgba(99, 102, 241, 0.35)",
    transition: "all 0.2s ease",
  } as React.CSSProperties,
};
