export type AboutProps = {
  dict: any;
};

export type HeaderProps = {
  dict: any;
};

export type RadioProps = {
  dict: any;
};

export interface Channel {
  title: string;
  time: string;
  type: string;
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
