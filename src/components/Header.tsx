import React, { useState, useEffect, useRef } from 'react';
import { COMPANY_INFO } from '../data/golfData';
import { Menu, X } from 'lucide-react';
import { PackageCategory } from '../types/golf';

export interface NavMenuItem {
  id: number;
  label: string;
  type: 'category' | 'scroll';
  category?: PackageCategory;
  target?: string;
}

interface HeaderProps {
  onOpenReservation: (packageId?: string) => void;
  onSelectCategory?: (category: PackageCategory | 'all') => void;
  activeCategory?: PackageCategory | 'all';
}

export const Header: React.FC<HeaderProps> = ({
  onOpenReservation,
  onSelectCategory,
  activeCategory = 'women-join',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<number>(1);
  const [isSticky, setIsSticky] = useState(false);
  const [navHeight, setNavHeight] = useState(45);

  const logoRowRef = useRef<HTMLDivElement>(null);
  const navBarRef = useRef<HTMLDivElement>(null);

  // Monitor scroll to fix menu bar at top when logo scrolls out of view
  useEffect(() => {
    const updateNavHeight = () => {
      if (navBarRef.current) {
        setNavHeight(navBarRef.current.offsetHeight);
      }
    };

    const updateSticky = () => {
      if (logoRowRef.current) {
        const rect = logoRowRef.current.getBoundingClientRect();
        setIsSticky(rect.bottom <= 0);
      } else {
        setIsSticky(window.scrollY > 80);
      }
    };

    updateNavHeight();
    updateSticky();

    window.addEventListener('scroll', updateSticky, { passive: true });
    window.addEventListener('resize', () => {
      updateNavHeight();
      updateSticky();
    });

    return () => {
      window.removeEventListener('scroll', updateSticky);
      window.removeEventListener('resize', updateSticky);
    };
  }, []);

  // Menu Items: BGIT button + categories + guide
  const navMenuItems: NavMenuItem[] = [
    { id: 0, label: 'BGIT', type: 'scroll', target: 'top' },
    { id: 1, label: '여성 조인골프', type: 'category', category: 'women-join' },
    { id: 2, label: '파타야 가성비', type: 'category', category: 'pattaya-value' },
    { id: 3, label: '파타야 고품격', type: 'category', category: 'pattaya-premium' },
    { id: 4, label: '파타야 럭셔리', type: 'category', category: 'pattaya-luxury' },
    { id: 5, label: '파타야 풀빌라', type: 'category', category: 'pattaya-poolvilla' },
    { id: 6, label: '파타야 골프텔', type: 'category', category: 'pattaya-golftel' },
    { id: 7, label: '방콕 가성비', type: 'category', category: 'bangkok-value' },
    { id: 8, label: '방콕 럭셔리', type: 'category', category: 'bangkok-luxury' },
    { id: 9, label: '입국신고서 / 미팅 / 일정', type: 'scroll', target: '#entry-meeting-schedule' },
  ];

  const handleMenuClick = (item: NavMenuItem) => {
    setActiveMenuId(item.id);
    setMobileMenuOpen(false);

    if (item.id === 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (item.type === 'category' && item.category) {
      if (onSelectCategory) {
        onSelectCategory(item.category);
      }
      const el = document.getElementById('packages');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (item.type === 'scroll' && item.target) {
      const el = document.querySelector(item.target) || document.getElementById('notes');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="bg-white">
      {/* Top Header Row: Left-aligned Logo matching content container */}
      <div ref={logoRowRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between relative pt-3 sm:pt-4 pb-2 sm:pb-3">
          {/* Brand Logo & Slogan */}
          <div className="flex items-center gap-3 sm:gap-4 pr-12 md:pr-0">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveMenuId(0);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center group focus:outline-none shrink-0"
              title="BGIT Thai - 태국 골프 전문"
            >
              <img
                src={COMPANY_INFO.badgeLogo}
                alt="BGIT Thai Official Logo"
                className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain group-hover:scale-105 transition-transform select-none"
                referrerPolicy="no-referrer"
              />
            </a>

            {/* Company Announcement */}
            <div className="hidden sm:flex flex-col justify-center border-l border-stone-200 pl-3 sm:pl-4 py-0.5">
              <p className="text-xs sm:text-[13px] md:text-sm font-medium text-stone-700 leading-snug">
                {COMPANY_INFO.announcement}
              </p>
            </div>
          </div>

          {/* Mobile Hamburger Toggle (Right-aligned) */}
          <div className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-md focus:outline-none"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Spacer to prevent layout shift when menu becomes fixed */}
      {isSticky && (
        <div
          style={{ height: `${navHeight}px` }}
          className="w-full pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Navigation Menus Bar:
          - Automatically becomes fixed at top-0 as user scrolls, following up & down reliably!
          - Bottom border matches content width (max-w-7xl)
      */}
      <div
        ref={navBarRef}
        className={`w-full bg-white/95 backdrop-blur-md transition-shadow ${
          isSticky
            ? 'fixed top-0 left-0 right-0 z-50 shadow-md border-b border-stone-200/80'
            : 'relative z-40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 border-b border-stone-200">
          <nav className="flex items-center justify-start lg:justify-center overflow-x-auto no-scrollbar scroll-smooth gap-4 sm:gap-6 md:gap-7 lg:gap-8 text-xs sm:text-sm md:text-[15px] font-normal text-stone-700 py-0">
            {navMenuItems.map((item) => {
              const isActive = activeMenuId === item.id;
              const isBgit = item.id === 0;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleMenuClick(item)}
                  className={`shrink-0 pt-2.5 pb-2 transition-all cursor-pointer relative whitespace-nowrap font-normal ${
                    isBgit
                      ? isActive
                        ? 'text-emerald-800 font-semibold'
                        : 'text-emerald-700 hover:text-emerald-900 font-medium'
                      : isActive
                      ? 'text-black'
                      : 'text-stone-700 hover:text-black'
                  }`}
                >
                  <span className="block px-0.5">{item.label}</span>
                  {/* Active bottom underline */}
                  {isActive ? (
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-[1.5px] ${
                        isBgit ? 'bg-emerald-800' : 'bg-black'
                      }`}
                    />
                  ) : (
                    <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-transparent group-hover:bg-stone-200 transition-colors" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile Dropdown Menu (fixed under the sticky bar) */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-b border-stone-200 space-y-1 bg-white px-4 shadow-lg animate-in fade-in duration-150 max-h-[75vh] overflow-y-auto">
            <div className="px-1 py-1 text-[11px] font-medium text-stone-400 uppercase tracking-wider">
              메뉴 바로가기 (10)
            </div>
            <div className="grid grid-cols-1 divide-y divide-stone-100">
              {navMenuItems.map((item, idx) => {
                const isActive = activeMenuId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleMenuClick(item)}
                    className={`w-full text-left py-2.5 px-2 text-sm font-normal flex items-center justify-between transition-colors ${
                      isActive
                        ? 'text-black bg-stone-50 font-medium'
                        : 'text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[11px] text-stone-400">0{idx + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
