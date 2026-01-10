import Layout from '@/components/Layout';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface Article {
  slug: string;
  image: string;
  title: string;
  description: string;
  date: string;
  author: string;
  file: string;
}

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch articles index
    fetch('/articles/articles.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.articles.find((a: Article) => a.slug === id);
        if (found) {
          setArticle(found);
          // Fetch article content
          return fetch(found.file);
        }
        throw new Error('Article not found');
      })
      .then((res) => res?.text())
      .then((text) => {
        if (text) setContent(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load article:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-lg text-black/55">Loading article...</p>
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-xl text-black/55">Article not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="bg-white">
        {/* Article Header */}
        <header className="flex flex-col items-center gap-8 px-6 py-12 lg:px-60 lg:py-20">
          <p className="text-center text-lg leading-[145%] tracking-[-0.09px] text-black/55">
            {article.date}
          </p>

          <div className="flex flex-col items-center gap-4 lg:gap-6">
            <h1 className="w-full text-center text-3xl font-bold leading-[110%] tracking-[-0.8px] text-black lg:w-[900px] lg:text-5xl lg:tracking-[-1.2px]">
              {article.title}
            </h1>
            <p className="text-center text-base leading-[145%] tracking-[-0.08px] text-black/55 lg:text-lg lg:tracking-[-0.09px]">
              {article.author}
            </p>
          </div>
        </header>

        {/* Featured Image */}
        <div className="flex justify-center px-6 pb-10 lg:px-60 lg:pb-10">
          <img
            src={article.image}
            alt={article.title}
            className="w-full rounded-2xl lg:max-h-[500px] lg:w-auto lg:object-contain"
          />
        </div>

        {/* Article Content */}
        <div className="flex justify-center px-6 py-10 lg:px-40 lg:py-20">
          <div className="article-content prose prose-lg max-w-none text-justify prose-headings:text-left prose-headings:text-black prose-h1:text-4xl prose-h2:text-2xl prose-h2:border-b prose-h2:border-black/10 prose-h2:pb-3 prose-h3:text-xl prose-h4:text-lg prose-p:text-black/70 prose-a:text-[#6D8990] prose-strong:text-black prose-code:bg-black/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-[#1e1e1e] prose-pre:text-white prose-img:rounded-xl prose-img:shadow-lg lg:max-w-4xl">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                // Hide h1 since title is shown in header
                h1: () => null,
                // Custom rendering for images
                img: ({ node, ...props }) => (
                  <img {...props} className="my-8 w-full rounded-xl shadow-lg" />
                ),
                // Custom rendering for code blocks
                pre: ({ node, ...props }) => (
                  <pre {...props} className="overflow-x-auto rounded-lg bg-[#1e1e1e] p-4 text-sm text-white" />
                ),
                // Custom rendering for links
                a: ({ node, ...props }) => (
                  <a {...props} className="text-[#6D8990] hover:underline" target="_blank" rel="noopener noreferrer" />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </Layout>
  );
}
