import React from 'react';
import { PackageCategory } from '../types/golf';
import { PattayaValueDetailsSection } from './PattayaValueDetailsSection';
import {
  PATTAYA_PREMIUM_HOTELS,
  PATTAYA_PREMIUM_GOLF_COURSES,
} from '../data/pattayaPremiumDetailsData';
import {
  PATTAYA_LUXURY_HOTELS,
  PATTAYA_LUXURY_GOLF_COURSES,
} from '../data/pattayaLuxuryDetailsData';
import {
  PATTAYA_POOLVILLA_HOTELS,
  PATTAYA_POOLVILLA_GOLF_COURSES,
} from '../data/pattayaPoolvillaDetailsData';
import {
  BANGKOK_VALUE_HOTELS,
  BANGKOK_VALUE_GOLF_COURSES,
} from '../data/bangkokValueDetailsData';
import {
  BANGKOK_LUXURY_HOTELS,
  BANGKOK_LUXURY_GOLF_COURSES,
} from '../data/bangkokLuxuryDetailsData';
import {
  PATTAYA_GOLFTEL_HOTELS,
  PATTAYA_GOLFTEL_GOLF_COURSES,
} from '../data/pattayaGolftelDetailsData';
import {
  WOMEN_JOIN_HOTELS,
  WOMEN_JOIN_GOLF_COURSES,
} from '../data/womenJoinDetailsData';

interface BgitDifferentiatorsProps {
  activeCategory?: PackageCategory | 'all';
  onGoToGuide?: (targetId?: 'tdac-guide' | 'airport-guide') => void;
}

export const BgitDifferentiators: React.FC<BgitDifferentiatorsProps> = ({
  activeCategory,
}) => {
  if (activeCategory === 'pattaya-value') {
    return (
      <section id="notes" className="pt-8 sm:pt-[1cm] pb-16 bg-[#f6f4ee] md:bg-stone-50">
        <div className="max-w-[1156px] mx-auto px-4 sm:px-6 lg:px-8">
          <PattayaValueDetailsSection />
        </div>
      </section>
    );
  }

  if (activeCategory === 'pattaya-premium') {
    return (
      <section id="notes" className="pt-8 sm:pt-[1cm] pb-16 bg-[#f6f4ee] md:bg-stone-50">
        <div className="max-w-[1156px] mx-auto px-4 sm:px-6 lg:px-8">
          <PattayaValueDetailsSection
            hotels={PATTAYA_PREMIUM_HOTELS}
            golfCourses={PATTAYA_PREMIUM_GOLF_COURSES}
          />
        </div>
      </section>
    );
  }

  if (activeCategory === 'pattaya-luxury') {
    return (
      <section id="notes" className="pt-8 sm:pt-[1cm] pb-16 bg-[#f6f4ee] md:bg-stone-50">
        <div className="max-w-[1156px] mx-auto px-4 sm:px-6 lg:px-8">
          <PattayaValueDetailsSection
            hotels={PATTAYA_LUXURY_HOTELS}
            golfCourses={PATTAYA_LUXURY_GOLF_COURSES}
          />
        </div>
      </section>
    );
  }

  if (activeCategory === 'pattaya-poolvilla') {
    return (
      <section id="notes" className="pt-8 sm:pt-[1cm] pb-16 bg-[#f6f4ee] md:bg-stone-50">
        <div className="max-w-[1156px] mx-auto px-4 sm:px-6 lg:px-8">
          <PattayaValueDetailsSection
            hotels={PATTAYA_POOLVILLA_HOTELS}
            golfCourses={PATTAYA_POOLVILLA_GOLF_COURSES}
          />
        </div>
      </section>
    );
  }

  if (activeCategory === 'bangkok-value') {
    return (
      <section id="notes" className="pt-8 sm:pt-[1cm] pb-16 bg-[#f6f4ee] md:bg-stone-50">
        <div className="max-w-[1156px] mx-auto px-4 sm:px-6 lg:px-8">
          <PattayaValueDetailsSection
            hotels={BANGKOK_VALUE_HOTELS}
            golfCourses={BANGKOK_VALUE_GOLF_COURSES}
          />
        </div>
      </section>
    );
  }

  if (activeCategory === 'bangkok-luxury') {
    return (
      <section id="notes" className="pt-8 sm:pt-[1cm] pb-16 bg-[#f6f4ee] md:bg-stone-50">
        <div className="max-w-[1156px] mx-auto px-4 sm:px-6 lg:px-8">
          <PattayaValueDetailsSection
            hotels={BANGKOK_LUXURY_HOTELS}
            golfCourses={BANGKOK_LUXURY_GOLF_COURSES}
          />
        </div>
      </section>
    );
  }

  if (activeCategory === 'pattaya-golftel') {
    return (
      <section id="notes" className="pt-8 sm:pt-[1cm] pb-16 bg-[#f6f4ee] md:bg-stone-50">
        <div className="max-w-[1156px] mx-auto px-4 sm:px-6 lg:px-8">
          <PattayaValueDetailsSection
            hotels={PATTAYA_GOLFTEL_HOTELS}
            golfCourses={PATTAYA_GOLFTEL_GOLF_COURSES}
          />
        </div>
      </section>
    );
  }

  if (activeCategory === 'women-join') {
    return (
      <section id="notes" className="pt-8 sm:pt-[1cm] pb-16 bg-[#f6f4ee] md:bg-stone-50">
        <div className="max-w-[1156px] mx-auto px-4 sm:px-6 lg:px-8">
          <PattayaValueDetailsSection
            hotels={WOMEN_JOIN_HOTELS}
            golfCourses={WOMEN_JOIN_GOLF_COURSES}
          />
        </div>
      </section>
    );
  }

  return null;
};
