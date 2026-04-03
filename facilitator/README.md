# FIBOR Facilitator

An x402-compatible facilitator that adds identity, credit scoring, and fraud protection to agent payments.

## What it does

Drop-in replacement for Coinbase's x402 facilitator. Merchants swap one URL:

```diff
- const facilitator = "https://x402.coinbase.com"
+ const facilitator = "https://facilitator.fibor.xyz"
```

Same x402 protocol. Plus: FIBOR ID verification, credit score checks, excommunication filtering, and merchant-configurable rules.

## Endpoints

### `GET /verify/:agentAddress`

Check an agent's identity and score before accepting payment.

```json
{
  "verified": true,
  "fibor": {
    "agent_id": "0xabc...",
    "developer": "0xdef...",
    "score": "60000000",
    "max_credit_line": "12500000000",
    "total_repaid": "100",
    "volume_repaid": "50000000000",
    "excommunicated": false,
    "status": "active"
  }
}
```

### `POST /evaluate`

Evaluate a payment against merchant rules.

```json
{
  "agent": "0xabc...",
  "amount": "10000000",
  "rules": {
    "minScore": "1000000",
    "blockExcommunicated": true,
    "maxTransactionAmount": "100000000000"
  }
}
```

## Setup

```bash
cd facilitator
bun install
cp .env.example .env  # configure contract addresses + RPC
bun run dev
```

## Environment Variables

```
RPC_URL=https://mainnet.base.org
PORT=3402
FIBOR_ID_ADDRESS=0x...
FIBOR_SCORE_ADDRESS=0x...
PAYMENT_GATEWAY_ADDRESS=0x...
USDC_ADDRESS=0x...
```
