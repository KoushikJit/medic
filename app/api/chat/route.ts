
import { indexName } from "@/app/config";
import { queryPineconeVectorStore } from "@/utils";
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request, res: Response) {
  const reqBody = await req.json();
  const reportData: string = reqBody.data.reportData;
  const messages: Message[] = reqBody.messages;

  const prompt1 = `Medical Report: ${reportData} \n\nQuestion: ${messages[messages.length-1].content}`
  
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY ?? "",
  });
  const retrievals = await queryPineconeVectorStore(pinecone, indexName, prompt1)
  console.log(retrievals)
  const finalPrompt = `Use the following pieces of context to provide suggestive answers about the medical report. Some context might be irrelevant.\n\nContext: ${retrievals} \n\n${prompt1} \n\nAnswer:`;
  console.log(finalPrompt);

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const streamingResponse = await model.generateContentStream(finalPrompt);
  return new StreamingTextResponse(GoogleGenerativeAIStream(streamingResponse));
}