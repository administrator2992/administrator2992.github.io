import { useState, useEffect, useRef, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Layout from "@/components/Layout";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
  FileText,
} from "lucide-react";

// Use unpkg CDN for the worker, keyed to the exact installed pdfjs-dist version.
// This avoids Rollup/Vite ?url resolution issues with node_modules exports maps.
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


type SlideDir = "left" | "right" | null;

export default function Portfolio() {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // 1-indexed
  const [pendingPage, setPendingPage] = useState<number | null>(null);
  const [slideDir, setSlideDir] = useState<SlideDir>(null);
  const [animating, setAnimating] = useState(false);
  const [scale, setScale] = useState(1.0);
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [pageWidth, setPageWidth] = useState(800);
  const containerRef = useRef<HTMLDivElement>(null);

  // Touch support
  const touchStartX = useRef<number | null>(null);

  // Responsive width
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        setPageWidth(Math.round(Math.min(w - 32, 960) * scale));
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [scale]);

  // Slide transition logic
  const goTo = useCallback(
    (target: number, dir: SlideDir) => {
      if (animating || target < 1 || target > numPages) return;
      setSlideDir(dir);
      setPendingPage(target);
      setAnimating(true);
    },
    [animating, numPages]
  );

  const goNext = useCallback(
    () => goTo(currentPage + 1, "left"),
    [currentPage, goTo]
  );
  const goPrev = useCallback(
    () => goTo(currentPage - 1, "right"),
    [currentPage, goTo]
  );

  // After animation completes, commit the page change
  const handleAnimationEnd = () => {
    if (pendingPage !== null) {
      setCurrentPage(pendingPage);
      setPendingPage(null);
    }
    setSlideDir(null);
    setAnimating(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goPrev, goNext]);

  // Touch events for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  function onDocumentLoadSuccess({ numPages: n }: { numPages: number }) {
    setNumPages(n);
    setPdfLoaded(true);
  }

  const zoomIn = () =>
    setScale((s) => Math.min(parseFloat((s + 0.15).toFixed(2)), 2.0));
  const zoomOut = () =>
    setScale((s) => Math.max(parseFloat((s - 0.15).toFixed(2)), 0.4));

  // The page being animated out (current) and in (pending)
  const displayPage = pendingPage ?? currentPage;
  const outgoingPage = pendingPage ? currentPage : null;

  // Animation classes
  const slideInClass =
    slideDir === "left"
      ? "animate-slide-in-left"
      : slideDir === "right"
        ? "animate-slide-in-right"
        : "";
  const slideOutClass =
    slideDir === "left"
      ? "animate-slide-out-left"
      : slideDir === "right"
        ? "animate-slide-out-right"
        : "";

  return (
    <Layout>
      {/* Inject keyframe animations */}
      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(-100%); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }
        @keyframes slideOutLeft {
          from { transform: translateX(0);    opacity: 1; }
          to   { transform: translateX(-100%); opacity: 0; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0);   opacity: 1; }
          to   { transform: translateX(100%); opacity: 0; }
        }
        .animate-slide-in-left  { animation: slideInLeft  0.35s cubic-bezier(0.4,0,0.2,1) forwards; }
        .animate-slide-in-right { animation: slideInRight 0.35s cubic-bezier(0.4,0,0.2,1) forwards; }
        .animate-slide-out-left  { animation: slideOutLeft  0.35s cubic-bezier(0.4,0,0.2,1) forwards; }
        .animate-slide-out-right { animation: slideOutRight 0.35s cubic-bezier(0.4,0,0.2,1) forwards; }
      `}</style>

      <section className="min-h-screen bg-gradient-to-b from-[#f9fdf3] to-white px-4 py-12 lg:px-8 lg:py-20">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-5xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#D4E5B4]/60 px-4 py-1.5 text-sm font-medium text-[#5a8a2a]">
            <FileText className="h-4 w-4" />
            AI Engineer Portfolio
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
            Portfolio
          </h1>
          <p className="mt-3 text-base text-gray-500 lg:text-lg">
            Swipe or use arrows to browse through my work
          </p>
        </div>

        <div ref={containerRef} className="mx-auto max-w-5xl">
          {/* Controls bar */}
          <div className="mb-4 flex items-center justify-between rounded-2xl bg-white/80 px-5 py-3 shadow-sm ring-1 ring-black/5 backdrop-blur-sm">
            <span className="text-sm font-medium text-gray-600">
              {!pdfLoaded ? (
                <span className="flex items-center gap-1.5 text-gray-400">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#a8d070]" style={{ animationDelay: "0s" }} />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#a8d070]" style={{ animationDelay: "0.15s" }} />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#a8d070]" style={{ animationDelay: "0.3s" }} />
                  <span className="ml-1">Loading…</span>
                </span>
              ) : (
                <>
                  Page{" "}
                  <span className="font-bold text-gray-900">{currentPage}</span>
                  {" "}of{" "}
                  <span className="font-bold text-gray-900">{numPages}</span>
                </>
              )}
            </span>

            <div className="flex items-center gap-2">
              <button
                id="zoom-out-btn"
                onClick={zoomOut}
                disabled={scale <= 0.4}
                className="rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30"
                title="Zoom out"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="min-w-[3.2rem] text-center text-xs font-medium text-gray-600">
                {Math.round(scale * 100)}%
              </span>
              <button
                id="zoom-in-btn"
                onClick={zoomIn}
                disabled={scale >= 2.0}
                className="rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30"
                title="Zoom in"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <div className="mx-2 h-4 w-px bg-gray-200" />
              <a
                id="download-pdf-btn"
                href="/portfolio.pdf"
                download="Portfolio - AI Engineer.pdf"
                className="flex items-center gap-1.5 rounded-lg bg-[#a8d070] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#8fc055] active:scale-95"
              >
                <Download className="h-3.5 w-3.5" />
                Download
              </a>
            </div>
          </div>

          {/* Slide viewer */}
          <div className="relative">
            {/* Prev arrow */}
            <button
              id="prev-page-btn"
              onClick={goPrev}
              disabled={currentPage <= 1 || !pdfLoaded || animating}
              className="absolute left-0 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg ring-1 ring-black/10 transition hover:bg-[#D4E5B4] hover:shadow-xl active:scale-95 disabled:pointer-events-none disabled:opacity-30"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>

            {/* Slide window */}
            <div
              className="relative overflow-hidden rounded-2xl bg-gray-50 shadow-xl ring-1 ring-black/5"
              style={{ minHeight: "65vh" }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {/* Invisible Document for loading pages */}
              <Document
                file="/portfolio.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
                loading={null}
                error={null}
              >
                {/* Loading overlay */}
                {!pdfLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex gap-2">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="h-3 w-3 animate-bounce rounded-full bg-[#a8d070]"
                            style={{ animationDelay: `${i * 0.15}s` }}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-400">
                        Loading portfolio…
                      </p>
                    </div>
                  </div>
                )}

                {pdfLoaded && (
                  <div className="flex items-center justify-center">
                    {/* Outgoing page */}
                    {outgoingPage && (
                      <div
                        key={`out-${outgoingPage}`}
                        className={`absolute inset-0 flex items-center justify-center ${slideOutClass}`}
                      >
                        <Page
                          pageNumber={outgoingPage}
                          width={pageWidth}
                          renderAnnotationLayer={false}
                          renderTextLayer={false}
                        />
                      </div>
                    )}

                    {/* Incoming / current page */}
                    <div
                      key={`in-${displayPage}`}
                      className={`flex items-center justify-center ${animating ? slideInClass : ""}`}
                      onAnimationEnd={handleAnimationEnd}
                    >
                      <Page
                        pageNumber={displayPage}
                        width={pageWidth}
                        renderAnnotationLayer
                        renderTextLayer={false}
                      />
                    </div>
                  </div>
                )}
              </Document>
            </div>

            {/* Next arrow */}
            <button
              id="next-page-btn"
              onClick={goNext}
              disabled={currentPage >= numPages || !pdfLoaded || animating}
              className="absolute right-0 top-1/2 z-20 translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg ring-1 ring-black/10 transition hover:bg-[#D4E5B4] hover:shadow-xl active:scale-95 disabled:pointer-events-none disabled:opacity-30"
              aria-label="Next page"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          {/* Dot indicators */}
          {numPages > 0 && (
            <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5">
              {Array.from({ length: numPages }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={i}
                    onClick={() =>
                      goTo(pageNum, pageNum > currentPage ? "left" : "right")
                    }
                    className={`rounded-full transition-all duration-300 ${
                      pageNum === currentPage
                        ? "h-2.5 w-6 bg-[#a8d070]"
                        : "h-2 w-2 bg-gray-200 hover:bg-[#c8dfa0]"
                    }`}
                    aria-label={`Go to page ${pageNum}`}
                  />
                );
              })}
            </div>
          )}

          <p className="mt-4 text-center text-xs text-gray-400">
            ← → arrow keys or swipe to navigate
          </p>
        </div>
      </section>
    </Layout>
  );
}
