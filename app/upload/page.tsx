'use client';
import React, { useState, ChangeEvent } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {Button, ButtonGroup} from "@nextui-org/button";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function AboutPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfSize, setPdfSize] = useState<{ width: number; height: number } | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // 분석 중인지 여부를 나타내는 상태

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleAnalysis = () => {
    setLoading(true); // 분석을 시작하면 로딩 상태를 true로 설정
    // 여기서 분석 작업을 수행하고 완료 후 setLoading(false)로 상태 변경
    // 예를 들어, setTimeout을 사용하여 가상의 분석 시간을 나타내는 경우:
    // setTimeout(() => {
    //   setLoading(false);
    // }, 2000); // 2초 후 로딩 상태를 false로 변경
  };

  return (
	<section className="flex flex-col items-center justify-center h-screen">
	  {!loading && ( // 분석 중이 아닐 때만 메시지 표시
		<h1 className="text-4xl font-bold mt-8 mb-4">생활기록부를 업로드 하세요</h1>
	  )}
	  {loading ? ( // 분석 중일 때
		<div className="flex items-center justify-center w-full h-full">
		  <p className="text-lg font-semibold">분석 중...</p>
		</div>
	  ) : (
		  <div className="flex items-center justify-center" style={{ width: '120%', height: '80%' }}>
		  <div className="border border-gray-300 rounded-lg" style={{ width: '400px', height: '566px', display: loading ? 'none' : 'block' }}>
			{/* 분석 중이 아닐 때만 파일 미리보기와 파일 업로드 버튼 표시 */}
			{file ? (
			  <Document
				file={file}
			  >
				<Page
				  pageNumber={1}
				  width={400}
				  height={600}
				/>
			  </Document>
			) : (
			  <p className="text-center p-4">PDF 미리보기가 여기에 표시됩니다</p>
			)}
		  </div>
		  <section className="ml-4">
			<input type="file" accept="application/pdf" onChange={onFileChange} className="mb-4" style={{ display: loading ? 'none' : 'block' }} />
			<Button onClick={handleAnalysis} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" style={{ display: loading ? 'none' : 'block' }}>
			  분석하기
			</Button>
		  </section>
		</div>
	  )}
	</section>
  );
  
  
}
