import Layout from '@/components/Layout';

const PDF_URL = 'https://administrator2992.github.io/my_resume/main_cv.pdf';

export default function Resume() {
  return (
    <Layout>
      <section className="px-6 py-12 lg:px-[120px] lg:py-20">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8 flex flex-col items-center gap-4 text-center lg:flex-row lg:justify-between lg:text-left">
            <div>
              <h1 className="text-4xl font-semibold leading-[145%] tracking-[-0.72px] text-black lg:text-5xl lg:tracking-[-0.96px]">
                Resume
              </h1>
              <p className="mt-2 text-base leading-[145%] text-black/55 lg:text-lg">
                View or download my curriculum vitae
              </p>
            </div>

            {/* Download Button */}
            <a
              href={PDF_URL}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#6D8990] px-6 py-3 text-base font-medium text-white transition-all hover:bg-[#5a7278] hover:shadow-lg"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download PDF
            </a>
          </div>

          {/* PDF Viewer Container */}
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_4px_16px_0_rgba(0,0,0,0.04),0_8px_32px_0_rgba(0,0,0,0.06)]">
            {/* PDF Embed */}
            <div className="relative aspect-[8.5/11] w-full lg:aspect-[8.5/11] lg:min-h-[800px]">
              <iframe
                src={`${PDF_URL}#toolbar=0&navpanes=0&scrollbar=1`}
                className="absolute inset-0 h-full w-full"
                title="Resume PDF"
              />
            </div>
          </div>

          {/* Fallback Message */}
          <div className="mt-6 text-center">
            <p className="text-sm text-black/40">
              Can't see the PDF?{' '}
              <a
                href={PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6D8990] underline hover:text-[#5a7278]"
              >
                Open in new tab
              </a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
