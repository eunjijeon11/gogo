import { GoogleGenerativeAI, Part } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBqP7gRKSVDguyjmngybYG6LXeB2b_eSRo");

function base64ToGenerativePart(base64Data: string, mimeType: string): Part {
  return {
    inlineData: {
      data: base64Data,
      mimeType
    },
  };
}


async function fetchPromptText(): Promise<string> {
  const response = await fetch('/prompt.txt');
  if (!response.ok) {
    throw new Error('프롬프트 텍스트를 가져오는 데 실패했습니다.');
  }
  return await response.text();
}
export async function runGoogleGenerativeAI(imagesData: string[]): Promise<void> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  const prompt = await fetchPromptText(); 

  const imageParts: Part[] = imagesData.map(data => base64ToGenerativePart(data, "image/png"));

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = await response.text();
  console.log(text);
 
  if (text.charAt(0) === '0') {
    window.location.href = '/nodream';
  } else if (text.charAt(0) === '1') {
    //window.location.href = '/dashboard';
  }

}
