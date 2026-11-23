import React from 'react';
import { Sparkles, ShieldCheck, Car, Headphones } from 'lucide-react';

interface FeatureCardItem {
  id: string;
  image: string;
  imageAlt: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  descriptionHtml: string;
}

const FEATURE_CARDS: FeatureCardItem[] = [
  {
    id: 'agency',
    image: '/assets/features/bgit_feature_agency.jpg',
    imageAlt: '태국현지 골프여행 전문 랜드사',
    icon: ShieldCheck,
    title: '태국현지 골프여행 전문 랜드사',
    descriptionHtml:
      '한국 주요 여행사들이 신뢰하는 태국 골프 전문 랜드사 BGIT 무결점 현지 케어를 추구하여, <strong class="font-bold text-[#10231b]">한 번 다녀간 고객이 귀사의 단골이 되는 확실한 경쟁력</strong>을 만들어 드립니다.',
  },
  {
    id: 'vip-van',
    image: '/assets/features/bgit_feature_van.jpg',
    imageAlt: 'VIP 단독 전용차량 & 기사 풀서비스',
    icon: Car,
    title: 'VIP 단독 전용차량 & 기사 풀서비스',
    descriptionHtml:
      '공항에서 호텔, 골프장, 레스토랑까지 풍부한 경험의 베테랑 기사와 단독 차량이 배정되어, 타인과의 동승 없이 안전하고 프라이빗한 여정을 보장합니다.',
  },
  {
    id: 'manager-care',
    image: '/assets/features/bgit_feature_manager.jpg',
    imageAlt: '매니저와 24시간 소통, 실시간 케어',
    icon: Headphones,
    title: '매니저와 24시간 소통, 실시간 케어',
    descriptionHtml:
      '입국부터 출국까지, 현지 골프 전문 매니저가 전 일정을 실시간 소통을 통해 예기치 못한 돌발 상황에도 유연하게 대처하며, 라운딩의 모든 순간을 세심하게 케어합니다.',
  },
];

export const BgitSpecialFeatures: React.FC = () => {
  return (
    <section id="bgit-features" className="bg-white scroll-mt-24">
      <div className="max-w-[1156px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 sm:py-12 bg-[#faf9f6] border-y border-[#ede9df]/80">
          {/* Section Header with warm sparkle icon */}
          <div className="mb-6 sm:mb-8 flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200/80 flex items-center justify-center text-[#e05638] shrink-0">
              <Sparkles className="w-5.5 h-5.5 stroke-[2.2]" />
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#222222]">
              BGIT 태국현지 골프전문 랜드사는 이런점이 다릅니다
            </h2>
          </div>

          {/* 3 Distinctive Feature Cards matching aaaa.png */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {FEATURE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  className="bg-white rounded-[22px] sm:rounded-[24px] border border-[#e3dfd3] shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  {/* 16:9 Aspect ratio Image Header */}
                  <div className="w-full aspect-[16/9] overflow-hidden bg-stone-100 relative">
                    <img
                      src={card.image}
                      alt={card.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none"
                      loading="lazy"
                    />
                  </div>

                  {/* Floating Squircle Icon Badge overlapping the image seam */}
                  <div className="relative -mt-5.5 ml-5 sm:ml-6 z-10 w-11 h-11 rounded-2xl bg-[#eaf7f1] border border-[#bce4d4] flex items-center justify-center text-[#e05638] shadow-xs">
                    <Icon className="w-5.5 h-5.5 stroke-[2.2]" />
                  </div>

                  {/* Card Content */}
                  <div className="px-5 sm:px-6 pt-3 pb-6 flex-1 flex flex-col">
                    <h3 className="text-[17px] sm:text-[18px] font-black text-[#10231b] mb-2.5 tracking-tight leading-snug">
                      {card.title}
                    </h3>
                    <p
                      className="text-[13px] sm:text-[13.5px] text-[#5d6b64] leading-relaxed flex-1"
                      dangerouslySetInnerHTML={{ __html: card.descriptionHtml }}
                    />
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
