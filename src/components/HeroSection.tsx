import React, { useRef, useState, useEffect, useCallback } from 'react';
import { PackageCategory } from '../types/golf';
import {
  Users,
  Tag,
  Star,
  Gem,
  Palmtree,
  Building,
  Percent,
  Crown,
  Car,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenReservation?: () => void;
  onViewPdfMode?: () => void;
  onSelectCategory?: (category: PackageCategory | 'all') => void;
  activeCategory?: PackageCategory | 'all';
}

interface MobileMenuItem {
  id: string;
  label: string;
  subLabel: string;
  category?: PackageCategory;
  isGuide?: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <header className="md:hidden bg-[#f6f4ee] pt-4">
      <div className="max-w-[1156px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative text-white bg-gradient-to-br from-[#07231a] via-[#0c3527] to-[#134b37] px-5.5 py-5 rounded-[20px] overflow-hidden ring-1 ring-inset ring-white/12 shadow-[0_14px_34px_-8px_rgba(9,35,26,0.28)]">
          {/* Subtle top champagne hairline shimmer */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f0d28d]/45 to-transparent"
          />

          {/* Soft ambient corner glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-12 -right-10 w-44 h-44 rounded-full bg-[radial-gradient(circle,rgba(240,210,141,0.16)_0%,transparent_70%)]"
          />

          {/* Minimalist architectural fairway arc motif */}
          <svg
            aria-hidden="true"
            viewBox="0 0 120 120"
            fill="none"
            className="pointer-events-none absolute -right-4 -bottom-6 w-28 h-28 opacity-80"
          >
            <circle cx="96" cy="96" r="46" stroke="#f0d28d" strokeOpacity="0.12" strokeWidth="1" />
            <circle cx="96" cy="96" r="72" stroke="#f0d28d" strokeOpacity="0.08" strokeWidth="1" />
          </svg>

          <div className="relative z-10">
            {/* Main Title */}
            <h1 className="text-[clamp(20px,5.6vw,25px)] leading-[1.28] font-extrabold tracking-[-0.025em] text-white">
              태국현지 골프여행{' '}
              <em className="not-italic text-[#f3d692]">전문 랜딩사 BGIT</em>
            </h1>

            {/* Editorial hairline rule */}
            <div
              aria-hidden="true"
              className="w-10 h-[2px] rounded-full bg-gradient-to-r from-[#f0d28d] to-[#f0d28d]/15 my-3"
            />

