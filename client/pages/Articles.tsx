import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface Article {
  slug: string;
  image: string;
  title: string;
  description: string;
  date: string;
  author: string;
  file: string;
}

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/articles/articles.json')
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load articles:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Layout>
        <section className="flex min-h-[50vh] items-center justify-center">
          <p className="text-lg text-black/55">Loading articles...</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="px-6 py-20 lg:px-16 lg:py-[120px]">
        <div className="mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_4px_8px_0_rgba(0,0,0,0.02),0_6px_12px_0_rgba(0,0,0,0.03)]"
            >
              {/* Image */}
              <div className="h-60 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-6 p-6 md:gap-8">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold leading-[145%] tracking-[-0.3px] text-black md:text-2xl md:tracking-[-0.48px]">
                    {article.title}
                  </h2>
                  <p className="text-base leading-[140%] tracking-[-0.08px] text-black/55 md:text-lg md:tracking-[-0.09px]">
                    {article.description}
                  </p>
                </div>

                <Link
                  to={`/article/${article.slug}`}
                  className="text-base font-medium leading-[145%] tracking-[-0.08px] text-black md:text-lg md:tracking-[-0.09px]"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
