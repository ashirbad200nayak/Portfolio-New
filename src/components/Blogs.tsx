'use client';
import Link from 'next/link';
import { usePublicationQuery } from '../../generated/graphq';
import { resizeImage } from '@/utils/image';
import { CoverImage } from './CoverImage';
import { ImagePlaceholder } from './ImagePlaceholder';
import { ArrowRightIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const host = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST as string;

export const Blogs = () => {
  const { data } = usePublicationQuery({
    host,
  });

  if (!data || !data.publication) return null;
  const posts = data.publication.posts.edges;

  return (
    <section id="blogs" className="mb-20">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Recent Blogs
          </h2>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
          >
            <span className="text-base font-medium">See All Blogs</span>
            <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Blog Posts */}
        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.slice(0, 4).map((edge) => {
              const { id, slug, title, brief, coverImage } = edge.node;
              const coverImageSrc = coverImage?.url
                ? resizeImage(coverImage.url, { w: 1600, h: 840, c: 'thumb' })
                : undefined;

              return (
                <Link
                  key={id}
                  href={`/blog/${slug}`}
                  className="group flex flex-col sm:flex-row gap-6 p-6 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200 -mx-6"
                >
                  {/* Image */}
                  <div className="flex-shrink-0 w-full sm:w-48 md:w-56 h-48 sm:h-32 md:h-36 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                    {coverImageSrc ? (
                      <CoverImage 
                        title={title} 
                        src={coverImageSrc} 
                        priority={false}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <ImagePlaceholder />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {title}
                    </h3>
                    <p className="text-base text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {brief}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500">
                      <span>--- views</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-slate-500 dark:text-slate-400">
            <ExclamationTriangleIcon className="h-12 w-12 mb-4" />
            <p className="text-lg font-medium">No posts found</p>
          </div>
        )}

        {/* See All Button */}
        {posts.length > 0 && (
          <div className="flex justify-center pt-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors group"
            >
              <span>See All Blogs</span>
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};