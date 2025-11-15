import { useEffect, useState } from "react";
import {
  usePublicClient,
  useWalletClient,
  useAccount as useAccountWagmi,
} from "wagmi";
import { Designer, Drop } from "../../Designer/types./designer.types";
import {
  getCoreContractAddresses,
  getCurrentNetwork,
} from "@/app/lib/constantes";
import { getDesigner } from "../../../../../graphql/gdn/getDesigners";
import { ensureMetadata } from "@/app/lib/utils";

const useDesigner = (dict?: any) => {
  const { address } = useAccountWagmi();
  const publicClient = usePublicClient();
  const [designerLoading, setDesignerLoading] = useState<boolean>(false);
  const [designer, setDesigner] = useState<Designer | undefined>();
  const [verified, setVerified] = useState<boolean>(false);
  const network = getCurrentNetwork();
  const contracts = getCoreContractAddresses(network.chainId);

  const verifyDesigner = async () => {
    if (!address) return;
    setDesignerLoading(true);
    try {
      const verified = await publicClient?.readContract({
        address: contracts.access,
        abi: [
          {
            type: "function",
            name: "isDesigner",
            inputs: [
              { name: "_address", type: "address", internalType: "address" },
            ],
            outputs: [{ name: "", type: "bool", internalType: "bool" }],
            stateMutability: "view",
          },
        ],
        functionName: "isDesigner",
        args: [address],
        account: address,
      });
      if (verified) {
        const data = await getDesigner(address);
        let des = await ensureMetadata(data?.data?.designers?.[0]);

        if (des) {
          const processedCollections = await Promise.all(
            (des?.collections || []).map(async (col: any) => {
              return await ensureMetadata(col);
            })
          );

          const dropsWithCollections = await Promise.all(
            (des?.drops || []).map(async (drop: Drop) => {
              const dropData = await ensureMetadata(drop);
              const dropCollections = processedCollections.filter(
                (col) => col?.drop?.dropId === drop?.dropId
              );
              return {
                ...dropData,
                collections: dropCollections,
              };
            })
          );

          const orphanCollections = processedCollections.filter(
            (col) => !col?.drop || col?.drop?.dropId === null || col?.drop?.dropId === undefined
          );

          const finalDrops = [...dropsWithCollections];
          if (orphanCollections.length > 0) {
            finalDrops.push({
              dropId: "orphan",
              metadata: {
                title: dict?.orphanCollections,
                description: dict?.orphanCollectionsDescription,
                image: "",
              },
              collections: orphanCollections,
              uri: "",
              blockNumber: "",
              blockTimestamp: "",
              transactionHash: "",
            });
          }

          setDesigner({
            ...des,
            drops: finalDrops,
          });
          setVerified(true);
        } else {
          setVerified(false);
        }
      } else {
        setVerified(false);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setDesignerLoading(false);
  };

  useEffect(() => {
    if (address && !designer && !verified) {
      verifyDesigner();
    }
  }, [address]);

  return {
    designerLoading,
    designer,
    verified,
  };
};

export default useDesigner;
