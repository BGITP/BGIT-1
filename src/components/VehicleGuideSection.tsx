import React from 'react';
import {
  Car,
  UserCheck,
  Clock,
  ShieldCheck,
  Users,
  Headphones,
  MapPin,
  PlaneLanding,
  CheckCircle2,
  MessageCircle,
  Phone,
  BookOpen,
  ArrowUpRight,
} from 'lucide-react';

interface VehicleGuideSectionProps {
  onOpenReservation?: () => void;
  onGoToGuide?: (targetId?: 'tdac-guide' | 'airport-guide') => void;
}

const VEHICLE_POLICIES = [
  {
    icon: ShieldCheck,
    title: '100% 프라이빗 단독 배차',
    desc: '방콕 수완나품 공항 미팅부터 호텔·골프장·식당 이동 및 귀국 샌딩까지 타 일행과 섞이지 않는 단독 차량이 배정됩니다.',
  },
  {
    icon: Clock,
    title: '기본 운행 시간 (오후 8시 전후)',
    desc: '차량은 저녁 식사를 마치는 오후 8시 전후까지 운행됩니다. 야간 추가 이용을 원하실 경우 현지 매니저와 사전에 상의해 주세요.',
  },
  {
    icon: Users,
    title: '4인 출발 기준 · 소인원 맞춤 조율',
    desc: '기본 상품은 4인 출발 기준입니다. 4인 미만 예약 시에는 차량 구성 및 조인 여부에 따라 별도 안내로 맞춤 조율해 드립니다.',
  },
  {
    icon: PlaneLanding,
    title: '공항 미팅 & 공항 샌딩 포함',
    desc: '행사 3박 4일 이상 차량 사용 시 공항 미팅·샌딩 비용(1인당 50달러)이 상품 내역에 기본 포함되어 편리하게 이동할 수 있습니다.',
  },
];

const JOURNEY_STEPS = [
  {
    step: 'STEP 01',
    title: '공항 도착 & 피켓 미팅',
    desc: '방콕 수완나품 공항 2층 입국장 3번~4번 게이트 사이에서 성함 피켓 확인 후 현지 직원이 담당 기사님과 차량을 호출해 드립니다.',
  },
  {
    step: 'STEP 02',
    title: '전용 차량 골프장 왕복',
    desc: '호텔 조식 후 로비에서 대기 중인 전용 차량으로 골프장까지 쾌적하게 이동하며, 라운드 종료 후에도 기다림 없이 바로 탑승합니다.',
  },
  {
    step: 'STEP 03',
    title: '석식 · 마사지 시내 차량 지원',
    desc: '라운드 후 저녁 식사(한식/태국식 씨푸드) 및 시내 마사지·쇼핑 이동까지 오후 8시 전후로 전용 차량이 일정에 맞춰 지원됩니다.',
  },
  {
    step: 'STEP 04',
    title: '짐 확인 및 귀국 공항 샌딩',
    desc: '차량 탑승 및 하차 시 골프백과 개인 짐을 항상 확인하며, 마지막 날 체크아웃·라운드 후 공항까지 안전하게 모셔다 드립니다.',
  },
];

