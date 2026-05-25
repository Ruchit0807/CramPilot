/**
 * Extracts text from a File object containing a PDF.
 * This runs entirely on the client side.
 */
export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    // Dynamically import to avoid Next.js SSR 'canvas' and 'fs' errors
    const pdfjsLib = await import('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    
    // Extract text from all pages
    const numPages = pdf.numPages;
    // Limit to first 20 pages to avoid performance issues on massive PDFs
    const maxPages = Math.min(numPages, 20);
    
    for (let i = 1; i <= maxPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      
      fullText += `\n--- Page ${i} ---\n` + pageText;
    }
    
    return fullText.trim();
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    return `[Failed to extract text: ${error instanceof Error ? error.message : 'Unknown error'}]`;
  }
}
