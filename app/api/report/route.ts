import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request, res: Response) {
  console.log("report");
  const { base64 } = await req.json();
  const imageParts = filesArrayToGenerativeParts([base64]);
  const prompt = `Utilize the provided image of a medical report, which contains labeled values representing biomarkers or clinical markers identified in diagnostic tests. Extract these values along with their corresponding biomarker labels and reference ranges if present. Also extract other details like report name, patient name, date etc. If the report contains any other text, then extract that too.`;
  const promptWithParts = [prompt, ...imageParts];


  //gen ai 
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
  const model = genAI.getGenerativeModel({
    model: "gemini-pro-vision",
  });
  const result = await model.generateContent(promptWithParts);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return new Response(text, { status: 200 });
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
