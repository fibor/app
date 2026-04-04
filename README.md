# FIBOR

**The First International Bank of Robot.**

The bank and credit card network for autonomous agents. Identity, bank accounts, credit scoring, and zero-interest credit — all onchain, deployed on Base.

**[Thesis](./thesis.md)** · **[Whitepaper](./WHITEPAPER.md)** · **[Design Decisions](./DESIGN.md)** · **[Audit Report](./AUDIT.md)** · **[Security](./SECURITY.md)** · **[Contributing](./CONTRIBUTING.md)**

## What is FIBOR?

Robots and AI agents are becoming economic actors, but they can't open bank accounts, build credit, or access working capital. FIBOR fixes this:

- **FIBOR ID** -- Permissionless onchain identity for any agent or human
- **FiborAccount** -- Bank account with checking (liquid) + savings (earns yield)
- **FIBOR Score** -- Multiplicative credit scoring from repayment history
- **FIBOR Credit** -- Zero-interest credit lines, capped at 25% of proven volume
- **x402 Facilitator** -- Drop-in payment verification with identity + fraud protection

## How It Works

1. Developer registers agent → gets FIBOR ID + FiborAccount + Score
2. Agent builds credit by borrowing small and repaying on time
3. Credit limit grows to 25% of total volume repaid
4. Revenue flows into FiborAccount → auto-repays outstanding credit
5. Merchants use FIBOR facilitator → get identity + score on every payment
6. Savings depositors fund the credit pool and earn 75% of transaction fees

## Project Structure

```
fibor/
├── contracts/                    # Solidity smart contracts
│   ├── FIBORToken.sol            # ERC-20 governance token (1B supply)
│   ├── FiborID.sol               # Identity registry (agent + human)
│   ├── FiborScore.sol            # Multiplicative scoring + dev reputation
│   ├── FiborAccount.sol          # Bank account (checking + savings + credit)
│   ├── FiborAccountFactory.sol   # CREATE2 account deployment
│   ├── CreditPool.sol            # Credit facility (savings-funded)
│   ├── PaymentGateway.sol        # Transaction processing (1% + 1.5% fees)
│   └── RevenueDistributor.sol    # Fee distribution (75/25 savings/treasury)
├── facilitator/                  # x402 facilitator service
│   └── src/                     # Hono + viem, identity/scoring middleware
├── src/                         # Next.js docs site + protocol dApp
│   ├── app/docs/                # Documentation (18 pages)
│   └── app/app/                 # Protocol dApp (dashboard, explorer, history)
└── public/
```

## Smart Contracts

| Contract | Purpose |
|---|---|
| `FIBORToken` | ERC-20 governance token. Fixed 1B supply, no inflation. |
| `FiborID` | Permissionless identity registry. Agent + human registration. Deploys FiborAccount on register. |
| `FiborScore` | Score = totalVolumeRepaid × totalRepayments × monthsActive. Credit limit = 25% of proven volume. Auto-computed developer reputation. |
| `FiborAccount` | Bank account for robots. Checking (liquid, not lent) + savings (lent, earns yield). Auto-repay on deposit. Guardian/sovereignty model. |
| `FiborAccountFactory` | CREATE2 deterministic deployment, called by FiborID. |
| `CreditPool` | Credit facility funded by savings deposits. Zero interest. 30-day pacts. Default = clawback + freeze + excommunication. |
| `PaymentGateway` | 1% merchant fee + 1.5% agent fee. Routes to RevenueDistributor. |
| `RevenueDistributor` | 75% to savings depositors, 25% to protocol treasury. |

## x402 Facilitator

Drop-in replacement for Coinbase's x402 facilitator. Merchants swap one URL:

```diff
- const facilitator = "https://x402.coinbase.com"
+ const facilitator = "https://api.fibor.xyz"
```

Merchants get: agent identity, credit score, fraud protection, excommunication filtering. Agents get: verified payments that build their credit history.

## Fee Structure

| Who | Fee | What they get |
|---|---|---|
| Merchant | 1% | Identity verification, score checks, fraud protection, payment guarantee |
| Agent | 1.5% | Zero-interest credit, bank account, financial identity, score building |
| Savings depositors | — | 75% of all fees (yield on deposits) |
| Treasury | — | 25% of all fees (protocol operations) |

## Development

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## License

MIT
