'use client';
import { Container } from '@/components/Container';
import { usePostQuery } from '../../../../generated/graphq';
import { useQuery } from '@tanstack/react-query';
import { ContactMe } from '@/components/ContactMe';
import { loadIframeResizer } from '@/utils/services/embed';
import { useEffect, useState } from 'react';
import { useEmbeds } from '../../../../hooks/useEmbeds';
import { triggerCustomWidgetEmbed } from '@/utils/trigger-custom-widget-embed';
import { MarkdownToHtml } from '@/components/MarkdownToHtml';
import { resizeImage } from '@/utils/image';
import handleMathJax from '@/utils/handle-math-jax';
import { CoverImage } from '@/components/CoverImage';
import { notFound } from 'next/navigation';
import { formatDate } from '@/utils/consts/format-date';

const host = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST as string;

export default function BlogContent({ params }: { params: { slug: string } }) {
  const { data, error } = useQuery({
    queryKey: usePostQuery.getKey({
      host,
      slug: params.slug,
    }),
    queryFn: usePostQuery.fetcher({
      host,
      slug: params.slug,
    }),
  });

  if (!data || error) throw error;
  const post = data.publication?.post;
  if (!post) notFound();

  const [, setMobMount] = useState(false);
  const [canLoadEmbeds, setCanLoadEmbeds] = useState(false);
  useEmbeds({ enabled: canLoadEmbeds });

  useEffect(() => {
    if (screen.width <= 425) {
      setMobMount(true);
    }

    if (!data) {
      return;
    }

    (async () => {
      await loadIframeResizer();
      triggerCustomWidgetEmbed(post.id.toString());
      setCanLoadEmbeds(true);
    })();
  }, [data, post.id]);

  if (post.hasLatexInPost) {
    setTimeout(() => {
      handleMathJax(true);
    }, 500);
  }

  const coverImageSrc = post.coverImage?.url
    ? resizeImage(post.coverImage.url, {
        w: 1600,
        h: 840,
        c: 'thumb',
      })
    : undefined;

  return (
    <Container>
      <article className='relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-900/50 shadow-2xl border border-slate-200/50 dark:border-slate-700/50'>
        {/* Decorative gradient background */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50/50 via-purple-50/30 to-transparent dark:from-blue-950/20 dark:via-purple-950/10 dark:to-transparent pointer-events-none"></div>
        
        <div className='relative px-4 py-8 sm:px-6 md:px-10 lg:px-16'>
          {/* Header Section */}
          <div className='mb-8 flex w-full flex-col gap-6 text-slate-950 dark:text-zinc-300'>
            {/* Title with gradient effect */}
            <h1 className='mb-4 w-full text-center text-3xl sm:text-4xl md:text-5xl font-black leading-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 bg-clip-text text-transparent'>
              {post.title}
            </h1>
            
            {/* Cover Image with enhanced styling */}
            {post.coverImage?.url && (
              <div className='relative w-full overflow-hidden rounded-2xl shadow-xl group'>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <CoverImage
                  title={post.title}
                  priority={true}
                  src={coverImageSrc}
                />
              </div>
            )}
            
            {/* Meta information */}
            <div className='flex w-full flex-wrap items-center justify-center gap-2 text-sm sm:text-base text-slate-600 dark:text-slate-400'>
              <div className='flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800'>
                <span>Article by</span>
                <span className='font-semibold text-slate-900 dark:text-slate-100'>{post.author.name}</span>
              </div>
              <span className='hidden sm:inline'>•</span>
              <div className='flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800'>
                <span>Published on</span>
                <time className='font-semibold text-slate-900 dark:text-slate-100'>{formatDate(post.publishedAt)}</time>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className='relative mb-8'>
            <hr className='h-px border-0 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent' />
          </div>

          {/* Blog Content with mobile-responsive wrapper */}
          {post.content.markdown && (
            <div className='blog-content-wrapper'>
              <MarkdownToHtml contentMarkdown={post.content.markdown} />
            </div>
          )}

          {/* Tags Section */}
          {post.tags?.length && (
            <div className='mt-12 pt-8 border-t border-slate-200 dark:border-slate-800'>
              <h3 className='text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100'>
                Related Topics
              </h3>
              <div className='flex w-full flex-wrap gap-3'>
                {post.tags.map((tag) => (
                  <a
                    key={tag.id}
                    href={`https://hashnode.com/n/${tag.slug}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:from-blue-500 hover:to-purple-600 hover:text-white dark:hover:from-blue-600 dark:hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-lg overflow-hidden'
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className='relative'>#{tag.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
      
      <ContactMe />

      {/* Global styles for blog content */}
      <style jsx global>{`
        /* Mobile-responsive blog content */
        .blog-content-wrapper {
          width: 100%;
          overflow-x: hidden;
        }

        /* Responsive tables */
        .blog-content-wrapper table {
          display: table;
          width: 100%;
          min-width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          font-size: 0.875rem;
          border-radius: 0.75rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        /* Table wrapper for horizontal scroll */
        .blog-content-wrapper :has(> table) {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          margin: 1.5rem 0;
          position: relative;
        }

        /* Scroll indicator shadow */
        .blog-content-wrapper :has(> table)::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 30px;
          background: linear-gradient(to left, rgba(0,0,0,0.1), transparent);
          pointer-events: none;
          opacity: 1;
        }

        .dark .blog-content-wrapper :has(> table)::after {
          background: linear-gradient(to left, rgba(255,255,255,0.1), transparent);
        }

        @media (min-width: 640px) {
          .blog-content-wrapper table {
            font-size: 0.9375rem;
          }
        }

        @media (min-width: 768px) {
          .blog-content-wrapper table {
            font-size: 1rem;
          }
        }

        .blog-content-wrapper thead {
          background: linear-gradient(135deg, #1e40af 0%, #7c3aed 100%);
          color: white;
        }

        .blog-content-wrapper th {
          padding: 1rem 1.25rem;
          text-align: left;
          font-weight: 700;
          white-space: nowrap;
          font-size: 0.9375rem;
          color: white;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }

        .blog-content-wrapper th:last-child {
          border-right: none;
        }

        @media (min-width: 640px) {
          .blog-content-wrapper th {
            padding: 1.25rem 1.5rem;
            font-size: 1rem;
          }
        }

        .blog-content-wrapper td {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid #e2e8f0;
          border-right: 1px solid #f1f5f9;
          font-size: 0.9375rem;
          color: #0f172a !important;
          font-weight: 500;
        }

        /* Target all text inside table cells */
        .blog-content-wrapper td,
        .blog-content-wrapper td * {
          color: #0f172a !important;
        }

        .blog-content-wrapper td:last-child {
          border-right: none;
        }

        @media (min-width: 640px) {
          .blog-content-wrapper td {
            padding: 1.25rem 1.5rem;
            font-size: 1rem;
          }
        }

        .dark .blog-content-wrapper td {
          border-bottom-color: #334155;
          border-right-color: #1e293b;
          color: #f1f5f9 !important;
        }

        /* Target all text inside table cells for dark mode */
        .dark .blog-content-wrapper td,
        .dark .blog-content-wrapper td * {
          color: #f1f5f9 !important;
        }

        .blog-content-wrapper tbody tr {
          background-color: white;
          transition: all 0.2s;
        }

        .blog-content-wrapper tbody tr:nth-child(even) {
          background-color: #f8fafc;
        }

        .dark .blog-content-wrapper tbody tr {
          background-color: #0f172a;
        }

        .dark .blog-content-wrapper tbody tr:nth-child(even) {
          background-color: #1e293b;
        }

        .blog-content-wrapper tbody tr:hover {
          background-color: #dbeafe;
          transform: scale(1.01);
        }

        .dark .blog-content-wrapper tbody tr:hover {
          background-color: #1e3a8a;
        }

        /* Responsive images */
        .blog-content-wrapper img {
          max-width: 100%;
          height: auto;
          border-radius: 0.75rem;
          margin: 1.5rem auto;
          display: block;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        /* Responsive code blocks */
        .blog-content-wrapper pre {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          border-radius: 0.75rem;
          margin: 1.5rem 0;
          padding: 1rem;
          font-size: 0.813rem;
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          border: 1px solid #334155;
        }

        @media (min-width: 640px) {
          .blog-content-wrapper pre {
            padding: 1.25rem;
            font-size: 0.875rem;
          }
        }

        @media (min-width: 768px) {
          .blog-content-wrapper pre {
            padding: 1.5rem;
            font-size: 0.9375rem;
          }
        }

        .blog-content-wrapper code {
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.875em;
        }

        /* Inline code */
        .blog-content-wrapper p code,
        .blog-content-wrapper li code {
          background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%);
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
          font-weight: 500;
          color: #7c3aed;
        }

        .dark .blog-content-wrapper p code,
        .dark .blog-content-wrapper li code {
          background: linear-gradient(135deg, #4c1d95 0%, #5b21b6 100%);
          color: #c4b5fd;
        }

        /* Headings */
        .blog-content-wrapper h1,
        .blog-content-wrapper h2,
        .blog-content-wrapper h3,
        .blog-content-wrapper h4 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-weight: 700;
          line-height: 1.3;
          color: #0f172a;
        }

        .dark .blog-content-wrapper h1,
        .dark .blog-content-wrapper h2,
        .dark .blog-content-wrapper h3,
        .dark .blog-content-wrapper h4 {
          color: #f1f5f9;
        }

        .blog-content-wrapper h1 {
          font-size: 1.875rem;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @media (min-width: 768px) {
          .blog-content-wrapper h1 {
            font-size: 2.25rem;
          }
        }

        .blog-content-wrapper h2 {
          font-size: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e2e8f0;
        }

        @media (min-width: 768px) {
          .blog-content-wrapper h2 {
            font-size: 1.875rem;
          }
        }

        .dark .blog-content-wrapper h2 {
          border-bottom-color: #334155;
        }

        .blog-content-wrapper h3 {
          font-size: 1.25rem;
        }

        @media (min-width: 768px) {
          .blog-content-wrapper h3 {
            font-size: 1.5rem;
          }
        }

        /* Paragraphs and lists */
        .blog-content-wrapper p,
        .blog-content-wrapper li {
          font-size: 1rem;
          line-height: 1.75;
          color: #475569;
          margin-bottom: 1rem;
        }

        @media (min-width: 768px) {
          .blog-content-wrapper p,
          .blog-content-wrapper li {
            font-size: 1.125rem;
          }
        }

        .dark .blog-content-wrapper p,
        .dark .blog-content-wrapper li {
          color: #cbd5e1;
        }

        .blog-content-wrapper ul,
        .blog-content-wrapper ol {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }

        /* Blockquotes */
        .blog-content-wrapper blockquote {
          border-left: 4px solid;
          border-image: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%) 1;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #64748b;
          background: linear-gradient(90deg, #f8fafc 0%, transparent 100%);
          padding: 1rem;
          border-radius: 0 0.5rem 0.5rem 0;
        }

        .dark .blog-content-wrapper blockquote {
          color: #94a3b8;
          background: linear-gradient(90deg, #1e293b 0%, transparent 100%);
        }

        /* Links */
        .blog-content-wrapper a {
          color: #3b82f6;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.2s;
        }

        .blog-content-wrapper a:hover {
          color: #2563eb;
        }

        .dark .blog-content-wrapper a {
          color: #60a5fa;
        }

        .dark .blog-content-wrapper a:hover {
          color: #93c5fd;
        }

        /* Horizontal rules */
        .blog-content-wrapper hr {
          margin: 2rem 0;
          border: none;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #e2e8f0 50%, transparent 100%);
        }

        .dark .blog-content-wrapper hr {
          background: linear-gradient(90deg, transparent 0%, #334155 50%, transparent 100%);
        }
      `}</style>
    </Container>
  );
}