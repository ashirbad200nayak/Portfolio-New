import { PublicationLinks } from '../../../generated/graphq';
import {
  faGithub,
  faHashnode,
  faInstagram,
  faLinkedin,
  faMastodon,
  faXTwitter,
  faYoutube,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

export const SOCIAL_LINKS: {
  [key in keyof PublicationLinks]: IconDefinition;
} = {
  instagram: faInstagram,
  github: faGithub,
  website: faGlobe,
  hashnode: faHashnode,
  youtube: faYoutube,
  linkedin: faLinkedin,
  mastodon: faMastodon,
  twitter: faXTwitter,
};

export const PROJECTS: {
  name: string;
  description: string;
  url?: string;
  demoLink?: string;
  imageUrl?: string;
  category?: string;
  tags?: string[];
}[] = [
  {
    name: 'LegalAI',
    description: 'AI-powered legal document analysis and contract review platform helping lawyers and businesses automate legal workflows.',
    imageUrl: '/legalAi.png', // Just reference the path in public folder
    url: 'https://github.com/ashirbad200nayak/Legal-AI',
    demoLink: 'lhttps://legal-ai-rosy.vercel.app/',
    category: 'SaaS',
    tags: ['Next.js', 'Python', 'OpenAI', 'TailwindCSS', 'PostgreSQL'],
  },
  {
    name: 'Product Designer portfolio',
    description: 'A cool and minimalist portfolio for a Proudct Designer.',
    imageUrl: '/productDeveloper.png',
    url: 'https://github.com/ashirbad200nayak/Product-Designer',
    demoLink: 'https://product-designer-gamma.vercel.app/',
    category: 'Full-Stack',
    tags: ['React', 'Node.js', 'MongoDB', 'TailwindCSS'],
  },
];