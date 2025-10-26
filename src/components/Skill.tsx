'use client';
import { useState } from 'react';
import { 
  CodeBracketIcon, 
  ServerIcon, 
  DevicePhoneMobileIcon,
  CloudIcon,
  CpuChipIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillCategory {
  title: string;
  icon: any;
  gradient: string;
  skills: Skill[];
}

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories: SkillCategory[] = [
    {
      title: 'Frontend',
      icon: CodeBracketIcon,
      gradient: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'React/Next.js', level: 90, color: 'bg-blue-500' },
        { name: 'TypeScript', level: 90, color: 'bg-blue-600' },
        { name: 'Tailwind CSS', level: 90, color: 'bg-cyan-500' },
        { name: 'JavaScript', level: 93, color: 'bg-yellow-500' },
      ]
    },
    {
      title: 'Backend',
      icon: ServerIcon,
      gradient: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'Node.js', level: 88, color: 'bg-green-600' },
        { name: 'Python', level: 85, color: 'bg-blue-500' },
        { name: 'GraphQL', level: 52, color: 'bg-pink-500' },
        { name: 'REST APIs', level: 90, color: 'bg-purple-500' },
      ]
    },
    {
      title: 'Mobile',
      icon: DevicePhoneMobileIcon,
      gradient: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'React Native', level: 67, color: 'bg-blue-400' },
        { name: 'iOS/Android', level: 60, color: 'bg-green-500' },
        { name: 'Flutter', level: 25, color: 'bg-cyan-400' },
        { name: 'Mobile UX', level: 78, color: 'bg-emerald-500' },
      ]
    },
    {
      title: 'Cloud & DevOps',
      icon: CloudIcon,
      gradient: 'from-orange-500 to-red-500',
      skills: [
        { name: 'AWS/Azure', level: 73, color: 'bg-orange-500' },
        { name: 'Docker', level: 86, color: 'bg-blue-600' },
        { name: 'CI/CD', level: 84, color: 'bg-green-600' },
        { name: 'Kubernetes', level: 58, color: 'bg-blue-500' },
      ]
    },
    {
      title: 'AI & ML',
      icon: CpuChipIcon,
      gradient: 'from-violet-500 to-purple-500',
      skills: [
        { name: 'OpenAI APIs', level: 90, color: 'bg-green-500' },
        { name: 'LangChain', level: 85, color: 'bg-purple-500' },
        { name: 'Vector DBs', level: 82, color: 'bg-violet-500' },
        { name: 'ML Models', level: 80, color: 'bg-indigo-500' },
      ]
    },
  ];

  return (
    <section id="skills" className="mb-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-400 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-800">
            <SparklesIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Skills & Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
            What I Bring to the Table
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A diverse skill set spanning modern web technologies, cloud infrastructure, and AI integration
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`group relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeCategory === index
                    ? 'bg-gradient-to-r ' + category.gradient + ' text-white shadow-lg scale-105'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {activeCategory === index && (
                  <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse"></div>
                )}
                <Icon className="w-5 h-5 relative z-10" />
                <span className="relative z-10">{category.title}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Display */}
        <div className="relative">
          {categories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className={`transition-all duration-500 ${
                activeCategory === categoryIndex
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 absolute inset-0 pointer-events-none translate-y-4'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 rounded-3xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200 dark:border-slate-700 shadow-xl">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="group space-y-3 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        {skill.name}
                      </span>
                      <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {skill.level}%
                      </span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="relative h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`absolute inset-y-0 left-0 ${skill.color} rounded-full transition-all duration-1000 ease-out group-hover:animate-pulse`}
                        style={{
                          width: `${skill.level}%`,
                          transitionDelay: `${skillIndex * 100}ms`
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              15+
            </div>
            <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              Technologies
            </div>
          </div>

          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              2+
            </div>
            <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              Years Experience
            </div>
          </div>

          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              10+
            </div>
            <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              Projects Built
            </div>
          </div>

          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
              100%
            </div>
            <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              Client Satisfaction
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};