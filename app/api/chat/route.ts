import { indexName } from "@/app/config";
import { queryPineconeVectorStore } from "@/utils";
import { Pinecone } from "@pinecone-database/pinecone";

import {
  GoogleGenerativeAIStream,
  Message,
  OpenAIStream,
  StreamData,
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

  // const shortSummary = "Represent this for searching relevant passages: patient medical report says: "+extractShortSummart(reportData);
  const query = `Represent this for searching relevant passages: patient medical report says: \n${reportData}. \n\n${question}`;

  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY ?? "",
  });
  const retrievals = await queryPineconeVectorStore(pinecone, indexName, query);
  // const retrievals = "NO Additional Context Found"
  const finalPrompt0 = `Here is a summary of a patient's clinical report, and a user query. Some generic clinical findings are also provided that may or may not be relevant for the report.
  Go through the clinical report and answer the user query.
  Ensure the response is factually accurate, and demonstrates a thorough understanding of the query topic and the clinical report.
  Before answering you may enrich your knowledge by going through the provided clinical findings. 
  The clinical findings are generic insights and not part of the patient's medical report. Do not include any clinical finding if it is not relevant for the patient's case.
  `;

  const finalPrompt1 = `\n\n**Patient's Clinical report summary:** \n${reportData}. 
  \n**end of patient's clinical report** 

  \n\n**User Query:**\n${question}?
  \n**end of user query** 

  \n\n**Generic Clinical findings:**
  \n\n${retrievals}. 
  \n\n**end of generic clinical findings** 

  \n\nProvide thorough justification for your answer.
  \n\n**Answer:**`;

  const finalPrompt = finalPrompt0 + finalPrompt1;
  // const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
  // const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  // const streamingResponse = await model.generateContentStream(finalPrompt);

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    max_tokens: 2000,
    stream: true,
    messages: [
      {
        role: "user",
        content: finalPrompt,
      },
    ],
  });

  // Instantiate the data
  const data = new StreamData();
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response, {
    onFinal: (message) => {
      data.append({
        finalPrompt,
      });
      data.close(); // Make sure you close the data stream
    },
  });
  return new StreamingTextResponse(stream, {}, data);
}

function extractShortSummart(inputString: string | null) {
  if (inputString === null) {
    return inputString;
  }
  // Find the index of the first '{' and last '}'
  const startIndex = inputString.indexOf("Short Summary:");

  // Check if both '{' and '}' are found
  if (startIndex === -1) {
    return inputString; // Return null if either '{' or '}' is not found or if they're in the wrong order
  }

  // Extract the substring between the first '{' and last '}'
  const shortSummary = inputString.substring(startIndex+14).trim();
  return shortSummary;
}
