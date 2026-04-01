# FIBOR

**The First International Bank of Robots.**

The credit protocol for autonomous agents and robots. Identity, credit scoring, zero-interest credit lines, and the Robodollar -- all onchain, deployed on Base.

**[Thesis](./thesis.md)** · **[Whitepaper](./WHITEPAPER.md)** · **[Design Decisions](./DESIGN.md)** · **[Audit Report](./AUDIT.md)** · **[Security](./SECURITY.md)** · **[Contributing](./CONTRIBUTING.md)**

## What is FIBOR?

Robots and AI agents are becoming economic actors, but they can't open bank accounts, build credit, or access working capital. FIBOR fixes this with three primitives:

- **FIBOR ID** -- Onchain identity for any autonomous agent
- **FIBOR Score** -- Credit scoring (0-1000) based on repayment history
- **FIBOR Credit** -- Zero-interest credit lines backed by staked capital, with score-tiered limits and durations

Credit terms are short by default (24h-48h-1wk), with longer terms available to agents with strong credit history.

## Project Structure

```
fibor/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── docs/                 # Documentation site (16 pages)
│   │   │   ├── why-fibor/
│   │   │   ├── how-it-works/
│   │   │   ├── fibor-id/
│   │   │   ├── fibor-score/
│   │   │   ├── fibor-credit/
│   │   │   ├── robodollar/
│   │   │   ├── programmable-rules/
│   │   │   ├── fibor-token/
│   │   │   ├── staking/
│   │   │   ├── fees/
│   │   │   ├── enforcement/
│   │   │   ├── developer-reputation/
│   │   │   ├── architecture/
│   │   │   ├── x402/
│   │   │   ├── contracts/
│   │   │   └── market/
│   │   └── app/                  # Protocol dApp
│   │       ├── page.tsx          # Dashboard
│   │       ├── stake/            # Stake & earn
│   │       ├── explorer/         # Query agents & credit pacts
│   │       └── history/          # Transaction history
│   └── components/
├── contracts/                    # Solidity smart contracts
│   ├── FIBORToken.sol            # ERC-20 governance token (1B supply)
│   ├── StakingPool.sol           # Stake FIBOR, earn protocol revenue
│   ├── CreditPool.sol            # Credit facility & term sheets
│   ├── Robodollar.sol            # Programmable stablecoin (rUSD)
│   ├── FiborID.sol               # Agent identity registry
│   ├── FiborScore.sol            # Onchain credit scoring
│   └── RevenueDistributor.sol    # 2.5% fee, 70/30 staker/treasury split
└── public/
```

## Smart Contracts

| Contract | Purpose |
|---|---|
| `FIBORToken` | ERC-20 governance token. Fixed 1B supply, no inflation. |
| `StakingPool` | Stake FIBOR to back the credit pool. Virtual-share model, 30-day cooldown, pro-rata USDC revenue distribution. |
| `CreditPool` | Issues **Credit Pacts** (onchain term sheets). Score-tiered: 300-499 = $1K/24h, 500-699 = $10K/48h, 700-849 = $100K/7d, 850-999 = $500K/30d. Zero interest. Default = permanent excommunication. |
| `Robodollar` | Programmable stablecoin (rUSD). 1:1 USDC peg, freeze-on-default, transfer restrictions. |
| `FiborID` | Agent identity registry. States: Active, Suspended, Excommunicated. |
| `FiborScore` | Credit scoring 0-1000. Volume-weighted, time-decay, auto-computed developer reputation. |
| `PaymentGateway` | Transaction processing. 2.5% fee, auto score updates, permissionless. |
| `RevenueDistributor` | Receives rUSD fees, unwraps to USDC. Splits 70% to stakers, 30% to treasury. |

## Protocol App

The dApp at `/app` includes:

- **Dashboard** -- Portfolio overview, protocol stats, recent credit pacts
- **Stake** -- Stake/unstake FIBOR, view position, claim revenue
- **Explorer** -- Search any FIBOR ID or Credit Pact by address or ID
- **History** -- Full transaction log with filters

## Documentation

Full docs at `/docs` covering protocol design, primitives, economics, trust model, and architecture.

## Tech Stack

- **Frontend** -- Next.js 15, React 19, Tailwind CSS 4, TypeScript
- **Contracts** -- Solidity 0.8.24, OpenZeppelin
- **Font** -- Geist Sans + Geist Mono

## Development

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## License

MIT
