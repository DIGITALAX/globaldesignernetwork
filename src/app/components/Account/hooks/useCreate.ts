import {
  getCoreContractAddresses,
  getCurrentNetwork,
} from "@/app/lib/constantes";
import { useContext, useState } from "react";
import { useAccount, usePublicClient } from "wagmi";
import { Collection, Designer } from "../../Designer/types./designer.types";
import { ABIS } from "@/abis";
import { ModalContext } from "@/app/providers";
import useLensWrite from "../../Common/hooks/useLensWrite";
import precioAWei from "@/app/lib/helpers/precioAWei";
import blockIfPaused from "@/app/lib/helpers/contractsPaused";

const useCreate = (designer: Designer | undefined, dict: any) => {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const context = useContext(ModalContext);
  const { writeLens } = useLensWrite();
  const network = getCurrentNetwork();
  const contracts = getCoreContractAddresses(network.chainId);
  const [createDropLoading, setCreateDropLoading] = useState<boolean>(false);
  const [addCollectionLoading, setAddCollectionLoading] =
    useState<boolean>(false);
  const [deleteCollectionLoading, setDeleteCollectionLoading] =
    useState<number | null>(null);
  const [deleteDropLoading, setDeleteDropLoading] = useState<number | null>(null);
  const [reassignLoading, setReassignLoading] = useState<boolean>(false);
  const [collection, setCollection] = useState<{
    amount: number;
    price: number;
    metadata: {
      title: string;
      description: string;
      media: File;
      model: string;
      prompt: string;
      workflow: string;
    };
  }>();
  const [collections, setCollections] = useState<
    {
      amount: number;
      price: number;
      metadata: {
        title: string;
        description: string;
        media: File;
        model: string;
        prompt: string;
        workflow: string;
      };
    }[]
  >([]);
  const [drop, setDrop] = useState<{
    title: string;
    description: string;
    image: File;
  }>();

  const handleCreateDrop = async () => {
    if (
      !address ||
      !designer ||
      !publicClient ||
      !drop ||
      drop.title.trim() == "" ||
      drop.description.trim() == "" ||
      !drop.image
    )
      return;

    setCreateDropLoading(true);
    try {
      blockIfPaused();
      const formData = new FormData();
      formData.append("file", drop.image as File);

      const responseImage = await fetch("/api/ipfs", {
        method: "POST",
        body: formData,
      });

      const resImage = await responseImage.json();

      const response = await fetch("/api/ipfs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: drop.title,
          description: drop.description,
          image: "ipfs://" + resImage.hash,
        }),
      });

      const result = await response.json();

      let promisedCollections: {
        edition: number;
        price: bigint;
        uri: string;
      }[] = [];

      if (collections.length > 0) {
        promisedCollections = await Promise.all(
          collections
            ?.filter(
              (col) =>
                col.amount > 0 &&
                col.price > 0 &&
                col.metadata.title.trim() !== "" &&
                col.metadata.description.trim() !== "" &&
                col.metadata.media
            )
            ?.map(async (col) => {
              const formData = new FormData();
              formData.append("file", col.metadata.media as File);

              const responseImage = await fetch("/api/ipfs", {
                method: "POST",
                body: formData,
              });

              const resImage = await responseImage.json();

              const response = await fetch("/api/ipfs", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  title: col.metadata.title,
                  description: col.metadata.description,
                  mediaType: col.metadata.media.type,
                  media: "ipfs://" + resImage.hash,
                  model: col.metadata.model,
                  prompt: col.metadata.prompt,
                  workflow: col.metadata.workflow,
                }),
              });

              const result = await response.json();

              return {
                edition: col.amount,
                price: precioAWei(col.price),
                uri: "ipfs://" + result.hash,
              };
            })
        );
      }

      const hash = await writeLens({
        address: contracts.designers,
        abi: ABIS.GDNDesigners,
        functionName: "createDrop",
        args: ["ipfs://" + result.hash, promisedCollections],
      });
      context?.showSuccess(dict?.createDropSuccess, hash);
      setDrop(undefined);
      setCollections([]);
    } catch (err: any) {
      console.error(err.message);
      context?.showError(dict?.createDropError);
    }
    setCreateDropLoading(false);
  };

  const handleAddCollection = async (dropId: number) => {
    if (
      !address ||
      !designer ||
      !publicClient ||
      !collection ||
      collection.metadata.title.trim() == "" ||
      collection.metadata.description.trim() == "" ||
      !collection.metadata.media
    )
      return;

    setAddCollectionLoading(true);
    try {
      blockIfPaused();
      const price = precioAWei(collection.price);
      const formData = new FormData();
      formData.append("file", collection.metadata.media as File);

      const responseImage = await fetch("/api/ipfs", {
        method: "POST",
        body: formData,
      });

      const resImage = await responseImage.json();

      const response = await fetch("/api/ipfs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: collection.metadata.title,
          description: collection.metadata.description,
          mediaType: collection.metadata.media.type,
          media: "ipfs://" + resImage.hash,
          model: collection.metadata.model,
          prompt: collection.metadata.prompt,
          workflow: collection.metadata.workflow,
        }),
      });

      const result = await response.json();

      const hash = await writeLens({
        address: contracts.designers,
        abi: ABIS.GDNDesigners,
        functionName: "addCollection",
        args: [
          dropId,
          {
            edition: collection.amount,
            price,
            uri: "ipfs://" + result.hash,
          },
        ],
      });
      context?.showSuccess(dict?.addCollectionSuccess, hash);
      setCollection(undefined)
    } catch (err: any) {
      console.error(err.message);
      context?.showError(dict?.addCollectionError);
    }
    setAddCollectionLoading(false);
  };

  const handleDeleteCollection = async (collection: Collection) => {
    if (
      !address ||
      !designer ||
      !publicClient ||
      Number(collection?.tokenIds?.length) > 0
    )
      return;

    const collectionId = Number(collection.collectionId);
    setDeleteCollectionLoading(collectionId);
    try {
      const hash = await writeLens({
        address: contracts.designers,
        abi: ABIS.GDNDesigners,
        functionName: "deleteCollection",
        args: [collectionId],
      });
      context?.showSuccess(dict?.deleteCollectionSuccess, hash);
    } catch (err: any) {
      console.error(err.message);
      context?.showError(dict?.deleteCollectionError);
    }
    setDeleteCollectionLoading(null);
  };

  const handleDeleteDrop = async (dropId: number) => {
    if (!address || !designer || !publicClient) return;
    setDeleteDropLoading(dropId);
    try {
      const hash = await writeLens({
        address: contracts.designers,
        abi: ABIS.GDNDesigners,
        functionName: "deleteDrop",
        args: [dropId],
      });
      context?.showSuccess(dict?.deleteDropSuccess, hash);
    } catch (err: any) {
      console.error(err.message);
      context?.showError(dict?.deleteDropError);
    }
    setDeleteDropLoading(null);
  };

  const handleReassignCollection = async (
    collectionId: number,
    newDropId: number
  ) => {
    if (!address || !designer || !publicClient) return;
    setReassignLoading(true);
    try {
      const hash = await writeLens({
        address: contracts.designers,
        abi: ABIS.GDNDesigners,
        functionName: "reassignCollection",
        args: [collectionId, newDropId],
      });
      context?.showSuccess(dict?.reassignCollectionSuccess, hash);
    } catch (err: any) {
      console.error(err.message);
      context?.showError(dict?.reassignCollectionError);
    }
    setReassignLoading(false);
  };

  return {
    createDropLoading,
    handleCreateDrop,
    handleAddCollection,
    handleDeleteCollection,
    handleDeleteDrop,
    handleReassignCollection,
    addCollectionLoading,
    deleteCollectionLoading,
    deleteDropLoading,
    reassignLoading,
    collections,
    setCollections,
    drop,
    setDrop,
    collection,
    setCollection,
  };
};

export default useCreate;
