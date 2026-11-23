import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Download,
  ZoomIn,
  ZoomOut,
  ExternalLink,
  Loader2,
  FileText,
  Share2,
} from 'lucide-react';
import {
  PdfViewerPayload,
  closePdfViewer,
  fetchVerifiedPdfBytes,
  getBrowserEnvironment,
  subscribePdfViewer,
  triggerBlobDownload,
} from '../utils/pdfDownload';

interface PdfPageViewport {
  width: number;
  height: number;
}

interface PdfPageProxy {
  getViewport: (params: { scale: number }) => PdfPageViewport;
  render: (params: {
    canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;
    viewport: PdfPageViewport;
    transform?: number[];
  }) => { promise: Promise<void> };
}

interface PdfDocumentProxy {
  numPages: number;
  getPage: (pageNumber: number) => Promise<PdfPageProxy>;
}

interface PdfDocumentLoadingTask {
  promise: Promise<PdfDocumentProxy>;
  destroy: () => Promise<void>;
}

interface PdfJsRuntime {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (src: { data: Uint8Array }) => PdfDocumentLoadingTask;
}

let pdfJsPromise: Promise<PdfJsRuntime> | null = null;
function loadPdfJs(): Promise<PdfJsRuntime> {
  if (!pdfJsPromise) {
    const base = import.meta.env.BASE_URL || '/';
    const moduleUrl = `${base}assets/vendor/pdfjs/pdf.min.mjs`;
    pdfJsPromise = (import(/* @vite-ignore */ moduleUrl) as Promise<PdfJsRuntime>).then((lib) => {
      lib.GlobalWorkerOptions.workerSrc = `${base}assets/vendor/pdfjs/pdf.worker.min.mjs`;
      return lib;
    });
  }
  return pdfJsPromise;
}

