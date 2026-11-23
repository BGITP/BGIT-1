import React from 'react';
import { ShieldCheck, Car, Headphones } from 'lucide-react';

interface BannerItem {
  id: string;
  image: string;
  alt: string;
  titleLine1: string;
  titleLine2: string;
}

interface DesktopFeatureCard {
  id: string;
  image: string;
  imageAlt: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: React.ReactNode;
}

const BANNER_ITEMS: BannerItem[] = [
  {
    id: 'thai-golf-course',
    image: '/assets/aistudio/_________________________e26f2d1b.jpg',
    alt: '최고의 품질, 가장 낮은 가격으로 공급합니다',
    titleLine1: '최고의 품질,',
    titleLine2: '가장 낮은 가격으로 공급합니다',
  },
  {
    id: 'vip-protocol',
    image: '/assets/aistudio/______________________d239628d.jpg',
    alt: '이동의 순간까지 라운드의 일부가 됩니다',
    titleLine1: '이동의 순간까지',
    titleLine2: '라운드의 일부가 됩니다',
  },
  {
    id: 'manager-24h',
    image: '/assets/aistudio/_______________24_________50805880.jpg',
    alt: '처음부터 끝까지 빈틈없이 24시간 완벽 케어',
    titleLine1: '처음부터 끝까지 빈틈없이',
    titleLine2: '24시간 완벽 케어',
  },
];

const DESKTOP_FEATURE_CARDS: DesktopFeatureCard[] = [
  {
    id: 'agency',
    image: '/assets/aistudio/1212_28075d46.jpg',
    imageAlt: '태국현지 골프여행 전문 랜딩사',
    icon: ShieldCheck,
    title: '태국현지 골프여행 전문 랜딩사',
    description: (
      <>
        한국 주요 여행사들이 신뢰하는 태국 골프 전문 랜드사 BGIT
        <br />
        무결점 현지 케어를 추구하여,{' '}
        <strong className="font-bold text-[#10231b]">
          한 번 다녀간 고객이 귀사의 단골이 되는 확실한 경쟁력
        </strong>
        을 만들어 드립니다.
      </>
    ),
  },
  {
    id: 'vip-van',
    image: '/assets/aistudio/________b9162fbf.jpg',
    imageAlt: 'VIP 단독 전용차량 & 기사 풀서비스',
    icon: Car,
    title: 'VIP 단독 전용차량 & 기사 풀서비스',
    description:
      '공항에서 호텔, 골프장, 레스토랑까지 풍부한 경험의 베테랑 기사와 단독 차량이 배정되어, 타인과의 동승 없이 안전하고 프라이빗한 여정을 보장합니다.',
  },
  {
    id: 'manager-care',
    image: '/assets/aistudio/_____24______9cc3137b.jpg',
    imageAlt: '매니저와 24시간 소통, 실시간 케어',
    icon: Headphones,
    title: '매니저와 24시간 소통, 실시간 케어',
    description:
      '입국부터 출국까지, 현지 골프 전문 매니저가 전 일정을 실시간 소통을 통해 예기치 못한 돌발 상황에도 유연하게 대처하며, 라운딩의 모든 순간을 세심하게 케어합니다.',
  },
];

export const HeaderBannerStrip: React.FC = () => {
  return (
    <section
      aria-label="BGIT 핵심 서비스 배너"
      className="bg-[#f6f4ee] md:bg-white pt-4 sm:pt-5 md:pt-7 pb-1 md:pb-4"
    >
      <div className="max-w-[1156px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Only: 기존 3단 배너 유지 */}
        <div className="grid grid-cols-1 gap-3.5 md:hidden">
          {BANNER_ITEMS.map((item) => (
            <div
              key={item.id}
              className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#10231b] shadow-[0_6px_20px_rgba(15,61,46,0.08)] group"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03] select-none"
                referrerPolicy="no-referrer"
              />

              {/* Left & bottom contrast scrims for crisp text legibility */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-[#091c15]/85 via-[#091c15]/40 to-transparent"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#091c15]/75 via-transparent to-transparent"
              />

              {/* Title anchored on the left inside the image */}
              <div className="absolute inset-y-0 left-0 flex flex-col justify-end p-4 sm:p-5 max-w-[78%]">
                <h2 className="text-[15px] sm:text-[16px] font-extrabold text-white leading-[1.35] tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">
                  <span className="block">{item.titleLine1}</span>
                  <span className="block text-[#f0d28d]">{item.titleLine2}</span>
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Only: 홈페이지 변경사항 스타일 + 첨부 사진 적용 */}
        <div className="hidden md:block">
          <div className="mb-6 flex items-center gap-2.5">
            <h2 className="text-[20px] font-bold text-[#222222] tracking-tight">
              BGIT 태국현지 골프전문 랜드사는 이런점이 다릅니다
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-5 lg:gap-6">
            {DESKTOP_FEATURE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  className="bg-white rounded-[14px] border border-[#e3dfd3] shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  <div className="w-full aspect-[16/9] overflow-hidden bg-stone-100 relative">
                    <img
                      src={card.image}
                      alt={card.imageAlt}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03] select-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="relative -mt-6 ml-5 z-10 w-12 h-12 rounded-2xl bg-[#d6ece2] border-[3px] border-white flex items-center justify-center text-[#e05638] shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                    <Icon className="w-5.5 h-5.5 stroke-[2.2]" />
                  </div>

                  <div className="px-5 pt-3 pb-6 flex-1 flex flex-col">
                    <h3 className="text-[18px] font-black text-[#10231b] mb-2.5 tracking-tight leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-[14.5px] text-[#5d6b64] leading-relaxed flex-1">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
