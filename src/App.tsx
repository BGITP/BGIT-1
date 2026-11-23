import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { HeaderBannerStrip } from './components/HeaderBannerStrip';
import { HeroSection, MobileCategoryMenu } from './components/HeroSection';
import { PackageList } from './components/PackageList';
import { WeatherClimateSection } from './components/WeatherClimateSection';
import { BgitDifferentiators } from './components/BgitDifferentiators';
import { TdacGuideSection } from './components/TdacGuideSection';
import { AirportGuideSection } from './components/AirportGuideSection';
import { VehicleGuideSection } from './components/VehicleGuideSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ReservationModal } from './components/ReservationModal';
import { PdfExactView } from './components/PdfExactView';
import { KakaoShareModal } from './components/KakaoShareModal';
import { FloatingQuickMenu } from './components/FloatingQuickMenu';
import { PdfViewerModal } from './components/PdfViewerModal';
import { GolfPackage, PackageCategory } from './types/golf';
import { GOLF_PACKAGES } from './data/golfData';
import { closePdfViewer, subscribePdfViewer } from './utils/pdfDownload';

const VALID_CATEGORIES = new Set<PackageCategory | 'all'>([
  'all',
  'women-join',
  'pattaya-value',
  'pattaya-premium',
  'pattaya-luxury',
  'pattaya-poolvilla',
  'pattaya-golftel',
  'bangkok-value',
  'bangkok-luxury',
  'vehicle-guide',
  'guide',
]);

interface AppHistoryState {
  __bgitNav: true;
  depth: number;
  category: PackageCategory | 'all';
  view: 'interactive' | 'pdf';
  packageId: string | null;
  isReservationOpen: boolean;
  reservationPackageId?: string;
  isPdfViewerOpen: boolean;
  scrollY: number;
}

function getInitialCategoryFromUrl(): PackageCategory | 'all' {
  if (typeof window === 'undefined') return 'women-join';
  const catParam = new URLSearchParams(window.location.search).get('cat') as
    | (PackageCategory | 'all')
    | null;
  if (catParam && VALID_CATEGORIES.has(catParam)) {
    return catParam;
  }
  return 'women-join';
}

function getInitialPackageFromUrl(): GolfPackage | null {
  if (typeof window === 'undefined') return null;
  const pkgParam = new URLSearchParams(window.location.search).get('pkg');
  if (!pkgParam) return null;
  return GOLF_PACKAGES.find((p) => p.id === pkgParam) ?? null;
}

function buildNavUrl(category: PackageCategory | 'all', view: 'interactive' | 'pdf', packageId: string | null): string {
  const url = new URL(window.location.href);
  if (category === 'women-join') {
    url.searchParams.delete('cat');
  } else {
    url.searchParams.set('cat', category);
  }
  if (view === 'pdf') {
    url.searchParams.set('view', 'pdf');
  } else {
    url.searchParams.delete('view');
  }
  if (packageId) {
    url.searchParams.set('pkg', packageId);
  } else {
    url.searchParams.delete('pkg');
  }
  return `${url.pathname}${url.search}${url.hash}`;
}

