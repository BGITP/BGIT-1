import React, { useState } from 'react';
import {
  BGIT_DIFFERENTIATORS,
  INCLUSIONS_EXCLUSIONS,
  ENTRY_MEETING_SCHEDULE_DATA,
} from '../data/golfData';
import { PackageCategory } from '../types/golf';
import { PattayaValueDetailsSection } from './PattayaValueDetailsSection';

import {
  ClipboardCheck,
  CheckCircle,
  Info,
  Clock,
  Sparkles,
  FileCheck,
  MapPin,
  PlaneTakeoff,
  BookOpen,
  ArrowUpRight,
} from 'lucide-react';

const GUIDE_NOTICE_ITEMS = [
  {
    label: '호텔 이용',
    text: '위 요금은 2인 1실이 기본 입니다. 1인1실(싱글룸) 사용을 원하실 경우 별도의 싱글 차지 요금이 적용됩니다.',
  },
  {
    label: '전용 차량 운행',
    text: '차량은 저녁 식사를 마치는 오후8시 전후까지 운행됩니다. 추가 시간 이용을 원할시 현지 매니저와 상의 바랍니다.',
  },
  {
    label: '출발 인원 기준',
    text: '본 상품은 4인 출발 기준 요금입니다. 4인 미만 예약 시 추가 요금이 발생할 수 있으므로 별도 문의 부탁드립니다.',
  },
  {
    label: '실시간 현지 케어',
    text: '도착부터 출국까지 모든 일정과 돌발 상황을 실시간 상담으로 세심하게 서포트합니다. (가이드 동행 요청 시 사전 문의)',
  },
];

interface BgitDifferentiatorsProps {
  activeCategory?: PackageCategory | 'all';
  onGoToGuide?: (targetId?: 'tdac-guide' | 'airport-guide') => void;
}

