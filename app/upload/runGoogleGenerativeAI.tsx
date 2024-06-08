import { GoogleGenerativeAI, Part } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDXnUHVCino5SBwXmEd7YKzeAqHkaGx1KA");

function base64ToGenerativePart(base64Data: string, mimeType: string): Part {
  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
}

function getFirstElement(jsonObj: any) {
  const keys = Object.keys(jsonObj);
  const firstKey = keys[0];
  return jsonObj[firstKey];
}

async function fetchPromptText(): Promise<string> {
  const response = await fetch("/prompt.txt");
  if (!response.ok) {
    throw new Error("프롬프트 텍스트를 가져오는 데 실패했습니다.");
  }
  return await response.text();
}

export async function runGoogleGenerativeAI(
  imagesData: string[]
): Promise<JSON> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  const prompt = await fetchPromptText();

  const imageParts: Part[] = imagesData.map((data) =>
    base64ToGenerativePart(data, "image/png")
  );

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = result.response;
  const text = response.text();
  console.log(text);

  let cleanedText = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
  return JSON.parse(cleanedText); //json 형식으로 변환
}
