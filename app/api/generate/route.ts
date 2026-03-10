import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");
const MODEL_ID = "gemini-2.0-flash-exp-image-generation";

export async function POST(req: NextRequest) {
  try {
    const { prompt, history, currentImage } = await req.json();

    const model = genAI.getGenerativeModel({ model: MODEL_ID });

    // Construct prompt based on context
    let payload: any[] = [prompt];

    if (currentImage) {
      // For editing/refinement
      const base64Data = currentImage.split(',')[1];
      payload.push({
        inlineData: {
          data: base64Data,
          mimeType: "image/png"
        }
      });
      payload.unshift("Refer to the attached image and the following instructions to generate a new modified version:");
    }

    const result = await model.generateContent(payload);
    const response = await result.response;
    
    // Extract image data - assuming SDK returns candidates with image blocks
    // Note: Structure varies by model version; handling standard blob return
    const candidates = response.candidates || [];
    const imagePart = candidates[0]?.content?.parts?.find((p: any) => p.inlineData);

    if (!imagePart) {
      return NextResponse.json({ error: "No image generated" }, { status: 500 });
    }

    return NextResponse.json({
      b64: imagePart.inlineData.data,
      mimeType: imagePart.inlineData.mimeType
    });

  } catch (error: any) {
    console.error("Generation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
