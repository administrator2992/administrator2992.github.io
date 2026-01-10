import Layout from '@/components/Layout';
import { useState, useEffect } from 'react';

interface Publication {
    title: string;
    authors: string;
    journal: string;
    year: string;
    description: string;
    link: string;
}

export default function Publications() {
    const [publications, setPublications] = useState<Publication[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/publications.json')
            .then((res) => res.json())
            .then((data) => {
                setPublications(data.publications);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to load publications:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Layout>
                <section className="flex min-h-[50vh] items-center justify-center">
                    <p className="text-lg text-black/55">Loading publications...</p>
                </section>
            </Layout>
        );
    }

    return (
        <Layout>
            <section className="px-6 py-12 lg:px-[120px] lg:py-20">
                <div className="mx-auto max-w-4xl">
                    {/* Header */}
                    <h1 className="mb-12 text-4xl font-semibold leading-[145%] tracking-[-0.72px] text-black lg:text-5xl lg:tracking-[-0.96px]">
                        Publications
                    </h1>

                    {/* Publications List */}
                    <div className="flex flex-col gap-8">
                        {publications.map((pub, index) => (
                            <article
                                key={index}
                                className="flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-6 shadow-[0_4px_8px_0_rgba(0,0,0,0.02),0_6px_12px_0_rgba(0,0,0,0.03)] transition-shadow hover:shadow-[0_8px_16px_0_rgba(0,0,0,0.04),0_12px_24px_0_rgba(0,0,0,0.05)]"
                            >
                                {/* Title */}
                                <h2 className="text-xl font-semibold leading-[145%] tracking-[-0.4px] text-black lg:text-2xl lg:tracking-[-0.48px]">
                                    {pub.title}
                                </h2>

                                {/* Authors and Journal */}
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm leading-[145%] text-black/70 lg:text-base">
                                        {pub.authors}
                                    </p>
                                    <p className="text-sm italic leading-[145%] text-black/55 lg:text-base">
                                        {pub.journal}, {pub.year}
                                    </p>
                                </div>

                                {/* Description */}
                                <p className="text-justify text-base leading-[145%] tracking-[-0.08px] text-black/55 lg:text-lg lg:tracking-[-0.09px]">
                                    {pub.description}
                                </p>

                                {/* Link */}
                                <a
                                    href={pub.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-base font-medium text-[#6D8990] transition-colors hover:text-[#5a7278] lg:text-lg"
                                >
                                    View Publication
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                </a>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
