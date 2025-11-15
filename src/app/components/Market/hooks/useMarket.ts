import { useEffect, useState } from "react";
import { getCollectionsPaginated } from "../../../../../graphql/gdn/getCollections";
import { Collection } from "../../Designer/types./designer.types";
import { ensureMetadata } from "@/app/lib/utils";

const useMarket = () => {
  const [collectionsLoading, setCollectionsLoading] = useState<boolean>(false);
  const [selectedDrop, setSelectedDrop] = useState<string>("all");
  const [collections, setCollections] = useState<Collection[]>([]);
  const [skip, setSkip] = useState<number>(0);

  const handleCollections = async (loadMore: boolean = false) => {
    setCollectionsLoading(true);
    try {
      const currentSkip = loadMore ? skip : 0;
      const data = await getCollectionsPaginated(20, currentSkip);
      let allColls = await Promise.all(
        data?.data?.collections?.map(async (col: any) => {
          col = await ensureMetadata(col);
          return {
            ...col,
            designerProfile: await ensureMetadata(col?.designerProfile),
            drop: await ensureMetadata(col?.drop),
          };
        })
      );
      if (loadMore) {
        setCollections((prev) => [...prev, ...allColls]);
      } else {
        setCollections(allColls);
      }

      if (loadMore) {
        setSkip(currentSkip + 20);
      } else {
        setSkip(20);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setCollectionsLoading(false);
  };

  const loadMore = () => {
    handleCollections(true);
  };

  const filteredCollections = collections?.filter((collection: Collection) => {
    if (
      selectedDrop !== "all" &&
      collection?.drop?.metadata?.title !== selectedDrop
    )
      return false;
    return true;
  });

  const drops = [
    ...new Set(
      collections?.map((col) => col.drop?.metadata?.title).filter(Boolean)
    ),
  ];

  const featuredDrop = collections?.[0]?.drop
    ? {
        ...collections[0].drop,
        collections: collections.filter(
          (col) => col.drop?.dropId === collections[0].drop?.dropId
        ),
      }
    : null;

  useEffect(() => {
    if (collections?.length < 1) {
      handleCollections();
    }
  }, []);

  return {
    collectionsLoading,
    collections,
    loadMore,
    selectedDrop,
    setSelectedDrop,
    filteredCollections,
    drops,
    featuredDrop,
  };
};

export default useMarket;
