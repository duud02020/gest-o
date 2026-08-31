"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface Toast {
  id: number;
  message: string;
  icon?: string;
}

let toastListeners: ((toast: Toast) => void)[] = [];

export function showToast(message: string, icon = "🛒") {
  const toast: Toast = { id: Date.now(), message, icon };
  toastListeners.forEach((fn) => fn(toast));
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handler = (toast: Toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 3000);
    };
    toastListeners.push(handler);
    return () => {
      toastListeners = toastListeners.filter((fn) => fn !== handler);
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        left: "24px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "#1e2130",
            border: "1px solid rgba(99,102,241,0.4)",
            borderLeft: "4px solid #6366f1",
            color: "#f0f2f5",
            padding: "14px 20px",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            fontFamily: "'Outfit','Segoe UI',sans-serif",
            fontSize: "0.95rem",
            fontWeight: 500,
            minWidth: "260px",
            animation: "slideInToast 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <span style={{ fontSize: "1.4rem" }}>{toast.icon}</span>
          <span>{toast.message}</span>
        </div>
      ))}
      <style>{`
        @keyframes slideInToast {
          from { opacity: 0; transform: translateX(-40px) scale(0.95); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
      `}</style>
    </div>,
    document.body
  );
}
