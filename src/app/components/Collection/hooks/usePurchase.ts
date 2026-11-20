"use client";

import { ABIS } from "@/abis";
import {
  getCoreContractAddresses,
  getCurrentNetwork,
} from "@/app/lib/constantes";
import { useContext, useEffect, useState } from "react";
import { useAccount, usePublicClient } from "wagmi";
import { erc20Abi } from "viem";
import { chains } from "@lens-chain/sdk/viem";
import { Collection } from "../../Designer/types./designer.types";
import { CartItem, ModalContext } from "@/app/providers";
import useLensWrite from "../../Common/hooks/useLensWrite";

const usePurchase = (dict: any, collection?: Collection | undefined) => {
  const { address } = useAccount();
  const publicClient = usePublicClient({ chainId: chains.mainnet.id });
  const context = useContext(ModalContext);
  const { writeLens } = useLensWrite();
  const [purchaseLoading, setPurchaseLoading] = useState<boolean>(false);
  const [approveLoading, setApproveLoading] = useState<boolean>(false);
  const [batchLoading, setBatchLoading] = useState<boolean>(false);
  const [purchaseAmount, setPurchaseAmount] = useState<number>(1);
  const [approved, setApproved] = useState<boolean>(false);
  const network = getCurrentNetwork();
  const contracts = getCoreContractAddresses(network.chainId);

  const toUnits = (amount: number): bigint => {
    if (!Number.isSafeInteger(amount) || amount <= 0) {
      throw new Error("Invalid amount");
    }
    return BigInt(amount);
  };

  const toWei = (price: string | undefined): bigint => {
    if (!price || !/^\d+$/.test(String(price))) {
      throw new Error("Invalid price");
    }
    return BigInt(price);
  };

  const requiredFor = (): bigint | undefined => {
    try {
      return toWei(collection?.price) * toUnits(purchaseAmount);
    } catch (err: any) {
      return undefined;
    }
  };

  const readAllowance = async (): Promise<bigint> => {
    if (!address || !publicClient) return BigInt(0);
    return await publicClient.readContract({
      address: contracts.mona,
      abi: erc20Abi,
      functionName: "allowance",
      args: [address, contracts.market],
    });
  };

  const checkBalance = async (requiredAmount: bigint): Promise<boolean> => {
    if (!address || !publicClient) return false;
    try {
      const balance = await publicClient.readContract({
        address: contracts.mona,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address],
      });

      if (balance < requiredAmount) {
        context?.showError(dict?.insufficientMona);
        return false;
      }
      return true;
    } catch (err: any) {
      console.error(err.message);
      return false;
    }
  };

  const handlePurchase = async () => {
    if (!address || !publicClient || !collection) return;
    setPurchaseLoading(true);
    try {
      if (collection?.tokenIds?.length == Number(collection?.edition)) {
        context?.showError(dict?.soldOut);
        setPurchaseLoading(false);
        return;
      }

      const requiredAmount = toWei(collection.price) * toUnits(purchaseAmount);

      const hasBalance = await checkBalance(requiredAmount);
      if (!hasBalance) {
        setPurchaseLoading(false);
        return;
      }

      if ((await readAllowance()) < requiredAmount) {
        setApproved(false);
        setPurchaseLoading(false);
        const didApprove = await handleApprove(requiredAmount);
        if (!didApprove) return;
        setPurchaseLoading(true);
      }

      const hash = await writeLens({
        address: contracts.market,
        abi: ABIS.GDNMarket,
        functionName: "buy",
        args: [BigInt(collection.collectionId), toUnits(purchaseAmount), ""],
      });
      setPurchaseAmount(1);
      await checkApproved();
      context?.showSuccess(dict?.purchaseSuccess, hash);
    } catch (err: any) {
      console.error(err.message);
      context?.showError(dict?.purchaseError);
    }
    setPurchaseLoading(false);
  };

  const handleApprove = async (amount: bigint): Promise<boolean> => {
    if (!address || !publicClient || amount <= BigInt(0)) return false;
    setApproveLoading(true);
    let success = false;
    try {
      const hash = await writeLens({
        address: contracts.mona,
        abi: erc20Abi,
        functionName: "approve",
        args: [contracts.market, amount],
      });
      success = (await readAllowance()) >= amount;
      if (!success) {
        throw new Error("Allowance was not set");
      }
      setApproved(true);
      context?.showSuccess(dict?.approveSuccess, hash);
    } catch (err: any) {
      success = false;
      console.error(err.message);
      context?.showError(dict?.approveError);
    }
    setApproveLoading(false);
    return success;
  };

  const checkApproved = async () => {
    if (!address || !publicClient || !collection) return;
    try {
      const required = requiredFor();
      if (required === undefined) {
        setApproved(false);
        return;
      }
      const data = await readAllowance();
      setApproved(data >= required);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (address && publicClient && collection) {
      checkApproved();
    }
  }, [address, publicClient, collection, purchaseAmount]);

  const handleApproveFlow = async () => {
    const totalAmount = requiredFor();
    if (totalAmount === undefined) {
      context?.showError(dict?.approveError);
      return;
    }
    await handleApprove(totalAmount);
  };

  const handlePurchaseFlow = async () => {
    if (!approved) {
      await handleApproveFlow();
    } else {
      await handlePurchase();
    }
  };

  const handleBuyBatch = async (cartItems: CartItem[]) => {
    if (!address || !publicClient || cartItems.length === 0) return;
    setBatchLoading(true);
    try {
      const collectionIds = cartItems.map((item) =>
        BigInt(item.collection.collectionId)
      );
      const amounts = cartItems.map((item) => toUnits(item.amount));
      const fulfillments = Array.from({ length: amounts.length }, () => "");

      const totalAmount = cartItems.reduce(
        (sum, item) =>
          sum + toWei(item.collection.price) * toUnits(item.amount),
        BigInt(0)
      );

      const hasBalance = await checkBalance(totalAmount);
      if (!hasBalance) {
        setBatchLoading(false);
        return;
      }

      if ((await readAllowance()) < totalAmount) {
        const didApprove = await handleApprove(totalAmount);
        if (!didApprove) {
          setBatchLoading(false);
          return;
        }
      }

      const hash = await writeLens({
        address: contracts.market,
        abi: ABIS.GDNMarket,
        functionName: "buyBatch",
        args: [collectionIds, amounts, fulfillments],
      });
      context?.showSuccess(dict?.batchPurchaseSuccess, hash);
    } catch (err: any) {
      console.error(err.message);
      context?.showError(dict?.batchPurchaseError);
    }
    setBatchLoading(false);
  };

  const totalPrice = parseFloat(collection?.price || "0") * purchaseAmount;
  const isAvailable =
    (collection?.tokenIds?.length || 0) < parseInt(collection?.edition || "0");

  return {
    purchaseLoading,
    handlePurchase,
    setPurchaseAmount,
    purchaseAmount,
    handleApprove,
    approved,
    approveLoading,
    handleApproveFlow,
    handlePurchaseFlow,
    totalPrice,
    isAvailable,
    handleBuyBatch,
    batchLoading,
  };
};

export default usePurchase;
