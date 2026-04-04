import { useReadContract } from 'wagmi';
import { CONTRACTS } from '@/lib/contracts';

export function useFiborScore(accountAddress: `0x${string}` | undefined) {
  const { data: score } = useReadContract({
    ...CONTRACTS.fiborScore,
    functionName: 'getScore',
    args: accountAddress ? [accountAddress] : undefined,
    query: { enabled: !!accountAddress },
  });

  const { data: maxCredit } = useReadContract({
    ...CONTRACTS.fiborScore,
    functionName: 'getMaxCreditLine',
    args: accountAddress ? [accountAddress] : undefined,
    query: { enabled: !!accountAddress },
  });

  return {
    score: score as bigint | undefined,
    maxCreditLine: maxCredit as bigint | undefined,
  };
}
