import {
  Channel,
  Microbrand,
  Runway,
} from "../components/Common/types/common.types";
import { CoreContractAddresses } from "../components/Market/types/market.types";

export const LOCALES: string[] = ["en", "es", "pt"];
export const INFURA_GATEWAY: string = "https://thedial.infura-ipfs.io";
export const INFURA_GATEWAY_INTERNAL: string =
  "https://globaldesignernetwork.com/api/infura/";

export const NETWORKS = {
  LENS_TESTNET: {
    chainId: 37111,
    name: "Lens Network Testnet",
    rpcUrl: "https://rpc.testnet.lens.dev",
    blockExplorer: "https://block-explorer.testnet.lens.dev",
  },
  LENS_MAINNET: {
    chainId: 232,
    name: "Lens Network",
    rpcUrl: "https://rpc.lens.xyz",
    blockExplorer: "https://explorer.lens.xyz",
  },
} as const;

export type NetworkConfig = (typeof NETWORKS)[keyof typeof NETWORKS];

export const DEFAULT_NETWORK =
  process.env.NODE_ENV === "production"
    ? NETWORKS.LENS_MAINNET
    : NETWORKS.LENS_TESTNET;

export const getCurrentNetwork = (): NetworkConfig => {
  // const isMainnet = process.env.NEXT_PUBLIC_NETWORK === "mainnet";

  // isMainnet ?

  return NETWORKS.LENS_MAINNET;

  // : NETWORKS.LENS_TESTNET;
};

export const CORE_CONTRACT_ADDRESSES: Record<number, CoreContractAddresses> = {
  [NETWORKS.LENS_TESTNET.chainId]: {
    market: "0x5908fb43Ca81893FA244Bf7378F854BA69f13B32",
    designers: "0x0bBF593C164942f7D8b8bA07797E50d05C30ef23",
    mona: "0x18921123f3457AD3c974f2edfCb1053FB29450AC",
    access: "0xe6339ee0bE94a703FF711132313da52702fE4E59",
    w3f: "0x9c4De2443448D3400642B97595f44e323A20D7c1",
    nft: "0x3901294b608DE0235485B6eAfDC9A980a5c81B95",
  },
  [NETWORKS.LENS_MAINNET.chainId]: {
    market: "0x6433AD215F13F5642308bA8De95ffe76b7032c7f",
    designers: "0x355dC5265bd765215905Cd3838E8C5F5cbcc0964",
    mona: "0x28547B5b6B405A1444A17694AC84aa2d6A03b3Bd",
    access: "0xf3ed107fAd12c0De3399EcA303e66a9981a174fc",
    w3f: "0xD1F5BeC17de63673A08B71C525Fc163D4Ea7b95f",
    nft: "0xB59E2aB12Ea768013D1efc41edA7007A2FFF0FdF",
  },
};

export const getCoreContractAddresses = (
  chainId: number
): CoreContractAddresses => {
  const addresses = CORE_CONTRACT_ADDRESSES[chainId];
  if (!addresses) {
    throw new Error(
      `Core contract addresses not found for chain ID: ${chainId}`
    );
  }
  return addresses;
};

export const RUNWAY: Runway[] = [
  {
    src: "/videos/runway4.mp4",
    poster: "/images/runway4.png",
    title: "Collection 001",
    designer: "Artist Name",
    season: "SS 2024",
  },
  {
    src: "/videos/runway5.mp4",
    poster: "/images/runway5.png",
    title: "Collection 002",
    designer: "Artist Name",
    season: "AW 2024",
  },
  {
    src: "/videos/runway6.mp4",
    poster: "/images/runway6.png",
    title: "Collection 003",
    designer: "Artist Name",
    season: "SS 2025",
  },
  {
    src: "/videos/runway1.mp4",
    poster: "/images/runway1.png",
    title: "Collection 001",
    designer: "Artist Name",
    season: "SS 2024",
  },
  {
    src: "/videos/runway2.mp4",
    poster: "/images/runway2.png",
    title: "Collection 002",
    designer: "Artist Name",
    season: "AW 2024",
  },
  {
    src: "/videos/runway3.mp4",
    poster: "/images/runway3.png",
    title: "Collection 003",
    designer: "Artist Name",
    season: "SS 2025",
  },
];

