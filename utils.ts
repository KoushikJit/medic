import { Pinecone } from "@pinecone-database/pinecone";
import { FeatureExtractionPipeline, pipeline } from "@xenova/transformers";
import { modelname, namespace, topK } from "./app/config";
import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.HF_TOKEN)
export async function queryPineconeVectorStore(
  client: Pinecone,
  indexName: string,
  query: string
): Promise<string> {
  // const extractor = await pipeline("feature-extraction", modelname, {
  //   quantized: false,
  // });

  // const output = await extractor(query, {
  //   pooling: "cls",
  // });

  console.log(query)
  const apiOutput = await hf.featureExtraction({
    model: "mixedbread-ai/mxbai-embed-large-v1",
    inputs: query,
  });
  
  const queryEmbedding = Array.from(apiOutput);
  console.log("Querying database vector store...");
  const index = client.Index(indexName);
  let queryResponse = await index.namespace(namespace).query({
    topK: topK,
    vector: queryEmbedding as any,
    includeMetadata: true,
    includeValues: true,
  });

  if (queryResponse.matches.length > 0) {
    const concatenatedPageContent = queryResponse.matches
      .map((match,index) =>`\nClinical Finding ${index+1}: \n ${match.metadata?.chunk}`)
      .join(". \n\n");
    return concatenatedPageContent;
  } else {
    return "<nomatches>";
  }
}
