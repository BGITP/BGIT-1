import React from 'react';
import { PackageCategory } from '../types/golf';

export interface NavMenuItem {
  id: number;
  label: string;
  type: 'category' | 'scroll';
  category?: PackageCategory;
  target?: string;
}

interface HeaderProps {
  onOpenReservation?: (packageId?: string) => void;
  onSelectCategory?: (category: PackageCategory | 'all') => void;
  activeCategory?: PackageCategory | 'all';
}

export const Header: React.FC<HeaderProps> = ({ onOpenReservation: _onOpenReservation }) => {
  return (
    <>
      {/* Top Header (Mobile + Desktop): Left-aligned Logo + Announcement */}
      <header className="relative z-40 bg-white">
        <div className="max-w-[1156px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between relative pt-3.5 sm:pt-4 pb-2 border-b border-stone-200">
            <div className="flex items-center gap-3 sm:gap-6">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2.5 group focus:outline-none shrink-0"
                title="BGIT Thai - 태국 골프 전문"
              >
                <img
                  src="/assets/aistudio/png____dde6085d.png"
                  alt="BGIT THAI Official Logo"
                  className="h-9 sm:h-12 md:h-[52px] w-auto object-contain mix-blend-multiply group-hover:scale-105 transition-transform select-none"
                  referrerPolicy="no-referrer"
                />
              </a>

              <div className="hidden md:flex flex-col justify-center border-l-[3px] border-stone-300 pl-5 py-0.5 min-w-0 translate-y-[7px]">
                <p className="text-[15px] font-semibold text-stone-800 leading-snug">
                  태국현지 골프여행 랜딩사
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
