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
    <section className="relative bg-stone-900 text-white overflow-hidden">
      {/* Background Hero Image with measured scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_thai_golf_1793758201354.jpg"
          alt="태국 챔피언십 골프 코스"
          className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/70 to-stone-950/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-3xl">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3 mb-5">
            <img
              src={COMPANY_INFO.logoShield}
              alt="BGIT Thai Shield Emblem"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-xl"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide text-emerald-400">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/70 border border-emerald-500/30 rounded-full">
                  <Sparkles className="w-3.5 h-3.5" />
                  태국 현지 직영 골프 전문회사
                </span>
                <span className="text-stone-400">·</span>
                <span className="text-stone-300">BGIT Thai</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-amber-300 mt-1">
                "{COMPANY_INFO.announcement}"
              </p>
            </div>
          </div>

          {/* Dominant Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-tight mb-6 text-balance">
            태국 골프 투어의 기준,<br />
            <span className="text-emerald-400">BGIT Thai</span>가 함께합니다
          </h1>

          {/* Concrete Description */}
          <p className="text-base sm:text-lg text-stone-200 leading-relaxed mb-8 max-w-2xl">
            방콕 · 파타야 3색 골프 상품부터 프라이빗 풀빌라까지!
            어느 여행사보다 최고품질의 최저가 골프 상품을 한국 여행사와 골퍼분들께 직영 공급합니다.
            단독 전용 차량과 현지 전문 매니저의 실시간 케어로 대접받는 프리미엄 라운드를 경험하세요.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-12">
            <button
              type="button"
              onClick={onOpenReservation}
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-emerald-900/30 transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>실시간 예약 및 견적 신청</span>
            </button>

            <a
              href={COMPANY_INFO.pdfPath}
              download="BGIT_태국골프안내서_2026.pdf"
              className="px-5 py-3.5 bg-stone-800/90 hover:bg-stone-700/90 text-stone-200 hover:text-white border border-stone-600/50 font-medium rounded-lg transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-emerald-400" />
              <span>PDF 안내서 다운로드</span>
            </a>

            <button
              type="button"
              onClick={onViewPdfMode}
              className="px-4 py-3.5 bg-transparent hover:bg-stone-800/50 text-stone-300 hover:text-white border border-stone-700/60 font-medium rounded-lg transition-all flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <Eye className="w-4 h-4 text-stone-400" />
              <span>PDF 양식 원본 보기</span>
            </button>
          </div>

          {/* 4 Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-stone-800/80">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs text-stone-400">현지 직영 최저가</p>
                <p className="text-sm font-bold text-white">최고품질 보장</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Car className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs text-stone-400">전 일정</p>
                <p className="text-sm font-bold text-white">단독 전용차량</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Users className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs text-stone-400">그린피+카트+캐디피</p>
                <p className="text-sm font-bold text-white">18홀 3회 포함</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
              <div>
                <p className="text-xs text-stone-400">태국 현지 매니저</p>
                <p className="text-sm font-bold text-white">실시간 카톡 케어</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
