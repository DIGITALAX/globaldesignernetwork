import { useEffect, useState } from "react";
import { Collection, Microbrand } from "../types/common.types";
import { MICROBRANDS } from "@/app/lib/constantes";
import { getCollectionsPaginated } from "../../../../graphql/getAllCollections";

const useMicrobrands = () => {
  const [micro, setMicro] = useState<Microbrand>(MICROBRANDS[0]);
  const [itemLoading, setItemLoading] = useState<boolean>(false);
  const [collections, setCollections] = useState<Collection[]>([]);

  const getItemData = async () => {
    setItemLoading(true);
    try {
      const data = await getCollectionsPaginated(micro?.billetera, 50, 0);
      setCollections(data?.data?.collectionCreateds as Collection[]);
    } catch (err: any) {
      console.error(err.message);
    }
    setItemLoading(false);
  };

  useEffect(() => {
    if (micro?.billetera) {
      getItemData();
    }
  }, [micro]);

  return {
    itemLoading,
    collections,
    micro,
    setMicro,
  };
};

export default useMicrobrands;
