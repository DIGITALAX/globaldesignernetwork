import { useContext, useState } from "react";
import {
  usePublicClient,
  useWalletClient,
  useAccount as useAccountWagmi,
} from "wagmi";
import { Designer } from "../../Designer/types./designer.types";
import {
  getCoreContractAddresses,
  getCurrentNetwork,
} from "@/app/lib/constantes";
import { ABIS } from "@/abis";
import { DesignerData } from "../types/account.types";
import { ModalContext } from "@/app/providers";

const useAccount = (
  designer: Designer | undefined,
  verified: boolean,
  dict: any
) => {
  const { address } = useAccountWagmi();
  const publicClient = usePublicClient();
  const context = useContext(ModalContext);
  const { data: walletClient } = useWalletClient();
  const [registerLoading, setRegisterLoading] = useState<boolean>(false);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [transferLoading, setTransferLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const network = getCurrentNetwork();
  const contracts = getCoreContractAddresses(network.chainId);
  const [designerData, setDesignerData] = useState<DesignerData>(
    designer?.metadata ?? {
      title: "",
      image: "",
      cover: "",
      description: "",
      link: "",
    }
  );

  const handleRegister = async () => {
    if (
      !address ||
      !walletClient ||
      !publicClient ||
      designer ||
      !verified ||
      designerData?.title?.trim() == "" ||
      !designerData?.image ||
      (typeof designerData?.image == "string" &&
        designerData?.image?.trim() == "") ||
      designerData?.description?.trim() == ""
    )
      return;
    setRegisterLoading(true);
    try {
      let image = designerData?.image;
      if (typeof designerData?.image !== "string") {
        const formData = new FormData();
        formData.append("file", designerData?.image as File);

        const responseImage = await fetch("/api/ipfs", {
          method: "POST",
          body: formData,
        });

        const resImage = await responseImage.json();
        image = "ipfs://" + resImage.hash;
      }

      let cover = designerData?.cover;
      if (typeof designerData?.cover !== "string") {
        const formData = new FormData();
        formData.append("file", designerData?.cover as File);

        const responseImage = await fetch("/api/ipfs", {
          method: "POST",
          body: formData,
        });

        const resImage = await responseImage.json();
        cover = "ipfs://" + resImage.hash;
      }

      const response = await fetch("/api/ipfs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: designerData.title,
          image,
          cover,
          link: designerData.link,
          description: designerData.description,
        }),
      });

      const result = await response.json();

      const hash = await walletClient.writeContract({
        address: contracts.designers,
        abi: ABIS.GDNDesigners,
        functionName: "registerDesigner",
        args: ["ipfs://" + result.hash],
        account: address,
      });
      await publicClient.waitForTransactionReceipt({ hash });
      context?.showSuccess(dict?.registerSuccess, hash);
    } catch (err: any) {
      console.error(err.message);
      context?.showError(dict?.registerError);
    }
    setRegisterLoading(false);
  };

  const handleUpdate = async () => {
    if (
      !address ||
      !walletClient ||
      !publicClient ||
      !designer ||
      !verified ||
      designerData?.title?.trim() == "" ||
      !designerData?.image ||
      (typeof designerData?.image == "string" &&
        designerData?.image?.trim() == "") ||
      designerData?.description?.trim() == ""
    )
      return;
    setUpdateLoading(true);
    try {
      let image = designerData?.image;
      if (typeof designerData?.image !== "string") {
        const formData = new FormData();
        formData.append("file", designerData?.image as File);

        const responseImage = await fetch("/api/ipfs", {
          method: "POST",
          body: formData,
        });

        const resImage = await responseImage.json();
        image = "ipfs://" + resImage.hash;
      }

      let cover = designerData?.cover;
      if (typeof designerData?.cover !== "string") {
        const formData = new FormData();
        formData.append("file", designerData?.cover as File);

        const responseImage = await fetch("/api/ipfs", {
          method: "POST",
          body: formData,
        });

        const resImage = await responseImage.json();
        cover = "ipfs://" + resImage.hash;
      }

      const response = await fetch("/api/ipfs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: designerData.title,
          image,
          cover,
          link: designerData.link,
          description: designerData.description,
        }),
      });

      const result = await response.json();

      const hash = await walletClient.writeContract({
        address: contracts.designers,
        abi: ABIS.GDNDesigners,
        functionName: "updateDesigner",
        args: ["ipfs://" + result.hash],
        account: address,
      });
      await publicClient.waitForTransactionReceipt({ hash });
      context?.showSuccess(dict?.updateSuccess, hash);
    } catch (err: any) {
      console.error(err.message);
      context?.showError(dict?.updateError);
    }
    setUpdateLoading(false);
  };

  const transferWallet = async () => {
    if (
      !address ||
      !walletClient ||
      !publicClient ||
      !designer ||
      !verified ||
      !designerData?.transferWallet
    )
      return;

    setTransferLoading(true);
    try {
      const hash = await walletClient.writeContract({
        address: contracts.designers,
        abi: ABIS.GDNDesigners,
        functionName: "transferDesigner",
        args: [designerData?.transferWallet],
        account: address,
      });
      await publicClient.waitForTransactionReceipt({ hash });
      context?.showSuccess(dict?.transferWallet, hash);
    } catch (err: any) {
      console.error(err.message);
      context?.showError(dict?.transferError);
    }
    setTransferLoading(false);
  };

  const handleDelete = async () => {
    if (
      !address ||
      !walletClient ||
      !publicClient ||
      !designer ||
      !verified ||
      Number(designer?.totalSales) > 0
    )
      return;
    setDeleteLoading(true);
    try {
      const hash = await walletClient.writeContract({
        address: contracts.designers,
        abi: ABIS.GDNDesigners,
        functionName: "deleteDesigner",
        args: [],
        account: address,
      });
      await publicClient.waitForTransactionReceipt({ hash });
      context?.showSuccess(dict?.deleteSuccess, hash);
    } catch (err: any) {
      console.error(err.message);
      context?.showError(dict?.deleteError);
    }
    setDeleteLoading(false);
  };

  return {
    handleDelete,
    handleRegister,
    handleUpdate,
    registerLoading,
    updateLoading,
    deleteLoading,
    designerData,
    setDesignerData,
    transferWallet,
    transferLoading,
  };
};

export default useAccount;
