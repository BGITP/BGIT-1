import React, { useState, useMemo, useEffect, useRef } from 'react';
import { GOLF_PACKAGES, COMPANY_INFO, NOTICES_PEAK_SEASON } from '../data/golfData';
import { GolfPackage, PackageCategory } from '../types/golf';
import {
  FileText,
  Download,
  Building,
  Flag,
  X,
  Play,
  ChevronDown,
  ChevronUp,
  Share2,
  Copy,
  Check,
} from 'lucide-react';
import { YouTubeShortsSection } from './YouTubeShortsSection';
import {
  INITIAL_YOUTUBE_SHORTS,
  YouTubeShortsItem,
  getYouTubeVideoId,
} from '../data/youtubeShortsData';
import { downloadOriginalPdf } from '../utils/pdfDownload';

interface PackageListProps {
  onSelectPackage: (pkg: GolfPackage) => void;
  onOpenReservation?: (packageId: string) => void;
  onSelectCategory?: (category: PackageCategory | 'all') => void;
  initialCategory?: PackageCategory | 'all';
}

export const PackageList: React.FC<PackageListProps> = ({
  onSelectPackage,
  onOpenReservation: _onOpenReservation,
  onSelectCategory,
  initialCategory = 'all',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<PackageCategory | 'all'>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [viewLayout, setViewLayout] = useState<'list' | 'grid'>('list');
  const [previewVideo, setPreviewVideo] = useState<YouTubeShortsItem | null>(null);
  const [videoOrientation, setVideoOrientation] = useState<'portrait' | 'landscape' | null>(null);
  const [isMp4Expanded, setIsMp4Expanded] = useState(false);
  const [playingMp4Ids, setPlayingMp4Ids] = useState<Record<number, boolean>>({});
  const desktopVideoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const [isPeakNoticeOpen, setIsPeakNoticeOpen] = useState(false);
  const [downloadingPdfId, setDownloadingPdfId] = useState<string | null>(null);
  const [copiedToast, setCopiedToast] = useState(false);
  const displayedMp4Items = isMp4Expanded ? INITIAL_YOUTUBE_SHORTS : INITIAL_YOUTUBE_SHORTS.slice(0, 4);

  useEffect(() => {
    setVideoOrientation(null);
  }, [previewVideo]);

  useEffect(() => {
    if (!previewVideo) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPreviewVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewVideo]);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const categories: { id: PackageCategory; label: string; count: number }[] = [
    { id: 'women-join', label: '여성골퍼 조인', count: GOLF_PACKAGES.filter((p) => p.category === 'women-join').length },
    { id: 'pattaya-value', label: '파타야 가성비', count: GOLF_PACKAGES.filter((p) => p.category === 'pattaya-value').length },
    { id: 'pattaya-premium', label: '파타야 고품격', count: GOLF_PACKAGES.filter((p) => p.category === 'pattaya-premium').length },
    { id: 'pattaya-luxury', label: '파타야 럭셔리', count: GOLF_PACKAGES.filter((p) => p.category === 'pattaya-luxury').length },
    { id: 'pattaya-poolvilla', label: '파타야 풀빌라', count: GOLF_PACKAGES.filter((p) => p.category === 'pattaya-poolvilla').length },
    { id: 'pattaya-golftel', label: '파타야 골프텔', count: GOLF_PACKAGES.filter((p) => p.category === 'pattaya-golftel').length },
    { id: 'bangkok-value', label: '방콕 가성비', count: GOLF_PACKAGES.filter((p) => p.category === 'bangkok-value').length },
    { id: 'bangkok-luxury', label: '방콕 럭셔리', count: GOLF_PACKAGES.filter((p) => p.category === 'bangkok-luxury').length },
    { id: 'vehicle-guide', label: '차량 가이드', count: 0 },
    { id: 'guide', label: '여행 자료실', count: GOLF_PACKAGES.filter((p) => p.category === 'guide').length },
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

  const handleDownloadPdf = async (pkg: GolfPackage, e: React.MouseEvent) => {
    e.stopPropagation();
    if (downloadingPdfId === pkg.id) return;
    setDownloadingPdfId(pkg.id);
    try {
      await downloadOriginalPdf(
        pkg.pdfPath || COMPANY_INFO.pdfPath,
        pkg.downloadFilename
      );
    } finally {
      setDownloadingPdfId((prev) => (prev === pkg.id ? null : prev));
    }
  };

  const WOMEN_SWING_SITE_URL = 'https://bgit-ls.ai.studio';

  const handleShare = async () => {
    const shareData = {
      title: 'BGIT Thai - 여성 조인골프 스윙 영상',
      text: 'BGIT Thai 여성 조인골프 스윙 영상 모음',
      url: WOMEN_SWING_SITE_URL,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error)?.name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(WOMEN_SWING_SITE_URL);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = WOMEN_SWING_SITE_URL;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = WOMEN_SWING_SITE_URL;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  return (
    <section id="packages" className={`pt-4 md:pt-[1cm] ${selectedCategory === 'guide' || selectedCategory === 'vehicle-guide' ? 'pb-3 sm:pb-4' : 'pb-12 sm:pb-16'} bg-[#f6f4ee] md:bg-white relative`}>
      {/* Toast when copied */}
      {copiedToast && (
        <div className="fixed top-6 right-6 z-50 bg-[#10231b] text-white text-xs px-4 py-2.5 rounded-xl shadow-xl border border-emerald-500/30 flex items-center gap-2 animate-in fade-in duration-200">
          <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
          <span className="font-bold">링크가 클립보드에 복사되었습니다!</span>
        </div>
      )}

      <div className="max-w-[1156px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Category Pills: Hidden on mobile (handled by HeroSection menu), visible on desktop full-width single row */}
        <div
          className="hidden md:flex items-center w-full flex-nowrap gap-1.5 lg:gap-2 mb-[39px] py-1.5 overflow-x-auto lg:overflow-visible scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  onSelectCategory?.(cat.id);
                }}
                className={`flex-auto shrink-0 inline-flex items-center justify-center px-2.5 lg:px-3 py-1.5 lg:py-2 rounded-full text-[12.5px] lg:text-[13px] font-normal text-black whitespace-nowrap transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer ${
                  isActive
                    ? 'bg-[#83d3b2] shadow-[0_4px_12px_rgba(131,211,178,0.5)]'
                    : 'bg-[#caece0] hover:bg-[#bde5d7]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Empty state */}
        {selectedCategory !== 'vehicle-guide' && selectedCategory !== 'guide' && filteredPackages.length === 0 && (
          <div className="py-16 text-center bg-stone-50 rounded-2xl border border-stone-200 hover:border-[#d0fae5] transition-colors">
            <FileText className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <p className="text-base font-bold text-stone-700">검색 결과가 없습니다</p>
            <p className="text-xs text-stone-500 mt-1">다른 검색어나 카테고리를 선택해 보세요.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('women-join');
                onSelectCategory?.('women-join');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
            >
              검색 초기화
            </button>
          </div>
        )}

        {/* 여성 조인골프 전용 안내 배너 (image_5f5bbefd.png 스타일 적용) */}
        {selectedCategory === 'women-join' && (
          <div className="mb-6">
            {/* Category Title: Outside box, aligned left */}
            <div className="flex items-center justify-start gap-2 mb-3 text-left">
              <div className="w-1.5 h-5 bg-[#007a55] rounded-full shrink-0" />
              <h3 className="text-[15px] sm:text-lg font-bold text-stone-900 tracking-tight flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span>여성골퍼 조인</span>
                <span className="text-stone-300 font-normal">|</span>
                <span className="text-black text-[12px] sm:text-[14px] font-normal tracking-tight">태국 여성과 함께, 특별한 라운드</span>
              </h3>
            </div>

            {/* Notice Box */}
            <div className="bg-emerald-50/80 rounded-xl p-4 sm:p-5 border border-emerald-100 space-y-3 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-2 sm:gap-3.5 pl-3.5 pb-2.5 border-b border-emerald-200/70">
                  <span className="text-xs sm:text-sm font-bold text-emerald-950">
                    조인골프 가능한 여성골퍼 스윙영상 모음
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <a
                      href={WOMEN_SWING_SITE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] font-normal text-orange-600 hover:text-orange-700 underline underline-offset-2 mr-1"
                    >
                      {WOMEN_SWING_SITE_URL}
                    </a>
                    <button
                      type="button"
                      onClick={handleShare}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                    >
                      <Share2 className="w-3 h-3" />
                      공유
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      복사
                    </button>
                  </div>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span>위 주소는 요금표 노출 없이 여성 골퍼 스윙 영상만 모아둔 고객 공유 전용 사이트 입니다</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span>조인 골프를 문의하신 고객님께 [공유] 또는 [복사] 아이콘을 통해 링크를 전달해 주세요</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span>고객님이 선택한 여성골퍼를 저희에게 알려주시면 일정· 코스에 맞춰 최적의 라운드를 매칭해 드립니다</span>
                  </li>
                </ul>
            </div>
          </div>
        )}

        {/* 파타야 가성비 골프 전용 안내 배너 (파타야 가성비 페이지에서만 표시) */}
        {selectedCategory === 'pattaya-value' && (
          <div className="mb-[58px] sm:mb-[62px]">
            <div className="flex items-center justify-start gap-2 text-left">
              <div className="w-1.5 h-5 bg-emerald-700 rounded-full shrink-0" />
              <h3 className="text-[15px] sm:text-lg font-bold text-stone-900 tracking-tight flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span>파타야 가성비 골프</span>
                <span className="text-stone-300 font-normal">|</span>
                <span className="text-black text-[12px] sm:text-[14px] font-normal tracking-tight">골프는 가볍게, 재미는 그대로</span>
              </h3>
            </div>
          </div>
        )}

        {/* 파타야 고품격 골프 전용 안내 배너 (파타야 고품격 페이지에서만 표시) */}
        {selectedCategory === 'pattaya-premium' && (
          <div className="mb-[58px] sm:mb-[62px]">
            <div className="flex items-center justify-start gap-2 text-left">
              <div className="w-1.5 h-5 bg-emerald-700 rounded-full shrink-0" />
              <h3 className="text-[15px] sm:text-lg font-bold text-stone-900 tracking-tight flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span>파타야 고품격 골프</span>
                <span className="text-stone-300 font-normal">|</span>
                <span className="text-black text-[12px] sm:text-[14px] font-normal tracking-tight">파타야에서 완성하는 격조 높은 골프의 정수</span>
              </h3>
            </div>
          </div>
        )}

        {/* 파타야 럭셔리 골프 전용 안내 배너 (파타야 럭셔리 페이지에서만 표시) */}
        {selectedCategory === 'pattaya-luxury' && (
          <div className="mb-[58px] sm:mb-[62px]">
            <div className="flex items-center justify-start gap-2 text-left">
              <div className="w-1.5 h-5 bg-emerald-700 rounded-full shrink-0" />
              <h3 className="text-[15px] sm:text-lg font-bold text-stone-900 tracking-tight flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span>파타야 럭셔리 골프</span>
                <span className="text-stone-300 font-normal">|</span>
                <span className="text-black text-[12px] sm:text-[14px] font-normal tracking-tight">특별한 분과의 동행, 중요한 비즈니스 라운딩, 인생의 기념 여행</span>
              </h3>
            </div>
          </div>
        )}

        {/* 파타야 풀빌라 골프 전용 안내 배너 (파타야 풀빌라 페이지에서만 표시) */}
        {selectedCategory === 'pattaya-poolvilla' && (
          <div className="mb-[58px] sm:mb-[62px]">
            <div className="flex items-center justify-start gap-2 text-left">
              <div className="w-1.5 h-5 bg-emerald-700 rounded-full shrink-0" />
              <h3 className="text-[15px] sm:text-lg font-bold text-stone-900 tracking-tight flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span>파타야 풀빌라 골프</span>
                <span className="text-stone-300 font-normal">|</span>
                <span className="text-black text-[12px] sm:text-[14px] font-normal tracking-tight">라운딩은 필드에서, 휴식은 나만의 프라이빗 풀빌라에서</span>
              </h3>
            </div>
          </div>
        )}

        {/* 파타야 골프텔 전용 안내 배너 (파타야 골프텔 페이지에서만 표시) */}
        {selectedCategory === 'pattaya-golftel' && (
          <div className="mb-[58px] sm:mb-[62px]">
            <div className="flex items-center justify-start gap-2 text-left">
              <div className="w-1.5 h-5 bg-emerald-700 rounded-full shrink-0" />
              <h3 className="text-[15px] sm:text-lg font-bold text-stone-900 tracking-tight flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span>파타야 골프텔</span>
                <span className="text-stone-300 font-normal">|</span>
                <span className="text-black text-[12px] sm:text-[14px] font-normal tracking-tight">골프에만 온전히 집중하는 가장 스마트하고 효율적인 선택</span>
              </h3>
            </div>
          </div>
        )}

        {/* 방콕 가성비 골프 전용 안내 배너 (방콕 가성비 페이지에서만 표시) */}
        {selectedCategory === 'bangkok-value' && (
          <div className="mb-[58px] sm:mb-[62px]">
            <div className="flex items-center justify-start gap-2 text-left">
              <div className="w-1.5 h-5 bg-emerald-700 rounded-full shrink-0" />
              <h3 className="text-[15px] sm:text-lg font-bold text-stone-900 tracking-tight flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span>방콕 가성비 골프</span>
                <span className="text-stone-300 font-normal">|</span>
                <span className="text-black text-[12px] sm:text-[14px] font-normal tracking-tight">도심 속 라운딩, 부담은 가볍게 만족도는 확실하게</span>
              </h3>
            </div>
          </div>
        )}

        {/* 방콕 럭셔리 골프 전용 안내 배너 (방콕 럭셔리 페이지에서만 표시) */}
        {selectedCategory === 'bangkok-luxury' && (
          <div className="mb-[58px] sm:mb-[62px]">
            <div className="flex items-center justify-start gap-2 text-left">
              <div className="w-1.5 h-5 bg-emerald-700 rounded-full shrink-0" />
              <h3 className="text-[15px] sm:text-lg font-bold text-stone-900 tracking-tight flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span>방콕 럭셔리 골프</span>
                <span className="text-stone-300 font-normal">|</span>
                <span className="text-black text-[12px] sm:text-[14px] font-normal tracking-tight">방콕에서 누리는 가장 품격 있는 하루, 태국 최고 권위의 하이엔드 라운딩</span>
              </h3>
            </div>
          </div>
        )}

        {/* 차량.가이드 전용 안내 배너 (차량.가이드 페이지에서만 표시) */}
        {selectedCategory === 'vehicle-guide' && (
          <div className="mb-5 sm:mb-6">
            <div className="flex items-center justify-start gap-2 text-left">
              <div className="w-1.5 h-5 bg-emerald-700 rounded-full shrink-0" />
              <h3 className="text-[15px] sm:text-lg font-bold text-stone-900 tracking-tight flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span>차량 &amp; 기사 요금표</span>
                <span className="text-stone-300 font-normal">|</span>
                <span className="text-black text-[12px] sm:text-[14px] font-normal tracking-tight">풍부한 경험의 베테랑 기사와 단독 차량</span>
              </h3>
            </div>
          </div>
        )}

        {/* 여행 자료실 전용 안내 배너 (여행 자료실 페이지에서만 표시) */}
        {selectedCategory === 'guide' && (
          <div className="mb-5 sm:mb-6">
            <div className="flex items-center justify-start gap-2 text-left">
              <div className="w-1.5 h-5 bg-emerald-700 rounded-full shrink-0" />
              <h3 className="text-[15px] sm:text-lg font-bold text-stone-900 tracking-tight flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span>여행 자료실</span>
                <span className="text-stone-300 font-normal">|</span>
                <span className="text-black text-[12px] sm:text-[14px] font-normal tracking-tight">출국 전 전자입국카드(TDAC) 작성부터 수완나품 공항 미팅까지 한눈에</span>
              </h3>
            </div>
          </div>
        )}

        {/* 유튜브 숏츠 섹션 (여성 조인골프 페이지에서만 표시 - 제목 바로 위) */}
        {selectedCategory === 'women-join' && <YouTubeShortsSection />}

        {/* 여성골퍼 스윙 영상 파일(MP4) 다운로드 (PDF 다운로드 바로 위) */}
        {selectedCategory === 'women-join' && viewLayout === 'list' && (
          <>
            {/* Mobile View: MP4 Cards matching Shorts Card Style */}
            <div className="block md:hidden mb-6">
              <div className="flex gap-3 overflow-x-auto -mx-4 px-4 snap-x snap-mandatory scrollbar-none pb-2">
                {INITIAL_YOUTUBE_SHORTS.map((item) => {
                  const videoId = getYouTubeVideoId(item.videoId);
                  return (
                    <div
                      key={`m-mp4-${item.id}`}
                      className="flex-none w-[64%] snap-start rounded-[20px] overflow-hidden shadow-md bg-white border border-stone-200 flex flex-col"
                    >
                      <div className="relative aspect-[4/5] w-full bg-stone-900 overflow-hidden select-none">
                        <video
                          src={`${item.mp4Path}#t=0.1`}
                          poster={`https://i.ytimg.com/vi/${videoId}/oar2.jpg`}
                          muted
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover pointer-events-none select-none"
                        />
                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none">
                          <button
                            type="button"
                            onClick={() => setPreviewVideo(item)}
                            className="pointer-events-auto w-12 h-12 rounded-full bg-black/45 hover:bg-emerald-700 text-white backdrop-blur-md outline-none focus:outline-none shadow-[0_8px_24px_rgba(0,0,0,0.35)] flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
                            aria-label={`${item.title} 재생`}
                            title={`${item.title} 재생`}
                          >
                            <Play className="w-5 h-5 fill-white text-white translate-x-[1.5px]" />
                          </button>
                        </div>
                      </div>
                      <div className="px-3.5 py-2.5 bg-white border-t border-stone-100">
                        <span className="block text-[13px] font-semibold text-stone-800 truncate">
                          {item.title}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Desktop View: 4-Column Portrait Video Card Grid */}
            <div className="hidden md:block mb-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                {displayedMp4Items.map((item) => {
                  const isPlaying = Boolean(playingMp4Ids[item.id]);
                  return (
                    <div
                      key={`d-mp4-${item.id}`}
                      className="relative aspect-[9/14] w-full rounded-2xl overflow-hidden bg-black shadow-md hover:shadow-xl transition-shadow duration-300 select-none"
                    >
                      <video
                        ref={(el) => {
                          desktopVideoRefs.current[item.id] = el;
                        }}
                        src={`${item.mp4Path}#t=0.1`}
                        controls
                        playsInline
                        preload="metadata"
                        onPlay={() =>
                          setPlayingMp4Ids((prev) => ({ ...prev, [item.id]: true }))
                        }
                        onPause={() =>
                          setPlayingMp4Ids((prev) => ({ ...prev, [item.id]: false }))
                        }
                        onEnded={() =>
                          setPlayingMp4Ids((prev) => ({ ...prev, [item.id]: false }))
                        }
                        className="w-full h-full object-cover"
                      />
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/65 via-black/25 to-transparent" />
                      <span className="pointer-events-none absolute top-3 left-3.5 right-3.5 text-[13px] font-bold text-white truncate drop-shadow-sm">
                        {item.title}
                      </span>

                      {!isPlaying && (
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => {
                              const vid = desktopVideoRefs.current[item.id];
                              if (vid) {
                                vid.play().catch(() => {});
                              }
                            }}
                            className="pointer-events-auto w-12 h-12 rounded-full bg-black/55 hover:bg-black/75 text-white flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
                            aria-label={`${item.title} 재생`}
                            title={`${item.title} 재생`}
                          >
                            <Play className="w-5 h-5 fill-white text-white translate-x-[1.5px]" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {INITIAL_YOUTUBE_SHORTS.length > 4 && (
                <div className="mt-7 sm:mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setIsMp4Expanded(!isMp4Expanded)}
                    className="px-6 py-2.5 bg-white hover:bg-stone-50 text-stone-800 rounded-xl !border !border-stone-200 hover:!border-[#007a55] transition-all font-semibold text-xs sm:text-sm shadow-xs flex items-center gap-2 cursor-pointer group"
                  >
                    {isMp4Expanded ? (
                      <>
                        <span>접기</span>
                        <ChevronUp className="w-4 h-4 text-stone-500 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    ) : (
                      <>
                        <span>더보기</span>
                        <ChevronDown className="w-4 h-4 text-stone-500 group-hover:translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* LIST VIEW (여행 자료실/차량.가이드 페이지에서는 숨김, 모바일은 업로드 파일의 .prod 스타일, 데스크톱은 기존 테이블 유지) */}
        {selectedCategory !== 'guide' && selectedCategory !== 'vehicle-guide' && viewLayout === 'list' && filteredPackages.length > 0 && (
          <>
            {/* Mobile View: Uploaded HTML .card & .prod style */}
            <div className="block md:hidden bg-white border border-[#e3dfd3] rounded-[20px] mb-4 shadow-[0_2px_6px_rgba(15,61,46,0.04)] overflow-hidden">
              <div className="px-3.5 py-2.5 bg-stone-100/90 border-b border-[#e3dfd3]">
                <span className="block text-[15px] font-normal text-stone-800 leading-snug text-center">
                  제목을 클릭하면 상세 정보를 확인 하실수 있습니다
                </span>
              </div>
              <div className="p-3.5 divide-y divide-[#e3dfd3]">
                {filteredPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => onSelectPackage(pkg)}
                    className="flex items-start gap-3 py-3 first:pt-0 last:pb-0 cursor-pointer active:opacity-75 transition-opacity"
                  >
                    <span className="shrink-0 text-[11px] font-black text-[#e5533d] bg-[#e5533d]/12 rounded-lg px-2 py-1.5 leading-none mt-0.5">
                      PDF
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="m-0 text-[15px] text-[#10231b] leading-snug font-medium">
                        <b className="block text-[18px] text-[#1d6b4f] font-bold tracking-tight mb-0.5">
                          {pkg.priceFormatted}
                        </b>
                        {pkg.title}
                      </h3>
                      <p className="mt-1 text-[15px] text-[#5d6b64] leading-relaxed">
                        {pkg.hotelGrade} · {pkg.hotel}
                        <br />
                        코스: {pkg.courses.slice(0, 2).join(', ')}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          {pkg.isJoin && (
                            <span className="text-[11px] px-2 py-0.5 bg-[#4a63e0]/12 text-[#4a63e0] rounded-full font-bold">
                              조인 가능
                            </span>
                          )}
                          {pkg.isPoolVilla && (
                            <span className="text-[11px] px-2 py-0.5 bg-[#b8924a]/15 text-[#b8924a] rounded-full font-bold">
                              풀빌라
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          disabled={downloadingPdfId === pkg.id}
                          onClick={(e) => handleDownloadPdf(pkg, e)}
                          className="px-2 py-1 bg-stone-100 hover:bg-stone-200 disabled:opacity-60 text-stone-700 rounded text-[12px] font-medium flex items-center gap-1 cursor-pointer"
                          title="PDF 저장"
                        >
                          <Download className="w-3 h-3 text-red-600" />
                          <span>{downloadingPdfId === pkg.id ? '저장 중...' : 'PDF 저장'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop View: Existing Table Layout */}
            <div className="hidden md:block mb-6 rounded-xl border border-stone-200 shadow-xs overflow-hidden bg-white hover:border-[#d0fae5] transition-colors">
              <div className="relative px-6 py-3.5 bg-stone-100/90 border-b border-stone-200 flex items-center justify-end text-xs font-bold text-stone-600">
                <span className="absolute left-1/2 -translate-x-1/2 text-[13px] sm:text-[14px] font-bold text-stone-800 text-center whitespace-nowrap">PDF 제목을 클릭하면 상세 정보를 확인 하실수 있습니다</span>
                <span>다운로드</span>
              </div>

              <div className="divide-y divide-stone-100">
                {filteredPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => onSelectPackage(pkg)}
                    className="px-6 py-4 hover:bg-emerald-50/40 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      {/* PDF Badge Icon */}
                      <div className="flex items-center justify-center w-8 h-8 rounded bg-red-50 text-red-600 border border-red-200 shrink-0 font-bold text-[10px]">
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

                        <div className="flex flex-wrap items-center gap-3 text-[13px] text-stone-500 mt-1">
                          <span className="font-semibold text-emerald-700">{pkg.hotelGrade}</span>
                          <span>·</span>
                          <span className="text-[13px]">{pkg.hotel}</span>
                          <span>·</span>
                          <span className="text-[13px]">코스: {pkg.courses.slice(0, 2).join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions on right (PDF 저장 only) */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        disabled={downloadingPdfId === pkg.id}
                        onClick={(e) => handleDownloadPdf(pkg, e)}
                        className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 disabled:opacity-60 text-stone-700 rounded text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                        title="PDF 다운로드"
                      >
                        <Download className="w-3.5 h-3.5 text-red-600" />
                        <span>{downloadingPdfId === pkg.id ? '저장 중...' : 'PDF 저장'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* GRID VIEW */}
        {viewLayout === 'grid' && filteredPackages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
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
                      <span className="line-clamp-2">{pkg.courses.join(', ')}</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-500 mb-4 line-clamp-2">
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
                      disabled={downloadingPdfId === pkg.id}
                      onClick={(e) => handleDownloadPdf(pkg, e)}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 disabled:opacity-60 text-stone-700 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
                      title="PDF 저장"
                    >
                      <Download className="w-3.5 h-3.5 text-red-600" />
                      <span>{downloadingPdfId === pkg.id ? '저장 중...' : 'PDF 저장'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 성수기 안내사항 (여행 자료실/차량.가이드 페이지에서는 숨김) */}
        {selectedCategory !== 'guide' && selectedCategory !== 'vehicle-guide' && (
          <div className="mt-4 sm:mt-5 bg-white md:bg-transparent rounded-2xl md:rounded-none px-4 md:px-0 py-1 md:py-0 border-t border-dashed border-stone-200">
            <button
              type="button"
              onClick={() => setIsPeakNoticeOpen((prev) => !prev)}
              aria-expanded={isPeakNoticeOpen}
              className="w-full flex items-center justify-end gap-4 py-3.5 sm:py-4 border-b border-stone-600 text-right cursor-pointer group transition-colors"
            >
              <span className="inline-flex items-center gap-2 text-[14px] sm:text-[15px] font-bold text-stone-800 group-hover:text-[#047857] transition-colors shrink-0">
                <span>성수기 안내사항</span>
                {isPeakNoticeOpen ? (
                  <ChevronUp className="w-[18px] h-[18px] text-stone-600 stroke-[2]" />
                ) : (
                  <ChevronDown className="w-[18px] h-[18px] text-stone-600 stroke-[2]" />
                )}
              </span>
            </button>

            {isPeakNoticeOpen && (
              <div className="pt-4 pb-3 px-1">
                <ul className="space-y-2 text-[14px] sm:text-[15px] text-stone-700">
                  {NOTICES_PEAK_SEASON.map((notice, idx) => (
                    <li
                      key={idx}
                      className="leading-relaxed text-[15px] sm:text-[16px]"
                    >
                      {idx === 0 ? (
                        <span className="text-stone-900 font-normal">
                          {notice}
                        </span>
                      ) : (
                        notice
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MP4 Video Preview Modal */}
      {previewVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
          onClick={() => setPreviewVideo(null)}
        >
          <div
            className="flex flex-col items-center gap-2.5 max-w-[96vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between gap-3 px-1">
              <span className="text-[15px] sm:text-[17px] font-bold text-white truncate">
                {previewVideo.title}
              </span>
              <button
                type="button"
                onClick={() => setPreviewVideo(null)}
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="닫기"
                title="닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative rounded-2xl overflow-hidden bg-black shadow-2xl ring-1 ring-white/10">
              <video
                key={previewVideo.id}
                src={previewVideo.mp4Path}
                controls
                autoPlay
                playsInline
                onLoadedMetadata={(e) => {
                  const v = e.currentTarget;
                  if (v.videoWidth && v.videoHeight) {
                    setVideoOrientation(v.videoWidth >= v.videoHeight ? 'landscape' : 'portrait');
                  }
                }}
                className={`block object-contain max-w-[94vw] max-h-[82vh] ${
                  videoOrientation === 'landscape'
                    ? 'w-[min(94vw,1100px)] h-auto'
                    : videoOrientation === 'portrait'
                      ? 'w-auto h-auto md:h-[82vh]'
                      : 'w-auto h-auto sm:max-w-[min(92vw,1100px)]'
                }`}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
