import React, { useState } from 'react';
import { GOLF_REGIONS } from '../data/golfData';
import { RegionId } from '../types/golf';
import { MapPin, Calendar, Clock, ChevronRight, Award } from 'lucide-react';

interface RegionalScorecardProps {
  onSelectRegionForFilter: (regionId: RegionId) => void;
  onOpenReservation: (regionName?: string) => void;
}

export const RegionalScorecard: React.FC<RegionalScorecardProps> = ({
  onSelectRegionForFilter,
  onOpenReservation,
}) => {
  const [selectedRegionId, setSelectedRegionId] = useState<RegionId>('pattaya');

  const activeRegion = GOLF_REGIONS.find((r) => r.id === selectedRegionId) || GOLF_REGIONS[0];

  return (
    <section id="scorecard" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching PDF */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            Scorecard by Region
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-2">
            지역별 스코어카드
          </h2>
          <p className="text-stone-500 text-sm sm:text-base">
            한 장으로 비교하는 태국 5대 골프 지역
          </p>
        </div>

        {/* Tabular View matching PDF page 1 & 2 */}
        <div className="overflow-x-auto rounded-xl border border-stone-200 shadow-xs mb-8 bg-stone-50/50">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-100/80 text-stone-700 font-semibold text-xs sm:text-sm">
                <th className="py-4 px-4 sm:px-6 w-32 sm:w-44">지역</th>
                <th className="py-4 px-4 sm:px-6 w-56 sm:w-80">대표 코스</th>
                <th className="py-4 px-4 sm:px-6">특징</th>
                <th className="py-4 px-4 sm:px-6 w-28 text-center">추천 시즌</th>
                <th className="py-4 px-4 sm:px-6 w-32 text-right">선택</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/80 bg-white">
              {GOLF_REGIONS.map((region) => {
                const isSelected = region.id === selectedRegionId;
                return (
                  <tr
                    key={region.id}
                    onClick={() => setSelectedRegionId(region.id)}
                    className={`transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50/60 font-medium'
                        : 'hover:bg-stone-50/80'
                    }`}
                  >
                    <td className="py-4 px-4 sm:px-6 align-top">
                      <div className="font-bold text-stone-900 text-base">{region.nameKr}</div>
                      <div className="text-xs text-stone-500 font-normal">{region.nameEn}</div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 align-top">
                      <div className="space-y-1">
                        {region.courses.map((course, idx) => (
                          <div key={idx} className="text-stone-800 flex items-center gap-1.5">
                            <span className="text-emerald-700 font-mono text-xs">·</span>
                            <span>{course}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 align-top text-stone-600 leading-relaxed">
                      {region.features}
                      <div className="mt-1.5 text-xs text-emerald-800/90 font-normal flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span>{region.driveFromAirport}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 align-top text-center whitespace-nowrap">
                      <span className="inline-block px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-100/70 rounded">
                        {region.recommendedSeason}
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 align-top text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectRegionForFilter(region.id);
                        }}
                        className={`text-xs px-3 py-1.5 rounded font-medium transition-all ${
                          isSelected
                            ? 'bg-emerald-800 text-white shadow-xs'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        상품 보기
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* PDF Caution Notice */}
        <p className="text-xs text-stone-500 mb-10 pl-1">
          * 코스 상황과 운영 정보는 바뀔 수 있으니 예약 전에 각 골프장에 직접 확인하세요.
        </p>

        {/* Detailed Region Spotlight Card */}
        <div className="p-6 sm:p-8 bg-stone-50 rounded-2xl border border-stone-200/90">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-emerald-800 text-white rounded text-xs font-bold">
                  {activeRegion.nameKr} ({activeRegion.nameEn}) 골프 가이드
                </span>
                <span className="text-xs text-stone-500">
                  추천 시즌: {activeRegion.recommendedSeason}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                {activeRegion.highlightCourse}
              </h3>
              <p className="text-sm text-stone-600 max-w-2xl leading-relaxed">
                {activeRegion.features}. BGIT Thai는 {activeRegion.nameKr} 전 지역의 골프장 티타임 직계약 및 전용 VIP 차량 배차로 가장 쾌적한 라운드 환경을 제공합니다.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600 pt-1">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  {activeRegion.driveFromAirport}
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-700" />
                  대표 명문 코스: {activeRegion.courses.join(', ')}
                </span>
              </div>
            </div>

            <div className="flex sm:flex-col gap-2.5 w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={() => onSelectRegionForFilter(activeRegion.id)}
                className="flex-1 sm:flex-initial px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>{activeRegion.nameKr} 상품 보기</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
