import { useEffect, useState } from "react";
import { Collection } from "../types/common.types";
import { getCollectionsForum } from "../../../../graphql/getAllCollections";

const useForum = () => {
  const [pubs, setPubs] = useState<Collection[]>([]);
  const [pubCargando, setPubCargando] = useState<boolean>(false);

  const getItemData = async () => {
    setPubCargando(true);
    try {
      const data = await getCollectionsForum();
      setPubs(data?.data?.collectionCreateds);
    } catch (err: any) {
      console.error(err.message);
    }
    setPubCargando(false);
  };

  useEffect(() => {
    if (pubs?.length < 1) {
      getItemData();
    }
  }, []);

  return {
    pubCargando,
    pubs,
  };
};

export default useForum;
