import { useReadContract } from 'wagmi';
import { CONTRACTS } from '@/lib/contracts';

export function usePoolStats() {
  const { data: totalSavings } = useReadContract({
    ...CONTRACTS.creditPool,
    functionName: 'totalSavings',
  });

  const { data: totalLent } = useReadContract({
    ...CONTRACTS.creditPool,
    functionName: 'totalLent',
  });

  const { data: totalRegistered } = useReadContract({
    ...CONTRACTS.fiborId,
    functionName: 'totalRegistered',
  });

  const { data: nextPactId } = useReadContract({
    ...CONTRACTS.creditPool,
    functionName: 'nextPactId',
  });

  const { data: totalProcessed } = useReadContract({
    ...CONTRACTS.paymentGateway,
    functionName: 'totalProcessed',
  });

  return {
    totalSavings: totalSavings as bigint | undefined,
    totalLent: totalLent as bigint | undefined,
    totalRegistered: totalRegistered ? Number(totalRegistered) : 0,
    activePacts: nextPactId ? Number(nextPactId) - 1 : 0,
    totalProcessed: totalProcessed as bigint | undefined,
  };
}
