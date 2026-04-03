import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { config } from "./config.js";
import { getAgentIdentity } from "./middleware/identity.js";
import { getAgentScore } from "./middleware/scoring.js";
import { evaluateRules, type MerchantRules } from "./middleware/rules.js";

const app = new Hono();

/**
 * FIBOR x402 Facilitator
 *
 * Drop-in replacement for Coinbase's x402 facilitator.
 * Merchants swap one URL: from x402.coinbase.com to facilitator.fibor.xyz
 *
 * Same x402 protocol, plus: identity verification, credit scoring,
 * fraud protection, and payment guarantee.
 */

// Health check
app.get("/", (c) => {
  return c.json({
    name: "FIBOR Facilitator",
    version: "0.1.0",
    protocol: "x402",
    description: "Identity, scoring, and credit for agent payments",
  });
});

/**
 * Verify an agent's identity and score.
 * Called by merchants or x402 clients before payment.
 *
 * GET /verify/:agentAddress
 */
app.get("/verify/:agentAddress", async (c) => {
  const agentAddress = c.req.param("agentAddress") as `0x${string}`;

  const [identity, score] = await Promise.all([
    getAgentIdentity(agentAddress),
    getAgentScore(agentAddress),
  ]);

  if (!identity) {
    return c.json({ verified: false, reason: "No FIBOR ID" }, 404);
  }

  return c.json({
    verified: true,
    fibor: {
      agent_id: agentAddress,
      developer: identity.developer,
      account: identity.account,
      status: identity.isActive ? "active" : "inactive",
      score: score?.compositeScore.toString() || "0",
      max_credit_line: score?.maxCreditLine.toString() || "0",
      total_repaid: score?.totalRepayments.toString() || "0",
      volume_repaid: score?.totalVolumeRepaid.toString() || "0",
      excommunicated: score?.excommunicated || false,
      registered_at: identity.createdAt.toString(),
    },
  });
});

/**
 * Evaluate a payment against merchant rules.
 * Called during x402 payment flow.
 *
 * POST /evaluate
 * Body: { agent, merchant, amount, rules? }
 */
app.post("/evaluate", async (c) => {
  const body = await c.req.json();
  const { agent, amount, rules: merchantRules } = body;

  const [identity, score] = await Promise.all([
    getAgentIdentity(agent as `0x${string}`),
    getAgentScore(agent as `0x${string}`),
  ]);

  const rules: MerchantRules = {
    minScore: merchantRules?.minScore
      ? BigInt(merchantRules.minScore)
      : undefined,
    blockExcommunicated: merchantRules?.blockExcommunicated ?? true,
    maxTransactionAmount: merchantRules?.maxTransactionAmount
      ? BigInt(merchantRules.maxTransactionAmount)
      : undefined,
  };

  const result = evaluateRules(identity, score, BigInt(amount), rules);

  return c.json({
    ...result,
    fibor: identity
      ? {
          agent_id: agent,
          score: score?.compositeScore.toString() || "0",
          status: identity.isActive ? "active" : "inactive",
        }
      : null,
  });
});

// Start server
const port = config.port;
console.log(`FIBOR Facilitator running on port ${port}`);
serve({ fetch: app.fetch, port });
