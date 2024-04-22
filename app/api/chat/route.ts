import { indexName } from "@/app/config";
import { queryPineconeVectorStore } from "@/utils";
import { Pinecone } from "@pinecone-database/pinecone";
import {
  GoogleGenerativeAIStream,
  Message,
  OpenAIStream,
  StreamingTextResponse,
} from "ai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request, res: Response) {
  const reqBody = await req.json();
  const reportData: string = reqBody.data.reportData;
  const messages: Message[] = reqBody.messages;

  const question = `${messages[messages.length - 1].content}`;
  const query = `Represent this for searching relevant passages: patient medical report says: \n${reportData}. \n\nAre these within normal ranges? \n\n${question}`;

  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY ?? "",
  });
  const retrievals = await queryPineconeVectorStore(pinecone, indexName, query);
  const finalPrompt = `Use the following pieces of context to identify biomarkers in the medical report which are not within corresponding reference ranges. 
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

  // const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
  // const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  // const streamingResponse = await model.generateContentStream(finalPrompt);

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    max_tokens: 2000,
    stream: true,
    messages: [
      {
        "role": "user",
        "content": finalPrompt
      }
    ]
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