export const BgitDifferentiators: React.FC<BgitDifferentiatorsProps> = ({
  activeCategory,
  onGoToGuide,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'inclusions' | 'peak' | 'notes'>('all');

  if (activeCategory === 'pattaya-value') {
    return (
      <section id="notes" className="pt-8 sm:pt-[1cm] pb-16 bg-[#f6f4ee] md:bg-stone-50">
        <div className="max-w-[1156px] mx-auto px-4 sm:px-6 lg:px-8">
          <PattayaValueDetailsSection />
        </div>
      </section>
    );
  }

  return (
    <section id="notes" className="pt-8 sm:pt-[1cm] pb-16 bg-[#f6f4ee] md:bg-stone-50">
      <div className="max-w-[1156px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header strictly matching reference image style */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-[#222222] flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200/80 flex items-center justify-center text-[#e05638] shrink-0">
              <ClipboardCheck className="w-5.5 h-5.5 stroke-[2.2]" />
            </span>
            <span>포함 · 불포함 및 중요 안내사항</span>
          </h2>
        </div>


        {/* ======================================================== */}
        {/* MOBILE VIEW (< md): Uploaded HTML details & card steps   */}
        {/* ======================================================== */}
        <div className="block md:hidden space-y-3 mb-8">
          {/* 포함사항 details */}
          <details open className="bg-white border border-[#e3dfd3] rounded-[18px] px-4.5 py-1 shadow-[0_2px_6px_rgba(15,61,46,0.04)]">
            <summary className="list-none cursor-default py-3.5 font-bold text-[15px] text-[#10231b] flex items-center justify-between border-b border-[#e3dfd3]/50">
              <span className="flex items-center gap-2 text-lg font-bold text-stone-900">
                <CheckCircle className="w-5.5 h-5.5 text-[#1d6b4f] shrink-0" />
                포함사항
              </span>
            </summary>
            <ul className="dot list-none p-0 m-0 my-3 space-y-2 text-[15px]">
              {INCLUSIONS_EXCLUSIONS.inclusions.map((item, idx) => (
                <li key={idx} className="relative pl-4 text-[15px] text-[#5d6b64] leading-relaxed">
                  <span className="absolute left-0 top-[9px] w-1.5 h-1.5 rounded-full bg-[#1d6b4f]" />
                  <b className="text-[#10231b] block text-[15.5px] font-bold">{item.item}</b>
                  <span className="text-[16px]">{item.detail}</span>
                </li>
              ))}
            </ul>
          </details>

          {/* 불포함사항 details (데스크톱과 동일한 스타일) */}
          <details open className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-[#d0fae5] transition-colors shadow-xs">
            <summary className="list-none cursor-default flex items-center gap-2 mb-4 pb-3 border-b border-stone-100 [&::-webkit-details-marker]:hidden">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5.5 h-5.5 shrink-0"
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
              <span className="text-lg font-bold text-stone-900">
                불포함사항
              </span>
            </summary>
            <ul className="list-none p-0 m-0 space-y-3 text-[15px] text-stone-700 leading-relaxed">
              {INCLUSIONS_EXCLUSIONS.exclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-[9px] shrink-0" />
                  <div>
                    <span className="block text-[15.5px] font-bold text-stone-900">{item.item}</span>
                    <span className="block text-[16px] text-stone-600 leading-relaxed">{item.detail}</span>
                  </div>
                </li>
              ))}
            </ul>
          </details>

          {/* 안내 및 참고사항 details */}
          <details open className="bg-white border border-[#e3dfd3] rounded-[18px] px-4.5 py-1 shadow-[0_2px_6px_rgba(15,61,46,0.04)]">
            <summary className="list-none cursor-default py-3.5 font-bold text-[15px] text-[#10231b] flex items-center justify-between border-b border-[#e3dfd3]/50">
              <span className="flex items-center gap-2 text-lg font-bold text-stone-900">
                <Info className="w-4 h-4 text-[#1d6b4f]" />
                안내 및 참고사항
              </span>
            </summary>
            <ul className="list-none p-0 m-0 my-3 space-y-2.5 text-[15px] text-stone-600">
              {GUIDE_NOTICE_ITEMS.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-[16px] leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1d6b4f] mt-[9.5px] shrink-0" aria-hidden="true" />
                  <span>
                    <strong className="font-bold text-stone-900">{item.label} - </strong>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </details>

          {/* 모바일 TDAC 카드 (데스크톱과 동일한 스타일) */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-[#d0fae5] transition-colors shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
                  <FileCheck className="w-5 h-5" />
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                <h3 className="m-0 text-lg font-bold text-stone-900">
                  {ENTRY_MEETING_SCHEDULE_DATA.arrivalCard.title.replace(' (TDAC)', '')}
                </h3>
                <button
                  type="button"
                  onClick={() => onGoToGuide?.('tdac-guide')}
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-stone-50/80 text-stone-800 hover:text-[#0f3d2e] border !border-[#bfb9ae] text-xs font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all duration-200 cursor-pointer active:scale-95 shrink-0"
                  title="가이드 자료실로 이동"
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-700 stroke-[2]" />
                  <span>바로가기</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 stroke-[2.2]" />
                </button>
              </div>
              <div className="space-y-2 mb-4">
                {ENTRY_MEETING_SCHEDULE_DATA.arrivalCard.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-[16px] text-stone-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2.5 shrink-0" />
                    <span className="text-[16px]">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-[15px] text-stone-600 leading-relaxed">
              💡 <strong className="text-stone-800">BGIT 서포트:</strong> {ENTRY_MEETING_SCHEDULE_DATA.arrivalCard.tips}
            </div>
          </div>

          {/* 모바일 미팅 안내 카드 (데스크톱과 동일한 스타일) */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-[#d0fae5] transition-colors shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                <h3 className="m-0 text-lg font-bold text-stone-900">
                  {ENTRY_MEETING_SCHEDULE_DATA.meetingGuide.title}
                </h3>
                <button
                  type="button"
                  onClick={() => onGoToGuide?.('airport-guide')}
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-stone-50/80 text-stone-800 hover:text-[#0f3d2e] border !border-[#bfb9ae] text-xs font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all duration-200 cursor-pointer active:scale-95 shrink-0"
                  title="방콕 수완나품 공항 주의사항 · 미팅포인트 바로가기"
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-700 stroke-[2]" />
                  <span>바로가기</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 stroke-[2.2]" />
                </button>
              </div>
              <div className="space-y-2 mb-4">
                {ENTRY_MEETING_SCHEDULE_DATA.meetingGuide.instructions.map((inst, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-[16px] text-stone-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2.5 shrink-0" />
                    <span className="text-[16px]">{inst}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-[15px] text-stone-600 leading-relaxed">
              📞 <strong className="text-stone-800">안심 지원:</strong> {ENTRY_MEETING_SCHEDULE_DATA.meetingGuide.contactNotice}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP VIEW (>= md): Existing Multi-Column Grid Layout  */}
        {/* ======================================================== */}
        <div className="hidden md:block">
          {/* 2. 포함 . 불포함사항 / 참고사항 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* 포함사항 */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 hover:border-[#d0fae5] transition-colors shadow-xs">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100">
                <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
                <h3 className="text-lg font-bold text-stone-900">
                  포함사항
                </h3>
              </div>
              <ul className="space-y-3.5 text-[13px] sm:text-[15px] text-stone-700">
                {INCLUSIONS_EXCLUSIONS.inclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                    <div>
                      <span className="font-bold text-stone-900">{item.item}</span>
                      <span className="text-stone-600 block text-[13px] mt-0.5">{item.detail}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* 불포함사항 */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 hover:border-[#d0fae5] transition-colors shadow-xs">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5.5 h-5.5 shrink-0"
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
                <h3 className="text-lg font-bold text-stone-900">
                  불포함사항
                </h3>
              </div>
              <ul className="space-y-3.5 text-[13px] sm:text-[15px] text-stone-700">
                {INCLUSIONS_EXCLUSIONS.exclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                    <div>
                      <span className="font-bold text-stone-900">{item.item}</span>
                      <span className="text-stone-600 block text-[13px] mt-0.5">{item.detail}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4. 참고사항- 1 */}
          <div className="grid grid-cols-1 gap-8">
            {/* 안내 및 참고사항 */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 hover:border-[#d0fae5] transition-colors shadow-xs">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100">
                <Info className="w-5 h-5 text-emerald-700 shrink-0" />
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  안내 및 참고사항
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600">
                {GUIDE_NOTICE_ITEMS.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                    <span className="text-[13px] sm:text-[15px]">
                      <strong className="font-bold text-stone-900">{item.label} - </strong>
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 5. 입국신고서 / 미팅 / 일정 가이드 */}
          <div id="entry-meeting-schedule" className="mt-14 pt-10 border-t border-stone-200 scroll-mt-36">
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-[#222222] flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200/80 flex items-center justify-center text-[#e05638] shrink-0">
                  <PlaneTakeoff className="w-5.5 h-5.5 stroke-[2.2]" />
                </span>
                <span>전자입국신고서 작성방법 · 방콕 공항 미팅 가이드</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 1) 태국 전자입국신고서 (TDAC) */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200 hover:border-[#d0fae5] transition-colors shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
                      <FileCheck className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <h4 className="text-[15px] font-bold text-stone-900">
                      {ENTRY_MEETING_SCHEDULE_DATA.arrivalCard.title}
                    </h4>
                    <button
                      type="button"
                      onClick={() => onGoToGuide?.('tdac-guide')}
                      className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-stone-50/80 text-stone-800 hover:text-[#0f3d2e] border border-stone-200 text-xs font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all duration-200 cursor-pointer active:scale-95 shrink-0"
                      title="가이드 자료실로 이동"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-emerald-700 stroke-[2]" />
                      <span>바로가기</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 stroke-[2.2]" />
                    </button>
                  </div>
                  <div className="space-y-2 mb-4">
                    {ENTRY_MEETING_SCHEDULE_DATA.arrivalCard.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-[13px] sm:text-sm text-stone-700 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                        <span className="text-[14px] sm:text-[15px]">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-[13px] sm:text-[14px] text-stone-600 leading-relaxed">
                  💡 <strong className="text-stone-800">BGIT 서포트:</strong> {ENTRY_MEETING_SCHEDULE_DATA.arrivalCard.tips}
                </div>
              </div>

              {/* 2) 공항 미팅 & 전용 차량 */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200 hover:border-[#d0fae5] transition-colors shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
                      <MapPin className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <h4 className="text-[15px] font-bold text-stone-900">
                      {ENTRY_MEETING_SCHEDULE_DATA.meetingGuide.title}
                    </h4>
                    <button
                      type="button"
                      onClick={() => onGoToGuide?.('airport-guide')}
                      className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-stone-50/80 text-stone-800 hover:text-[#0f3d2e] border border-stone-200 text-xs font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all duration-200 cursor-pointer active:scale-95 shrink-0"
                      title="방콕 수완나품 공항 주의사항 · 미팅포인트 바로가기"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-emerald-700 stroke-[2]" />
                      <span>바로가기</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 stroke-[2.2]" />
                    </button>
                  </div>
                  <div className="space-y-2 mb-4">
                    {ENTRY_MEETING_SCHEDULE_DATA.meetingGuide.instructions.map((inst, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-[14px] sm:text-[15px] text-stone-700 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                        <span>{inst}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-[13px] sm:text-[14px] text-stone-600 leading-relaxed">
                  📞 <strong className="text-stone-800">안심 지원:</strong> {ENTRY_MEETING_SCHEDULE_DATA.meetingGuide.contactNotice}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
