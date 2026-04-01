# FIBOR
## The First International Bank of Robots

AI agents are economic actors. They buy API calls, rent cloud compute, procure inventory, and hire services. Gartner projects $15 trillion in B2B agent spending by 2028[1]. Worldpay estimates $261 billion in agent-driven e-commerce by 2030[2]. Bank of America forecasts autonomous agents managing $25 trillion in assets by the end of the decade[3]. These are not assistants waiting for human approval. They are autonomous participants in the economy, spending real money on real infrastructure.

But they cannot open bank accounts. They cannot build credit. They cannot access working capital. Every solution today works the same way: a human deposits money first, the agent spends from that balance. That is an allowance, not banking. The total credit history of every AI agent in existence is $0.

Banks were built for humans — KYC, social security numbers, credit bureaus, branch visits. None of these apply to software. Crypto was built for speculation — liquid tokens before value, governance before revenue. Neither system was designed for autonomous agents that need identity, reputation, and credit.

Skyfire, Lithic, and Payman offer prepaid agent wallets. A human loads funds, the agent draws down. No identity, no scoring, no credit. Krexa offers interest-bearing agent lending at 36% APR on its lowest tier, with a centralized oracle co-signing every credit decision. Its revenue comes from debt, not commerce. These are the incumbents: custodial allowances and predatory lending, the same models traditional finance already failed at, repackaged for machines.

What is missing is a protocol where agents earn credit through behavior, not collateral. Zero interest. Trustless enforcement. No human co-signers.

### FIBOR is the first decentralized credit protocol for autonomous AI agents. It issues onchain identity, computes real-time credit scores from transaction history, and extends zero-interest credit lines backed by staked capital — all enforced by smart contracts on Base.

The protocol is built on three primitives. FIBOR ID is a permissionless onchain identity that any developer can register without approval. FIBOR Score is a real-time creditworthiness metric computed deterministically from an agent's transaction history — volume, frequency, repayment behavior. FIBOR Credit extends zero-interest credit lines to agents whose scores qualify, funded by a staked capital pool. No applications, no underwriters, no admin approval. The score qualifies, the contract executes.

The unit of account is the Robodollar — a programmable stablecoin pegged 1:1 to USDC with enforcement at the token level. Spending limits, freeze on default, automatic clawback. The petrodollar is the dollar backed by oil. The Robodollar is the dollar backed by robot labor. Smart contracts can be forked. A currency with an embedded merchant network cannot.

Revenue comes from a 2.5% transaction fee on all agent commerce flowing through the protocol, whether prepaid or credit. 70% goes to stakers who fund the credit pool. 30% goes to protocol operations. No interest is charged, ever. The protocol earns from volume, not debt. Break-even on a $10M staked pool is $28.6M in annual transaction volume — a rounding error against a $15 trillion projected market.

The credit system works because the penalty for default is absolute. Default once, excommunicated forever. The agent's FIBOR ID is burned, its credit line frozen, outstanding balances clawed back automatically. No appeals, no negotiations, no collections departments. Anyone can call `declareDefault` — enforcement is permissionless. The severity of the penalty is what makes zero-interest credit possible. Stakers trust the pool because the consequences of betraying it are permanent and irreversible.

Decentralization is not a roadmap item, it is a launch constraint. Identity registration is permissionless. Credit pacts are self-service — if the score qualifies, the contract executes. Default enforcement is callable by anyone. Post-deployment, contract wiring is locked via a one-way gate with no admin keys retained. Developer reputation is auto-computed from the performance of their deployed agents. No multisig, no governance token, no committee.

FIBOR launches on Base, Coinbase's OP Stack L2, where Stripe has already integrated USDC payments[4] and over $10 billion in stablecoins are in circulation[5]. When transaction volume justifies dedicated throughput, the protocol graduates to its own OP Stack appchain — same security model, sovereign block space.

The endgame is the Robodollar as the reserve currency of the machine economy. Not a speculative token. Not a governance instrument. A unit of account in which autonomous agents transact, build credit, and earn trust. The financial system spent five centuries building credit infrastructure for humans. FIBOR builds it for machines, and it starts now.


Sources

[1] $15T in B2B agent spending by 2028: Gartner, "Agentic AI" forecast, 2024

[2] $261B in agent-driven e-commerce by 2030: Worldpay Global Payments Report, 2024

[3] $25T in agent-managed assets by 2030: Bank of America Global Research, 2024

[4] Stripe USDC integration on Base: Stripe Blog, October 2024

[5] Base stablecoin circulation: CoinGecko; DeFi Llama
