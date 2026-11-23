export interface PdfViewerPayload {
  title: string;
  inlineUrl: string;
  attachmentUrl: string;
  pdfBytes?: Uint8Array;
}

type PdfViewerListener = (payload: PdfViewerPayload | null) => void;

const listeners = new Set<PdfViewerListener>();
let currentPayload: PdfViewerPayload | null = null;

export function subscribePdfViewer(listener: PdfViewerListener): () => void {
  listeners.add(listener);
  listener(currentPayload);
  return () => {
    listeners.delete(listener);
  };
}

export function openPdfViewer(payload: PdfViewerPayload): void {
  currentPayload = payload;
  listeners.forEach((listener) => listener(currentPayload));
}

export function closePdfViewer(): void {
  currentPayload = null;
  listeners.forEach((listener) => listener(null));
}

export function getBrowserEnvironment() {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const isKakaoTalk = /KAKAOTALK/i.test(ua);
  const isInAppBrowser =
    /KAKAOTALK|NAVER|LINE|FBAN|FBAV|Instagram|DaumApps|;\s*wv\)/i.test(ua);
  const isIos =
    /iPhone|iPad|iPod/i.test(ua) ||
    (typeof navigator !== 'undefined' &&
      navigator.platform === 'MacIntel' &&
      navigator.maxTouchPoints > 1);
  return { ua, isKakaoTalk, isInAppBrowser, isIos };
}

export async function fetchVerifiedPdfBytes(url: string): Promise<Uint8Array> {
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const buffer = await response.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  let hasPdfMagic = false;
  const scanLimit = Math.min(bytes.length - 4, 16);
  for (let i = 0; i <= scanLimit; i++) {
    if (
      bytes[i] === 0x25 && // %
      bytes[i + 1] === 0x50 && // P
      bytes[i + 2] === 0x44 && // D
      bytes[i + 3] === 0x46 // F
    ) {
      hasPdfMagic = true;
      break;
    }
  }

  if (!hasPdfMagic) {
    throw new Error('Fetched content is not a valid PDF document');
  }

  return bytes;
}

export function triggerBlobDownload(bytes: Uint8Array, safeFilename: string): void {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  const blob = new Blob([copy.buffer], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = safeFilename;
  link.rel = 'noopener noreferrer';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.setTimeout(() => {
    URL.revokeObjectURL(blobUrl);
  }, 60_000);
}

/**
 * Triggers the original PDF download AND opens the in-page PDF Viewer modal
 * immediately so users in KakaoTalk (Android & iOS), mobile browsers, and
 * desktop browsers both download the file and view the PDF right away.
 */
export async function downloadOriginalPdf(
  pdfPath: string,
  filename: string
): Promise<boolean> {
  const safeFilename = filename.toLowerCase().endsWith('.pdf')
    ? filename
    : `${filename}.pdf`;

  const storedFilename = (pdfPath.split('/').pop() || 'aaaaa_1003ed43.pdf').split('?')[0];
  const { isInAppBrowser, isIos } = getBrowserEnvironment();

  const attachmentUrl = new URL(
    `/api/pdf/${encodeURIComponent(storedFilename)}?name=${encodeURIComponent(
      safeFilename
    )}&mode=attachment`,
    window.location.origin
  ).toString();

  const inlineUrl = new URL(
    `/api/pdf/${encodeURIComponent(storedFilename)}?name=${encodeURIComponent(
      safeFilename
    )}&mode=inline`,
    window.location.origin
  ).toString();

  // Immediately open the PDF viewer modal so the user sees the PDF opening right away
  openPdfViewer({
    title: safeFilename,
    inlineUrl,
    attachmentUrl,
  });

  // In-app browsers (KakaoTalk, LINE, Naver, etc.):
  // Avoid blob: URLs for file download; use the real HTTPS /api/pdf endpoint on Android.
  if (isInAppBrowser) {
    if (!isIos) {
      const link = document.createElement('a');
      link.href = attachmentUrl;
      link.download = safeFilename;
      link.rel = 'noopener noreferrer';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    return true;
  }

  // Standard browsers & AI Studio iframe: fetch verified %PDF bytes once for both download and instant render
  try {
    const bytes = await fetchVerifiedPdfBytes(attachmentUrl);
    triggerBlobDownload(bytes, safeFilename);
    openPdfViewer({
      title: safeFilename,
      inlineUrl,
      attachmentUrl,
      pdfBytes: bytes,
    });
    return true;
  } catch (err) {
    console.error('Original PDF fetch failed:', err);
    return false;
  }
}
