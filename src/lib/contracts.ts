import FIBORTokenAbi from './abi/FIBORToken.json';
import FiborIDAbi from './abi/FiborID.json';
import FiborScoreAbi from './abi/FiborScore.json';
import FiborAccountAbi from './abi/FiborAccount.json';
import FiborAccountFactoryAbi from './abi/FiborAccountFactory.json';
import CreditPoolAbi from './abi/CreditPool.json';
import PaymentGatewayAbi from './abi/PaymentGateway.json';
import RevenueDistributorAbi from './abi/RevenueDistributor.json';
import MockUSDCAbi from './abi/MockUSDC.json';

// ── Deployed contract addresses (Base Sepolia) ──────────
// Fill these in after running: forge script script/Deploy.s.sol
const ADDRESSES = {
  mockUsdc:            '0x0000000000000000000000000000000000000000',
  fiborToken:          '0x0000000000000000000000000000000000000000',
  fiborId:             '0x0000000000000000000000000000000000000000',
  fiborScore:          '0x0000000000000000000000000000000000000000',
  creditPool:          '0x0000000000000000000000000000000000000000',
  paymentGateway:      '0x0000000000000000000000000000000000000000',
  revenueDistributor:  '0x0000000000000000000000000000000000000000',
  fiborAccountFactory: '0x0000000000000000000000000000000000000000',
} as const;

// ── Contract configs for wagmi hooks ────────────────────
export const CONTRACTS = {
  mockUsdc:            { address: ADDRESSES.mockUsdc as `0x${string}`, abi: MockUSDCAbi },
  fiborToken:          { address: ADDRESSES.fiborToken as `0x${string}`, abi: FIBORTokenAbi },
  fiborId:             { address: ADDRESSES.fiborId as `0x${string}`, abi: FiborIDAbi },
  fiborScore:          { address: ADDRESSES.fiborScore as `0x${string}`, abi: FiborScoreAbi },
  creditPool:          { address: ADDRESSES.creditPool as `0x${string}`, abi: CreditPoolAbi },
  paymentGateway:      { address: ADDRESSES.paymentGateway as `0x${string}`, abi: PaymentGatewayAbi },
  revenueDistributor:  { address: ADDRESSES.revenueDistributor as `0x${string}`, abi: RevenueDistributorAbi },
  fiborAccountFactory: { address: ADDRESSES.fiborAccountFactory as `0x${string}`, abi: FiborAccountFactoryAbi },
} as const;

// FiborAccount ABI for dynamic addresses (each user has a unique contract)
export const FIBOR_ACCOUNT_ABI = FiborAccountAbi;

export const BASE_SEPOLIA_CHAIN_ID = 84532;
