import React from 'react';
import { Video } from 'lucide-react';

export const YouTubeShortsSection: React.FC = () => {
  return (
    <div className="mt-4 sm:mt-6 mb-0 pt-0">
      {/* Section Header */}
      <div className="mb-5 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-[#222222] flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200/80 flex items-center justify-center text-[#e05638] shrink-0">
            <Video className="w-5.5 h-5.5 stroke-[2.2]" />
          </span>
          <span>태국 현지 여성 골퍼 스윙 하이라이트</span>
        </h3>
      </div>
    </div>
  );
};
