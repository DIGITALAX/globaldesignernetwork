import { graphClient } from "@/app/lib/subgraph/client";
import { FetchResult, gql } from "@apollo/client";


const COLLECTIONS_PAGINATED = `
  query($designer: String!, $first: Int, $skip: Int) {
  collectionCreateds(where: {designer: $designer}, first: $first, skip: $skip) {
      amount
      drop {
        metadata {
          cover
          title
        }
          collections {
          collectionId
        }
        uri
      }
      metadata {
        access
        visibility
        video
        title
        onChromadin
        sex
        style
        tags
        prompt
        sizes
        microbrand
        mediaTypes
        mediaCover
        id
        description
        audio
        colors
        images
        microbrandCover
      }
      postId
      acceptedTokens
      uri
      printType
      price
      designer
      tokenIdsMinted
      dropId
      collectionId
      unlimited
      origin
      blockTimestamp
      }
    }
`;


export const getCollectionsPaginated = async (
  designer: string,
  first: number,
  skip: number
): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = graphClient.query({
    query: gql(COLLECTIONS_PAGINATED),
    variables: { designer, first, skip },
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  });

  const timeoutPromise = new Promise((resolve) => {
    timeoutId = setTimeout(() => {
      resolve({ timedOut: true });
    }, 60000); // 1 minute timeout
  });

  const result: any = await Promise.race([queryPromise, timeoutPromise]);
  timeoutId && clearTimeout(timeoutId);
  if (result.timedOut) {
    return;
  } else {
    return result;
  }
};
