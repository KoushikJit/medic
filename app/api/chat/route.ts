
import { indexName } from "@/app/config";
import { queryPineconeVectorStore } from "@/utils";
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request, res: Response) {
  const reqBody = await req.json();
  const reportData: string = reqBody.data.reportData;
  const messages: Message[] = reqBody.messages;

  const question = `${messages[messages.length-1].content}`
  const query = `Represent this for searching relevant passages: patient medical report says: \n${reportData}. \n\nAre these within normal ranges? \n\n${question}`
  
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY ?? "",
  });
  const retrievals = await queryPineconeVectorStore(pinecone, indexName, query)
  const finalPrompt = 
  `Use the following pieces of context to identify biomarkers in the medical report which are not within corresponding reference ranges. 
  The reference ranges are often defined like [low-high]. Next, provide answers about the medical report. Think step by step.
  The contextual information is presented in order with the most relevant context given first. It may so happen that some or all of the context are irrelevant for the case. 
  \n\n## Patient report: \n${reportData}. 
  \n**end of patient report** 
  \n\n## Contexts: 
  \n\n${retrievals}. 
  \n\n**end of contexts** 
  \n\n## Question: ${question}? 
  \n\n## Answer:`;
  console.log(finalPrompt);

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const streamingResponse = await model.generateContentStream(finalPrompt);
  return new StreamingTextResponse(GoogleGenerativeAIStream(streamingResponse));
}