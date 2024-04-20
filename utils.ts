import { Pinecone } from "@pinecone-database/pinecone";
import { FeatureExtractionPipeline, pipeline } from "@xenova/transformers";
import { modelname, namespace, topK } from "./app/config";

export async function queryPineconeVectorStore(
  client: Pinecone,
  indexName: string,
  question: string
): Promise<string> {
  const extractor = await pipeline("feature-extraction", modelname, {
    quantized: false,
  });

  const output = await extractor(question, {
    pooling: "cls",
  });
  const queryEmbedding = Array.from(output.data);
  console.log(queryEmbedding);
  console.log("Querying database vector store...");
  const index = client.Index(indexName);
  let queryResponse = await index.namespace(namespace).query({
    topK: topK,
    vector: queryEmbedding,
    includeMetadata: true,
    includeValues: true,
  });

  if (queryResponse.matches.length > 0) {
    const concatenatedPageContent = queryResponse.matches
      .map((match) => match.metadata?.chunk)
      .join(". \n\n");
    return concatenatedPageContent;
  } else {
    return "<nomatches>";
  }
}
