import React, { useState, useMemo } from 'react';
import { GOLF_PACKAGES, COMPANY_INFO } from '../data/golfData';
import { GolfPackage, PackageCategory } from '../types/golf';
import {
  FileText,
  Download,
  Calendar,
  Search,
  Check,
  Building,
  Flag,
  ArrowUpDown,
  List,
  LayoutGrid,
} from 'lucide-react';

interface PackageListProps {
  onSelectPackage: (pkg: GolfPackage) => void;
  onOpenReservation: (packageId: string) => void;
  initialCategory?: PackageCategory | 'all';
}

export const PackageList: React.FC<PackageListProps> = ({
  onSelectPackage,
  onOpenReservation,
  initialCategory = 'all',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<PackageCategory | 'all'>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [viewLayout, setViewLayout] = useState<'list' | 'grid'>('list');

  const categories: { id: PackageCategory | 'all'; label: string; count: number }[] = [
    { id: 'all', label: '전체 상품 (22)', count: GOLF_PACKAGES.length },
    { id: 'pattaya-value', label: '파타야 가성비', count: GOLF_PACKAGES.filter((p) => p.category === 'pattaya-value').length },
    { id: 'pattaya-luxury', label: '파타야 럭셔리·고품격', count: GOLF_PACKAGES.filter((p) => p.category === 'pattaya-luxury').length },
    { id: 'pattaya-poolvilla', label: '파타야 풀빌라', count: GOLF_PACKAGES.filter((p) => p.category === 'pattaya-poolvilla').length },
    { id: 'bangkok-value', label: '방콕 가성비', count: GOLF_PACKAGES.filter((p) => p.category === 'bangkok-value').length },
    { id: 'bangkok-luxury', label: '방콕 럭셔리', count: GOLF_PACKAGES.filter((p) => p.category === 'bangkok-luxury').length },
    { id: 'guide', label: '태국 골프 가이드북', count: GOLF_PACKAGES.filter((p) => p.category === 'guide').length },
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
    // Direct link to the uploaded PDF asset
    const link = document.createElement('a');
    link.href = COMPANY_INFO.pdfPath;
    link.download = pkg.downloadFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="packages" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header strictly matching PDF Page 3 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              Download & Product Details
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-2">
              자료실 및 골프 상품 정보
            </h2>
            <p className="text-stone-500 text-sm sm:text-base">
              파일명을 누르면 PDF 및 상세 일정·포함내역이 바로 확인됩니다.
            </p>
          </div>

          {/* Quick PDF All Download Button */}
          <a
            href={COMPANY_INFO.pdfPath}
            download="BGIT_태국골프_전체일정표_2026.pdf"
            className="self-start md:self-auto px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-700" />
            <span>전체 자료집 PDF 일괄 다운로드</span>
          </a>
        </div>

        {/* Filter Controls: Tabs & Search */}
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
                className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Sort selector */}
              <div className="flex items-center gap-1.5 text-xs text-stone-500 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5">
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
              <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200">
                <button
                  type="button"
                  onClick={() => setViewLayout('list')}
                  className={`p-1.5 rounded text-xs ${
                    viewLayout === 'list' ? 'bg-white text-emerald-900 shadow-xs' : 'text-stone-500'
                  }`}
                  title="PDF 파일 목록 보기"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewLayout('grid')}
                  className={`p-1.5 rounded text-xs ${
                    viewLayout === 'grid' ? 'bg-white text-emerald-900 shadow-xs' : 'text-stone-500'
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
          <div className="py-16 text-center bg-stone-50 rounded-2xl border border-stone-200">
            <FileText className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <p className="text-base font-bold text-stone-700">검색 결과가 없습니다</p>
            <p className="text-xs text-stone-500 mt-1">다른 검색어나 카테고리를 선택해 보세요.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-semibold"
            >
              전체 상품 보기
            </button>
          </div>
        )}

        {/* LIST VIEW (Strictly matching the PDF Page 3 & 4 PDF list layout) */}
        {viewLayout === 'list' && filteredPackages.length > 0 && (
          <div className="rounded-xl border border-stone-200 shadow-xs overflow-hidden bg-white">
            <div className="px-6 py-3.5 bg-stone-100/90 border-b border-stone-200 flex items-center justify-between text-xs font-bold text-stone-600">
              <span>제목 (클릭 시 상세 정보 및 일정표 확인)</span>
              <span className="hidden sm:inline">다운로드 & 견적</span>
            </div>

            <div className="divide-y divide-stone-100">
              {filteredPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => onSelectPackage(pkg)}
                  className="px-4 sm:px-6 py-4 hover:bg-emerald-50/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    {/* PDF Badge Icon (red PDF emblem matching document) */}
                    <div className="mt-0.5 sm:mt-0 flex items-center justify-center w-8 h-8 rounded bg-red-50 text-red-600 border border-red-200 shrink-0 font-bold text-[10px]">
                      PDF
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
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

                  {/* Actions on right */}
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

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenReservation(pkg.id);
                      }}
                      className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded text-xs font-semibold flex items-center gap-1 transition-colors shadow-xs"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>예약/견적</span>
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
                className="bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all p-6 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {pkg.categoryLabel}
                    </span>
                    <span className="text-xs text-stone-400 font-mono">{pkg.duration}</span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors mb-2 leading-snug">
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
                      className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs transition-colors"
                      title="PDF 저장"
                    >
                      <Download className="w-4 h-4 text-red-600" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenReservation(pkg.id);
                      }}
                      className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
                    >
                      예약문의
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
