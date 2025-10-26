'use client';
import { useState } from 'react';
import { 
  FireIcon,
  CodeBracketIcon,
  CommandLineIcon,
  ChartBarIcon,
  ClockIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter, faHashnode } from '@fortawesome/free-brands-svg-icons';

interface Activity {
  id: number;
  type: 'commit' | 'blog' | 'tweet' | 'project';
  title: string;
  description: string;
  time: string;
  icon: any;
  color: string;
  link?: string;
}

export const Activity = () => {
  const [activeTab, setActiveTab] = useState<'activity' | 'stats'>('activity');

  const activities: Activity[] = [
    {
      id: 1,
      type: 'blog',
      title: 'Published: "How AI is Transforming Backend Engineering"',
      description: 'Exploring AI integration patterns in modern backend systems',
      time: '2 hours ago',
      icon: faHashnode,
      color: 'blue',
      link: '#'
    },
    {
      id: 2,
      type: 'commit',
      title: 'Pushed 12 commits to legal-ai-platform',
      description: 'Implemented vector search and improved response accuracy',
      time: '5 hours ago',
      icon: faGithub,
      color: 'purple',
      link: '#'
    },
    {
      id: 3,
      type: 'tweet',
      title: 'Tweeted about Next.js 15 features',
      description: 'Sharing insights on the latest React Server Components',
      time: '1 day ago',
      icon: faTwitter,
      color: 'cyan',
      link: '#'
    },
    {
      id: 4,
      type: 'project',
      title: 'Launched: Product Designer Portfolio',
      description: 'New portfolio website with stunning animations',
      time: '2 days ago',
      icon: CodeBracketIcon,
      color: 'green',
      link: '#'
    },
    {
      id: 5,
      type: 'commit',
      title: 'Merged PR: Performance optimization',
      description: 'Reduced bundle size by 40% and improved load times',
      time: '3 days ago',
      icon: faGithub,
      color: 'purple',
      link: '#'
    },
  ];

  const stats = [
    {
      label: 'Commits This Week',
      value: '47',
      change: '+12%',
      icon: CodeBracketIcon,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      border: 'border-blue-200 dark:border-blue-800'
    },
    {
      label: 'Active Projects',
      value: '8',
      change: '+2',
      icon: ChartBarIcon,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
      border: 'border-purple-200 dark:border-purple-800'
    },
    {
      label: 'Current Streak',
      value: '23 days',
      change: 'On fire! 🔥',
      icon: FireIcon,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
      border: 'border-orange-200 dark:border-orange-800'
    },
    {
      label: 'Code Time Today',
      value: '6.5h',
      change: 'Productive!',
      icon: ClockIcon,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      border: 'border-green-200 dark:border-green-800'
    },
  ];

  const languages = [
    { name: 'TypeScript', percentage: 45, color: 'bg-blue-500' },
    { name: 'JavaScript', percentage: 25, color: 'bg-yellow-500' },
    { name: 'Python', percentage: 15, color: 'bg-green-500' },
    { name: 'CSS/SCSS', percentage: 10, color: 'bg-pink-500' },
    { name: 'Other', percentage: 5, color: 'bg-slate-400' },
  ];

  return (
    <section id="activity" className="mb-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-800">
            <FireIcon className="w-5 h-5 text-orange-500 animate-pulse" />
            <span className="text-sm font-semibold text-green-700 dark:text-green-300">Live Activity</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
            What I'm Building
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Real-time updates on my coding journey, projects, and contributions
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'activity'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <CalendarIcon className="w-5 h-5" />
            <span>Recent Activity</span>
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'stats'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <ChartBarIcon className="w-5 h-5" />
            <span>Stats & Insights</span>
          </button>
        </div>

        {/* Content */}
        {activeTab === 'activity' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Activity Feed */}
            <div className="space-y-4">
              {activities.map((activity, index) => {
                const isIcon = typeof activity.icon === 'object';
                
                return (
                  <div
                    key={activity.id}
                    className="group relative p-6 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Glow effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                    
                    <div className="relative flex gap-4">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${
                        activity.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                        activity.color === 'purple' ? 'from-purple-500 to-pink-500' :
                        activity.color === 'cyan' ? 'from-cyan-500 to-blue-500' :
                        'from-green-500 to-emerald-500'
                      } flex items-center justify-center shadow-lg`}>
                        {isIcon ? (
                          <FontAwesomeIcon icon={activity.icon} className="w-6 h-6 text-white" />
                        ) : (
                          <activity.icon className="w-6 h-6 text-white" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                          {activity.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          {activity.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
                          <ClockIcon className="w-3.5 h-3.5" />
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Stats Card */}
            <div className="space-y-6">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 text-white border border-slate-700 shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <FireIcon className="w-7 h-7 text-orange-400" />
                  Quick Stats
                </h3>
                
                <div className="space-y-6">
                  {stats.slice(0, 2).map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <stat.icon className="w-8 h-8 text-blue-400" />
                        <div>
                          <div className="text-sm text-slate-400">{stat.label}</div>
                          <div className="text-2xl font-black">{stat.value}</div>
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-green-400">
                        {stat.change}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Language Breakdown */}
                <div className="mt-8">
                  <h4 className="text-lg font-bold mb-4">Languages This Month</h4>
                  <div className="space-y-3">
                    {languages.map((lang, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{lang.name}</span>
                          <span className="font-semibold">{lang.percentage}%</span>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${lang.color} transition-all duration-1000 ease-out`}
                            style={{ width: `${lang.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contribution Graph Preview */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl">
                <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
                  Contribution Activity
                </h3>
                <div className="grid grid-cols-12 gap-1">
                  {[...Array(84)].map((_, i) => {
                    const intensity = Math.random();
                    return (
                      <div
                        key={i}
                        className={`aspect-square rounded-sm ${
                          intensity > 0.7 ? 'bg-green-600' :
                          intensity > 0.5 ? 'bg-green-500' :
                          intensity > 0.3 ? 'bg-green-400' :
                          intensity > 0.1 ? 'bg-green-300' :
                          'bg-slate-200 dark:bg-slate-700'
                        } hover:ring-2 hover:ring-blue-500 transition-all duration-200 cursor-pointer`}
                        title={`${Math.floor(intensity * 20)} contributions`}
                      ></div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between mt-4 text-xs text-slate-500 dark:text-slate-400">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-slate-200 dark:bg-slate-700 rounded-sm"></div>
                    <div className="w-3 h-3 bg-green-300 rounded-sm"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                    <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Stats View */
          <div className="space-y-6">
            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`group p-6 rounded-2xl bg-gradient-to-br ${stat.bgGradient} border ${stat.border} hover:shadow-2xl hover:scale-105 transition-all duration-300`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                      {stat.change}
                    </span>
                  </div>
                  <div className={`text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Coding Activity Chart */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl">
                <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
                  Weekly Coding Activity
                </h3>
                <div className="flex items-end justify-between gap-2 h-48">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                    const height = Math.random() * 100 + 20;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div
                          className="w-full bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 cursor-pointer"
                          style={{ height: `${height}%` }}
                          title={`${Math.floor(height / 10)} hours`}
                        ></div>
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                          {day}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Repository Stats */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl">
                <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
                  Top Repositories
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'legal-ai-platform', stars: 234, language: 'TypeScript', color: 'bg-blue-500' },
                    { name: 'portfolio-builder', stars: 156, language: 'React', color: 'bg-cyan-500' },
                    { name: 'api-gateway', stars: 89, language: 'Node.js', color: 'bg-green-500' },
                  ].map((repo, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors duration-200">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 ${repo.color} rounded-full`}></div>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">
                            {repo.name}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {repo.language}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                        <span>⭐</span>
                        <span>{repo.stars}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
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
      `}</style>
    </section>
  );
};