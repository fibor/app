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
  mockUsdc:            '0xa714e359a92716f6c0a4c5031cb9922aa5e64eff',
  fiborToken:          '0x28f8050adf4bd1dcde4ea6d0a2252aa18a132f07',
  fiborId:             '0xa2dd2c0b37d81915d25601147b5607842ca205bc',
  fiborScore:          '0x229e1d18c266216fe5a4d6ec039f35a902368624',
  creditPool:          '0xac8fee7730a72dac5e16e4e9b5f1d31c967c69ed',
  paymentGateway:      '0x1d180da78df91a90e15651141708d4ef66485a57',
  revenueDistributor:  '0x8ce79fb30fb367f00c56b92f633ae6e45396101f',
  fiborAccountFactory: '0x1fe6dca24de196fe4609384ebc1c87fe32daf5fd',
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
