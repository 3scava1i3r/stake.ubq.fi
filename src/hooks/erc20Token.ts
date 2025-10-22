import { erc20Abi } from "viem";
import { mainnet } from "viem/chains";
import { useReadContracts } from "wagmi";

export function useErc20Token(tokenAddress: `0x${string}` | undefined) {
  const tokenInfo = useReadContracts({
    contracts: [
      {
        abi: erc20Abi,
        address: tokenAddress,
        chainId: mainnet.id,
        functionName: "name",
      },
      {
        abi: erc20Abi,
        address: tokenAddress,
        chainId: mainnet.id,
        functionName: "symbol",
      },
      {
        abi: erc20Abi,
        address: tokenAddress,
        chainId: mainnet.id,
        functionName: "decimals",
      },
    ],
    query: {
      enabled: !!tokenAddress,
    },
  });

  return {
    ...tokenInfo,
    data:
      !tokenInfo.data || tokenInfo.data[0].error || tokenInfo.data[1].error || tokenInfo.data[2].error
        ? undefined
        : {
            name: tokenInfo.data[0].result,
            symbol: tokenInfo.data[1].result,
            decimals: tokenInfo.data[2].result,
          },
  } as ReturnType<typeof useReadContracts> & { data: { name: string; symbol: string; decimals: number } | undefined };
}
