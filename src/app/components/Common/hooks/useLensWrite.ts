import { useAccount, useConfig, usePublicClient, useSwitchChain } from "wagmi";
import { getWalletClient } from "wagmi/actions";
import { chains } from "@lens-chain/sdk/viem";
import { LensWriteParams } from "../types/common.types";
import blockIfPaused from "@/app/lib/helpers/contractsPaused";

const useLensWrite = () => {
  const config = useConfig();
  const { address, chainId } = useAccount();
  const publicClient = usePublicClient({ chainId: chains.mainnet.id });
  const { switchChainAsync } = useSwitchChain();

  const writeLens = async (params: LensWriteParams): Promise<`0x${string}`> => {
    blockIfPaused();
    if (!address || !publicClient) {
      throw new Error("Wallet not connected");
    }

    if (chainId !== chains.mainnet.id) {
      await switchChainAsync({ chainId: chains.mainnet.id });
    }

    const walletClient = await getWalletClient(config, {
      chainId: chains.mainnet.id,
    });

    if (
      walletClient.account.address.toLowerCase() !== address.toLowerCase() ||
      (await walletClient.getChainId()) !== chains.mainnet.id
    ) {
      throw new Error("Wallet is not on Lens Chain");
    }

    await publicClient.simulateContract({
      address: params.address,
      abi: params.abi,
      functionName: params.functionName,
      args: params.args,
      account: address,
    });

    const hash = await walletClient.writeContract({
      address: params.address,
      abi: params.abi,
      functionName: params.functionName,
      args: params.args,
      account: address,
      chain: chains.mainnet,
    });

    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    if (receipt.status !== "success") {
      throw new Error("Transaction reverted");
    }

    return hash;
  };

  return {
    writeLens,
  };
};

export default useLensWrite;
