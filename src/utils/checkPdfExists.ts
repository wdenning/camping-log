// Utility to check if a PDF exists in the public/files folder
export async function checkPdfExists(pdfFileName: string): Promise<boolean> {
  try {
    const response = await fetch(`/camping-log/files/${pdfFileName}`);
    return response.ok;
  } catch {
    return false;
  }
}
