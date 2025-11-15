import { useEffect, useState } from "react";
import { Designer, Drop } from "../types./designer.types";
import { getDesigner } from "../../../../../graphql/gdn/getDesigners";
import { ensureMetadata } from "@/app/lib/utils";

const useDesigner = (designerWallet: string | undefined) => {
  const [designerLoading, setDesignerLoading] = useState<boolean>(false);
  const [designer, setDesigner] = useState<Designer | undefined>();

  const handleDesigner = async () => {
    if (!designerWallet) return;
    setDesignerLoading(true);
    try {
      const data = await getDesigner(designerWallet);
      let foundDesigner = data?.data?.designers?.[0];
      foundDesigner = await ensureMetadata(data?.data?.designers?.[0]);
      if (foundDesigner) {
        setDesigner({
          ...foundDesigner,
          drops: await Promise.all(
            foundDesigner?.drops?.map(async (drop: Drop) => {
              let data = await ensureMetadata(drop);
              return {
                ...data,
                collections: await Promise.all(
                  drop?.collections?.map(async (col: any) => {
                    return await ensureMetadata(col);
                  })
                ),
              };
            })
          ),
        });
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setDesignerLoading(false);
  };

  useEffect(() => {
    if (designerWallet) {
      handleDesigner();
    }
  }, [designerWallet]);

  return {
    designerLoading,
    designer,
  };
};

export default useDesigner;
