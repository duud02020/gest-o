import type { NextConfig } from "next";

const securityHeaders = [
  // Contra Clickjacking — impede que o site seja embutido em iframes externos
  { key: "X-Frame-Options", value: "DENY" },
  // Desativa MIME-type sniffing — impede que browsers "adivinhem" o tipo do arquivo
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Força HTTPS por 1 ano, incluindo subdomínios
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // Controla informações de referência enviadas em navegações
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Limita acesso a APIs sensíveis do navegador
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), payment=(self)",
  },
  // Content Security Policy — controla de onde recursos podem ser carregados
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts: apenas do próprio site + Google Fonts (necessário para o CSS de fontes)
      "script-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Estilos: próprio site + Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fontes: apenas Google Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Imagens: próprio site + data URIs
      "img-src 'self' data: blob: https:",
      // Conexões de rede: apenas o próprio site
      "connect-src 'self'",
      // Frames: nenhum iframe externo permitido
      "frame-src 'none'",
      // Objetos: nenhum plugin (Flash, etc.)
      "object-src 'none'",
      // Base URI: apenas o próprio site
      "base-uri 'self'",
      // Formulários: apenas para o próprio site
      "form-action 'self'",
    ].join("; "),
  },
  // Cabeçalho de proteção XSS legado (para navegadores antigos)
  { key: "X-XSS-Protection", value: "1; mode=block" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Aplicar headers de segurança em TODAS as rotas
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
