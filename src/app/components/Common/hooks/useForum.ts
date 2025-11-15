import { useEffect, useState } from "react";
import { Collection } from "../types/common.types";
import { usePathname, useRouter } from "next/navigation";
import { getCollectionsForum } from "../../../../../graphql/getAllCollections";

const useForum = () => {
  const [pubs, setPubs] = useState<Collection[]>([]);
  const [pubCargando, setPubCargando] = useState<boolean>(false);
  const router = useRouter();
  const path = usePathname();

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

  const changeLanguage = () => {
    const segments = path.split("/");
    segments[1] = path.includes("/en/") ? "es" : "en";
    const newPath = segments.join("/");

    document.cookie = `NEXT_LOCALE=${
      path.includes("/en/") ? "es" : "en"
    }; path=/; SameSite=Lax`;

    router.push(newPath);
  };

  useEffect(() => {
    if (pubs?.length < 1) {
      getItemData();
    }
  }, []);

  return {
    pubCargando,
    pubs,
    changeLanguage
  };
};

export default useForum;
