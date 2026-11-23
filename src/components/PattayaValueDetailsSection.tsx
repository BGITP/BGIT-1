import React, { useState } from 'react';
import {
  PATTAYA_VALUE_HOTELS,
  PATTAYA_VALUE_GOLF_COURSES,
} from '../data/pattayaValueDetailsData';
import {
  Building2,
  Flag,
  Globe,
  Images,
  BedDouble,
  Wallet,
  Utensils,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const PattayaValueDetailsSection: React.FC = () => {
  const [expandedHotels, setExpandedHotels] = useState<Record<string, boolean>>({});
  const [expandedCourses, setExpandedCourses] = useState<Record<string, boolean>>({});

  const toggleHotelExpand = (id: string) => {
    setExpandedHotels((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleCourseExpand = (id: string) => {
    setExpandedCourses((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-12">
      {/* 1. 호텔 정보 / 홈페이지 / 사진다운로드 */}
      <div>
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-[#222222] flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-[#1d6b4f] shrink-0">
              <Building2 className="w-5 h-5 stroke-[2.2]" />
            </span>
            <span className="whitespace-pre-wrap">호텔 정보  홈페이지  사진다운로드</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {PATTAYA_VALUE_HOTELS.map((hotel) => {
            const isExpanded = Boolean(expandedHotels[hotel.id]);

            return (
              <article
                key={hotel.id}
                className="bg-white rounded-2xl border border-[#e3dfd3] hover:border-[#d0fae5] transition-colors shadow-xs overflow-hidden p-4 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3.5 sm:gap-4 items-start h-full"
              >
                {/* Compact Photo & Action Buttons */}
                <div className="w-full sm:w-[200px] md:w-full lg:w-[176px] xl:w-[192px] shrink-0 flex flex-col gap-2">
                  <div className="w-full h-[182px] sm:h-[186px] md:h-[198px] lg:h-[170px] xl:h-[178px] rounded-xl bg-stone-100 relative overflow-hidden">
                    <img
                      src={hotel.image}
                      alt={`${hotel.name} (${hotel.englishName})`}
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 w-full">
                    <a
                      href={hotel.homepageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-white hover:bg-stone-50 text-stone-800 hover:text-[#0f3d2e] border !border-[#c7c2b7] text-[11px] xl:text-[11.5px] font-normal transition-colors whitespace-nowrap"
                    >
                      <Globe className="w-3.5 h-3.5 text-[#1d6b4f] stroke-[2] shrink-0" />
                      <span>홈페이지</span>
                    </a>
                    <a
                      href={hotel.photoDownloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-1 px-2 xl:px-2.5 py-1.5 rounded-lg bg-white hover:bg-stone-50 text-stone-800 hover:text-[#0f3d2e] border !border-[#c7c2b7] text-[11px] xl:text-[11.5px] font-normal transition-colors whitespace-nowrap"
                    >
                      <Images className="w-3.5 h-3.5 stroke-[2] shrink-0 text-[#1d6b4f]" />
                      <span>사진다운로드</span>
                    </a>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 w-full h-full flex flex-col gap-2">
                  <div className="flex flex-wrap items-start justify-between gap-2 pb-2 border-b border-stone-100">
                    <div>
                      <h3 className="text-[15.5px] xl:text-[16px] font-bold text-stone-900 leading-snug">
                        {hotel.name}{' '}
                        <span className="text-black font-semibold">· {hotel.grade}</span>
                      </h3>
                      <p className="text-[12.5px] font-medium text-stone-500 mt-0.5">
                        {hotel.englishName}
                      </p>
                    </div>
                  </div>

                  {hotel.rateInfo && (
                    <div className="py-0.5 text-[14.5px] xl:text-[15.5px] font-semibold text-[#0f3d2e] leading-relaxed whitespace-pre-wrap">
                      {hotel.rateInfo}
                    </div>
                  )}

                  <p
                    className={`text-[13px] xl:text-[13.5px] text-stone-700 leading-relaxed ${
                      isExpanded ? '' : 'line-clamp-2'
                    }`}
                  >
                    {hotel.description}
                  </p>

                  {isExpanded && (
                    <div className="pt-2.5 border-t border-stone-100 flex items-center gap-2 text-[13px] sm:text-[13.5px] text-stone-800">
                      <BedDouble className="w-4 h-4 text-[#1d6b4f] shrink-0" />
                      <span className="font-semibold text-stone-900">기본객실 :</span>
                      <span>{hotel.roomInfo}</span>
                    </div>
                  )}

                  <div className="mt-auto pt-0.5">
                    <button
                      type="button"
                      onClick={() => toggleHotelExpand(hotel.id)}
                      aria-expanded={isExpanded}
                      className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#1d6b4f] hover:text-[#0f3d2e] transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? '접기' : '더보기'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 stroke-[2.2]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 stroke-[2.2]" />
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* 2. 골프장 정보 / 홈페이지 / 사진 다운로드 */}
      <div className="pt-8 border-t border-stone-200/80">
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-[#222222] flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-[#1d6b4f] shrink-0">
              <Flag className="w-5 h-5 stroke-[2.2]" />
            </span>
            <span>골프장 정보 / 홈페이지 / 사진 다운로드</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          {PATTAYA_VALUE_GOLF_COURSES.map((course) => {
            const isExpanded = Boolean(expandedCourses[course.id]);

            return (
              <article
                key={course.id}
                className="bg-white rounded-2xl border border-[#e3dfd3] hover:border-[#d0fae5] transition-colors shadow-xs overflow-hidden p-4 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3.5 sm:gap-4 items-start h-full"
              >
                {/* Compact Photo & Action Buttons */}
                <div className="w-full sm:w-[200px] md:w-full lg:w-[176px] xl:w-[192px] shrink-0 flex flex-col gap-2">
                  <div className="w-full h-[182px] sm:h-[186px] md:h-[198px] lg:h-[170px] xl:h-[178px] rounded-xl bg-stone-100 relative overflow-hidden">
                    <img
                      src={course.image}
                      alt={`${course.name} (${course.englishName})`}
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 w-full">
                    <a
                      href={course.homepageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-white hover:bg-stone-50 text-stone-800 hover:text-[#0f3d2e] border !border-[#c7c2b7] text-[11px] xl:text-[11.5px] font-normal transition-colors whitespace-nowrap"
                    >
                      <Globe className="w-3.5 h-3.5 text-[#1d6b4f] stroke-[2] shrink-0" />
                      <span>홈페이지</span>
                    </a>
                    <a
                      href={course.photoDownloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-1 px-2 xl:px-2.5 py-1.5 rounded-lg bg-white hover:bg-stone-50 text-stone-800 hover:text-[#0f3d2e] border !border-[#c7c2b7] text-[11px] xl:text-[11.5px] font-normal transition-colors whitespace-nowrap"
                    >
                      <Images className="w-3.5 h-3.5 stroke-[2] shrink-0 text-[#1d6b4f]" />
                      <span>사진다운로드</span>
                    </a>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 w-full h-full flex flex-col gap-2">
                  <div className="flex flex-wrap items-start justify-between gap-2 pb-2 border-b border-stone-100">
                    <div>
                      <h3 className="text-[15.5px] xl:text-[16px] font-bold text-stone-900 leading-snug">
                        {course.name}{' '}
                        <span className="text-black font-semibold">· {course.grade}</span>
                      </h3>
                      <p className="text-[12.5px] font-medium text-stone-500 mt-0.5">
                        {course.englishName}
                      </p>
                    </div>
                  </div>

                  {course.rateInfo && (
                    <div className="py-0.5 text-[13.5px] xl:text-[14px] font-semibold text-[#0f3d2e] leading-relaxed whitespace-pre-wrap">
                      {course.rateInfo}
                    </div>
                  )}

                  {/* Course Highlight Info */}
                  <div className="py-0.5 text-[13.5px] xl:text-[14px] font-semibold text-[#0f3d2e] leading-relaxed space-y-0.5">
                    <div>코스정보 : {course.courseInfo}</div>
                    <div>티오프 : {course.teeOffTime}</div>
                  </div>

                  {/* Expanded Description & Specs */}
                  {isExpanded && (
                    <div className="pt-2.5 border-t border-stone-100 space-y-2.5">
                      <p className="text-[13px] xl:text-[13.5px] text-stone-700 leading-relaxed">
                        {course.feature}
                      </p>
                      <div className="space-y-1.5 text-[12.5px] xl:text-[13px] text-stone-700">
                        <div className="flex items-start gap-2">
                          <Wallet className="w-4 h-4 text-[#1d6b4f] shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-stone-900">캐디팁 : </strong>
                            {course.caddyTip}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Utensils className="w-4 h-4 text-[#1d6b4f] shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-stone-900">레스토랑 : </strong>
                            {course.restaurant}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-[#1d6b4f] shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-stone-900">이용시설 : </strong>
                            {course.facilities}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-auto pt-0.5">
                    <button
                      type="button"
                      onClick={() => toggleCourseExpand(course.id)}
                      aria-expanded={isExpanded}
                      className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#1d6b4f] hover:text-[#0f3d2e] transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? '접기' : '더보기'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 stroke-[2.2]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 stroke-[2.2]" />
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
