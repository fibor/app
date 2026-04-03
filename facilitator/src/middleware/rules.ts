import type { AgentIdentity } from "./identity.js";
import type { AgentScore } from "./scoring.js";

export interface MerchantRules {
  minScore?: bigint;
  blockExcommunicated?: boolean;
  maxTransactionAmount?: bigint;
}

export interface RuleResult {
  approved: boolean;
  reason?: string;
}

/**
 * Evaluate merchant rules against agent identity and score.
 * Merchants configure these rules via the facilitator dashboard
 * or API headers.
 */
export function evaluateRules(
  identity: AgentIdentity | null,
  score: AgentScore | null,
  amount: bigint,
  rules: MerchantRules
): RuleResult {
  // Agent must have a FIBOR ID
  if (!identity) {
    return { approved: false, reason: "No FIBOR ID" };
  }

  // Agent must be active
  if (!identity.isActive) {
    return { approved: false, reason: "Agent not active" };
  }

  // Block excommunicated agents (default: true)
  if (rules.blockExcommunicated !== false && score?.excommunicated) {
    return { approved: false, reason: "Agent excommunicated" };
  }

  // Minimum score check
  if (rules.minScore && score) {
    if (score.compositeScore < rules.minScore) {
      return {
        approved: false,
        reason: `Score ${score.compositeScore} below minimum ${rules.minScore}`,
      };
    }
  }

  // Max transaction amount
  if (rules.maxTransactionAmount && amount > rules.maxTransactionAmount) {
    return {
      approved: false,
      reason: `Amount exceeds maximum ${rules.maxTransactionAmount}`,
    };
  }

  return { approved: true };
}
