import { useReadContract } from 'wagmi';
import { CONTRACTS } from '@/lib/contracts';

export function useFiborAccount(address: `0x${string}` | undefined) {
  const { data, isLoading, error } = useReadContract({
    ...CONTRACTS.fiborId,
    functionName: 'identities',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const identity = data as [string, string, string, bigint, number] | undefined;

  return {
    developer: identity?.[0] as `0x${string}` | undefined,
    accountAddress: identity?.[1] as `0x${string}` | undefined,
    metadataURI: identity?.[2],
    createdAt: identity?.[3] ? Number(identity[3]) : 0,
    status: identity?.[4] ?? 0,
    isRegistered: (identity?.[3] ?? 0n) > 0n,
    isLoading,
    error,
  };
}
