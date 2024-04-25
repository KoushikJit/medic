import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request, res: Response) {
  console.log("report");
  const { base64 } = await req.json();
  const imageParts = filesArrayToGenerativeParts([base64]);
  const prompt = `Attached is an image of a clinical report. 
  Go over the the clinical report and identify biomarkers that show slight or large abnormalities. Then summarize in 100 words. Do not output patient name, date etc. Output only the summary text.
  ## Summary: `;
  const promptWithParts = [prompt, ...imageParts];

  // //gen ai
  // const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
  // const model = genAI.getGenerativeModel({
  //   model: "gemini-pro-vision",
  // });
  // const result = await model.generateContent(promptWithParts);
  // const response = await result.response;
  // const text = response.text();
  // console.log(text);

  // ////////////////////////
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    max_tokens: 2000,
    // stream: true,
    messages: [
      {
        role: "user",
        // content: prompt,
        content: [
          { type: "text", text: prompt },
          {
            type: "image_url",
            image_url: {
              url: base64,
            },
          },
        ],
      },
    ],
  });
  // {
  //   "type": "image_url",
  //   "image_url":
  //   {
  //         "url": "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAA…"
  //       }
  //   }
  return new Response(JSON.stringify(response), { status: 200 });
}

function filesArrayToGenerativeParts(images: string[]) {
  return images.map((imageData) => ({
    inlineData: {
      data: imageData.split(",")[1],
      mimeType: imageData.substring(
        imageData.indexOf(":") + 1,
        imageData.lastIndexOf(";")
      ),
    },
  }));
}
