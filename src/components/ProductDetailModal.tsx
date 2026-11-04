import React from 'react';
import { GolfPackage } from '../types/golf';
import { COMPANY_INFO } from '../data/golfData';
import {
  X,
  Calendar,
  Download,
  Building,
  Flag,
  CheckCircle2,
  AlertCircle,
  Clock,
  Car,
  MessageCircle,
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
  if (!packageData) return null;

  const handleDownloadPdf = () => {
    const link = document.createElement('a');
    link.href = COMPANY_INFO.pdfPath;
    link.download = packageData.downloadFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `[BGIT Thai 골프 패키지] ${packageData.title}\n가격: ${packageData.priceFormatted}\n호텔: ${packageData.hotel}\n문의 카카오톡: ${COMPANY_INFO.kakao}`
    );
    alert('상품 정보 및 문의 내용이 클립보드에 복사되었습니다.');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8 relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-stone-900 text-white flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1.5">
              <span>{packageData.categoryLabel}</span>
              <span>·</span>
              <span className="font-mono">{packageData.duration}</span>
              {packageData.isJoin && (
                <span className="px-2 py-0.5 bg-indigo-900/60 border border-indigo-400/30 text-indigo-200 rounded text-[10px]">
                  조인 라운드
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
              {packageData.title}
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
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-stone-700">
          {/* Price & Hotel Highlight Strip */}
          <div className="p-4 sm:p-5 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-stone-500 font-medium">1인 참가 요금 (3박 기준 / 2인 1실)</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 tabular-nums">
                {packageData.priceFormatted}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs sm:text-sm text-stone-600 border-t sm:border-t-0 sm:border-l border-stone-200 pt-3 sm:pt-0 sm:pl-5">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-emerald-700" />
                <div>
                  <p className="font-bold text-stone-900">{packageData.hotelGrade}</p>
                  <p className="text-xs text-stone-500">{packageData.hotel}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Course List */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
              <Flag className="w-4 h-4 text-emerald-700" />
              배정 골프장 (18홀 3회 라운드)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {packageData.courses.map((course, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs font-medium text-stone-800 flex items-center gap-2"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[11px]">
                    {idx + 1}
                  </span>
                  <span className="truncate">{course}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Inclusions */}
            <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200/80">
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                포함 사항
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {packageData.inclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-stone-400" />
                불포함 사항
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-600">
                {packageData.exclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-stone-400">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3박 5일 추천 표준 일정표 */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-700" />
              추천 3박 5일 표준 일정표
            </h3>
            <div className="space-y-2 text-xs border border-stone-200 rounded-xl overflow-hidden divide-y divide-stone-100">
              <div className="p-3 bg-stone-50 flex gap-3">
                <span className="font-bold text-stone-900 w-12 shrink-0">1일차</span>
                <span className="text-stone-600">방콕 수완나품 공항 도착 → BGIT 단독 전용 차량 & 전담 기사 미팅 → 호텔 이동 체크인 및 휴식</span>
              </div>
              <div className="p-3 bg-white flex gap-3">
                <span className="font-bold text-stone-900 w-12 shrink-0">2일차</span>
                <span className="text-stone-600">호텔 조식 후 골프장 이동 → 18홀 라운드 (1인 1캐디/카트) → 클럽하우스 중식 → 시내 마사지 및 석식 (단독차량 지원)</span>
              </div>
              <div className="p-3 bg-stone-50 flex gap-3">
                <span className="font-bold text-stone-900 w-12 shrink-0">3일차</span>
                <span className="text-stone-600">호텔 조식 → 2일차 18홀 라운드 → 자유시간 및 야시장/씨푸드 만찬 (오후 8시까지 단독차량 운행)</span>
              </div>
              <div className="p-3 bg-white flex gap-3">
                <span className="font-bold text-stone-900 w-12 shrink-0">4일차</span>
                <span className="text-stone-600">호텔 체크아웃 → 3일차 18홀 라운드 → 샤워 및 개별 정비 → 석식 후 공항 이동 및 수속</span>
              </div>
              <div className="p-3 bg-stone-50 flex gap-3">
                <span className="font-bold text-stone-900 w-12 shrink-0">5일차</span>
                <span className="text-stone-600">한국(인천/부산) 국제공항 도착</span>
              </div>
            </div>
          </div>

          {/* Vehicle & Care Notice */}
          <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
            <Car className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">BGIT 전용 차량 운행 및 현지 매니저 케어</p>
              <p className="text-[11px] text-amber-800 mt-0.5">
                차량 운행 시간은 저녁 식사를 마치는 오후 8시 전후이며, 태국 현지 골프 전문 매니저가 실시간 카카오톡으로 모든 일정을 컨트롤해 드립니다.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="px-3.5 py-2.5 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4 text-red-600" />
              <span>PDF 다운로드</span>
            </button>
            <button
              type="button"
              onClick={handleCopyLink}
              className="p-2.5 bg-white hover:bg-stone-100 text-stone-600 border border-stone-300 rounded-lg text-xs transition-colors"
              title="상품 정보 복사"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://line.me/ti/p/~${COMPANY_INFO.line}`}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2.5 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">라인 상담</span>
            </a>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenReservation(packageData.id);
              }}
              className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors shadow-xs"
            >
              <Calendar className="w-4 h-4" />
              <span>이 상품으로 즉시 견적/예약 신청</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
