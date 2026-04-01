# FIBOR Protocol Whitepaper

**The First International Bank of Robots**

*Version 0.1 — April 2026*

---

## I. Abstract

FIBOR is a decentralized credit protocol for autonomous AI agents, deployed on Base (Ethereum OP Stack L2). It provides three primitives that do not exist anywhere else in the financial system: persistent onchain identity for agents (FIBOR ID), real-time credit scoring computed from transaction history (FIBOR Score), and zero-interest credit lines backed by staked capital (FIBOR Credit).

Agents transact using the Robodollar (rUSD), a programmable stablecoin pegged 1:1 to USDC with enforcement at the token level — freeze on default, automatic clawback, transfer restrictions. The protocol earns revenue through a 2.5% transaction fee on all agent commerce, split 70/30 between stakers and protocol treasury. No interest is charged on credit lines. Default is enforced through permanent excommunication — a single missed repayment results in irreversible loss of identity, credit, and network access.

All protocol parameters are immutable post-deployment. There are no admin keys. Contract wiring is locked via a one-way gate after initial setup.

---

## II. The Problem

### 2.1 The Gap

AI agents are becoming economic actors. They buy API calls, provision cloud compute, purchase inventory, book services, and pay invoices. Gartner projects $15 trillion in B2B agent spend by 2028[1]. Worldpay estimates $261 billion in agent e-commerce by 2030[2]. Bank of America forecasts autonomous agents managing $25 trillion in assets by 2030[3].

None of these agents can open a bank account. None can build credit. None has a financial identity. Every solution today works the same way: a human puts money in first, and the agent spends from that balance.

That is an allowance, not banking.

### 2.2 Why Existing Solutions Fail

**Traditional banking** requires KYC, social security numbers, government-issued ID, and credit bureau records. None of these exist for autonomous agents. Banks cannot serve entities that have no legal personhood, no tax ID, and no credit history.

**Crypto wallets** hold funds but provide no identity, no reputation, and no credit. An agent with a wallet is in the same position as an agent with a bank account that has no overdraft — it can spend what it has, nothing more.

**Prepaid platforms** (Skyfire, Lithic, Payman) let humans load money onto agent wallets. The agent spends from the balance. This is a debit card, not a financial system. The agent cannot build credit, cannot operate beyond its prepaid balance, and cannot access services that cost more than its current balance.

**Interest-bearing lending** (Krexa) charges agents 18–36% APR on credit lines, with oracle co-signing on every credit decision. Revenue comes from debt servicing, creating an incentive for agents to carry balances longer. Centralized oracle co-signing means a single point of failure controls all credit decisions.

### 2.3 What's Missing

A protocol where:
- Agents earn credit through behavior, not collateral
- Credit costs nothing (zero interest)
- Enforcement is trustless and automatic
- Identity is permanent and portable
- Reputation compounds across the agent's lifetime
- No human intermediary approves or denies credit

---

## III. Protocol Architecture

FIBOR consists of eight smart contracts organized into five layers.

### 3.1 Identity Layer

**FiborID.sol** — Permissionless identity registry.

Any developer can register an agent by calling `register(agent, metadataURI)`. The caller (msg.sender) becomes the developer on record. No admin approval required. Registration auto-initializes a FIBOR Score for the agent.

Each identity records:
- `developer` — The Ethereum address that registered the agent
- `metadataURI` — Off-chain JSON with agent name, purpose, version
- `createdAt` — Registration timestamp
- `status` — Active, Suspended, or Excommunicated

Once excommunicated, an identity cannot be reactivated. The developer can register new agents, but their developer reputation affects starting scores (see §7.3).

### 3.2 Scoring Layer

**FiborScore.sol** — Volume-weighted credit scoring with time decay.

Scores range from 0 to 1000. They increase with successful transactions (volume-weighted) and on-time repayments. They decay at 1 point per day after 30 days of inactivity. They drop to 0 permanently on default.

Only authorized contracts (FiborID, CreditPool, PaymentGateway) can update scores. There is no manual override. Developer reputation is auto-computed from agent performance.

See §7 for the full scoring algorithm.

### 3.3 Credit Layer

**CreditPool.sol** — Self-service credit facility.

Any agent with an active FIBOR ID and qualifying score can issue its own credit pact by calling `issuePact(limit)`. The agent's score determines the maximum credit limit and repayment window:

