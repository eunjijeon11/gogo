"use client";
import React, { useState, ChangeEvent } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Button } from "@nextui-org/button";
import { runGoogleGenerativeAI } from "./runGoogleGenerativeAI";
import { useRecoilState } from "recoil";
import { resultState } from "@/components/recoil";
import { ResultType } from "@/types/result";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function AboutPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useRecoilState(resultState);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  const splitpdftoimage = (pdfFile: File): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const imagesList: string[] = [];
      reader.onload = async (e) => {
        try {
          const pdfData = new Uint8Array(e.target?.result as ArrayBuffer);
          const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
          const numPages = pdf.numPages;

          for (let i = 1; i <= numPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 1 });
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            if (context) {
              canvas.width = viewport.width;
              canvas.height = viewport.height;
              const renderContext = {
                canvasContext: context,
                viewport: viewport,
              };
              await page.render(renderContext).promise;
              const imageData = canvas.toDataURL("image/png").split(",")[1];
              imagesList.push(imageData);
            }
          }
          resolve(imagesList);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(pdfFile);
    });
  };

  const handleAnalysis = async () => {
    setLoading(true);
    if (file) {
      try {
        const imagesData = await splitpdftoimage(file);

        await runGoogleGenerativeAI(imagesData).then((value: any) => {
          const determine_dream = value["dream"];
          console.log(determine_dream);

          const list: ResultType[] = [];

          value["result"].forEach((value: unknown) => {
            list.push(value as ResultType);
          });
          console.log(list);
          setResult(list);

          // if (determine_dream == 0) {
          //   window.location.href = "/nodream";
          // } else if (determine_dream == 1) {
          //   window.location.href = "/dashboard";
          // }
        });
      } catch (error) {
        console.error("PDF 이미지 변환 중 오류 발생:", error);
      }
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-[calc(100vh-65px)]">
      {!loading && (
        <h1 className="text-4xl font-bold mt-8 mb-4">
          생활기록부를 업로드 하세요
        </h1>
      )}
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-lg font-semibold">분석 중...</p>
        </div>
      ) : (
        <div
          className="flex items-center justify-center"
          style={{ width: "120%", height: "80%" }}
        >
          <div
            className="border border-gray-300 rounded-lg"
            style={{
              width: "400px",
              height: "566px",
              display: loading ? "none" : "block",
            }}
          >
            {file ? (
              <Document file={file}>
                <Page pageNumber={1} width={400} height={600} />
              </Document>
            ) : (
              <p className="text-center p-4">
                PDF 미리보기가 여기에 표시됩니다
              </p>
            )}
          </div>
          <section className="ml-8">
            <input
              type="file"
              accept="application/pdf"
              onChange={onFileChange}
              className="mb-4"
              style={{ display: loading ? "none" : "block" }}
            />
            <Button
              onClick={handleAnalysis}
              style={{ display: loading ? "none" : "block" }}
            >
              분석하기
            </Button>
          </section>
        </div>
      )}
    </section>
  );
}
