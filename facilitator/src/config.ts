import { base } from "viem/chains";

export const config = {
  chain: base,
  rpcUrl: process.env.RPC_URL || "https://mainnet.base.org",
  port: parseInt(process.env.PORT || "3402"),

  contracts: {
    fiborID: process.env.FIBOR_ID_ADDRESS as `0x${string}`,
    fiborScore: process.env.FIBOR_SCORE_ADDRESS as `0x${string}`,
    paymentGateway: process.env.PAYMENT_GATEWAY_ADDRESS as `0x${string}`,
    usdc: process.env.USDC_ADDRESS as `0x${string}`,
  },
};
