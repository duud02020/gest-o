/**
 * Rate Limiting em Memória — ShopNova Security
 *
 * Implementação simples e sem dependências externas usando Map.
 * Em produção, substitua por Upstash Redis para funcionar em múltiplas instâncias.
 *
 * Algoritmo: Sliding Window Counter
 */

interface RateLimitEntry {
  count: number;
  firstAttemptAt: number;
  lockedUntil?: number;
}

// Armazenamento em memória (compartilhado entre requisições no mesmo processo)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Limpar entradas expiradas a cada 5 minutos para evitar vazamento de memória
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    const windowMs = 15 * 60 * 1000; // 15 minutos
    if (now - entry.firstAttemptAt > windowMs && (!entry.lockedUntil || now > entry.lockedUntil)) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitOptions {
  /** Número máximo de tentativas permitidas na janela de tempo */
  maxAttempts: number;
  /** Janela de tempo em milissegundos */
  windowMs: number;
  /** Tempo de bloqueio em ms após exceder o limite (padrão: windowMs) */
  blockDurationMs?: number;
}

export interface RateLimitResult {
  /** Se true, a requisição está dentro do limite */
  allowed: boolean;
  /** Número de tentativas restantes */
  remaining: number;
  /** Timestamp Unix (ms) quando o bloqueio expira (0 se não bloqueado) */
  retryAfter: number;
  /** Total de tentativas na janela atual */
  count: number;
}

/**
 * Verifica e registra uma tentativa de rate limit para uma chave específica.
 *
 * @param key - Identificador único (ex: "login:192.168.1.1" ou "checkout:userId123")
 * @param options - Configurações de limite
 */
export function checkRateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const { maxAttempts, windowMs, blockDurationMs = windowMs } = options;

  const entry = rateLimitStore.get(key);

  // Verificar se ainda está bloqueado
  if (entry?.lockedUntil && now < entry.lockedUntil) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: entry.lockedUntil,
      count: entry.count,
    };
  }

  // Janela expirou — resetar contador
  if (!entry || now - entry.firstAttemptAt > windowMs) {
    const newEntry: RateLimitEntry = { count: 1, firstAttemptAt: now };
    rateLimitStore.set(key, newEntry);
    return {
      allowed: true,
      remaining: maxAttempts - 1,
      retryAfter: 0,
      count: 1,
    };
  }

  // Incrementar contador na janela atual
  entry.count += 1;

  // Verificar se excedeu o limite
  if (entry.count > maxAttempts) {
    entry.lockedUntil = now + blockDurationMs;
    rateLimitStore.set(key, entry);
    return {
      allowed: false,
      remaining: 0,
      retryAfter: entry.lockedUntil,
      count: entry.count,
    };
  }

  rateLimitStore.set(key, entry);
  return {
    allowed: true,
    remaining: maxAttempts - entry.count,
    retryAfter: 0,
    count: entry.count,
  };
}

/**
 * Resets the rate limit counter for a key (e.g., after successful login).
 */
export function resetRateLimit(key: string): void {
  rateLimitStore.delete(key);
}

// Configurações pré-definidas para os pontos de entrada da aplicação
export const RATE_LIMITS = {
  /** Login: 5 tentativas a cada 15 minutos por IP */
  LOGIN: { maxAttempts: 5, windowMs: 15 * 60 * 1000, blockDurationMs: 30 * 60 * 1000 } as RateLimitOptions,
  /** Cadastro: 3 contas a cada 60 minutos por IP */
  REGISTER: { maxAttempts: 3, windowMs: 60 * 60 * 1000, blockDurationMs: 60 * 60 * 1000 } as RateLimitOptions,
  /** Checkout: 3 tentativas falhas por sessão */
  CHECKOUT: { maxAttempts: 3, windowMs: 60 * 60 * 1000, blockDurationMs: 30 * 60 * 1000 } as RateLimitOptions,
  /** Verificação de e-mail: 3 reenvios por hora */
  EMAIL_VERIFY: { maxAttempts: 3, windowMs: 60 * 60 * 1000, blockDurationMs: 60 * 60 * 1000 } as RateLimitOptions,
} as const;
