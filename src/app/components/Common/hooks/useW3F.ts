import { useState, useEffect } from "react";
import { usePublicClient } from "wagmi";
import { W3FStats, W3FTransaction } from "../types/common.types";
import {
  getCoreContractAddresses,
  getCurrentNetwork,
} from "@/app/lib/constantes";

const useW3F = () => {
  const [loading, setLoading] = useState(true);
  const [w3fStats, setW3fStats] = useState<W3FStats>({ totalSupply: "0" });
  const [recentTransactions, setRecentTransactions] = useState<
    W3FTransaction[]
  >([]);
  const [activeTab, setActiveTab] = useState<"stats" | "activity">("stats");
  const [glitchEffect, setGlitchEffect] = useState(false);

  const publicClient = usePublicClient();
  const network = getCurrentNetwork();
  const contracts = getCoreContractAddresses(network.chainId);

  const fetchW3FStats = async (): Promise<W3FStats> => {
    if (!publicClient || !contracts.w3f) {
      return { totalSupply: "0" };
    }

    try {
      const totalSupply = await publicClient.readContract({
        address: contracts.w3f,
        abi: [
          {
            type: "function",
            name: "totalSupply",
            inputs: [],
            outputs: [{ name: "", type: "uint256" }],
            stateMutability: "view",
          },
        ],
        functionName: "totalSupply",
      });

      return { totalSupply: totalSupply.toString() };
    } catch (error) {
      console.error("Error fetching W3F stats:", error);
      return { totalSupply: "0" };
    }
  };

  const fetchRecentTransactions = async (): Promise<W3FTransaction[]> => {
    if (!publicClient || !contracts.w3f) return [];

    try {
      const latestBlock = await publicClient.getBlockNumber();
      const fromBlock = latestBlock - BigInt(100);

      const transferLogs = await publicClient.getLogs({
        address: contracts.w3f,
        event: {
          type: "event",
          name: "Transfer",
          inputs: [
            { indexed: true, name: "from", type: "address" },
            { indexed: true, name: "to", type: "address" },
            { indexed: false, name: "value", type: "uint256" },
          ],
        },
        fromBlock,
        toBlock: latestBlock,
      });

      const transactions: W3FTransaction[] = transferLogs
        .sort((a, b) => Number(b.blockNumber) - Number(a.blockNumber))
        .slice(0, 10)
        .map((log) => {
          const args = log.args as any;
          const from = args.from;
          const to = args.to;
          const amount = args.value.toString();

          let type: W3FTransaction["type"] = "TRANSFER";

          if (from === "0x0000000000000000000000000000000000000000") {
            type = "MINT";
          } else if (to === "0x0000000000000000000000000000000000000000") {
            type = "BURN";
          }

          return {
            hash: log.transactionHash || "",
            from,
            to,
            amount,
            type,
            blockNumber: log.blockNumber?.toString() || "0",
          };
        });

      return transactions;
    } catch (error) {
      console.error("Error fetching recent transactions:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchW3FData = async () => {
      setLoading(true);
      try {
        const [stats, transactions] = await Promise.all([
          fetchW3FStats(),
          fetchRecentTransactions(),
        ]);

        setW3fStats(stats);
        setRecentTransactions(transactions);
      } catch (error) {
        console.error("Error fetching W3F data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchW3FData();
  }, [publicClient, contracts]);

  return {
    w3fStats,
    recentTransactions,
    loading,
    activeTab,
    setActiveTab,
    glitchEffect,
    setGlitchEffect,
  };
};

export default useW3F;
