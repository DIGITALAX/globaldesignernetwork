import { DocumentNode, parse } from "graphql";
import { MAX_GRAPH_QUERY_LENGTH } from "../constantes";

const validateGraphQuery = (
  query: unknown
): { error?: string; document?: DocumentNode } => {
  if (typeof query !== "string") {
    return { error: "Query must be a string" };
  }

  if (query.length > MAX_GRAPH_QUERY_LENGTH) {
    return { error: "Query is too long" };
  }

  if (/__schema\b|__type\b/.test(query)) {
    return { error: "Introspection is not allowed" };
  }

  let document: DocumentNode;
  try {
    document = parse(query);
  } catch (err: any) {
    return { error: "Query is not valid" };
  }

  const forbidden = document.definitions.some(
    (definition) =>
      definition.kind === "OperationDefinition" &&
      definition.operation !== "query"
  );

  if (forbidden) {
    return { error: "Only query operations are allowed" };
  }

  return { document };
};

export default validateGraphQuery;
