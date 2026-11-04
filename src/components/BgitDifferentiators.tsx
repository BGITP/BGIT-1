import React, { useState } from 'react';
import {
  BGIT_DIFFERENTIATORS,
  INCLUSIONS_EXCLUSIONS,
  NOTICES_PEAK_SEASON,
  IMPORTANT_NOTES_1,
  IMPORTANT_NOTES_2,
} from '../data/golfData';
import {
  ShieldCheck,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Car,
  Clock,
  Sparkles,
} from 'lucide-react';

export const BgitDifferentiators: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'inclusions' | 'peak' | 'notes'>('all');

  return (
    <section id="notes" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            BGIT Standards & Guidelines
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-2">
            투어 포함 · 불포함 및 중요 안내사항
          </h2>
          <p className="text-stone-500 text-sm sm:text-base">
            BGIT 태국현지 골프전문 여행사만의 투명하고 믿을 수 있는 운영 규정
          </p>
        </div>

        {/* 1. BGIT 태국현지 골프전문 여행사는 이런점이 다릅니다 - */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs mb-8">
          <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-700" />
            BGIT 태국현지 골프전문 여행사는 이런점이 다릅니다
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BGIT_DIFFERENTIATORS.map((diff, index) => (
              <div
                key={index}
                className="p-5 bg-stone-50 rounded-xl border border-stone-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm mb-3">
                    0{index + 1}
                  </div>
                  <h4 className="text-base font-bold text-stone-900 mb-2">
                    {diff.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {diff.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. 포함 . 불포함사항 / 참고사항 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 포함사항 - */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-emerald-200 shadow-xs">
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
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs">
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

        {/* 3. 성수기 안내사항 - */}
        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-amber-200 shadow-xs mb-8">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <h3 className="text-lg font-bold text-stone-900">
              성수기 안내사항
            </h3>
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
            {NOTICES_PEAK_SEASON.map((notice, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-amber-600 font-bold text-xs mt-0.5">■</span>
                <span className="leading-relaxed">
                  {notice.includes('Peak Season Surcharge') ? (
                    <>
                      <strong className="text-stone-900">Peak Season Surcharge : </strong>
                      <span className="text-red-600 font-medium">크리스마스 및 연말 송크란축제 및 각종행사 (불꽃 축제, 각종공연) / 호텔 Surcharge 추가요금이 발생합니다.</span>
                    </>
                  ) : (
                    notice
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. 참고사항- 1 & 참고사항- 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 참고사항- 1 */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs">
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
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs">
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
      </div>
    </section>
  );
};
