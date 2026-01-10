import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';

export default function Index() {
  const [introduction, setIntroduction] = useState('');

  useEffect(() => {
    fetch('introduction.md')
      .then((response) => response.text())
      .then((text) => setIntroduction(text))
      .catch((error) => console.error('Error loading introduction:', error));
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="px-6 py-12 lg:px-[120px] lg:py-20">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-12 text-4xl font-semibold leading-[145%] tracking-[-0.72px] text-black lg:text-5xl lg:tracking-[-0.96px]">
            Hi, I'm Ahmad Naufal
          </h1>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Profile Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="h-[200px] w-[200px] overflow-hidden rounded-2xl bg-[#D4E5B4] lg:h-[280px] lg:w-[280px]">
                <img
                  src="/assets/profiles.png"
                  alt="Naufal's profile illustration"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Introduction */}
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-semibold leading-[145%] tracking-[-0.48px] text-black lg:text-3xl lg:tracking-[-0.6px]">
                Introduction
              </h2>
              <p className="text-justify text-base leading-[145%] tracking-[-0.08px] text-black/55 lg:text-lg lg:tracking-[-0.09px]">
                {introduction}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
