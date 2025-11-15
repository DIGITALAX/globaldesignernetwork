import { useEffect, useState } from "react";
import { Collection, Microbrand } from "../types/common.types";
import { MICROBRANDS } from "@/app/lib/constantes";
import { getCollectionsPaginated } from "../../../../../graphql/getAllCollections";

const useMicrobrands = () => {
  const [micro, setMicro] = useState<Microbrand>(MICROBRANDS[0]);
  const [itemLoading, setItemLoading] = useState<boolean>(false);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [rawCollections, setRawCollections] = useState<Collection[]>([]);

  const generateNonOverlappingPositions = (collections: Collection[]) => {
    const positions: { x: number; y: number; width: number; height: number }[] = [];
    
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 900;
    
    return collections.map((col, index) => {
      let attempts = 0;
      let validPosition = false;
      let x: number = 0;
      let y: number = 0;
      let width: number = 0;
      let height: number = 0;
      
      do {
        if (isMobile) {
          width = Math.random() * 60 + 120;
          height = Math.random() * 60 + 120;
          x = Math.random() * Math.max(5, 85 - (width / 4));
        } else {
          width = Math.random() * 100 + 180;
          height = Math.random() * 100 + 180; 
          x = Math.random() * (100 - (width / 10));
        }
        
        y = index * 120 + (Math.random() * 60 - 30); 
        
        validPosition = !positions.some(pos => 
          x < pos.x + pos.width/10 && 
          x + width/10 > pos.x && 
          y < pos.y + pos.height && 
          y + height > pos.y
        );
        
        attempts++;
      } while (!validPosition && attempts < 10);
      
      const position = { x, y, width, height };
      positions.push(position);
      
      return {
        ...col,
        width,
        height,
        left: Math.max(0, Math.min(x, isMobile ? 85 : 95)),
        top: Math.max(0, y),
      };
    });
  };

  const getItemData = async () => {
    setItemLoading(true);
    try {
      const data = await getCollectionsPaginated(micro?.billetera, 50, 0);
      const rawData = data?.data?.collectionCreateds as Collection[];
      setRawCollections(rawData);
      const collectionsWithPositions = generateNonOverlappingPositions(rawData);
      setCollections(collectionsWithPositions);
    } catch (err: any) {
      console.error(err.message);
    }
    setItemLoading(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (rawCollections.length > 0) {
        const collectionsWithPositions = generateNonOverlappingPositions(rawCollections);
        setCollections(collectionsWithPositions);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [rawCollections]);

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
