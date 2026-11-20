import { NextRequest, NextResponse } from "next/server";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import guardRequest from "@/app/lib/helpers/guardRequest";
import validateGraphQuery from "@/app/lib/helpers/validateGraphQuery";
import { RATE_LIMIT_GRAPHQL } from "@/app/lib/constantes";

const serverGDNClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.GRAPH_NODE_URL_GDN,
  }),
  cache: new InMemoryCache(),
});

export async function POST(request: NextRequest) {
  try {
    const blocked = guardRequest(request, "graphql-gdn", RATE_LIMIT_GRAPHQL);
    if (blocked) return blocked;

    const { query, variables } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    const { error, document } = validateGraphQuery(query);
    if (error || !document) {
      return NextResponse.json(
        { error: error || "Query is not valid" },
        { status: 400 }
      );
    }

    const result = await serverGDNClient.query({
      query: document,
      variables: variables || {},
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error(error?.message);
    return NextResponse.json(
      { error: "GraphQL query failed" },
      { status: 500 }
    );
  }
}
