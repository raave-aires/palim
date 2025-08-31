'use client';

import { useEffect, useState } from 'react';
import { ExemploOcorrencia } from '@/components/pdfs/occurrencePdf';
import { SiteHeader } from '@/components/siteHeader';

export default function PDFViewerComponent() {
  const [isClient, setIsClient] = useState(false);
  const [PDFViewer, setPDFViewer] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Importar apenas no cliente
    import('@react-pdf/renderer').then((module) => {
      setPDFViewer(() => module.PDFViewer);
    });
  }, []);

  if (!isClient || !PDFViewer) {
    return (
      <>
        <SiteHeader />
        <main className="w-dvw flex flex-col h-main-container">
          <div className="flex-1 flex items-center justify-center">
            <p>Carregando visualizador PDF...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main className="w-dvw flex flex-col h-main-container">
        <div className="flex-1">
          <PDFViewer width="100%" height="100%" className="border-0">
            <ExemploOcorrencia />
          </PDFViewer>
        </div>
      </main>
    </>
  );
}