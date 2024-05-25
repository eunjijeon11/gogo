'use client';

import React, { useState, ChangeEvent } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function AboutPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfSize, setPdfSize] = useState<{ width: number; height: number } | null>(null);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold mb-8">생활기록부를 업로드 해 주세요</h1>
      <div className="border border-gray-300 rounded-lg mb-8" style={{ width: '400px', height: '600px' }}>

		
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
      <input type="file" accept="application/pdf" onChange={onFileChange} className="mb-8" />
      <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
        분석하기
      </button>
    </section>
  );
}
