import GDNMarket from "./GDNMarket.json";
import GDNDesigners from "./GDNDesigners.json";


export const ABIS = {
  GDNMarket,
  GDNDesigners,
} as const;

export const getABI = (contractName: keyof typeof ABIS) => {
  return ABIS[contractName];
};
