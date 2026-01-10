import Layout from '@/components/Layout';

export default function Portfolio() {
  return (
    <Layout>
      {/* Coming Soon Section */}
      <section className="flex min-h-[60vh] items-center justify-center px-6 py-[60px] lg:px-[120px] lg:py-[120px]">
        <div className="flex max-w-2xl flex-col items-center gap-8 text-center">
          {/* Video Banner Placeholder */}
          <div className="flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#D4E5B4] to-[#a8d070]">
            <div className="flex flex-col items-center gap-4">
              <svg
                className="h-16 w-16 text-black/30 lg:h-24 lg:w-24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm font-medium text-black/40 lg:text-base">
                Video Coming Soon
              </span>
            </div>
          </div>

          {/* Coming Soon Text */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-semibold leading-[145%] tracking-[-0.6px] text-black lg:text-4xl lg:tracking-[-0.72px]">
              Portfolio Coming Soon
            </h1>
            <p className="text-base leading-[145%] tracking-[-0.08px] text-black/55 lg:text-lg lg:tracking-[-0.09px]">
              I'm currently working on showcasing my best projects. Stay tuned for video demos and detailed descriptions of my work in Edge Computing, Machine Learning, and more.
            </p>
          </div>

          {/* Decorative Element */}
          <div className="flex gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-[#a8d070]"></div>
            <div className="h-2 w-2 animate-pulse rounded-full bg-[#a8d070] delay-100"></div>
            <div className="h-2 w-2 animate-pulse rounded-full bg-[#a8d070] delay-200"></div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
