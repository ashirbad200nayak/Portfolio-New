'use client';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/#about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/projects', label: 'Projects' },
    { href: '/#skills', label: 'Skills' },
    { href: '/#snippets', label: 'Snippets' },
    { href: '/#activity', label: 'Activity' },
    { href: '/#contact', label: 'Contact' },
  ];

  const socialLinks = [
    { icon: faGithub, href: 'https://github.com/ashirbad200nayak/', label: 'GitHub' },
    { icon: faLinkedin, href: 'https://www.linkedin.com/in/ashirbad-nayak/', label: 'LinkedIn' },
    { icon: faTwitter, href: 'https://x.com/AshirbadNayak_0?t=1mszE5BjZRuTtP7JtzKjsg&s=09', label: 'Twitter' },
  ];

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-auto">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Ashirbad Nayak
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Building amazing web experiences and writing about technology. Let's create something awesome together.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
              Connect
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all transform hover:scale-110 duration-200"
                >
                  <FontAwesomeIcon icon={social.icon} className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Feel free to reach out on social media!
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-slate-600 dark:text-slate-400 text-sm text-center md:text-left">
              © {currentYear} Ashirbad Nayak. All rights reserved.
            </p>

            {/* Made with love */}
            <p className="text-slate-600 dark:text-slate-400 text-sm flex items-center gap-2">
              Made with{' '}
              <FontAwesomeIcon 
                icon={faHeart} 
                className="w-4 h-4 text-red-500 animate-pulse" 
              />
              {' '}in Cuttack
            </p>
          </div>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
    </footer>
  );
};