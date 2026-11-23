import React, { useState } from 'react';
import {
  PlaneLanding,
  ShieldAlert,
  Ban,
  PlugZap,
  ShieldCheck,
  MapPin,
  Clock,
  Briefcase,
  CarFront,
  Luggage,
  X,
} from 'lucide-react';

export const AirportGuideSection: React.FC = () => {
  const [isMapZoomed, setIsMapZoomed] = useState(false);

  return (
    <section
      id="airport-guide"
      className="pt-4 pb-12 sm:pb-16 bg-[#f6f4ee] md:bg-white scroll-mt-24"
    >
      <div className="max-w-[1156px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-[#222222] flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200/80 flex items-center justify-center text-[#e05638] shrink-0">
              <PlaneLanding className="w-5 h-5 stroke-[2.2]" />
            </span>
            <span>방콕 수완나품 공항 주의사항 · 미팅포인트</span>
          </h2>
        </div>

        <div className="space-y-8 sm:space-y-10">
          {/* 1. 세관 및 입국 주의사항 */}
          <div className="bg-white rounded-[24px] border border-stone-200/90 shadow-[0_6px_28px_rgba(15,61,46,0.04)]">
            {/* Editorial Band Header */}
            <div className="bg-[#faf9f6] border-b border-stone-200/80 rounded-t-[24px] px-5 sm:px-8 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#0f3d2e] text-[#f0d28d] flex items-center justify-center font-extrabold text-sm tracking-tight shrink-0">
                  01
                </div>
                <div>
                  <span className="block text-[11px] font-semibold tracking-wide text-[#e05638]">
                    세관 및 반입 금지 규정
                  </span>
                  <h3 className="text-base sm:text-[17px] font-bold text-[#10231b] tracking-tight">
                    입국 시 세관 · 면세품 및 안전 주의사항
                  </h3>
                </div>
              </div>
              <span className="text-xs font-semibold text-stone-500 tabular-nums">
                출국 전 필수 확인 5가지
              </span>
            </div>

            <div className="p-5 sm:p-8 space-y-6">
              {/* Top 3 Critical Customs Warnings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                {/* Rule 1 */}
                <div className="bg-[#faf9f6] rounded-2xl p-5 flex flex-col justify-between gap-3">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#e05638] tabular-nums">
                        주의 01
                      </span>
                      <Briefcase className="w-4 h-4 text-[#e05638]" />
                    </div>
                    <h4 className="text-[15px] font-bold text-[#10231b] leading-snug">
                      영수증 · 면세품 각자 소지
                    </h4>
                    <p className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed">
                      담배나 주류를 한 쇼핑백에 몰아서 담으시면 안됩니다.{' '}
                      <strong className="text-[#10231b] font-semibold">
                        영수증과 물품을 각자 소지
                      </strong>
                      해야 합니다.
                    </p>
                  </div>
                </div>

                {/* Rule 2 */}
                <div className="bg-[#faf9f6] rounded-2xl p-5 flex flex-col justify-between gap-3">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#e05638] tabular-nums">
                        주의 02 · 주류 1L / 담배 1보루
                      </span>
                      <ShieldAlert className="w-4 h-4 text-[#e05638]" />
                    </div>
                    <h4 className="text-[15px] font-bold text-[#10231b] leading-snug">
                      면세 한도 초과 시 벌금 · 압수
                    </h4>
                    <p className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed">
                      주류는 <strong className="text-[#10231b] font-semibold tabular-nums">1리터</strong>, 담배는{' '}
                      <strong className="text-[#10231b] font-semibold tabular-nums">1보루</strong>를 초과하시면 안됩니다. 위반해서 적발시{' '}
                      <strong className="text-[#d9381e] font-semibold">
                        강한 벌금이 부과 됨과 동시에 물품도 압수
                      </strong>
                      가 됩니다.
                    </p>
                  </div>
                </div>

                {/* Rule 3 */}
                <div className="bg-[#fff6f4] rounded-2xl p-5 flex flex-col justify-between gap-3">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#d9381e]">
                        주의 03 · 반입 전면 금지
                      </span>
                      <Ban className="w-4 h-4 text-[#d9381e]" />
                    </div>
                    <h4 className="text-[15px] font-bold text-[#10231b] leading-snug">
                      모든 전자담배 반입 금지
                    </h4>
                    <p className="text-xs sm:text-[13.5px] text-stone-700 leading-relaxed">
                      액상 전자담배나 훈증형 전자담배는 반입금지 입니다.{' '}
                      <strong className="text-[#d9381e] font-semibold">
                        모든 전자담배 역시 강한 벌금이 부과 됨과 동시에 압수
                      </strong>
                      가 됩니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* Hairline Divider + Voltage & Safety Strip */}
              <div className="pt-5 border-t border-stone-200/80 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#0f3d2e] flex items-center justify-center shrink-0 mt-0.5">
                    <PlugZap className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <strong className="text-[#10231b] font-bold text-sm">
                        전압 안내
                      </strong>
                      <span className="text-xs text-[#007a55] font-semibold tabular-nums">
                        220V ~ 240V 호환
                      </span>
                    </div>
                    <p>
                      한국에서 사용하는 <strong className="text-[#10231b] tabular-nums">220v 240v</strong> 용 전자기기는 모두 사용이 가능합니다.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 md:pl-6 md:border-l md:border-stone-200/80">
                  <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed">
                    <strong className="text-[#10231b] font-bold text-sm block mb-0.5">
                      소지품 · 안전 유의
                    </strong>
                    <p>
                      귀중품 및 현금 등의 분실사고와 개인의 안전사고에 대하여 각별히 유의하여 주세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. 방콕 수완나품 공항 내부지도 & 미팅포인트 안내 */}
          <div className="bg-white rounded-[24px] border border-stone-200/90 shadow-[0_6px_28px_rgba(15,61,46,0.04)]">
            {/* Editorial Band Header */}
            <div className="bg-[#faf9f6] border-b border-stone-200/80 rounded-t-[24px] px-5 sm:px-8 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#0f3d2e] text-[#f0d28d] flex items-center justify-center font-extrabold text-sm tracking-tight shrink-0">
                  02
                </div>
                <div>
                  <span className="block text-[11px] font-semibold tracking-wide text-[#007a55]">
                    방콕 수완나품 공항 (BKK) 도착 동선
                  </span>
                  <h3 className="text-base sm:text-[17px] font-bold text-[#10231b] tracking-tight">
                    공항 내부 지도 및 현지 직원 미팅 포인트
                  </h3>
                </div>
              </div>
              <span className="text-xs font-bold text-[#0f3d2e] tabular-nums">
                국제선 출구 B · C → 회전문 3 · 4번 사이
              </span>
            </div>

            <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left: Airport Internal Map Image */}
              <div className="lg:col-span-6">
                <div className="bg-[#f4f2ec] p-3.5 sm:p-4 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs sm:text-[13px] font-bold text-[#10231b]">
                      방콕 수완나품 공항 내부지도 입니다.
                    </span>
                    <span className="text-[11px] font-medium text-stone-500">
                      클릭 시 크게 보기
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMapZoomed(true)}
                    className="w-full rounded-xl overflow-hidden bg-white shadow-[0_4px_16px_rgba(16,35,27,0.08)] cursor-zoom-in block transition-transform duration-200 hover:scale-[1.008]"
                    aria-label="방콕 수완나품 공항 내부 지도 크게 보기"
                  >
                    <img
                      src="/assets/aistudio/_______09f85c5e.png"
                      alt="방콕 수완나품 공항 내부 지도 - 국제선 B, C 출구 및 회전문 3·4번 사이 미팅포인트"
                      className="w-full h-auto object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                  <div className="px-1 pt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-600">
                    <MapPin className="w-3.5 h-3.5 text-[#e05638] shrink-0" />
                    <span className="font-semibold text-[#10231b]">핵심 위치</span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span>국제선 출구 B 또는 C</span>
                    <span aria-hidden="true" className="text-stone-400">→</span>
                    <span className="font-bold text-[#e05638]">회전문 3번 · 4번 게이트 사이</span>
                  </div>
                </div>
              </div>

              {/* Right: Step-by-Step Arrival & Vehicle Meeting Guide */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
                <div className="divide-y divide-stone-100">
                  {/* Step 01 */}
                  <div className="pb-4 flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-[#fff4f0] text-[#e05638] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed">
                      <strong className="text-[#10231b] font-bold block mb-1 text-sm">
                        01. 현지 직원 미팅 포인트 이동
                      </strong>
                      <p>
                        짐을 찾으시고{' '}
                        <strong className="text-[#10231b] font-semibold">B 또는 C출구</strong>
                        로 나오시면 외부로 나가는{' '}
                        <strong className="text-[#e05638] font-bold">
                          회전문 3번과 4번게이트 사이
                        </strong>
                        에{' '}
                        <strong className="text-[#10231b] font-semibold">
                          고객님 성함 피켓
                        </strong>
                        을 들고 있는 현지직원을 만나실 수 있습니다.
                      </p>
                    </div>
                  </div>

                  {/* Step 02 */}
                  <div className="py-4 flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#0f3d2e] flex items-center justify-center shrink-0 mt-0.5">
                      <CarFront className="w-4 h-4" />
                    </div>
                    <div className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed">
                      <strong className="text-[#10231b] font-bold block mb-1 text-sm">
                        02. 차량 호출 진행
                      </strong>
                      <p>미팅후 현지직원이 기사님을 호출 합니다.</p>
                    </div>
                  </div>

                  {/* Step 03 */}
                  <div className="py-4 flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <strong className="text-[#10231b] font-bold text-sm">
                          03. 공항 내 차량 대기 안내
                        </strong>
                        <span className="text-xs font-bold text-amber-700 tabular-nums">
                          약 5분 ~ 10분 소요
                        </span>
                      </div>
                      <p>
                        최근 방콕 공항의 경우 공항내 차량 정체가 상당히 심합니다. 기사님이 주차장에서 차량을 가지고 나오는 시간이{' '}
                        <strong className="text-[#10231b] font-semibold tabular-nums">
                          5분~10분 정도 소요
                        </strong>
                        가 됩니다. 이점 양해 부탁드리겠습니다.
                      </p>
                    </div>
                  </div>

                  {/* Step 04 */}
                  <div className="pt-4 flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-[#0f3d2e] text-[#f0d28d] flex items-center justify-center shrink-0 mt-0.5">
                      <Luggage className="w-4 h-4" />
                    </div>
                    <div className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed">
                      <strong className="text-[#10231b] font-bold block mb-1 text-sm">
                        04. 골프백 적재 및 호텔 출발
                      </strong>
                      <p>
                        차가 도착하면 현지직원의 안내에 따라{' '}
                        <strong className="text-[#10231b] font-semibold">
                          골프백과 짐을 싣고 호텔로 출발
                        </strong>{' '}
                        하시면 됩니다.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Summary Callout */}
                <div className="rounded-2xl bg-[#0f3d2e] text-white px-5 py-4 flex items-center justify-between gap-4">
                  <div className="text-xs sm:text-[13px] leading-relaxed text-emerald-50/95">
                    <strong className="text-[#f0d28d] font-bold block text-[13px] sm:text-sm mb-0.5">
                      미팅 포인트 체크 요약
                    </strong>
                    <span>
                      수하물 수취 → 국제선 <strong className="text-white">B / C 출구</strong> → 회전문{' '}
                      <strong className="text-[#f0d28d]">3 · 4번 사이</strong> 성함 피켓 확인
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Airport Map Zoom Modal */}
      {isMapZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsMapZoomed(false)}
        >
          <div
            className="relative max-w-3xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200 bg-stone-50">
              <span className="text-xs sm:text-sm font-bold text-stone-800 truncate">
                방콕 수완나품 공항 내부 지도 (미팅 포인트 안내)
              </span>
              <button
                type="button"
                onClick={() => setIsMapZoomed(false)}
                className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200/70 cursor-pointer"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto p-3 sm:p-4 bg-stone-100 flex items-center justify-center">
              <img
                src="/assets/aistudio/_______09f85c5e.png"
                alt="방콕 수완나품 공항 내부 지도"
                className="max-w-full max-h-[78vh] w-auto h-auto object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