export const PdfViewerModal: React.FC = () => {
  const [payload, setPayload] = useState<PdfViewerPayload | null>(null);
  const [cachedBytes, setCachedBytes] = useState<Uint8Array | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  const { isKakaoTalk, isInAppBrowser, isIos } = getBrowserEnvironment();

  useEffect(() => {
    return subscribePdfViewer((next) => {
      setPayload(next);
      if (next) {
        setZoom(1);
        setErrorMsg(null);
        setNumPages(0);
        if (next.pdfBytes) {
          setCachedBytes(next.pdfBytes);
        } else {
          setCachedBytes(null);
        }
      } else {
        setCachedBytes(null);
      }
    });
  }, []);

  // Close only this modal when Escape is pressed
  useEffect(() => {
    if (!payload) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopImmediatePropagation();
        closePdfViewer();
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [payload]);

  // Load PDF bytes if not already provided
  useEffect(() => {
    if (!payload) return;
    if (payload.pdfBytes) {
      setCachedBytes(payload.pdfBytes);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setErrorMsg(null);

    fetchVerifiedPdfBytes(payload.inlineUrl)
      .then((bytes) => {
        if (!cancelled) {
          setCachedBytes(bytes);
        }
      })
      .catch((err) => {
        console.error('Failed to load PDF in viewer:', err);
        if (!cancelled) {
          setErrorMsg('PDF 미리보기를 불러오지 못했습니다. 아래 버튼으로 원본을 직접 열어주세요.');
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [payload]);

  // Render PDF pages onto high-DPI canvases whenever bytes or zoom changes
  useEffect(() => {
    if (!payload || !cachedBytes || !canvasWrapperRef.current) return;

    let cancelled = false;
    let activeTask: PdfDocumentLoadingTask | null = null;
    const wrapper = canvasWrapperRef.current;

    const renderPdf = async () => {
      setIsLoading(true);
      setErrorMsg(null);

      try {
        const pdfjsLib = await loadPdfJs();
        if (cancelled) return;

        const dataCopy = new Uint8Array(cachedBytes.byteLength);
        dataCopy.set(cachedBytes);

        activeTask = pdfjsLib.getDocument({ data: dataCopy });
        const pdfDoc = await activeTask.promise;
        if (cancelled) return;

        setNumPages(pdfDoc.numPages);
        wrapper.innerHTML = '';

        const availableWidth = Math.max(
          280,
          Math.min((containerRef.current?.clientWidth || window.innerWidth) - 24, 860)
        );
        const dpr = Math.min(window.devicePixelRatio || 1, 2.5);

        for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
          if (cancelled) return;
          const page = await pdfDoc.getPage(pageNum);
          if (cancelled) return;

          const baseViewport = page.getViewport({ scale: 1 });
          const fitScale = (availableWidth / baseViewport.width) * zoom;
          const viewport = page.getViewport({ scale: fitScale });

          const pageCard = document.createElement('div');
          pageCard.className = 'bg-white shadow-xl rounded-sm overflow-hidden mx-auto';
          pageCard.style.width = `${Math.floor(viewport.width)}px`;

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = Math.floor(viewport.width * dpr);
          canvas.height = Math.floor(viewport.height * dpr);
          canvas.style.width = `${Math.floor(viewport.width)}px`;
          canvas.style.height = `${Math.floor(viewport.height)}px`;
          canvas.className = 'block';

          pageCard.appendChild(canvas);
          wrapper.appendChild(pageCard);

          if (context) {
            await page.render({
              canvas,
              canvasContext: context,
              viewport,
              transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined,
            }).promise;
          }
        }
      } catch (err) {
        if (!cancelled) {
          console.error('PDF render failed:', err);
          setErrorMsg('PDF 화면 렌더링에 실패했습니다. 아래 버튼으로 원본을 직접 열어주세요.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    renderPdf();

    return () => {
      cancelled = true;
      if (activeTask) {
        activeTask.destroy().catch(() => {});
      }
    };
  }, [payload, cachedBytes, zoom]);

  if (!payload) return null;

  const handleSaveClick = async () => {
    if (isInAppBrowser) {
      if (isIos && cachedBytes && typeof navigator !== 'undefined' && navigator.share) {
        try {
          const copy = new Uint8Array(cachedBytes.byteLength);
          copy.set(cachedBytes);
          const file = new File([copy.buffer], payload.title, {
            type: 'application/pdf',
          });
          if (!navigator.canShare || navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: payload.title,
            });
            return;
          }
        } catch (err) {
          if ((err as Error)?.name === 'AbortError') return;
        }
      }

      if (isIos) {
        window.location.assign(payload.inlineUrl);
        return;
      }

      const link = document.createElement('a');
      link.href = payload.attachmentUrl;
      link.download = payload.title;
      link.rel = 'noopener noreferrer';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    if (cachedBytes) {
      triggerBlobDownload(cachedBytes, payload.title);
    } else {
      const bytes = await fetchVerifiedPdfBytes(payload.attachmentUrl);
      triggerBlobDownload(bytes, payload.title);
    }
  };

  const externalOpenUrl = isKakaoTalk
    ? `kakaotalk://web/openExternal?url=${encodeURIComponent(payload.inlineUrl)}`
    : payload.inlineUrl;

  return (
    <div
      onClick={closePdfViewer}
      className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-xs flex flex-col animate-in fade-in duration-150"
    >
      {/* Top Viewer Toolbar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-stone-900 text-white px-3 sm:px-5 py-3 border-b border-stone-700/80 flex flex-wrap items-center justify-between gap-2 shrink-0"
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="px-1.5 py-0.5 text-[10px] font-black bg-red-600 text-white rounded shrink-0">
            PDF
          </span>
          <span className="text-xs sm:text-sm font-bold truncate">{payload.title}</span>
          {numPages > 0 && (
            <span className="text-[11px] text-stone-400 shrink-0 hidden sm:inline">
              ({numPages}페이지)
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Zoom Controls */}
          <div className="hidden sm:flex items-center bg-stone-800 rounded-lg border border-stone-700">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.6, Number((z - 0.2).toFixed(1))))}
              className="p-1.5 text-stone-300 hover:text-white cursor-pointer"
              aria-label="축소"
              title="축소"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono px-1.5 text-stone-300">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(2.2, Number((z + 0.2).toFixed(1))))}
              className="p-1.5 text-stone-300 hover:text-white cursor-pointer"
              aria-label="확대"
              title="확대"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleSaveClick}
            className="px-2.5 sm:px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {isInAppBrowser && isIos ? (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>저장 / 공유</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>원본 저장</span>
              </>
            )}
          </button>

          {isKakaoTalk && (
            <a
              href={externalOpenUrl}
              className="px-2.5 py-1.5 bg-stone-700 hover:bg-stone-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">외부 브라우저</span>
            </a>
          )}

          <button
            type="button"
            onClick={closePdfViewer}
            className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="PDF 뷰어 닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scrollable PDF Pages Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-3 sm:p-6 flex flex-col items-center gap-4"
      >
        {isLoading && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="my-auto flex flex-col items-center gap-2.5 text-white bg-stone-900/90 px-6 py-5 rounded-2xl shadow-xl"
          >
            <Loader2 className="w-7 h-7 animate-spin text-emerald-400" />
            <span className="text-sm font-semibold">PDF 문서를 여는 중입니다...</span>
          </div>
        )}

        {errorMsg && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="my-auto max-w-sm bg-white text-stone-800 p-6 rounded-2xl shadow-xl text-center space-y-3"
          >
            <FileText className="w-9 h-9 text-red-600 mx-auto" />
            <p className="text-sm font-semibold leading-relaxed">{errorMsg}</p>
            <div className="flex flex-col gap-2 pt-1">
              <a
                href={payload.inlineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <ExternalLink className="w-4 h-4" />
                <span>원본 PDF 직접 열기</span>
              </a>
              {isKakaoTalk && (
                <a
                  href={externalOpenUrl}
                  className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>외부 브라우저로 열기</span>
                </a>
              )}
            </div>
          </div>
        )}

        <div
          ref={canvasWrapperRef}
          onClick={(e) => e.stopPropagation()}
          className="space-y-4 w-full flex flex-col items-center"
        />
      </div>
    </div>
  );
};