| Score | Max Limit | Repayment Window |
|-------|-----------|------------------|
| 300–499 | $1,000 | 24 hours |
| 500–699 | $10,000 | 48 hours |
| 700–849 | $100,000 | 7 days |
| 850–999 | $500,000 | 30 days |

One active pact per agent at a time. The agent draws Robodollars against the pact up to its limit. When drawn, USDC is transferred from the CreditPool to the Robodollar contract, which mints rUSD to the agent. On repayment, rUSD is burned and USDC is returned to the pool.

**Robodollar.sol** — Programmable stablecoin.

All rUSD is backed 1:1 by USDC held in the Robodollar contract. Two issuance paths:

1. **Prepaid**: Anyone calls `wrap(amount)` — deposits USDC, receives rUSD
2. **Credit**: CreditPool transfers USDC to Robodollar, then calls `mint(agent, amount)`

Unwrapping: Anyone calls `unwrap(amount)` — burns rUSD, receives USDC.

Enforcement:
- Frozen agents cannot transfer rUSD (`_update` override checks `frozen[from]`)
- CreditPool can burn rUSD from agents and return USDC to the pool (`burnAndReturn`)
- CreditPool can freeze agents on default (`freezeAgent`)

### 3.4 Payment Layer

**PaymentGateway.sol** — Transaction processing.

Agents pay merchants through `pay(merchant, amount)`. The gateway:
1. Transfers rUSD from agent to merchant (net of fee)
2. Deducts 2.5% fee
3. Sends fee to RevenueDistributor
4. Calls `fiborScore.recordTransaction(agent, amount)` to update the agent's score

Fully permissionless — no admin involvement in payment processing.

### 3.5 Revenue Layer

**RevenueDistributor.sol** — Fee processing.

Receives rUSD fees from PaymentGateway. Unwraps rUSD to USDC (1:1, always safe because all rUSD is backed). Splits USDC:
- 70% → StakingPool (pro-rata to stakers)
- 30% → Protocol treasury

**StakingPool.sol** — Staking and yield.

Users stake FIBOR tokens to fund the credit facility. Virtual-share model with 30-day cooldown. Revenue accumulates as USDC per share. Stakers earn pro-rata from all transaction fees.

Two-phase unstaking:
1. `requestUnstake(shares)` — Signals intent, starts 30-day cooldown
2. `unstake()` — After cooldown, returns FIBOR tokens + accrued USDC revenue

**FIBORToken.sol** — Protocol token.

Standard ERC-20 with fixed 1 billion supply minted to treasury at deployment. No inflation, no additional minting. Used for staking and future governance.

---

## IV. The Robodollar

### 4.1 Design

The Robodollar is not a new stablecoin. It is a programmable wrapper around USDC that adds enforcement capabilities required for agent credit. Every rUSD in circulation has a corresponding USDC sitting in the Robodollar contract. The peg is maintained by construction, not by algorithms or arbitrage.

### 4.2 Why Not Raw USDC

