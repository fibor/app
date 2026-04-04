/** Format a USDC bigint (6 decimals) to a dollar string */
export function formatUSDC(amount: bigint | undefined): string {
  if (!amount) return "$0.00";
  const dollars = Number(amount) / 1e6;
  return "$" + dollars.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/** Format a USDC bigint to compact form ($1.2M, $48K, etc.) */
export function formatUSDCCompact(amount: bigint | undefined): string {
  if (!amount) return "$0";
  const dollars = Number(amount) / 1e6;
  if (dollars >= 1_000_000) return "$" + (dollars / 1_000_000).toFixed(1) + "M";
  if (dollars >= 1_000) return "$" + (dollars / 1_000).toFixed(0) + "K";
  return "$" + dollars.toFixed(0);
}

/** Format a score (multiplicative, unbounded) */
export function formatScore(score: bigint | undefined): string {
  if (!score) return "0";
  return Number(score).toLocaleString("en-US");
}

/** Shorten an address */
export function shortAddress(addr: string | undefined): string {
  if (!addr) return "";
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

/** Format a timestamp to relative time */
export function timeAgo(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;
  if (diff < 60) return "just now";
  if (diff < 3600) return Math.floor(diff / 60) + "m ago";
  if (diff < 86400) return Math.floor(diff / 3600) + "h ago";
  return Math.floor(diff / 86400) + "d ago";
}

/** Format remaining time */
export function timeRemaining(expiresAt: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = expiresAt - now;
  if (diff <= 0) return "Expired";
  if (diff < 3600) return Math.floor(diff / 60) + "m left";
  if (diff < 86400) return Math.floor(diff / 3600) + "h " + Math.floor((diff % 3600) / 60) + "m left";
  return Math.floor(diff / 86400) + "d " + Math.floor((diff % 86400) / 3600) + "h left";
}
