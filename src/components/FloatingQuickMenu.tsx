import React, { useState, useEffect, useRef } from 'react';
import { PackageCategory } from '../types/golf';
import {
  X,
  Compass,
  ArrowUp,
  CloudSun,
  ShieldCheck,
  Plane,
  ChevronRight,
  Sparkles,
  Users,
  BadgePercent,
  Award,
  Crown,
  Palmtree,
  Building2,
  Flag,
  Gem,
  Car,
  FileText,
} from 'lucide-react';

interface FloatingQuickMenuProps {
  onSelectCategory: (category: PackageCategory) => void;
  onOpenReservation?: (packageId?: string) => void;
  onGoToGuide?: (targetId?: 'tdac-guide' | 'airport-guide') => void;
  activeCategory?: PackageCategory | 'all';
}

export const FloatingQuickMenu: React.FC<FloatingQuickMenuProps> = ({
  onSelectCategory,
  onGoToGuide,
  activeCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lastScrollY = useRef(0);
  const stackRef = useRef<HTMLDivElement>(null);
  const targetOffsetRef = useRef(0);
  const currentOffsetRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef(0);
  const isOpenRef = useRef(isOpen);
  const menuRef = useRef<HTMLDivElement>(null);

  // Categories list with modern vector icons (인기, 실속, 최상급 텍스트 배지 모두 삭제 완료)
  const menuCategories: {
    id: PackageCategory;
    label: string;
    en: string;
    icon: React.ComponentType<{ className?: string }>;
    iconColor: string;
    iconBg: string;
  }[] = [
    {
      id: 'women-join',
      label: '여성 조인골프',
      en: 'JOIN',
      icon: Users,
      iconColor: 'text-[#10b981]',
      iconBg: 'bg-emerald-500/15',
    },
    {
      id: 'pattaya-value',
      label: '파타야 가성비',
      en: 'VALUE',
      icon: BadgePercent,
      iconColor: 'text-[#059669]',
      iconBg: 'bg-emerald-600/15',
    },
    {
      id: 'pattaya-premium',
      label: '파타야 고품격',
      en: 'PREMIUM',
      icon: Award,
      iconColor: 'text-[#d97706]',
      iconBg: 'bg-amber-500/15',
    },
    {
      id: 'pattaya-luxury',
      label: '파타야 럭셔리',
      en: 'VIP',
      icon: Crown,
      iconColor: 'text-[#eab308]',
      iconBg: 'bg-amber-400/20',
    },
    {
      id: 'pattaya-poolvilla',
      label: '파타야 풀빌라',
      en: 'VILLA',
      icon: Palmtree,
      iconColor: 'text-[#0d9488]',
      iconBg: 'bg-teal-500/15',
    },
    {
      id: 'pattaya-golftel',
      label: '파타야 골프텔',
      en: 'GOLF-TEL',
      icon: Building2,
      iconColor: 'text-[#2563eb]',
      iconBg: 'bg-blue-500/15',
    },
    {
      id: 'bangkok-value',
      label: '방콕 가성비',
      en: 'BANGKOK',
      icon: Flag,
      iconColor: 'text-[#047857]',
      iconBg: 'bg-emerald-700/15',
    },
    {
      id: 'bangkok-luxury',
      label: '방콕 럭셔리',
      en: 'VIP BKK',
      icon: Gem,
      iconColor: 'text-[#8b5cf6]',
      iconBg: 'bg-purple-500/15',
    },
    {
      id: 'vehicle-guide',
      label: '차량.가이드',
      en: 'VEHICLE',
      icon: Car,
      iconColor: 'text-[#0f3d2e]',
      iconBg: 'bg-emerald-500/15',
    },
    {
      id: 'guide',
      label: '여행 자료실',
      en: 'GUIDE',
      icon: FileText,
      iconColor: 'text-[#64748b]',
      iconBg: 'bg-slate-500/15',
    },
  ];

  useEffect(() => {
    isOpenRef.current = isOpen;
    if (isOpen) {
      targetOffsetRef.current = 0;
    }
  }, [isOpen]);

  // Scroll listener for scroll-to-top button and slow, silky scroll-only floating motion
  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const animateStep = (now: number) => {
      const dt = lastFrameTimeRef.current
        ? Math.min((now - lastFrameTimeRef.current) / 16.667, 2.5)
        : 1;
      lastFrameTimeRef.current = now;

      // Gentle decay toward rest (0) and slow viscous follow
      targetOffsetRef.current *= Math.pow(0.955, dt);
      currentOffsetRef.current +=
        (targetOffsetRef.current - currentOffsetRef.current) *
        (1 - Math.pow(1 - 0.055, dt));

      if (stackRef.current) {
        stackRef.current.style.transform = `translate3d(0, ${currentOffsetRef.current.toFixed(2)}px, 0)`;
      }

      if (
        Math.abs(targetOffsetRef.current) < 0.03 &&
        Math.abs(currentOffsetRef.current) < 0.03
      ) {
        targetOffsetRef.current = 0;
        currentOffsetRef.current = 0;
        if (stackRef.current) {
          stackRef.current.style.transform = 'translate3d(0, 0px, 0)';
        }
        rafIdRef.current = null;
        lastFrameTimeRef.current = 0;
        return;
      }

      rafIdRef.current = window.requestAnimationFrame(animateStep);
    };

    const startAnimation = () => {
      if (rafIdRef.current === null) {
        lastFrameTimeRef.current = 0;
        rafIdRef.current = window.requestAnimationFrame(animateStep);
      }
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      lastScrollY.current = currentY;
      setShowScrollTop(currentY > 350);

      if (!isOpenRef.current && Math.abs(delta) >= 1) {
        targetOffsetRef.current = Math.max(
          -10,
          Math.min(10, targetOffsetRef.current - delta * 0.055)
        );
        startAnimation();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Scroll to top
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to category
  const handleCategoryClick = (catId: PackageCategory) => {
    onSelectCategory(catId);
    setIsOpen(false);
    const target = document.getElementById('packages');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Navigate to section
  const handleScrollToSection = (sectionId: string) => {
    setIsOpen(false);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Navigate directly to 태국 입국 전자카드 (TDAC) 작성 방법 (#tdac-guide)
  const handleGoToTdacGuide = () => {
    setIsOpen(false);
    if (onGoToGuide) {
      onGoToGuide('tdac-guide');
      return;
    }
    onSelectCategory('guide');
    setTimeout(() => {
      const target = document.getElementById('tdac-guide') || document.getElementById('packages');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <>

      {/* Floating Menu Container (Bottom-right corner) */}
      <div
        ref={menuRef}
        className="fixed z-50 bottom-6 sm:bottom-8 right-4 sm:right-6 flex items-end pointer-events-none print:hidden"
      >
        {/* Expanded Quick Navigation Panel */}
        {isOpen && (
          <div className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center px-3 sm:items-end sm:justify-end sm:pb-8 sm:pr-24">
            <div className="pointer-events-auto w-full max-w-[390px] max-h-[82vh] bg-white/98 backdrop-blur-xl border border-[#0f3d2e]/20 rounded-[28px] shadow-[0_22px_60px_rgba(15,61,46,0.30)] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-[#0c3a2c] to-[#1d6b4f] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center text-[#f0d28d] shrink-0">
                  <Compass className="w-5.5 h-5.5 animate-spin-slow" />
                </div>
                <div>
                  <h3 className="text-base sm:text-[17px] font-black tracking-tight leading-snug">BGIT 빠른 바로가기</h3>
                  <p className="text-xs text-white/80 font-normal">원하시는 메뉴로 즉시 이동합니다</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/90 hover:text-white transition-colors cursor-pointer"
                title="닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs scrollbar-thin">
              {/* 1. 골프 상품 및 코스 (9개 카테고리) */}
              <div>
                <div className="text-xs sm:text-[13px] font-extrabold text-[#b8924a] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#b8924a]" />
                  <span>골프 상품 카테고리 (9선)</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {menuCategories.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    const IconComponent = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleCategoryClick(cat.id)}
                        className={`py-3 px-3 sm:px-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 group shadow-2xs ${
                          isActive
                            ? 'bg-[#0f3d2e] text-[#f0d28d] border-[#0f3d2e] shadow-xs'
                            : 'bg-stone-50/90 hover:bg-[#1d6b4f]/10 text-stone-900 border-[#e3dfd3] hover:border-[#1d6b4f]/40'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                            isActive
                              ? 'bg-[#f0d28d]/20 text-[#f0d28d]'
                              : `${cat.iconBg} ${cat.iconColor}`
                          }`}
                        >
                          <IconComponent className="w-4.5 h-4.5 stroke-[2.2]" />
                        </div>
                        <span className="font-bold text-[14.5px] sm:text-[15px] truncate tracking-tight">
                          {cat.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. 주요 안내 섹션 */}
              <div>
                <div className="text-xs sm:text-[13px] font-extrabold text-[#5d6b64] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-[#1d6b4f]" />
                  <span>주요 안내 섹션</span>
                </div>
                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={handleGoToTdacGuide}
                    className="w-full py-4 px-4 rounded-2xl bg-stone-50 hover:bg-emerald-50/70 border border-[#e3dfd3] hover:border-[#1d6b4f]/40 text-stone-900 font-medium flex items-center justify-between transition-colors cursor-pointer text-left shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <Plane className="w-6 h-6 text-[#1d6b4f] shrink-0" />
                      <span className="font-bold text-[15px] sm:text-[15.5px]">TDAC 입국신고서 & 미팅 포인트</span>
                    </div>
                    <ChevronRight className="w-4.5 h-4.5 text-stone-400 shrink-0" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleScrollToSection('notes')}
                    className="w-full py-4 px-4 rounded-2xl bg-stone-50 hover:bg-emerald-50/70 border border-[#e3dfd3] hover:border-[#1d6b4f]/40 text-stone-900 font-medium flex items-center justify-between transition-colors cursor-pointer text-left shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-6 h-6 text-[#1d6b4f] shrink-0" />
                      <span className="font-bold text-[15px] sm:text-[15.5px]">포함·불포함 사항 & 투어 규정</span>
                    </div>
                    <ChevronRight className="w-4.5 h-4.5 text-stone-400 shrink-0" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleScrollToSection('weather-climate')}
                    className="w-full py-4 px-4 rounded-2xl bg-stone-50 hover:bg-emerald-50/70 border border-[#e3dfd3] hover:border-[#1d6b4f]/40 text-stone-900 font-medium flex items-center justify-between transition-colors cursor-pointer text-left shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <CloudSun className="w-6 h-6 text-[#1d6b4f] shrink-0" />
                      <span className="font-bold text-[15px] sm:text-[15.5px]">태국 월별 기후 & 라운드 시뮬레이터</span>
                    </div>
                    <ChevronRight className="w-4.5 h-4.5 text-stone-400 shrink-0" />
                  </button>
                </div>
              </div>


            </div>
            </div>
          </div>
        )}

        {/* Speed-Dial Button Stack (glides slowly and naturally only while scrolling) */}
        <div
          ref={stackRef}
          className="relative z-20 pointer-events-auto flex flex-col items-center will-change-transform"
        >
          {/* Scroll To Top Button (Appears above when scrolled down without shifting vertical center) */}
          {showScrollTop && (
            <button
              type="button"
              onClick={handleScrollToTop}
              className="absolute bottom-full mb-2.5 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-stone-800 hover:text-[#0f3d2e] hover:bg-stone-50 border border-[#e3dfd3] shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
              title="맨 위로 이동"
            >
              <ArrowUp className="w-4.5 h-4.5 stroke-[2.5]" />
            </button>
          )}

          {/* Main Floating Menu Button (White circular button with modern icon, scroll-only motion) */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? '메뉴 닫기' : '메뉴모음 열기'}
            className="group relative inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-stone-50 text-stone-800 hover:text-[#0f3d2e] border border-[#e3dfd3] shadow-[0_8px_24px_rgba(15,61,46,0.14),0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_28px_rgba(15,61,46,0.20),0_4px_12px_rgba(0,0,0,0.12)] hover:scale-105 transition-[background-color,color,box-shadow,transform] duration-250 ease-out cursor-pointer active:scale-95"
            title={isOpen ? '메뉴 닫기' : '메뉴모음 열기'}
          >
            {isOpen ? (
              <X className="w-5 h-5 text-stone-800 stroke-[2.2]" />
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5 text-stone-800 group-hover:text-[#0f3d2e] transition-colors"
                aria-hidden="true"
              >
                <rect
                  x="3.5"
                  y="3.5"
                  width="7"
                  height="7"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <rect
                  x="13.5"
                  y="3.5"
                  width="7"
                  height="7"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <rect
                  x="3.5"
                  y="13.5"
                  width="7"
                  height="7"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <rect
                  x="13.5"
                  y="13.5"
                  width="7"
                  height="7"
                  rx="3.5"
                  fill="#1d6b4f"
                  fillOpacity="0.16"
                  stroke="#1d6b4f"
                  strokeWidth="2"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  );
};
