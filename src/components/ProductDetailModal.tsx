import React from 'react';
import { GolfPackage } from '../types/golf';
import { COMPANY_INFO } from '../data/golfData';
import { downloadOriginalPdf } from '../utils/pdfDownload';
import {
  X,
  Check,
  Download,
  Building,
  Flag,
  Clock,
  Headphones,
  Share2,
} from 'lucide-react';

interface ProductDetailModalProps {
  packageData: GolfPackage | null;
  onClose: () => void;
  onOpenReservation: (packageId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  packageData,
  onClose,
  onOpenReservation,
}) => {
  const [copied, setCopied] = React.useState(false);
  const [isDownloading, setIsDownloading] = React.useState(false);

  React.useEffect(() => {
    if (!packageData) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [packageData, onClose]);

  if (!packageData) return null;

  const isGolftel =
    packageData.category === 'pattaya-golftel' ||
    packageData.title.includes('골프텔') ||
    packageData.hotelGrade?.includes('골프텔') ||
    Boolean(packageData.categoryLabel?.includes('골프텔'));

  const handleDownloadPdf = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      await downloadOriginalPdf(
        packageData.pdfPath || COMPANY_INFO.pdfPath,
        packageData.downloadFilename
      );
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `[BGIT Thai 골프 패키지] ${packageData.title}\n가격: ${packageData.priceFormatted}\n호텔: ${packageData.hotel}\n문의 카카오톡: ${COMPANY_INFO.kakao}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl outline-none overflow-hidden my-8 relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-stone-900 text-white flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
              {packageData.title.replace(/^[\d,]+원\s+/, '')}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors shrink-0"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm sm:text-[15px] text-stone-700">
          {/* Price & Hotel Highlight Strip */}
          <div className="p-4 sm:p-5 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-black font-medium">1인당 요금</p>
              <p className="text-[26px] sm:text-[32px] font-extrabold text-stone-900 tabular-nums mt-0.5 leading-tight">
                {packageData.priceFormatted}
              </p>
              <p className="text-xs sm:text-sm text-emerald-700 font-semibold mt-1">
                한국입금 - 네이버환율 적용
              </p>
            </div>

            <div className="flex items-center gap-4 text-sm sm:text-[15px] text-stone-600 border-t sm:border-t-0 sm:border-l border-stone-200 pt-3 sm:pt-0 sm:pl-5">
              <div className="flex items-center gap-2.5">
                <Building className="w-4.5 h-4.5 text-emerald-700 shrink-0" />
                <div>
                  <p className="text-[15px] sm:text-base font-bold text-stone-900">{packageData.hotelGrade}</p>
                  <p className="text-sm text-stone-600 mt-0.5">{packageData.hotel}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Course List */}
          <div>
            <h3 className="text-sm sm:text-[15px] font-bold tracking-wider text-stone-600 mb-3 flex items-center gap-1.5">
              <Flag className="w-4.5 h-4.5 text-emerald-700" />
              배정 골프장 (18홀 3회 라운드)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {packageData.courses.map((course, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-stone-50 rounded-lg border border-stone-200 text-sm sm:text-[15px] font-semibold text-stone-800 flex items-center gap-2.5"
                >
                  <span
                    className="w-2 h-2 rounded-full bg-emerald-600 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="truncate">{course}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Inclusions */}
            <div className="p-4 sm:p-5 bg-emerald-50/30 rounded-xl border border-stone-200 hover:border-[#d0fae5] transition-colors">
              <h4 className="text-sm sm:text-[15px] font-bold text-emerald-900 tracking-wider mb-3 flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5 shrink-0"
                  aria-hidden="true"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="7"
                    className="fill-emerald-100 stroke-emerald-200"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M7.5 12.5l3 3 6-6.5"
                    className="stroke-emerald-700"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>포함 사항</span>
              </h4>
              <ul className="space-y-2.5 text-sm sm:text-[15px] leading-relaxed text-stone-700">
                {packageData.inclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span
                      className="w-4.5 h-4.5 rounded-md bg-emerald-100/90 border border-emerald-200/80 text-emerald-700 flex items-center justify-center shrink-0 mt-[3px]"
                      aria-hidden="true"
                    >
                      <Check className="w-3 h-3 stroke-[2.6]" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div className="p-4 sm:p-5 bg-stone-50 rounded-xl border border-stone-200 hover:border-[#d0fae5] transition-colors">
              <h4 className="text-sm sm:text-[15px] font-bold text-stone-800 tracking-wider mb-3 flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5 shrink-0"
                  aria-hidden="true"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="7"
                    className="fill-rose-100 stroke-rose-200"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M9 9l6 6M15 9l-6 6"
                    className="stroke-rose-600"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>불포함 사항</span>
              </h4>
              <ul className="space-y-2.5 text-sm sm:text-[15px] leading-relaxed text-stone-600">
                {packageData.exclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span
                      className="w-4.5 h-4.5 rounded-md bg-rose-100/80 border border-rose-200/70 text-rose-500 flex items-center justify-center shrink-0 mt-[3px]"
                      aria-hidden="true"
                    >
                      <X className="w-3 h-3 stroke-[2.5]" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3박 5일 추천 표준 일정표 (골프텔 상품인 경우 삭제) */}
          {!isGolftel && (
            <div>
              <h3 className="text-sm sm:text-[15px] font-bold tracking-wider text-stone-600 mb-3 flex items-center gap-1.5">
                <Clock className="w-4.5 h-4.5 text-emerald-700" />
                추천 3박 5일 표준 일정표
              </h3>
              <div className="text-sm sm:text-[15px] leading-relaxed border border-stone-200 rounded-xl overflow-hidden divide-y divide-stone-100">
                <div className="p-3.5 bg-stone-50 flex gap-3">
                  <span className="font-bold text-stone-900 w-14 shrink-0">1일차</span>
                  <span className="text-stone-600">방콕 수완나품 공항 도착 → BGIT 단독 전용 차량 & 전담 기사 미팅 → 호텔 이동 체크인 및 휴식</span>
                </div>
                <div className="p-3.5 bg-white flex gap-3">
                  <span className="font-bold text-stone-900 w-14 shrink-0">2일차</span>
                  <span className="text-stone-600">호텔 조식 후 골프장 이동 → 18홀 라운드 (1인 1캐디/카트) → 클럽하우스 중식 → 시내 마사지 및 석식 (단독차량 지원)</span>
                </div>
                <div className="p-3.5 bg-stone-50 flex gap-3">
                  <span className="font-bold text-stone-900 w-14 shrink-0">3일차</span>
                  <span className="text-stone-600">호텔 조식 → 2일차 18홀 라운드 → 자유시간 및 야시장/씨푸드 만찬 (오후 8시까지 단독차량 운행)</span>
                </div>
                <div className="p-3.5 bg-white flex gap-3">
                  <span className="font-bold text-stone-900 w-14 shrink-0">4일차</span>
                  <span className="text-stone-600">호텔 체크아웃 → 3일차 18홀 라운드 → 샤워 및 개별 정비 → 석식 후 공항 이동 및 수속</span>
                </div>
                <div className="p-3.5 bg-stone-50 flex gap-3">
                  <span className="font-bold text-stone-900 w-14 shrink-0">5일차</span>
                  <span className="text-stone-600">한국(인천/부산) 국제공항 도착</span>
                </div>
              </div>
            </div>
          )}

          {/* Vehicle & Care Notice */}
          <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl text-sm sm:text-[15px] text-black flex items-start gap-2.5">
            <Headphones className="w-4.5 h-4.5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-black">BGIT 현지 매니저 24시간 케어</p>
              <p className="text-xs sm:text-sm text-black mt-1 leading-relaxed">
                태국 현지 골프 전문 매니저가 실시간 소통으로 모든 일정을 컨트롤해 드립니다.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isDownloading}
              onClick={handleDownloadPdf}
              className="px-3.5 py-2.5 bg-white hover:bg-stone-100 disabled:opacity-60 text-stone-700 border border-stone-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-red-600" />
              <span>{isDownloading ? '다운로드 중...' : 'PDF 다운로드'}</span>
            </button>
            <button
              type="button"
              onClick={handleCopyLink}
              className="p-2.5 bg-white hover:bg-stone-100 text-stone-600 border border-stone-300 rounded-lg text-xs transition-colors flex items-center gap-1"
              title="상품 정보 복사"
            >
              <Share2 className="w-4 h-4" />
              {copied && <span className="text-[11px] font-bold text-emerald-700">복사완료!</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
