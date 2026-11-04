import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/golfData';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';

interface HeaderProps {
  onOpenReservation: (packageId?: string) => void;
  activeView: 'interactive' | 'pdf';
  onToggleView: (view: 'interactive' | 'pdf') => void;
  onOpenKakaoPreview: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenReservation,
  activeView,
  onToggleView,
  onOpenKakaoPreview,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: '지역별 스코어카드', href: '#scorecard' },
    { label: '시즌 & 비용 가이드', href: '#season-guide' },
    { label: '골프 패키지 자료실', href: '#packages' },
    { label: '포함 및 참고사항', href: '#notes' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 sm:gap-6 h-20">
          {/* Zone 1: Brand wordmark & emblem badge */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <img
              src={COMPANY_INFO.logoShield}
              alt="BGIT Thai Shield Logo"
              className="h-12 w-auto object-contain drop-shadow-xs group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-800 transition-colors whitespace-nowrap">
                BGIT Thai
              </span>
              <span className="text-[11px] font-medium text-slate-500 whitespace-nowrap">
                태국 현지 골프 전문회사
              </span>
            </div>
          </a>

          {/* Zone 2: 4 Clean single-line nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-emerald-800 transition-colors whitespace-nowrap py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-emerald-700 hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Mode toggle & Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            {/* View Switcher: Interactive vs Exact PDF format */}
            <div className="hidden sm:flex items-center bg-stone-100 p-1 rounded-lg border border-stone-200 text-xs font-medium">
              <button
                type="button"
                onClick={() => onToggleView('interactive')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  activeView === 'interactive'
                    ? 'bg-white text-emerald-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                웹 반응형 모드
              </button>
              <button
                type="button"
                onClick={() => onToggleView('pdf')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  activeView === 'pdf'
                    ? 'bg-white text-emerald-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                PDF 서식 원본 뷰
              </button>
            </div>

            {/* Kakao Share Preview Button */}
            <button
              type="button"
              onClick={onOpenKakaoPreview}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 bg-[#FEE500] hover:bg-[#FDD800] text-[#191919] rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 shadow-2xs cursor-pointer"
              title="카카오톡 링크 공유 미리보기"
            >
              <span className="w-2 h-2 rounded-full bg-[#191919]" />
              <span>카카오 링크 공유</span>
            </button>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={() => onOpenReservation()}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>실시간 예약 및 견적</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 rounded-md"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-stone-200 space-y-3 bg-white">
            <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-lg text-xs font-medium mb-3">
              <button
                type="button"
                onClick={() => {
                  onToggleView('interactive');
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 py-1.5 rounded text-center ${
                  activeView === 'interactive'
                    ? 'bg-white text-emerald-900 font-semibold shadow-xs'
                    : 'text-stone-600'
                }`}
              >
                웹 반응형 모드
              </button>
              <button
                type="button"
                onClick={() => {
                  onToggleView('pdf');
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 py-1.5 rounded text-center ${
                  activeView === 'pdf'
                    ? 'bg-white text-emerald-900 font-semibold shadow-xs'
                    : 'text-stone-600'
                }`}
              >
                PDF 서식 원본 뷰
              </button>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 rounded-md"
              >
                {link.label}
              </a>
            ))}

            <button
              type="button"
              onClick={() => {
                onOpenKakaoPreview();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 bg-[#FEE500] text-[#191919] font-bold text-xs rounded-lg flex items-center justify-center gap-2"
            >
              <span>카카오톡 링크 공유 미리보기</span>
            </button>

            <div className="pt-2 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-500">
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>현지 직통: {COMPANY_INFO.telDisplay}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
