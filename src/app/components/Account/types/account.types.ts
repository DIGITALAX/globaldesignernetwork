import { Collection, Designer } from "../../Designer/types./designer.types";


export interface Purchase {
  id: string;
  buyer: string;
  purchaseId: string;
  collectionId: string;
  amount: string;
  tokenIds: string[];
  collection: Collection;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
}

export interface DesignerData {
  title: string;
  image: string | File;
  cover: string | File; 
  description: string;
  link: string;
  transferWallet?: string;
}

export type DesignerSectionProps = {
  dict: any;
  verified: boolean;
  designer: Designer | undefined;
}

export type CuentaTabProps = {
  dict: any;
  designer: Designer | undefined;
    verified: boolean;
}


export type CreateTabProps =  {
  dict: any;
  designer: Designer | undefined;
}