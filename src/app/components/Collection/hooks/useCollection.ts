import { useEffect, useState } from "react";
import { Collection } from "../../Designer/types./designer.types";
import { getCollection } from "../../../../../graphql/gdn/getCollections";
import { ensureMetadata } from "@/app/lib/utils";

const useCollection = (
  collectionContract: string | undefined,
  collectionId: string | undefined
) => {
  const [collectionLoading, setCollectionLoading] = useState<boolean>(false);
  const [collection, setCollection] = useState<Collection | undefined>();

  const handleCollection = async () => {
    if (!collectionId || !collectionContract) return;
    setCollectionLoading(true);
    try {
      const data = await getCollection(
        Number(collectionId),
        collectionContract
      );


      let foundCollection = data?.data?.collections?.[0];

      if (foundCollection) {
        foundCollection = await ensureMetadata(foundCollection);
        setCollection({
          ...foundCollection,
          designerProfile: await ensureMetadata(
            foundCollection?.designerProfile
          ),
        });
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setCollectionLoading(false);
  };

  useEffect(() => {
    if (collectionId && collectionContract) {
      handleCollection();
    }
  }, [collectionId, collectionContract]);

  return {
    collectionLoading,
    collection,
  };
};

export default useCollection;
