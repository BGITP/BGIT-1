import React from 'react';
import { BGIT_DIFFERENTIATORS } from '../data/golfData';
import { Sparkles, ShieldCheck, Users, Car } from 'lucide-react';
import { MonthWeatherPicker } from './MonthWeatherPicker';

export const BgitSpecialFeatures: React.FC = () => {
  return (
    <section id="bgit-features" className="pt-[1cm] pb-10 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 1. BGIT Differentiators */}
        <div>
          {/* Section Header - Exactly matching reference image left position */}
          <div className="mb-6">
            <div className="pl-7 mb-1.5">
              <span className="text-xs sm:text-[13px] font-semibold text-[#007a55] tracking-wider uppercase">
                BGIT Differentiators
              </span>
            </div>
            {/* Main Title with Icon */}
            <h3 className="text-lg sm:text-xl font-bold text-[#222222] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#007a55] shrink-0" />
              <span>BGIT 태국현지 골프전문 여행사는 이런점이 다릅니다</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BGIT_DIFFERENTIATORS.map((diff, index) => (
              <div
                key={index}
                className="p-5 bg-white rounded-xl border border-stone-200 flex flex-col justify-between shadow-2xs hover:border-[#d0fae5] transition-colors"
              >
                <div>
                  {index === 0 ? (
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-sm mb-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-800" />
                    </div>
                  ) : index === 1 ? (
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-sm mb-3">
                      <Car className="w-5 h-5 text-emerald-800" />
                    </div>
                  ) : index === 2 ? (
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-sm mb-3">
                      <Users className="w-5 h-5 text-emerald-800" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm mb-3">
                      0{index + 1}
                    </div>
                  )}
                  <h4 className="text-base font-bold text-stone-900 mb-2">
                    {diff.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {diff.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Month & Weather Simulator inside section#bgit-features */}
        <MonthWeatherPicker />
      </div>
    </section>
  );
};
