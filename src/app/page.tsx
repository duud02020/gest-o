"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    width: "min(900px, 100%)",
    height: "520px",
    background: "#1a1d24",
    borderRadius: "20px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
    overflow: "hidden",
    position: "relative",
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
    padding: "48px 56px",
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
    fontSize: "4.5rem",
    marginBottom: "20px",
  } as React.CSSProperties,

  leftTitle: {
    fontSize: "1.8rem",
    fontWeight: 700,
    marginBottom: "14px",
    color: "white",
  } as React.CSSProperties,

  leftText: {
    fontSize: "0.95rem",
    opacity: 0.9,
    marginBottom: "36px",
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
  } as React.CSSProperties,

  formTitle: {
    fontSize: "1.7rem",
    fontWeight: 800,
    marginBottom: "32px",
    textAlign: "center",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    letterSpacing: "0.5px",
  } as React.CSSProperties,

  inputRow: {
    display: "flex",
    alignItems: "center",
    background: "#252a33",
    borderRadius: "12px",
    padding: "13px 16px",
    border: "1px solid rgba(255,255,255,0.08)",
    marginBottom: "16px",
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
    fontSize: "0.95rem",
    fontFamily: "inherit",
  } as React.CSSProperties,

  submitBtn: {
    marginTop: "10px",
    padding: "14px",
    width: "100%",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "white",
    border: "none",
    borderRadius: "9999px",
    fontWeight: 700,
    fontSize: "1rem",
    cursor: "pointer",
    fontFamily: "inherit",
    letterSpacing: "1px",
  } as React.CSSProperties,
};

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/store");
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <div style={styles.page}>
        <div style={styles.card}>

          {/* Painel Esquerdo - Temático */}
          <div style={styles.leftPanel(isLogin)}>
            <div style={styles.icon}>🛍️</div>
            <h2 style={styles.leftTitle}>
              {isLogin ? "Novo por aqui?" : "Bem‑vindo de volta!"}
            </h2>
            <p style={styles.leftText}>
              {isLogin
                ? "Cadastre‑se agora e descubra ofertas exclusivas nos melhores produtos."
                : "Entre na sua conta para continuar comprando seus itens favoritos."}
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

            <form onSubmit={handleSubmit}>
              {/* Campo Nome (só no cadastro) */}
              {!isLogin && (
                <div style={styles.inputRow}>
                  <span style={styles.inputIcon}>👤</span>
                  <input type="text" placeholder="NOME" required={!isLogin} style={styles.input} />
                </div>
              )}

              {/* Campo Email */}
              <div style={styles.inputRow}>
                <span style={styles.inputIcon}>✉️</span>
                <input type="email" placeholder="E‑MAIL" required style={styles.input} />
              </div>

              {/* Campo Senha */}
              <div style={styles.inputRow}>
                <span style={styles.inputIcon}>🔒</span>
                <input type="password" placeholder="SENHA" required style={styles.input} />
              </div>

              <button
                type="submit"
                style={styles.submitBtn}
                onMouseOver={(e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "scale(1.01)"; }}
                onMouseOut={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
              >
                {isLogin ? "ENTRAR" : "CADASTRAR"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}