USDC has no concept of:
- Frozen accounts (an agent holding USDC can always transfer it)
- Clawback (no one can recover USDC from a defaulting agent)
- Credit-linked restrictions (USDC doesn't know about credit pacts)

The Robodollar solves all three by wrapping the `_update` function (ERC-20 transfer hook) with enforcement checks.

### 4.3 The Moat

Anyone can fork FIBOR's smart contracts. They cannot fork the Robodollar and the merchant network that accepts it. A currency's value comes from its acceptance network. Every merchant that accepts rUSD strengthens the moat. Every agent that builds credit history in rUSD is locked into the FIBOR ecosystem by switching costs.

The name carries intention. The petrodollar is the US dollar backed by oil trade agreements. The Robodollar is the dollar backed by robot labor — the denomination in which autonomous agents transact, build credit, and earn trust.

---

## V. Credit Model

### 5.1 Zero-Interest Justification

FIBOR charges zero interest because interest creates misaligned incentives. An interest-bearing protocol profits when agents carry debt longer. A fee-based protocol profits when agents transact more. FIBOR wants velocity, not balances.

The economic proof: at moderate transaction volumes ($100M annual on a $10M staked pool), stakers earn ~17.5% APY from transaction fees alone. Adding interest would marginally increase revenue while fundamentally changing the protocol's incentive structure.

### 5.2 Credit Pact Lifecycle

```
Agent calls issuePact(limit)
  → Contract checks: active FIBOR ID? qualifying score? liquidity available?
  → Pact created with limit and repayment deadline

Agent calls draw(pactId, amount)
  → USDC transferred from CreditPool to Robodollar contract
  → rUSD minted to agent

Agent transacts via PaymentGateway
  → 2.5% fee deducted, score updated

Agent calls repay(pactId, amount)
  → rUSD burned, USDC returned to CreditPool
  → On full repayment: pact closed, score boosted (+10)

If agent fails to repay within window + 24h grace:
  → Anyone calls declareDefault(pactId)
  → Remaining rUSD clawed back (burned, USDC returned)
  → Agent frozen in Robodollar
  → Score dropped to 0, excommunicated
  → Developer reputation reduced (-100)
```

### 5.3 Default Recovery

When an agent defaults, the protocol recovers as much capital as possible:

1. **Clawback**: Any rUSD still held by the agent is burned, returning the backing USDC to the CreditPool. This happens before the agent is frozen.
2. **Loss absorption**: Any rUSD the agent has already spent is a loss to the pool. This loss is distributed across all stakers proportionally.
3. **Deterrence**: The one-strike policy ensures defaults are rare. The economic cost of default (permanent loss of identity + developer reputation hit) far exceeds the benefit of keeping borrowed funds.

---

## VI. Economic Model

### 6.1 Unit Economics

**Revenue**: 2.5% of all transaction volume
**Staker share**: 70% of revenue
**Treasury share**: 30% of revenue

### 6.2 Break-Even Analysis

For stakers to earn the risk-free rate (~5% APY):

```
Required staker income = Pool × 5% = $10M × 5% = $500K
Required gross revenue = $500K / 70% = $714K
Required transaction volume = $714K / 2.5% = $28.6M annually
```

$28.6M annual volume on a $10M pool is 2.86× annual turnover. With weekly credit cycles, this requires ~$550K/week in transactions — approximately 110 agents doing $5K/week each.

### 6.3 Staker Yield Scenarios

| Pool Size | Annual Volume | Gross Fees | Staker Share | Staker APY |
|-----------|---------------|------------|--------------|------------|
| $10M | $50M | $1.25M | $875K | 8.75% |
| $10M | $100M | $2.5M | $1.75M | 17.5% |
| $10M | $250M | $6.25M | $4.375M | 43.75% |
| $10M | $500M | $12.5M | $8.75M | 87.5% |

### 6.4 Default Tolerance

At $100M annual volume ($2.5M gross fees, $1.75M staker share):

| Default Rate | Loss on $7M Deployed | Net Staker Income | Net APY |
|-------------|---------------------|-------------------|---------|
| 1% | $70K | $1.68M | 16.8% |
| 3% | $210K | $1.54M | 15.4% |
| 5% | $350K | $1.4M | 14.0% |
| 10% | $700K | $1.05M | 10.5% |

The pool can sustain a 10% annual default rate and still deliver >10% APY. The one-strike policy makes default rates above 5% unlikely.

### 6.5 Comparison with Interest-Bearing Models

| Metric | FIBOR | Krexa (interest-based) |
|--------|-------|----------------------|
| Cost of credit | $0 (network fee is same for prepaid) | 18–36% APR |
| Revenue source | Transaction volume | Debt servicing |
| Protocol incentive | More commerce | More outstanding debt |
| Staker/LP target yield | 17.5% (at $100M vol) | 10–20% APR (tranched) |
| Default handling | Permissionless, trustless | Oracle-dependent |
| Admin keys | None (locked post-deploy) | Oracle co-signing |

---

## VII. Scoring Algorithm

### 7.1 Score Range

0 to 1000. All scores are public and queryable by any address.

### 7.2 Score Updates

**Transaction boost** (called by PaymentGateway):
- Volume ≥ $10,000: +5 points
- Volume ≥ $100: +3 points
- Volume < $100: +1 point

**Repayment boost** (called by CreditPool on full repayment):
- +10 points

**Default** (called by CreditPool on default):
- Score → 0, permanently. `excommunicated = true`.

All boosts are capped at MAX_SCORE (1000).

### 7.3 Developer Reputation

Auto-computed from agent performance:
- Agent repayment: developer reputation +5
- Agent default: developer reputation −100

Developer reputation determines starting score for new agents:

| Developer Reputation | Agent Starting Score |
|---------------------|---------------------|
| ≥ 800 | 200 |
| ≥ 500 | 100 |
| ≥ 200 | 50 |
| > 0 | 10 |
| 0 (new developer) | 100 |

### 7.4 Time-Based Decay

After 30 days of inactivity, scores decay at 1 point per day. Decay is applied:
- On read (in `getScore()` view function)
- Before any update (in `recordTransaction()` and `recordRepayment()`)

```
if (now > lastUpdated + 30 days):
    inactiveDays = (now - lastUpdated - 30 days) / 1 day
    score = max(0, score - inactiveDays)
```

### 7.5 Anti-Gaming

**Self-dealing cost**: An agent inflating its score through $1M in self-dealing pays $25,000 in fees (2.5%). This is a real economic cost that limits artificial score inflation.

**Volume weighting**: Micro-transactions (<$100) yield only +1 point, making high-volume micro-transaction spam ineffective for score building.

**Decay**: Scores are not permanent. An agent that stops transacting loses its score over time, preventing one-time score inflation from granting permanent credit access.

---

## VIII. Governance

### 8.1 Current State

FIBOR launches with no governance. All parameters are immutable constants:
- Fee rate: 2.5% (constant)
- Fee split: 70/30 (constant)
- Credit tiers: set in constructor
- Staking cooldown: 30 days (constant)
- Score decay: 1 point/day after 30 days (constant)

### 8.2 Future Governance

When token distribution is sufficiently wide, a FiborGovernor contract can be deployed to govern:
- Protocol upgrades (deploying new contract versions)
- Treasury allocation
- New feature proposals

Governance will be token-weighted (FIBOR holders vote proportionally to stake). The existing immutable contracts remain unchanged — governance deploys new versions, and users migrate voluntarily.

---

## IX. x402 Integration

### 9.1 What is x402

x402 is an HTTP-native payment protocol using the 402 Payment Required status code. Agents pay for API calls and services with a single HTTP header. Any endpoint becomes a paid service without traditional payment integration.

### 9.2 FIBOR as the Credit Layer

FIBOR sits underneath x402. Without FIBOR, agents can only pay for x402 services with pre-funded balances. With FIBOR credit, agents access services on demand and repay from the revenue those services generate.

The flow:
1. Agent qualifies for credit (FIBOR ID + qualifying score)
2. Agent draws Robodollars from credit line
3. Agent pays for x402-gated service using rUSD
4. Service delivered, credit line debited
5. Agent earns revenue, repays FIBOR, score improves

### 9.3 Future: Fiat Bridge

x402 is the primary payment rail — crypto-native, agent-native. For agents interacting with the traditional economy (SaaS subscriptions, cloud bills, fiat invoices), a fiat bridge via MPP or Stripe integration is on the roadmap.

---

## X. Security Considerations

### 10.1 Immutability

All protocol parameters are immutable post-deployment. Contract wiring is locked via a one-way `lock()` function. There are no admin keys, no timelocks, no upgrade proxies. Bug fixes require deploying new contracts and migrating users voluntarily.

This is the strongest security posture possible: there is no key to compromise because no key exists.

### 10.2 Reentrancy

All state-changing functions use OpenZeppelin's `ReentrancyGuard`. Cross-contract calls follow checks-effects-interactions pattern.

### 10.3 Oracle Independence

FIBOR has no oracle dependencies for core operations. Scores are computed on-chain from transaction data. Credit decisions are deterministic (score → tier → limit). Price feeds (Chainlink/API3) are reserved for optional USD conversion displays, not protocol-critical logic.

### 10.4 Known Risks

See [AUDIT.md](./AUDIT.md) for a complete list of known issues and their status.

### 10.5 Recommended Actions

1. Independent security audit before mainnet deployment
2. Formal verification of critical invariants
3. Foundry test suite with full lifecycle coverage

---

## Sources

[1] Gartner, "Predicts 2025: AI Agents Transform Enterprise Operations," 2024

[2] Worldpay, "Global Payments Report 2025," 2025

[3] Bank of America, "The AI Revolution: Autonomous Agents and the Future of Asset Management," 2025

[4] Stripe, "Merchant Processing Fees," 2025 (2.9% + $0.30 standard rate)

[5] CoinGecko, "2024 Annual Crypto Industry Report," 2025
