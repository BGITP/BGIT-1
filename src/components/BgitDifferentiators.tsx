import React, { useState } from 'react';
import {
  BGIT_DIFFERENTIATORS,
  INCLUSIONS_EXCLUSIONS,
  IMPORTANT_NOTES_1,
  IMPORTANT_NOTES_2,
  ENTRY_MEETING_SCHEDULE_DATA,
} from '../data/golfData';
import {
  ShieldCheck,
  CheckCircle,
  XCircle,
  Info,
  Car,
  Clock,
  Sparkles,
  FileCheck,
  MapPin,
  CalendarDays,
  PlaneTakeoff,
} from 'lucide-react';

export const BgitDifferentiators: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'inclusions' | 'peak' | 'notes'>('all');

  return (
    <section id="notes" className="pt-[1cm] pb-16 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header strictly matching reference image style */}
        <div className="mb-8">
          <div className="pl-7 mb-1.5">
            <span className="text-xs sm:text-[13px] font-semibold text-[#007a55] tracking-wider uppercase">
              BGIT Standards & Guidelines
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#222222] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#007a55] shrink-0" />
            <span>투어 포함 · 불포함 및 중요 안내사항</span>
          </h2>
          <p className="text-xs sm:text-[13px] text-[#666666] mt-1.5 pl-7 font-normal">
            BGIT 태국현지 골프전문 여행사만의 투명하고 믿을 수 있는 운영 규정
          </p>
        </div>


        {/* 2. 포함 . 불포함사항 / 참고사항 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 포함사항 - */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 hover:border-[#d0fae5] transition-colors shadow-xs">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100">
              <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
              <h3 className="text-lg font-bold text-stone-900">
                포함사항
              </h3>
            </div>
            <ul className="space-y-3.5 text-xs sm:text-sm text-stone-700">
              {INCLUSIONS_EXCLUSIONS.inclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                  <div>
                    <span className="font-bold text-stone-900">{item.item}</span>
                    <span className="text-stone-600 block text-xs mt-0.5">{item.detail}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* 불포함사항 - */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 hover:border-[#d0fae5] transition-colors shadow-xs">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100">
              <XCircle className="w-5 h-5 text-stone-400 shrink-0" />
              <h3 className="text-lg font-bold text-stone-900">
                불포함사항
              </h3>
            </div>
            <ul className="space-y-3.5 text-xs sm:text-sm text-stone-700">
              {INCLUSIONS_EXCLUSIONS.exclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2 shrink-0" />
                  <div>
                    <span className="font-bold text-stone-900">{item.item}</span>
                    <span className="text-stone-600 block text-xs mt-0.5">{item.detail}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4. 참고사항- 1 & 참고사항- 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 참고사항- 1 */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 hover:border-[#d0fae5] transition-colors shadow-xs">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100">
              <Info className="w-5 h-5 text-stone-600 shrink-0" />
              <h3 className="text-base sm:text-lg font-bold text-stone-900">
                참고사항 - 1 (요금 및 차량)
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600">
              {IMPORTANT_NOTES_1.map((note, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-stone-400 font-mono text-xs mt-0.5">·</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 참고사항- 2 */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 hover:border-[#d0fae5] transition-colors shadow-xs">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100">
              <Car className="w-5 h-5 text-stone-600 shrink-0" />
              <h3 className="text-base sm:text-lg font-bold text-stone-900">
                참고사항 - 2 (일정 및 매니저 케어)
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600">
              {IMPORTANT_NOTES_2.map((note, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-stone-400 font-mono text-xs mt-0.5">·</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 5. 입국신고서 / 미팅 / 일정 가이드 (Menu Item 9 Target) */}
        <div id="entry-meeting-schedule" className="mt-14 pt-10 border-t border-stone-200 scroll-mt-36">
          <div className="mb-8">
            <div className="pl-7 mb-1.5">
              <span className="text-xs sm:text-[13px] font-semibold text-[#007a55] tracking-wider uppercase">
                BGIT 필수 안내
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#222222] flex items-center gap-2">
              <PlaneTakeoff className="w-5 h-5 text-[#007a55] shrink-0" />
              <span>입국신고서 · 공항 미팅 · 3박 5일 추천 일정</span>
            </h3>
            <p className="text-xs sm:text-[13px] text-[#666666] mt-1.5 pl-7 font-normal">
              태국 출국 전 확인사항과 수완나품 공항 전용 차량 미팅 포인트, 표준 일정표입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 1) 태국 전자입국신고서 (TDAC) */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 hover:border-[#d0fae5] transition-colors shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                    {ENTRY_MEETING_SCHEDULE_DATA.arrivalCard.badge}
                  </span>
                </div>
                <h4 className="text-base font-bold text-stone-900 mb-2">
                  {ENTRY_MEETING_SCHEDULE_DATA.arrivalCard.title}
                </h4>
                <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                  {ENTRY_MEETING_SCHEDULE_DATA.arrivalCard.description}
                </p>
                <div className="space-y-2 mb-4">
                  {ENTRY_MEETING_SCHEDULE_DATA.arrivalCard.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                      <span className="w-4 h-4 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-[11px] text-stone-600">
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
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {ENTRY_MEETING_SCHEDULE_DATA.meetingGuide.badge}
                  </span>
                </div>
                <h4 className="text-base font-bold text-stone-900 mb-2">
                  {ENTRY_MEETING_SCHEDULE_DATA.meetingGuide.title}
                </h4>
                <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl mb-4">
                  <div className="text-[11px] font-semibold text-emerald-900">미팅 장소</div>
                  <div className="text-xs font-bold text-emerald-800 mt-0.5">
                    {ENTRY_MEETING_SCHEDULE_DATA.meetingGuide.airport} : {ENTRY_MEETING_SCHEDULE_DATA.meetingGuide.meetingPoint}
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  {ENTRY_MEETING_SCHEDULE_DATA.meetingGuide.instructions.map((inst, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{inst}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-[11px] text-stone-600">
                📞 <strong className="text-stone-800">안심 지원:</strong> {ENTRY_MEETING_SCHEDULE_DATA.meetingGuide.contactNotice}
              </div>
            </div>

            {/* 3) 3박 5일 추천 표준 일정표 */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 hover:border-[#d0fae5] transition-colors shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
                    <CalendarDays className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                    {ENTRY_MEETING_SCHEDULE_DATA.standardSchedule.badge}
                  </span>
                </div>
                <h4 className="text-base font-bold text-stone-900 mb-2">
                  {ENTRY_MEETING_SCHEDULE_DATA.standardSchedule.title}
                </h4>
                <p className="text-xs text-stone-500 mb-3">
                  18홀 3회 라운드와 단독 차량이 결합된 가장 인기 있는 표준 여행 코스입니다.
                </p>
                <div className="space-y-2.5">
                  {ENTRY_MEETING_SCHEDULE_DATA.standardSchedule.days.map((d, idx) => (
                    <div key={idx} className="p-2 bg-stone-50 rounded-lg border border-stone-100">
                      <div className="text-xs font-bold text-stone-900 mb-0.5">{d.day}</div>
                      <div className="text-[11px] text-stone-600 leading-snug">{d.summary}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
