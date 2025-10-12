'use client';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { usePublicationQuery } from '../../generated/graphq';

const host = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST as string;

export const AboutMe = () => {
  const { data, error } = usePublicationQuery({
    host,
  });

  if (!data?.publication || error) return null;

  const { publication } = data;
  const isAvailableLink =
    publication.links?.linkedin || publication.links?.twitter;

  return (
    <section id="about" className="mb-20">
      <div className="flex flex-col-reverse lg:flex-row items-start gap-12 lg:gap-16">
        {/* Left side - Text content */}
        <div className="flex-1 space-y-6">
          {/* Availability badge */}
          {isAvailableLink && (
            <a
              href={isAvailableLink}
              target='_blank'
              rel="noopener noreferrer"
              className='inline-flex items-center gap-2 rounded-full bg-green-100 dark:bg-green-900/20 px-4 py-2 text-sm font-medium text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors'
            >
              <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full animate-pulse"></span>
              Available for work
            </a>
          )}

          {/* Name */}
          <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Hi, I'm {publication.author.name}
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400">
            Building{' '}
            <a 
              href="#" 
              className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors underline decoration-slate-300 dark:decoration-slate-600"
            >
              LegalAI
            </a>
            ,{' '}
            <a 
              href="#" 
              className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors underline decoration-slate-300 dark:decoration-slate-600"
            >
              Product Designer Portfolio
            </a>
            , other cool things
          </p>

          {/* Secondary tagline */}
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
            Senior Software Engineer building SaaS products and web apps. Find me on social media for tech updates and insights.
          </p>

          {/* Bio */}
          {publication.author.bio && (
            <div
              className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: publication.author.bio.html || '',
              }}
            />
          )}

          {/* Bio */}
          {publication.author.bio && (
            <div
              className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: publication.author.bio.html || '',
              }}
            />
          )}

          {/* Location */}
          {publication.author.location && (
            <p className='flex items-center gap-2 text-slate-500 dark:text-slate-400'>
              <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4" />
              <span>{publication.author.location}</span>
            </p>
          )}

          {/* Social Links */}
          <div className="flex gap-3 pt-2">
            {publication.links?.twitter && (
              <a
                href={publication.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-200 transition-all duration-200"
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} className="w-5 h-5" />
              </a>
            )}
            {publication.links?.github && (
              <a
                href={publication.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-200 transition-all duration-200"
                aria-label="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
              </a>
            )}
            {publication.links?.linkedin && (
              <a
                href={publication.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-200 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
              </a>
            )}
            {publication.links?.website && (
              <a
                href={publication.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-200 transition-all duration-200"
                aria-label="Website"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Right side - Profile Image */}
        {publication.author.profilePicture && (
          <div className="w-full lg:w-auto lg:flex-shrink-0">
            <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-2xl blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl">
                <Image
                  src={publication.author.profilePicture}
                  alt={publication.author.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};