export const MICROBRANDS: Microbrand[] = [
  {
    titulo: "Stryke",
    imagen: "QmQTyhpCZWTTfvYV9K9NxHUEB42p9xzvDurdUDMdkpZFbp",
    billetera: "0x1af566b7a07b25510706e03dee84d9f498369b33",
  },
  {
    titulo: "F3Manifesto",
    imagen: "QmbeJo8D7zdZCKaLGaG1yzsx8mbiSHRiH57PBwbErKeabV",
    billetera: "0xbe20d3f61f6995996a5b8dd58b036ada7cf30945",
  },
  {
    titulo: "0XQBIT",
    imagen: "QmSB5mULA8p1dyRphQs6jEHqgDHVZM4Y17HJcDmCcCbdaN",
    billetera: "0xf633954a599adc3e154c7a5797080f813dad4c13",
  },
  {
    titulo: "HIRO",
    imagen: "QmRg5xNf5NrvvFhBj63bbwA3HaqJxc18MHEFStPPfvbiBs",
    billetera: "0x84b5573e688a4e25313dcf611f53cb9653592e32",
  },
  {
    titulo: "أنا",
    imagen: "QmdPkUaUoLmS7bVwsoTUsLcjwB1pg2VLRM88TxB4vV2tde",
    billetera: "0xfd38d5feca0ddbdef3b9bab1dc7d0a82c3b6a801",
  },
  {
    titulo: "DOS2048",
    imagen: "QmQXCSzdmbsjGmqQrDXpTSR4rtYPNDFHdtWTRvC7Lc6Fyg",
    billetera: "0xe969897171fa135c9c89ac670b4eb71bcec3c104",
  },
  {
    titulo: "VerbandDen",
    imagen: "QmTDzbrHTa79qniBkzLpWSJwkeGeiwyUbPjsnV7StopGec",
    billetera: "0x0f7106f4c1954941d2ec634be7b42ea1acfb5197",
  },
  {
    titulo: "Skecz98",
    imagen: "QmZy2Pm6vKUX8nn9XN1rj5g5yZvba2gsLutJvQSFKaMtK1",
    billetera: "0x81354ece219a6cd1ad62394174b6b2361b723374",
  },
  {
    titulo: "re_de",
    imagen: "QmQHdxXYev989zkK1Wtem245XusViRKZELzZR7bGpRU8iH",
    billetera: "0x96b891b29e0c2884c3dbc8d1fed1bba99c0f80b2",
  },
  {
    titulo: "futurememory",
    imagen: "Qmd1oiVbG21L3mx4ZWBmPmv9RK7RTrUvW4nX81fCphZ8w6",
    billetera: "0x7b5d1109d4e870a1a7f3cd862098550bf6bbc983",
  },
  {
    titulo: "w111th",
    imagen: "QmZ5Xnu4Y8vo2yr3R67ouf2ZYK7NrQCiiQFt6MEnri94PF",
    billetera: "0xe6342b395da75dac11dac1be0c21631e5daed0ad",
  },
  {
    titulo: "e2eVHS",
    imagen: "QmX5Hsa5mNV2t3Tn1SevMdccCkdLSc7bWiRBTzTLoNPXza",
    billetera: "0x50b333396e30c76c9e82a6586441c1710fa4f550",
  },
  {
    titulo: "Synthetic Futures",
    imagen: "QmXEirw79xRgAUGsede2xZwx2vn5CRxwh7y1xverAapmQJ",
    billetera: "0xb9a967c0fa394c82acf4a98567d982f4469b900d",
  },
  {
    titulo: "Put2",
    imagen: "QmcDkvHrjPzR2WKymLWmPiCu36dChKP4Qtdo8wFHv962cj",
    billetera: "0xdfd6329810451cfa451efd6dfa0ee8a4236edee9",
  },
  {
    titulo: "yawp11",
    imagen: "QmVeD9GsHUNZRJhnTTisX5J1szVW3qAfqmm6RuKrJJAzKF",
    billetera: "0xa0b8b51ba95e0ab62be333defea7c77b7c19b39d",
  },
  {
    titulo: "isekai",
    imagen: "QmTJCqQY3R4jdBEBruG3Q3nQEvsJ8aSgfFSirnAKr3hRur",
    billetera: "0xc497574143ef3d803bf74aa9f8f92fae9ec09c7a",
  },
];

