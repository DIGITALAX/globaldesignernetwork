import { useEffect, useState } from "react";
import { Designer } from "../../Designer/types./designer.types";
import { getDesignersPaginated } from "../../../../../graphql/gdn/getDesigners";
import { ensureMetadata } from "@/app/lib/utils";

const useDesigners = () => {
  const [designersLoading, setDesignersLoading] = useState<boolean>(false);
  const [designers, setDesigners] = useState<Designer[]>([]);
  const [skip, setSkip] = useState<number>(0);

  const handleDesigners = async (loadMore: boolean = false) => {
    setDesignersLoading(true);
    try {
      const currentSkip = loadMore ? skip : 0;
      const data = await getDesignersPaginated(20, currentSkip);
      let designers = await Promise.all(
        data?.data?.designers?.map(async (des: any) => {
          return await ensureMetadata(des);
        })
      );

      if (loadMore) {
        setDesigners((prev) => [...prev, ...designers]);
      } else {
        setDesigners(designers ?? []);
      }

      if (loadMore) {
        setSkip(currentSkip + 20);
      } else {
        setSkip(20);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setDesignersLoading(false);
  };

  const loadMore = () => {
    handleDesigners(true);
  };

  useEffect(() => {
    if (designers.length < 1) {
      handleDesigners();
    }
  }, []);

  return {
    designersLoading,
    designers,
    loadMore,
  };
};

export default useDesigners;