            {/* Subtitle / Announcement */}
            <p className="text-[15px] font-semibold text-white leading-[1.55] tracking-[-0.015em]">
              한 번 다녀간 고객이 귀사의 단골이 되는{' '}
              <strong className="font-extrabold text-[#f6dfa4] underline decoration-[#f0d28d]/65 underline-offset-4">
                확실한 경쟁력
              </strong>
              을 만들어 드립니다!
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

interface MobileCategoryMenuProps {
  onSelectCategory?: (category: PackageCategory | 'all') => void;
  activeCategory?: PackageCategory | 'all';
}

export const MobileCategoryMenu: React.FC<MobileCategoryMenuProps> = ({
  onSelectCategory,
  activeCategory = 'women-join',
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 16);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 16);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [updateScrollState]);

  const handleScrollMenu = (direction: 'left' | 'right') => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === 'left' ? -180 : 180,
      behavior: 'smooth',
    });
  };

  const mobileMenuItems: MobileMenuItem[] = [
    { id: 'women-join', label: '여성', subLabel: '조인골프', category: 'women-join', icon: Users },
    { id: 'pattaya-value', label: '파타야', subLabel: '가성비', category: 'pattaya-value', icon: Tag },
    { id: 'pattaya-premium', label: '파타야', subLabel: '고품격', category: 'pattaya-premium', icon: Star },
    { id: 'pattaya-luxury', label: '파타야', subLabel: '럭셔리', category: 'pattaya-luxury', icon: Gem },
    { id: 'pattaya-poolvilla', label: '파타야', subLabel: '풀빌라', category: 'pattaya-poolvilla', icon: Palmtree },
    { id: 'pattaya-golftel', label: '파타야', subLabel: '골프텔', category: 'pattaya-golftel', icon: Building },
    { id: 'bangkok-value', label: '방콕', subLabel: '가성비', category: 'bangkok-value', icon: Percent },
    { id: 'bangkok-luxury', label: '방콕', subLabel: '럭셔리', category: 'bangkok-luxury', icon: Crown },
    { id: 'vehicle-guide', label: '차량', subLabel: '가이드', category: 'vehicle-guide', icon: Car },
    { id: 'guide', label: '여행', subLabel: '자료실', category: 'guide', isGuide: true, icon: BookOpen },
  ];

  const handleItemClick = (item: MobileMenuItem) => {
    if (item.category && onSelectCategory) {
      onSelectCategory(item.category);
    }
  };

  return (
    <section aria-label="모바일 골프 카테고리 메뉴" className="md:hidden bg-[#f6f4ee] pt-3.5 pb-0.5">
      <div className="max-w-[1156px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Horizontal Category Icons Scroller Card (Modern Emphasized White Style) */}
        <div className="relative bg-gradient-to-b from-white via-white to-[#f6f9f7] rounded-[20px] border-[1.5px] !border-[#0f3d2e]/45 overflow-hidden shadow-none">
          {/* Compact White Header Strip */}
          <div className="px-4 pt-3 pb-2 border-b border-stone-100 flex items-center justify-between">
            <span className="text-[13.5px] font-normal tracking-[-0.02em] text-[#0f3d2e]">
              골프 상품
            </span>
          </div>

          <div className="relative pt-3 pb-2.5">
            {/* Left Soft White Edge Scrim + Arrow (only rendered once scrolled right) */}
            {canScrollLeft && (
              <>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white via-white/90 to-transparent z-[5]"
                />
                <button
                  type="button"
                  onClick={() => handleScrollMenu('left')}
                  aria-label="이전 카테고리 보기"
                  className="absolute left-1.5 top-[39px] -translate-y-1/2 z-10 w-7.5 h-7.5 rounded-full bg-white/95 backdrop-blur-md border !border-stone-300/90 text-[#0f3d2e] shadow-[0_4px_12px_rgba(15,61,46,0.14)] flex items-center justify-center transition-all duration-200 cursor-pointer hover:bg-stone-50 active:scale-90 focus:outline-none"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[2.4]" />
                </button>
              </>
            )}

            <div
              ref={scrollerRef}
              onScroll={updateScrollState}
              className="flex gap-1.5 overflow-x-auto px-3.5 snap-x snap-mandatory scrollbar-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              role="navigation"
              aria-label="골프 카테고리 메뉴"
            >
              {mobileMenuItems.map((item) => {
                const Icon = item.icon;
                const isSelected = activeCategory === item.category;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleItemClick(item)}
                    className="flex-none w-[68px] py-1 snap-start flex flex-col items-center text-center cursor-pointer group focus:outline-none active:scale-[0.96] transition-transform duration-150"
                  >
                    <div
                      className={`w-[46px] h-[46px] mb-1.5 rounded-[15px] flex items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? 'bg-gradient-to-br from-[#0a2d21] via-[#0f3d2e] to-[#1d6b4f] text-white ring-1 ring-inset ring-white/25 shadow-[0_10px_20px_-5px_rgba(15,61,46,0.42)] -translate-y-0.5'
                          : 'bg-white border !border-stone-200/90 shadow-[0_2px_6px_rgba(0,0,0,0.04)] text-[#1d6b4f] group-hover:bg-emerald-50/40 group-hover:!border-emerald-300 group-hover:text-[#0f3d2e]'
                      }`}
                    >
                      <Icon
                        className={`w-[19px] h-[19px] transition-transform duration-200 ${
                          isSelected
                            ? 'text-white stroke-[2.2]'
                            : 'text-[#1d6b4f] stroke-[1.85] group-hover:scale-105'
                        }`}
                      />
                    </div>
                    <span
                      className={`block text-[12.5px] leading-[1.25] tracking-[-0.015em] transition-colors ${
                        isSelected
                          ? 'text-[#0f3d2e] font-extrabold'
                          : 'text-stone-700 font-semibold group-hover:text-[#0f3d2e]'
                      }`}
                    >
                      {item.label}
                      <br />
                      {item.subLabel}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`mt-1.5 h-[3px] rounded-full transition-all duration-200 ${
                        isSelected ? 'w-5 bg-[#0f3d2e]' : 'w-0 bg-transparent'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Soft White Edge Scrim + Arrow */}
            {canScrollRight && (
              <>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white via-white/90 to-transparent z-[5]"
                />
                <button
                  type="button"
                  onClick={() => handleScrollMenu('right')}
                  aria-label="다음 카테고리 보기"
                  className="absolute right-1.5 top-[39px] -translate-y-1/2 z-10 w-7.5 h-7.5 rounded-full bg-white/95 backdrop-blur-md border !border-stone-300/90 text-[#0f3d2e] shadow-[0_4px_12px_rgba(15,61,46,0.14)] flex items-center justify-center transition-all duration-200 cursor-pointer hover:bg-stone-50 active:scale-90 focus:outline-none"
                >
                  <ChevronRight className="w-4 h-4 stroke-[2.4]" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
