import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/golfData';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { PackageCategory } from '../types/golf';

interface HeaderProps {
  onOpenReservation: (packageId?: string) => void;
  onSelectCategory?: (category: PackageCategory | 'all') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenReservation,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 9 Nav Menu Items requested by the user
  const navMenuItems = [
    { id: 1, label: '지역별 스코어카드', type: 'scroll', target: '#scorecard' },
    { id: 2, label: '시즌 & 비용', type: 'scroll', target: '#season-guide' },
    { id: 3, label: '파타야 가성비', type: 'category', category: 'pattaya-value' as PackageCategory },
    { id: 4, label: '파타야 럭셔리', type: 'category', category: 'pattaya-luxury' as PackageCategory },
    { id: 5, label: '파타야 풀빌라', type: 'category', category: 'pattaya-poolvilla' as PackageCategory },
    { id: 6, label: '방콕 가성비', type: 'category', category: 'bangkok-value' as PackageCategory },
    { id: 7, label: '방콕 럭셔리', type: 'category', category: 'bangkok-luxury' as PackageCategory },
    { id: 8, label: '포함 및 참고사항', type: 'scroll', target: '#notes' },
    { id: 9, label: '실시간 예약문의', type: 'action', action: 'reservation' },
  ];

  const handleMenuClick = (item: typeof navMenuItems[0]) => {
    setMobileMenuOpen(false);

    if (item.type === 'action' && item.action === 'reservation') {
      onOpenReservation();
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
      const el = document.querySelector(item.target) || document.getElementById('packages');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 h-20">
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 group">
            <img
              src={COMPANY_INFO.badgeLogo}
              alt="BGIT Thai Official Logo"
              className="h-10 sm:h-12 w-auto object-contain drop-shadow-xs group-hover:scale-102 transition-transform rounded"
              referrerPolicy="no-referrer"
            />
            <div className="hidden xl:flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-800 transition-colors whitespace-nowrap">
                BGIT Thai
              </span>
              <span className="text-[10px] font-medium text-slate-500 whitespace-nowrap">
                태국 현지 골프 전문회사
              </span>
            </div>
          </a>

          {/* 9 Navigation Menus (Desktop & Large Screens) */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 text-xs xl:text-sm font-semibold text-slate-700">
            {navMenuItems.map((item) => {
              const isAction = item.type === 'action';
              return isAction ? (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleMenuClick(item)}
                  className="ml-1 px-3 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold transition-all whitespace-nowrap shadow-xs cursor-pointer flex items-center gap-1"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              ) : (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleMenuClick(item)}
                  className="px-2.5 xl:px-3 py-1.5 rounded-md hover:text-emerald-800 hover:bg-stone-50 transition-colors whitespace-nowrap cursor-pointer text-slate-700"
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Hamburger Toggle (for mobile screens) */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-900 rounded-md focus:outline-none"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown: 9 Menus List */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-stone-200 space-y-1 bg-white">
            <div className="px-3 py-1 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
              전체 메뉴 (9)
            </div>
            {navMenuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleMenuClick(item)}
                className={`w-full text-left px-3 py-2.5 text-xs sm:text-sm font-semibold rounded-md flex items-center justify-between transition-colors ${
                  item.type === 'action'
                    ? 'bg-emerald-800 text-white font-bold my-1'
                    : 'text-stone-700 hover:bg-stone-50 hover:text-emerald-800'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-[10px] text-stone-400 opacity-60">0{item.id}</span>
              </button>
            ))}

            <div className="pt-2 border-t border-stone-100 px-3 flex items-center justify-between text-xs text-stone-500">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span>현지 직통: {COMPANY_INFO.telDisplay}</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
