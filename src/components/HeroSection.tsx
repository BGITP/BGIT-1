import React from 'react';
import { COMPANY_INFO } from '../data/golfData';
import { FileDown, Calendar, ShieldCheck, Car, Users, Sparkles, Eye } from 'lucide-react';

interface HeroSectionProps {
  onOpenReservation: () => void;
  onViewPdfMode: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenReservation,
  onViewPdfMode,
}) => {
  return (
    <section className="relative bg-white text-stone-900 border-b border-stone-200 overflow-hidden">
      {/* Background Subtle Luxury Light Pattern */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-50 pointer-events-none" />

      {/* Hero Content Container (Focused Element: div:nth-of-type(2)) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div className="max-w-4xl">
          {/* Announcement Banner Box */}
          <div className="mb-5 inline-block">
            <span className="px-3.5 py-1.5 bg-amber-50 border border-amber-300/80 rounded-lg text-xs sm:text-sm font-bold text-amber-900 shadow-2xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              <span>{COMPANY_INFO.announcement}</span>
            </span>
          </div>

          {/* Dominant Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight sm:leading-tight mb-5 text-balance">
            태국 골프 투어의 기준,<br />
            <span className="text-emerald-800">BGIT Thai</span>가 함께합니다
          </h1>

          {/* Concrete Description */}
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-8 max-w-2xl">
            방콕 · 파타야 3색 골프 상품부터 프라이빗 풀빌라까지!
            어느 여행사보다 최고품질의 최저가 골프 상품을 한국 여행사와 골퍼분들께 직영 공급합니다.
            단독 전용 차량과 현지 전문 매니저의 실시간 케어로 대접받는 프리미엄 라운드를 경험하세요.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <button
              type="button"
              onClick={onOpenReservation}
              className="px-6 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>실시간 예약 및 견적 신청</span>
            </button>

            <a
              href={COMPANY_INFO.pdfPath}
              download="BGIT_태국골프안내서_2026.pdf"
              className="px-5 py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 font-semibold rounded-lg transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-emerald-800" />
              <span>PDF 안내서 다운로드</span>
            </a>

            <button
              type="button"
              onClick={onViewPdfMode}
              className="px-4 py-3.5 bg-white hover:bg-stone-50 text-stone-700 border border-stone-300 font-medium rounded-lg transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <Eye className="w-4 h-4 text-stone-500" />
              <span>PDF 양식 원본 보기</span>
            </button>
          </div>
        </div>

        {/* 4 Feature Badges Strip (White Theme) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-8 mt-4 border-t border-stone-200">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/80">
            <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0" />
            <div>
              <p className="text-xs text-stone-500 font-medium">현지 직영 최저가</p>
              <p className="text-sm font-bold text-stone-900">최고품질 보장</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/80">
            <Car className="w-5 h-5 text-emerald-800 shrink-0" />
            <div>
              <p className="text-xs text-stone-500 font-medium">전 일정</p>
              <p className="text-sm font-bold text-stone-900">단독 전용차량</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/80">
            <Users className="w-5 h-5 text-emerald-800 shrink-0" />
            <div>
              <p className="text-xs text-stone-500 font-medium">그린피+카트+캐디피</p>
              <p className="text-sm font-bold text-stone-900">18홀 3회 포함</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/80">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
            <div>
              <p className="text-xs text-stone-500 font-medium">태국 현지 매니저</p>
              <p className="text-sm font-bold text-stone-900">실시간 카톡 케어</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