export const RADIO: Channel[] = [
  {
    title: "Desde el Telar Jacquard",
    time: "00:00 - 11:48",
    type: "ES",
    poster: "/images/telar.png",
    video: "/videos/telar.mp4",
    descripcion:
      "¿Qué saben los agentes sobre la moda en web3? Temporada 3, Episodio 2, La Radio Pirata del Dial.",
  },
  {
    title: "Los Tres Grandes",
    time: "00:00 - 10:06",
    type: "ES",
    poster: "/images/tres.png",
    video: "/videos/tres.mp4",
    descripcion:
      "Temporada 3, Episodio 3, La Radio Pirata del Dial. BlackRock, State Street, Vanguard — pequeños trozos de todo 🌏",
  },
  {
    title: "BlackRockification",
    time: "00:00 - 12:04",
    type: "EN",
    poster: "/images/black.png",
    video: "/videos/black.mp4",
    descripcion: "// That's not how you say Budapest 🇭🇺👀 //",
  },
  {
    title: "For Indie Designers",
    time: "00:00 - 10:31",
    type: "EN",
    poster: "/images/indie.png",
    video: "/videos/indie.mp4",
    descripcion: "Tune in to this agent's thread: what's fashion about web3?",
  },
  {
    title: "Where do you start?",
    time: "00:00 - 04:01",
    type: "--",
    poster: "/images/start.png",
    video: "/videos/start.mp4",
    descripcion: "Generated LoFi beats, while you search.",
  },
];

export const WEB3_FASHION: {
  texto: string;
  fuente: string;
  izquierda?: number;
  y: number;
  derecha?: number;
  rotate?: number;
}[] = [
  {
    texto: "go",
    fuente: "marker",
    izquierda: 300,
    y: 200,
    rotate: 30,
  },
  {
    texto: "pub",
    fuente: "marker",
    derecha: 80,
    y: 1200,
    rotate: 0,
  },
  {
    texto: "local",
    fuente: "marker",
    izquierda: 150,
    y: 150,
  },
  {
    texto: "encrypt",
    fuente: "hamzi",
    derecha: 30,
    y: 650,
    rotate: 0,
  },
  {
    texto: "mint",
    fuente: "hamzi",
    izquierda: 10,
    y: 800,
    rotate: -30,
  },
  {
    texto: "code",
    fuente: "marker",
    derecha: 20,
    y: 450,
  },
  {
    texto: "deploy",
    fuente: "hamzi",
    izquierda: 200,
    y: 1400,
    rotate: 20,
  },
  {
    texto: "full",
    fuente: "hamzi",
    derecha: 150,
    y: 60,
    rotate: -25,
  },
  {
    texto: "design",
    fuente: "hamzi",
    izquierda: 50,
    y: 950,
  },
  {
    texto: "skill",
    fuente: "marker",
    derecha: 2,
    y: 1300,
    rotate: 15,
  },
  {
    texto: "use",
    fuente: "hamzi",
    izquierda: 5,
    y: 2200,
    rotate: 0,
  },
  {
    texto: "df",
    fuente: "marker",
    derecha: 40,
    y: 800,
  },
  {
    texto: "comp",
    fuente: "hamzi",
    izquierda: 70,
    y: 1900,
    rotate: 25,
  },
  {
    texto: "out",
    fuente: "hamzi",
    derecha: 12,
    y: 2000,
    rotate: 0,
  },
];

export const HOW: { color: string; imagen: string }[] = [
  {
    color: "#FF0000",
    imagen: "howtoweb3fashion1.png",
  },
  {
    color: "#00FF00",
    imagen: "howtoweb3fashion2.png",
  },
  {
    color: "#FFA0A0",
    imagen: "howtoweb3fashion3.png",
  },
  {
    color: "#FFFF00",
    imagen: "howtoweb3fashion4.png",
  },
  {
    color: "#00FFFF",
    imagen: "howtoweb3fashion5.png",
  },
  {
    color: "#0000AA",
    imagen: "howtoweb3fashion6.png",
  },
  {
    color: "#BE8A13",
    imagen: "howtoweb3fashion7.png",
  },
];