export default function App() {
  const [activeView, setActiveView] = useState<'interactive' | 'pdf'>(() => {
    if (typeof window === 'undefined') return 'interactive';
    return new URLSearchParams(window.location.search).get('view') === 'pdf'
      ? 'pdf'
      : 'interactive';
  });
  const [selectedPackage, setSelectedPackage] = useState<GolfPackage | null>(getInitialPackageFromUrl);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isKakaoPreviewOpen, setIsKakaoPreviewOpen] = useState(false);
  const [reservationPackageId, setReservationPackageId] = useState<string | undefined>(undefined);
  const [packageCategoryFilter, setPackageCategoryFilter] = useState<PackageCategory | 'all'>(
    getInitialCategoryFromUrl
  );

  // Track synchronous navigation snapshot + current history depth so Back/Forward stays accurate
  const navSnapshotRef = useRef<Omit<AppHistoryState, '__bgitNav' | 'scrollY' | 'depth'>>({
    category: packageCategoryFilter,
    view: activeView,
    packageId: selectedPackage?.id ?? null,
    isReservationOpen: false,
    reservationPackageId: undefined,
    isPdfViewerOpen: false,
  });
  const historyDepthRef = useRef(0);
  const isPoppingRef = useRef(false);

  const commitHistoryPush = useCallback(
    (next: Omit<AppHistoryState, '__bgitNav' | 'scrollY' | 'depth'>) => {
      if (isPoppingRef.current) return;

      const prev = navSnapshotRef.current;
      if (
        prev.category === next.category &&
        prev.view === next.view &&
        prev.packageId === next.packageId &&
        prev.isReservationOpen === next.isReservationOpen &&
        prev.reservationPackageId === next.reservationPackageId &&
        prev.isPdfViewerOpen === next.isPdfViewerOpen
      ) {
        return;
      }

      // Save current scroll position onto the outgoing history entry before pushing
      try {
        const currentDepth = historyDepthRef.current;
        const currentState: AppHistoryState = {
          __bgitNav: true,
          depth: currentDepth,
          ...prev,
          scrollY: window.scrollY,
        };
        window.history.replaceState(currentState, '', window.location.href);

        const nextDepth = currentDepth + 1;
        const nextState: AppHistoryState = {
          __bgitNav: true,
          depth: nextDepth,
          ...next,
          scrollY: 0,
        };
        const nextUrl = buildNavUrl(next.category, next.view, next.packageId);
        window.history.pushState(nextState, '', nextUrl);
        historyDepthRef.current = nextDepth;
      } catch {
        // Ignore SecurityError in restricted iframe environments
      }
      navSnapshotRef.current = next;
    },
    []
  );

  // Initialize base history entry & listen for browser Back / Forward (popstate)
  useEffect(() => {
    try {
      const existingDepth =
        typeof (window.history.state as Partial<AppHistoryState> | null)?.depth === 'number'
          ? (window.history.state as AppHistoryState).depth
          : 0;
      historyDepthRef.current = existingDepth;
      const initialState: AppHistoryState = {
        __bgitNav: true,
        depth: existingDepth,
        ...navSnapshotRef.current,
        scrollY: window.scrollY,
      };
      window.history.replaceState(initialState, '', window.location.href);
    } catch {
      // Ignore restricted history API
    }

    const handlePopState = (event: PopStateEvent) => {
      isPoppingRef.current = true;

      const raw = event.state as Partial<AppHistoryState> | null;
      historyDepthRef.current = typeof raw?.depth === 'number' ? raw.depth : 0;
      const targetCategory: PackageCategory | 'all' =
        raw?.category && VALID_CATEGORIES.has(raw.category)
          ? raw.category
          : getInitialCategoryFromUrl();
      const targetView: 'interactive' | 'pdf' = raw?.view === 'pdf' ? 'pdf' : 'interactive';
      const targetPkg = raw?.packageId
        ? GOLF_PACKAGES.find((p) => p.id === raw.packageId) ?? null
        : null;
      const targetReservationOpen = Boolean(raw?.isReservationOpen);
      const targetReservationPkgId = raw?.reservationPackageId;
      const targetPdfViewerOpen = Boolean(raw?.isPdfViewerOpen);
      const targetScrollY = typeof raw?.scrollY === 'number' ? raw.scrollY : 0;

      navSnapshotRef.current = {
        category: targetCategory,
        view: targetView,
        packageId: targetPkg?.id ?? null,
        isReservationOpen: targetReservationOpen,
        reservationPackageId: targetReservationPkgId,
        isPdfViewerOpen: targetPdfViewerOpen,
      };

      setPackageCategoryFilter(targetCategory);
      setActiveView(targetView);
      setSelectedPackage(targetPkg);
      setIsReservationOpen(targetReservationOpen);
      setReservationPackageId(targetReservationPkgId);
      setIsKakaoPreviewOpen(false);
      if (!targetPdfViewerOpen) {
        closePdfViewer();
      }

      window.setTimeout(() => {
        window.scrollTo({ top: targetScrollY, behavior: 'auto' });
        isPoppingRef.current = false;
      }, 60);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Keep PdfViewerModal open/close synced with browser history
  useEffect(() => {
    return subscribePdfViewer((payload) => {
      if (isPoppingRef.current) return;
      if (payload) {
        commitHistoryPush({
          ...navSnapshotRef.current,
          isPdfViewerOpen: true,
        });
      } else if (navSnapshotRef.current.isPdfViewerOpen) {
        if (historyDepthRef.current > 0 && window.history.state?.isPdfViewerOpen) {
          window.history.back();
        } else {
          navSnapshotRef.current = {
            ...navSnapshotRef.current,
            isPdfViewerOpen: false,
          };
        }
      }
    });
  }, [commitHistoryPush]);

  const navigateToCategory = useCallback(
    (cat: PackageCategory | 'all', scrollTargetId?: string) => {
      commitHistoryPush({
        category: cat,
        view: 'interactive',
        packageId: null,
        isReservationOpen: false,
        reservationPackageId: undefined,
        isPdfViewerOpen: false,
      });
      setActiveView('interactive');
      setSelectedPackage(null);
      setIsReservationOpen(false);
      setPackageCategoryFilter(cat);

      if (scrollTargetId) {
        window.setTimeout(() => {
          const el =
            document.getElementById(scrollTargetId) || document.getElementById('packages');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    },
    [commitHistoryPush]
  );

  const handleSelectPackage = useCallback(
    (pkg: GolfPackage) => {
      commitHistoryPush({
        ...navSnapshotRef.current,
        packageId: pkg.id,
        isReservationOpen: false,
      });
      setIsReservationOpen(false);
      setSelectedPackage(pkg);
    },
    [commitHistoryPush]
  );

  const handleClosePackage = useCallback(() => {
    if (historyDepthRef.current > 0 && window.history.state?.packageId) {
      window.history.back();
      return;
    }
    navSnapshotRef.current = {
      ...navSnapshotRef.current,
      packageId: null,
    };
    setSelectedPackage(null);
  }, []);

  const handleOpenReservation = useCallback(
    (packageId?: string) => {
      commitHistoryPush({
        ...navSnapshotRef.current,
        isReservationOpen: true,
        reservationPackageId: packageId,
      });
      setReservationPackageId(packageId);
      setIsReservationOpen(true);
    },
    [commitHistoryPush]
  );

  const handleCloseReservation = useCallback(() => {
    if (historyDepthRef.current > 0 && window.history.state?.isReservationOpen) {
      window.history.back();
      return;
    }
    navSnapshotRef.current = {
      ...navSnapshotRef.current,
      isReservationOpen: false,
      reservationPackageId: undefined,
    };
    setIsReservationOpen(false);
  }, []);

  const handleSwitchView = useCallback(
    (nextView: 'interactive' | 'pdf') => {
      if (nextView === 'interactive' && historyDepthRef.current > 0 && window.history.state?.view === 'pdf') {
        window.history.back();
        return;
      }
      commitHistoryPush({
        ...navSnapshotRef.current,
        view: nextView,
      });
      setActiveView(nextView);
    },
    [commitHistoryPush]
  );

  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col font-sans selection:bg-emerald-800 selection:text-white">
      {/* Top Bar Header with 9 Menus */}
      <Header
        onOpenReservation={handleOpenReservation}
        onSelectCategory={(cat) => navigateToCategory(cat, 'packages')}
        activeCategory={packageCategoryFilter}
      />

      {/* Main Content: Depending on activeView */}
      {activeView === 'pdf' ? (
        <main className="flex-1">
          <PdfExactView
            onSelectPackage={handleSelectPackage}
            onOpenReservation={handleOpenReservation}
            onBackToInteractive={() => handleSwitchView('interactive')}
          />
        </main>
      ) : (
        <main className="flex-1">
          {/* Hero Section (Top on mobile) */}
          <HeroSection
            onOpenReservation={() => handleOpenReservation()}
            onViewPdfMode={() => handleSwitchView('pdf')}
            onSelectCategory={(cat) => navigateToCategory(cat)}
            activeCategory={packageCategoryFilter}
          />

          {/* Top 3-Image Feature Strip */}
          <HeaderBannerStrip />

          {/* Mobile Category Menu (Positioned between banners and packages) */}
          <MobileCategoryMenu
            onSelectCategory={(cat) => navigateToCategory(cat)}
            activeCategory={packageCategoryFilter}
          />

          {/* Package List & Download Center (Placed directly above Weather & Climate) */}
          <PackageList
            onSelectPackage={handleSelectPackage}
            onOpenReservation={handleOpenReservation}
            onSelectCategory={(cat) => navigateToCategory(cat)}
            initialCategory={packageCategoryFilter}
          />

          {/* BGIT Differentiators, Inclusions/Exclusions, Peak Season & Notes (Hidden on guide/vehicle-guide category view) */}
          {packageCategoryFilter !== 'guide' && packageCategoryFilter !== 'vehicle-guide' && (
            <BgitDifferentiators
              activeCategory={packageCategoryFilter}
              onGoToGuide={(targetId = 'tdac-guide') => navigateToCategory('guide', targetId)}
            />
          )}

          {/* 차량.가이드 Page */}
          {packageCategoryFilter === 'vehicle-guide' && (
            <VehicleGuideSection
              onOpenReservation={() => handleOpenReservation()}
              onGoToGuide={(targetId = 'airport-guide') => navigateToCategory('guide', targetId)}
            />
          )}

          {/* TDAC, Airport Guide & Weather Simulator (Shown only on 여행 자료실 category) */}
          {packageCategoryFilter === 'guide' && (
            <>
              <TdacGuideSection />
              <AirportGuideSection />
              <WeatherClimateSection />
            </>
          )}
        </main>
      )}

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        packageData={selectedPackage}
        onClose={handleClosePackage}
        onOpenReservation={handleOpenReservation}
      />

      {/* Reservation & Quote Inquiry Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={handleCloseReservation}
        selectedPackageId={reservationPackageId}
      />

      {/* KakaoTalk Share Preview Modal */}
      <KakaoShareModal
        isOpen={isKakaoPreviewOpen}
        onClose={() => setIsKakaoPreviewOpen(false)}
      />

      {/* Instant PDF Viewer Modal (Opens together with PDF download) */}
      <PdfViewerModal />

      {/* 움직이는 메뉴버튼 (오른쪽 플로팅 퀵메뉴 - 부드러운 상하 움직임 및 빠른 바로가기) */}
      <FloatingQuickMenu
        onSelectCategory={(cat) => navigateToCategory(cat, 'packages')}
        onGoToGuide={(targetId = 'tdac-guide') => navigateToCategory('guide', targetId)}
        onOpenReservation={handleOpenReservation}
        activeCategory={packageCategoryFilter}
      />
    </div>
  );
}
