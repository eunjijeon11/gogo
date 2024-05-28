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

export async function runGoogleGenerativeAI(imagesData: string[]): Promise<void> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "고등학교 생활 기록부야. 해당 내용을 정리하고, 학생의 진로를 파악해줘. 희망분야라는 항목을 참고하면 될거야. 명확한 진로가 드러나있지 않은 생기부 인 것 같으면 제일 먼저 0을, 진로가 드러나는 것 같으면 1을 입력해줘. \
  1을 입력한 경우, 학생의 미래 진로, 주요활동 한가지, 그에 대한 추천 후속활동 한가지, 추천 독서 한권을 제공해줘.";
  
  const imageParts: Part[] = imagesData.map(data => base64ToGenerativePart(data, "image/png"));

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = await response.text();
  console.log(text);
}
