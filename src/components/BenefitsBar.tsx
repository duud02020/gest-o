"use client";

import styles from "./BenefitsBar.module.css";

const benefits = [
  { icon: "🚚", text: "Frete grátis acima de R$ 200" },
  { icon: "🔒", text: "Compra 100 % segura" },
  { icon: "↩️", text: "Troca fácil em até 30 dias" },
];

export default function BenefitsBar() {
  return (
    <div className={styles.container}>
      {benefits.map((b, i) => (
        <div key={i} className={styles.item}>
          <span className={styles.icon}>{b.icon}</span>
          <span className={styles.text}>{b.text}</span>
        </div>
      ))}
    </div>
  );
}
