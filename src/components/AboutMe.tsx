'use client';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCode, faRocket, faBriefcase } from '@fortawesome/free-solid-svg-icons';
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
    <section id="about" className="mb-32 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="flex flex-col-reverse lg:flex-row items-start gap-12 lg:gap-20">
        {/* Left side - Text content */}
        <div className="flex-1 space-y-8">
          {/* Availability badge with enhanced design */}
          {isAvailableLink && (
            <div className="flex items-center gap-4">
              <a
                href={isAvailableLink}
                target='_blank'
                rel="noopener noreferrer"
                className='inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 px-6 py-3 text-sm font-semibold text-green-700 dark:text-green-400 hover:shadow-lg hover:shadow-green-500/20 dark:hover:shadow-green-400/20 transition-all duration-300 border border-green-200 dark:border-green-800'
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Available for work
              </a>
            </div>
          )}

          {/* Name with enhanced gradient */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Hi, I'm {publication.author.name}
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl mt-4 text-slate-700 dark:text-slate-300 font-bold">
              👋
            </span>
          </h1>

          {/* Tagline with card design */}
          <div className="space-y-4">
            <p className="text-2xl md:text-3xl text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
              Building{' '}
              <a 
                href="#" 
                className="relative inline-block group"
              >
                <span className="relative z-10 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent font-bold hover:from-blue-700 hover:to-cyan-700 transition-all">
                  LegalAI
                </span>
                <span className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 group-hover:h-full transition-all duration-300 -z-0 rounded"></span>
              </a>
              ,{' '}
              <a 
                href="#" 
                className="relative inline-block group"
              >
                <span className="relative z-10 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold hover:from-purple-700 hover:to-pink-700 transition-all">
                  Product Designer Portfolio
                </span>
                <span className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 group-hover:h-full transition-all duration-300 -z-0 rounded"></span>
              </a>
              , and other cool AI stuffs.
            </p>
          </div>

          {/* Role description with icon */}
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200 dark:border-slate-700 shadow-lg">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <FontAwesomeIcon icon={faBriefcase} className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                Senior Software Engineer
              </h3>
              <p className="text-base text-slate-600 dark:text-slate-400">
                Building SaaS products and web apps. Find me on social media for tech updates and insights.
              </p>
            </div>
          </div>

          {/* Stats/Highlights cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="group p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <FontAwesomeIcon icon={faCode} className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-1">2+</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Years Experience</div>
            </div>
            
            <div className="group p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <FontAwesomeIcon icon={faRocket} className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3" />
              <div className="text-3xl font-bold text-purple-900 dark:text-purple-100 mb-1">10+</div>
              <div className="text-sm text-purple-700 dark:text-purple-300">Projects Shipped</div>
            </div>

            <div className="group p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 hover:shadow-xl hover:scale-105 transition-all duration-300 col-span-2 md:col-span-1">
              <div className="text-3xl mb-3">☕</div>
              <div className="text-3xl font-bold text-green-900 dark:text-green-100 mb-1">∞</div>
              <div className="text-sm text-green-700 dark:text-green-300">Coffee Consumed</div>
            </div>
          </div>

          {/* Bio */}
          {publication.author.bio && (
            <div
              className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed prose dark:prose-invert max-w-none prose-headings:text-slate-900 dark:prose-headings:text-slate-100 prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-700 dark:hover:prose-a:text-blue-300"
              dangerouslySetInnerHTML={{
                __html: publication.author.bio.html || '',
              }}
            />
          )}

          {/* Location */}
          {publication.author.location && (
            <div className='inline-flex items-center gap-3 px-5 py-3 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700'>
              <FontAwesomeIcon icon={faLocationDot} className="w-5 h-5 text-red-500" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">{publication.author.location}</span>
            </div>
          )}

          {/* Social Links with enhanced design */}
          <div className="pt-4">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
              Connect with me
            </p>
            <div className="flex flex-wrap gap-4">
              {publication.links?.twitter && (
                <a
                  href={publication.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 rounded-xl bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 border border-sky-200 dark:border-sky-800 hover:shadow-xl hover:shadow-sky-500/20 dark:hover:shadow-sky-400/20 hover:scale-110 transition-all duration-300"
                  aria-label="Twitter"
                >
                  <FontAwesomeIcon icon={faTwitter} className="w-6 h-6 text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform" />
                </a>
              )}
              {publication.links?.github && (
                <a
                  href={publication.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 rounded-xl bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:shadow-slate-500/20 dark:hover:shadow-slate-400/20 hover:scale-110 transition-all duration-300"
                  aria-label="GitHub"
                >
                  <FontAwesomeIcon icon={faGithub} className="w-6 h-6 text-slate-700 dark:text-slate-300 group-hover:scale-110 transition-transform" />
                </a>
              )}
              {publication.links?.linkedin && (
                <a
                  href={publication.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 hover:shadow-xl hover:shadow-blue-500/20 dark:hover:shadow-blue-400/20 hover:scale-110 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                </a>
              )}
              {publication.links?.website && (
                <a
                  href={publication.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 hover:shadow-xl hover:shadow-purple-500/20 dark:hover:shadow-purple-400/20 hover:scale-110 transition-all duration-300"
                  aria-label="Website"
                >
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right side - Profile Image with enhanced design */}
        {publication.author.profilePicture && (
          <div className="w-full lg:w-auto lg:flex-shrink-0">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto lg:mx-0">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-3xl blur-3xl opacity-40 animate-pulse"></div>
              
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-3xl border-4 border-blue-200 dark:border-blue-800 animate-spin-slow opacity-50"></div>
              <div className="absolute inset-4 rounded-3xl border-4 border-purple-200 dark:border-purple-800 animate-spin-slower opacity-50"></div>
              
              {/* Main image container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 group-hover:opacity-0 transition-opacity duration-300"></div>
                <Image
                  src={publication.author.profilePicture}
                  alt={publication.author.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  priority
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-xl font-bold text-lg animate-bounce-slow">
                🚀 Let's Build!
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slower {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 30s linear infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};