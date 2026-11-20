import { INFURA_GATEWAY } from "./constantes";

export const ensureMetadata = async (item: any) => {
  if (!item?.metadata && item?.uri) {
    const ipfsMetadata = await fetchMetadataFromIPFS(item?.uri);
    item.metadata = ipfsMetadata;
  }
  return item;
};

export const fetchMetadataFromIPFS = async (uri: string): Promise<any> => {
  try {
    if (typeof uri !== "string" || !uri.startsWith("ipfs://")) {
      return null;
    }

    const cid = uri.slice("ipfs://".length);
    if (!/^[A-Za-z0-9]+(\/[A-Za-z0-9._-]+)*$/.test(cid)) {
      return null;
    }

    const metadataUrl = `${INFURA_GATEWAY}/ipfs/${cid}`;

    const response = await fetch(metadataUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch metadata: ${response.statusText}`);
    }

    const metadata = await response.json();
    return metadata;
  } catch (error) {
    return null;
  }
};