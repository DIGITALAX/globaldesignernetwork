export type AboutProps = {
  dict: any;
};

export type HeaderProps = {
  dict: any;
};

export type HowProps = {
  dict: any;
};

export type RadioProps = {
  dict: any;
};

export interface Channel {
  title: string;
  time: string;
  type: string;
  descripcion: string;
  poster: string;
  video: string;
}

export interface Microbrand {
  titulo: string;
  imagen: string;
  billetera: string;
}

export interface MicrobrandsProps {
  dict: any;
}

export interface Collection {
  amount: string;
  postId: string;
  uri: string;
  printType: string;
  price: number;
  acceptedTokens: string[];
  designer: string;
  tokenIdsMinted: string[];
  collectionId: string;
  unlimited: boolean;
  origin: string;
  blockTimestamp: string;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  right?: number;
  drop: {
    dropId: string;
    metadata: {
      title: string;
      cover: string;
    };
    uri: string;
    collections: Collection[];
  };
  metadata: {
    access: string[];
    colors: string[];
    sizes: string[];
    mediaCover: string;
    description: string;
    title: string;
    tags: string[];
    prompt: string;
    mediaTypes: string;
    microbrandCover: string;
    microbrand: string;
    images: string[];
    video: string;
    audio: string;
    extra: string;
    onChromadin: string;
    sex: string;
    style: string;
  };
}

export interface RunwaysProps {
  dict: any;
}

export interface ForumProps {
  dict: any;
}

export interface Runway {
  src: string;
  poster: string;
  title: string;
  designer: string;
  season: string;
}

export interface FulfillmentProps {
  dict: any;
}

export type ColorPickerProps = {
  onColorSelect?: (color: string) => void;
};


export interface W3FStats {
  totalSupply: string;
}

export interface W3FTransaction {
  hash: string;
  from: string;
  to: string;
  amount: string;
  type: "MINT" | "TRANSFER" | "BURN";
  blockNumber: string;
}