export const VehicleGuideSection: React.FC<VehicleGuideSectionProps> = ({
  onOpenReservation,
  onGoToGuide,
}) => {
  return (
    <section
      id="vehicle-guide"
      className="pt-2 pb-12 sm:pb-16 bg-[#f6f4ee] md:bg-white scroll-mt-24"
    >
      <div className="max-w-[1156px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* 01. VIP 단독 전용차량 안내 */}
        <div className="bg-white rounded-[24px] border border-stone-200/90 shadow-[0_6px_28px_rgba(15,61,46,0.04)] overflow-hidden">
          <div className="bg-[#faf9f6] border-b border-stone-200/80 px-5 sm:px-8 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0f3d2e] text-[#f0d28d] flex items-center justify-center font-extrabold text-sm tracking-tight shrink-0">
                01
              </div>
              <div>
                <span className="block text-[11px] font-semibold tracking-wide text-[#e05638]">
                  VIP 단독 전용차량 &amp; 기사 풀서비스
                </span>
                <h2 className="text-base sm:text-[17px] font-bold text-[#10231b] tracking-tight">
                  전용 차량 운행 기준 및 이용 안내
                </h2>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1d6b4f]">
              <Car className="w-4 h-4 shrink-0" />
              <span>타 일행 동승 없는 단독 배차</span>
            </span>
          </div>

          <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-5 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/70 aspect-[16/10] lg:aspect-auto lg:min-h-[260px]">
              <img
                src="/assets/aistudio/________b9162fbf.jpg"
                alt="VIP 단독 전용차량 & 기사 풀서비스"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {VEHICLE_POLICIES.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-[#faf9f6] rounded-2xl p-4 sm:p-4.5 border border-stone-200/70 flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-[#1d6b4f] shrink-0">
                        <Icon className="w-4 h-4 stroke-[2.2]" />
                      </span>
                      <h3 className="text-[14.5px] font-bold text-[#10231b] leading-snug">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[13px] sm:text-[13.5px] text-stone-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 02. 한국어 가이드 & 24시간 실시간 케어 */}
        <div className="bg-white rounded-[24px] border border-stone-200/90 shadow-[0_6px_28px_rgba(15,61,46,0.04)] overflow-hidden">
          <div className="bg-[#faf9f6] border-b border-stone-200/80 px-5 sm:px-8 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0f3d2e] text-[#f0d28d] flex items-center justify-center font-extrabold text-sm tracking-tight shrink-0">
                02
              </div>
              <div>
                <span className="block text-[11px] font-semibold tracking-wide text-[#e05638]">
                  현지 매니저 케어 &amp; 가이드 동행 옵션
                </span>
                <h2 className="text-base sm:text-[17px] font-bold text-[#10231b] tracking-tight">
                  한국어 가이드 및 실시간 현지 서포트 안내
                </h2>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1d6b4f]">
              <Headphones className="w-4 h-4 shrink-0" />
              <span>도착부터 출국까지 24시간 케어</span>
            </span>
          </div>

          <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-5 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/70 aspect-[16/10] lg:aspect-auto lg:min-h-[250px]">
              <img
                src="/assets/aistudio/_____24______9cc3137b.jpg"
                alt="매니저와 24시간 소통, 실시간 케어"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl p-4 sm:p-5 bg-emerald-50/50 border !border-emerald-200/80 flex flex-col gap-2.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#1d6b4f] shrink-0" />
                    <h3 className="text-[15px] font-bold text-[#10231b]">
                      기본 자유 골프 · 실시간 매니저 케어
                    </h3>
                  </div>
                  <p className="text-[13.5px] text-stone-700 leading-relaxed">
                    기본 상품은 별도 가이드가 동행하지 않는 실속 자유 골프 일정입니다. 전담 차량 기사가 이동을 책임지며, 태국 현지 골프 전문 매니저가 카카오톡·전화로 모든 일정과 돌발 상황을 실시간 컨트롤합니다.
                  </p>
                </div>

                <div className="rounded-2xl p-4 sm:p-5 bg-[#faf9f6] border border-stone-200/80 flex flex-col gap-2.5">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4.5 h-4.5 text-[#0f3d2e] shrink-0" />
                    <h3 className="text-[15px] font-bold text-[#10231b]">
                      매니저님(가이드) 전 일정 동행 요청
                    </h3>
                  </div>
                  <p className="text-[13.5px] text-stone-700 leading-relaxed">
                    비즈니스 라운딩, VIP 접대, 단체 모임 등으로 한국어 소통 전담 매니저(가이드)의 현장 동행을 원하실 경우 사전 문의 및 예약 접수 시 동행 옵션을 선택해 요청하실 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-stone-50 border border-stone-200/80 p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[13px] sm:text-[13.5px] text-stone-700">
                  <span className="inline-flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-[#1d6b4f] shrink-0" />
                    <span>
                      카카오톡 <strong className="text-stone-900">smw30103159</strong>
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-[#1d6b4f] shrink-0" />
                    <span>
                      현지 전화 <strong className="text-stone-900">+66 96 514 5747</strong>
                    </span>
                  </span>
                </div>

                {onOpenReservation && (
                  <button
                    type="button"
                    onClick={onOpenReservation}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0f3d2e] hover:bg-[#1d6b4f] text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>차량 · 가이드 동행 문의</span>
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.2]" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 03. 도착부터 귀국까지 차량 · 미팅 이용 순서 */}
        <div className="bg-white rounded-[24px] border border-stone-200/90 shadow-[0_6px_28px_rgba(15,61,46,0.04)] overflow-hidden">
          <div className="bg-[#faf9f6] border-b border-stone-200/80 px-5 sm:px-8 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#0f3d2e] text-[#f0d28d] flex items-center justify-center font-extrabold text-sm tracking-tight shrink-0">
                03
              </div>
              <div>
                <span className="block text-[11px] font-semibold tracking-wide text-[#e05638]">
                  공항 미팅부터 귀국 샌딩까지
                </span>
                <h2 className="text-base sm:text-[17px] font-bold text-[#10231b] tracking-tight">
                  일정 중 전용 차량 이용 절차
                </h2>
              </div>
            </div>

            {onGoToGuide && (
              <button
                type="button"
                onClick={() => onGoToGuide('airport-guide')}
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-stone-50 text-stone-800 hover:text-[#0f3d2e] border !border-[#c7c2b7] text-xs font-semibold transition-colors cursor-pointer shrink-0"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#1d6b4f] stroke-[2]" />
                <span>공항 미팅포인트 지도 보기</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#1d6b4f] stroke-[2.2]" />
              </button>
            )}
          </div>

          <div className="p-5 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {JOURNEY_STEPS.map((item) => (
              <div
                key={item.step}
                className="bg-[#faf9f6] rounded-2xl p-4.5 border border-stone-200/70 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold tracking-wider text-[#1d6b4f]">
                    {item.step}
                  </span>
                  <MapPin className="w-3.5 h-3.5 text-[#e05638]" />
                </div>
                <h3 className="text-[14.5px] font-bold text-[#10231b] leading-snug">
                  {item.title}
                </h3>
                <p className="text-[13px] text-stone-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
