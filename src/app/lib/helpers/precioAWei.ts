import { parseUnits } from "viem";
import { MONA_DECIMALS } from "../constantes";

const precioAWei = (price: number | string): bigint => {
  const value = Number(price);
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error("Invalid price");
  }

  const wei = parseUnits(
    value.toLocaleString("en-US", {
      useGrouping: false,
      maximumFractionDigits: MONA_DECIMALS,
    }),
    MONA_DECIMALS
  );

  if (wei <= BigInt(0)) {
    throw new Error("Invalid price");
  }

  return wei;
};

export default precioAWei;
