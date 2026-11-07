import React, { useState, useMemo, useEffect } from 'react';
import { GOLF_PACKAGES, COMPANY_INFO, NOTICES_PEAK_SEASON } from '../data/golfData';
import { GolfPackage, PackageCategory } from '../types/golf';
import {
  FileText,
  Download,
  Building,
  Flag,
  Search,
  ArrowUpDown,
  List,
  LayoutGrid,
  AlertTriangle,
} from 'lucide-react';

interface PackageListProps {
  onSelectPackage: (pkg: GolfPackage) => void;
  onOpenReservation?: (packageId: string) => void;
  initialCategory?: PackageCategory | 'all';
}

export const PackageList: React.FC<PackageListProps> = ({
  onSelectPackage,
  onOpenReservation: _onOpenReservation,
  initialCategory = 'all',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<PackageCategory | 'all'>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [viewLayout, setViewLayout] = useState<'list' | 'grid'>('list');

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const categories: { id: PackageCategory; label: string; count: number }[] = [
    { id: 'women-join', label: '여성 조인골프', count: GOLF_PACKAGES.filter((p) => p.category === 'women-join').length },
    { id: 'pattaya-value', label: '파타야 가성비', count: GOLF_PACKAGES.filter((p) => p.category === 'pattaya-value').length },
    { id: 'pattaya-premium', label: '파타야 고품격', count: GOLF_PACKAGES.filter((p) => p.category === 'pattaya-premium').length },
    { id: 'pattaya-luxury', label: '파타야 럭셔리', count: GOLF_PACKAGES.filter((p) => p.category === 'pattaya-luxury').length },
    { id: 'pattaya-poolvilla', label: '파타야 풀빌라', count: GOLF_PACKAGES.filter((p) => p.category === 'pattaya-poolvilla').length },
    { id: 'pattaya-golftel', label: '파타야 골프텔', count: GOLF_PACKAGES.filter((p) => p.category === 'pattaya-golftel').length },
    { id: 'bangkok-value', label: '방콕 가성비', count: GOLF_PACKAGES.filter((p) => p.category === 'bangkok-value').length },
    { id: 'bangkok-luxury', label: '방콕 럭셔리', count: GOLF_PACKAGES.filter((p) => p.category === 'bangkok-luxury').length },
    { id: 'guide', label: '가이드 자료', count: GOLF_PACKAGES.filter((p) => p.category === 'guide').length },
  ];

  const filteredPackages = useMemo(() => {
    let result = [...GOLF_PACKAGES];

    if (selectedCategory !== 'all') {
      result = result.filter((pkg) => pkg.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (pkg) =>
          pkg.title.toLowerCase().includes(q) ||
          pkg.hotel.toLowerCase().includes(q) ||
          pkg.courses.some((c) => c.toLowerCase().includes(q)) ||
          pkg.recommendedFor.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const handleDownloadPdf = (pkg: GolfPackage, e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = pkg.pdfPath || COMPANY_INFO.pdfPath;
    link.download = pkg.downloadFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="packages" className="pt-[1cm] pb-12 sm:pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header strictly matching reference image style */}
        <div className="mb-8">
          <div className="pl-7 mb-1.5">
            <span className="text-xs sm:text-[13px] font-semibold text-[#007a55] tracking-wider uppercase">
              Download & Product Details
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#222222] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#007a55] shrink-0" />
            <span>자료실 및 골프 상품 정보</span>
          </h2>
          <p className="text-xs sm:text-[13px] text-[#666666] mt-1.5 pl-7 font-normal">
            파일명을 누르면 PDF 및 상세 일정·포함내역이 바로 확인됩니다.
          </p>
        </div>

        {/* Filter Controls: Tabs & Search (Restored) */}
        <div className="space-y-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search bar & View Layout toggles */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="호텔명, 골프장(그린우드, 시암 등), 상품명 검색..."
                className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 hover:border-[#d0fae5] focus:border-[#d0fae5] rounded-lg text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#d0fae5]/50 transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Sort selector */}
              <div className="flex items-center gap-1.5 text-xs text-stone-500 bg-stone-50 border border-stone-200 hover:border-[#d0fae5] rounded-lg px-2.5 py-1.5 transition-colors">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs text-stone-700 font-medium focus:outline-none cursor-pointer"
                >
                  <option value="default">기본 순서 (PDF 순서)</option>
                  <option value="price-asc">가격 낮은 순</option>
                  <option value="price-desc">가격 높은 순</option>
                </select>
              </div>

              {/* View Layout Toggle */}
              <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200 hover:border-[#d0fae5] transition-colors">
                <button
                  type="button"
                  onClick={() => setViewLayout('list')}
                  className={`p-1.5 rounded text-xs cursor-pointer ${
                    viewLayout === 'list' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                  }`}
                  title="PDF 파일 목록 보기"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewLayout('grid')}
                  className={`p-1.5 rounded text-xs cursor-pointer ${
                    viewLayout === 'grid' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                  }`}
                  title="상품 카드 그리드 보기"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Empty state */}
        {filteredPackages.length === 0 && (
          <div className="py-16 text-center bg-stone-50 rounded-2xl border border-stone-200 hover:border-[#d0fae5] transition-colors">
            <FileText className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <p className="text-base font-bold text-stone-700">검색 결과가 없습니다</p>
            <p className="text-xs text-stone-500 mt-1">다른 검색어나 카테고리를 선택해 보세요.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('women-join');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
            >
              검색 초기화
            </button>
          </div>
        )}

        {/* LIST VIEW */}
        {viewLayout === 'list' && filteredPackages.length > 0 && (
          <div className="rounded-xl border border-stone-200 shadow-xs overflow-hidden bg-white hover:border-[#d0fae5] transition-colors">
            <div className="px-6 py-3.5 bg-stone-100/90 border-b border-stone-200 flex items-center justify-between text-xs font-bold text-stone-600">
              <span>제목 (클릭 시 상세 정보 및 일정표 확인)</span>
              <span className="hidden sm:inline">다운로드</span>
            </div>

            <div className="divide-y divide-stone-100">
              {filteredPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => onSelectPackage(pkg)}
                  className="px-4 sm:px-6 py-4 hover:bg-emerald-50/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    {/* PDF Badge Icon */}
                    <div className="mt-0.5 sm:mt-0 flex items-center justify-center w-8 h-8 rounded bg-red-50 text-red-600 border border-red-200 shrink-0 font-bold text-[10px]">
                      PDF
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm sm:text-base font-normal text-stone-900 group-hover:text-emerald-800 transition-colors">
                          {pkg.title}
                        </span>
                        {pkg.isJoin && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded font-medium">
                            조인 가능
                          </span>
                        )}
                        {pkg.isPoolVilla && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded font-medium">
                            프라이빗 풀빌라
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mt-1">
                        <span className="font-semibold text-emerald-700">{pkg.hotelGrade}</span>
                        <span>·</span>
                        <span>{pkg.hotel}</span>
                        <span>·</span>
                        <span>코스: {pkg.courses.slice(0, 2).join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions on right (PDF 저장 only) */}
                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 pt-2 sm:pt-0">
                    <button
                      type="button"
                      onClick={(e) => handleDownloadPdf(pkg, e)}
                      className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-xs font-medium flex items-center gap-1 transition-colors"
                      title="PDF 다운로드"
                    >
                      <Download className="w-3.5 h-3.5 text-red-600" />
                      <span className="hidden sm:inline">PDF 저장</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GRID VIEW */}
        {viewLayout === 'grid' && filteredPackages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => onSelectPackage(pkg)}
                className="bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-md hover:border-[#d0fae5] transition-all p-6 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {pkg.categoryLabel}
                    </span>
                    <span className="text-xs text-stone-400 font-mono">{pkg.duration}</span>
                  </div>

                  <h3 className="text-base font-normal text-stone-900 group-hover:text-emerald-800 transition-colors mb-2 leading-snug">
                    {pkg.title}
                  </h3>

                  <div className="space-y-2 py-3 border-y border-stone-100 my-3 text-xs text-stone-600">
                    <div className="flex items-center gap-2">
                      <Building className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="truncate">{pkg.hotel}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Flag className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                      <span className="text-stone-600 line-clamp-1">
                        {pkg.courses.join(' / ')}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-500 line-clamp-2 mb-4">
                    {pkg.recommendedFor}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-stone-400 block">1인 기준 (3박/18홀 3회)</span>
                    <span className="text-lg font-extrabold text-stone-900 tabular-nums">
                      {pkg.priceFormatted}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => handleDownloadPdf(pkg, e)}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                      title="PDF 저장"
                    >
                      <Download className="w-3.5 h-3.5 text-red-600" />
                      <span>PDF 저장</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 성수기 안내사항 (자료실 및 골프 상품정보 섹션 맨 아래) */}
        <div className="mt-10 bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs hover:border-[#d0fae5] transition-colors">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <h3 className="text-lg font-bold text-stone-900">
              성수기 안내사항
            </h3>
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
            {NOTICES_PEAK_SEASON.map((notice, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-amber-600 font-bold text-xs mt-0.5">■</span>
                <span className="leading-relaxed">
                  {notice.includes('Peak Season Surcharge') ? (
                    <>
                      <strong className="text-stone-900">Peak Season Surcharge : </strong>
                      <span className="text-red-600 font-medium">크리스마스 및 연말 송크란축제 및 각종행사 (불꽃 축제, 각종공연) / 호텔 Surcharge 추가요금이 발생합니다.</span>
                    </>
                  ) : (
                    notice
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
