import React from 'react';
import { FAQ_SEASON_AND_COST } from '../data/golfData';
import { HelpCircle, DollarSign, Sun } from 'lucide-react';

export const SeasonCostGuide: React.FC = () => {
  return (
    <section id="season-guide" className="py-12 sm:py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header strictly matching PDF & Screenshot */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            Season & Cost Guide
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-2">
            시즌과 비용, 이것만 알면 됩니다
          </h2>
          <p className="text-stone-500 text-sm sm:text-base">
            처음 가는 분들이 가장 많이 묻는 세 가지
          </p>
        </div>

        {/* 3 Core Questions matching PDF exactly */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FAQ_SEASON_AND_COST.map((faq, index) => {
            const icons = [
              <Sun key="1" className="w-5 h-5 text-amber-600" />,
              <DollarSign key="2" className="w-5 h-5 text-emerald-700" />,
              <HelpCircle key="3" className="w-5 h-5 text-indigo-600" />,
            ];

            return (
              <div
                key={index}
                className="bg-white p-6 sm:p-7 rounded-xl border border-stone-200/90 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-4 bg-emerald-700 rounded-full" />
                    <h3 className="text-lg font-bold text-stone-900 tracking-tight">
                      {faq.question}
                    </h3>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed font-normal">
                    {faq.answer}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                  <span>Q.0{index + 1} 핵심 가이드</span>
                  {icons[index]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
