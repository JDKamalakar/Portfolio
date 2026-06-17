import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from 'react';
import { ExternalLink, Github, Calendar, ChevronDown, ChevronUp, Code, Eye, MoreHorizontal, Star, GitFork, Clock, Filter, Search, SearchX, ArrowUpDown } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// Custom FLIP hook for high-performance layout shuffling and filtering
function useFlip(listRef: React.RefObject<HTMLElement>, dependencies: any[]) {
  const previousRects = useRef<Map<string, DOMRect>>(new Map());

  useLayoutEffect(() => {
    if (!listRef.current) return;
    const children = Array.from(listRef.current.children) as HTMLElement[];
    const currentRects = new Map<string, DOMRect>();

    children.forEach(child => {
      const id = child.dataset.id;
      if (id) {
        currentRects.set(id, child.getBoundingClientRect());
      }
    });

    children.forEach(child => {
      const id = child.dataset.id;
      if (!id) return;

      const prev = previousRects.current.get(id);
      const curr = currentRects.get(id);

      if (prev && curr) {
        const dx = prev.left - curr.left;
        const dy = prev.top - curr.top;
        if (dx !== 0 || dy !== 0) {
          child.animate([
            { transform: `translate(${dx}px, ${dy}px)` },
            { transform: 'translate(0px, 0px)' }
          ], {
            duration: 600,
            easing: 'cubic-bezier(0.32,0.72,0,1)'
          });
        }
      }
    });

    previousRects.current = currentRects;
  }, dependencies);
}

const Projects = () => {
  const { projects, github } = portfolioData;
  const [allProjects, setAllProjects] = useState(projects);
  const [expandedProjects, setExpandedProjects] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'stars' | 'forks'>('newest');
  const [filterLang, setFilterLang] = useState<string>('All');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [langSearchTerm, setLangSearchTerm] = useState('');
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLangOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isLangOpen]);

  useEffect(() => {
    const closeDropdowns = () => {
      setIsSortOpen(false);
      setIsLangOpen(false);
    };
    document.addEventListener('click', closeDropdowns);
    return () => document.removeEventListener('click', closeDropdowns);
  }, []);

  const allLanguages = useMemo(() => {
    const langs = new Set<string>();
    allProjects.forEach(p => {
      if (p.technologies) {
        p.technologies.forEach((tech: string) => langs.add(tech));
      }
    });
    return ['All', ...Array.from(langs).sort()];
  }, [allProjects]);

  const filteredAndSortedProjects = useMemo(() => {
    let result = [...allProjects];

    if (filterLang !== 'All') {
      result = result.filter(p => p.technologies?.includes(filterLang));
    }

    result.sort((a, b) => {
      if (sortBy === 'newest' || sortBy === 'oldest') {
        const getSortDate = (p: any) => {
          if (p.rawDate) return p.rawDate.getTime();
          const dateStr = p.period.split('-')[0].trim();
          const date = new Date(dateStr);
          return isNaN(date.getTime()) ? 0 : date.getTime();
        };
        
        const dateA = getSortDate(a);
        const dateB = getSortDate(b);
        return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
      }
      
      if (sortBy === 'stars') {
        const starsA = a.stats?.stars || 0;
        const starsB = b.stats?.stars || 0;
        return starsB - starsA;
      }
      
      if (sortBy === 'forks') {
        const forksA = a.stats?.forks || 0;
        const forksB = b.stats?.forks || 0;
        return forksB - forksA;
      }
      
      return 0;
    });

    return result;
  }, [allProjects, filterLang, sortBy]);

  useEffect(() => {
    const fetchRemoteProjects = async () => {
      try {
        const response = await fetch(github.fetchUrl || 'https://api.github.com/users/' + github.username + '/repos');
        const data = await response.json();
        
        const remoteProjects = data
          .filter((repo: any) => !github.excludeRepos.includes(repo.name))
          .map((repo: any) => {
            const date = new Date(repo.created_at);
            return {
              rawDate: new Date(repo.updated_at || repo.created_at),
              title: repo.name.replace(/-/g, ' '),
              subtitle: "GitHub Repository",
              period: `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`,
              description: repo.description || "No description provided.",
              technologies: repo.language ? [repo.language, ...(repo.topics || [])] : repo.topics || [],
              githubUrl: repo.html_url,
              demoUrl: repo.homepage || "",
              stats: {
                stars: repo.stargazers_count || 0,
                forks: repo.forks_count || 0,
                updatedAt: new Date(repo.updated_at).toLocaleDateString()
              }
            };
          });

        setAllProjects(prev => {
          const existingUrls = new Set(prev.map(p => p.githubUrl));
          const newProjects = remoteProjects.filter((p: any) => !existingUrls.has(p.githubUrl));
          return [...prev, ...newProjects];
        });
      } catch (error) {
        console.error("Failed to fetch remote projects:", error);
      }
    };

    if (github.autoFetch) {
      fetchRemoteProjects();
    }
  }, []);

  // Apply the FLIP animation when the filtered and sorted projects change
  useFlip(gridRef, [filteredAndSortedProjects]);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    const cardObserver = new IntersectionObserver(
      (entries) => {
        setVisibleCards(prev => {
          const next = new Set(prev);
          entries.forEach(entry => {
            const id = (entry.target as HTMLElement).dataset.id;
            if (id) {
              if (entry.isIntersecting) {
                next.add(id);
              } else {
                next.delete(id);
              }
            }
          });
          return next;
        });
      },
      { threshold: 0, rootMargin: '0px 0px -50px 0px' }
    );

    if (gridRef.current) {
      Array.from(gridRef.current.children).forEach(child => {
        cardObserver.observe(child);
      });
    }

    return () => {
      sectionObserver.disconnect();
      cardObserver.disconnect();
    };
  }, [allProjects]);

  // Handle escape key for dropdowns
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSortOpen(false);
        setIsLangOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleExpanded = (index: number) => {
    setExpandedProjects(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getPreviewDescription = (description: string, maxLength: number = 120) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 px-6 relative bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 transition-all duration-700 ease-in-out"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/50 via-cyan-200/40 to-blue-300/50 dark:from-blue-900/30 dark:via-cyan-900/25 dark:to-blue-800/30 rounded-full blur-3xl transition-all duration-1000 animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-br from-indigo-200/50 via-blue-200/40 to-cyan-300/50 dark:from-indigo-900/30 dark:via-blue-900/25 dark:to-cyan-800/30 rounded-full blur-3xl transition-all duration-1000 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-br from-cyan-200/40 via-blue-300/30 to-indigo-300/40 dark:from-cyan-900/25 dark:via-blue-800/20 dark:to-indigo-900/25 rounded-full blur-2xl animate-pulse delay-500 transition-all duration-1000"></div>
        <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-gradient-to-br from-indigo-200/40 via-blue-300/30 to-cyan-300/40 dark:from-indigo-900/25 dark:via-blue-800/20 dark:to-cyan-900/25 rounded-full blur-2xl animate-pulse delay-1500 transition-all duration-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-gradient-to-br from-blue-300/40 to-cyan-400/40 dark:from-blue-800/30 dark:to-cyan-900/30 rounded-full blur-2xl animate-bounce delay-500"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-gradient-to-br from-indigo-300/40 to-blue-400/40 dark:from-indigo-800/30 dark:to-blue-900/30 rounded-full blur-2xl animate-bounce delay-1500"></div>
        <div className="absolute top-16 right-16 w-16 h-16 bg-gradient-to-br from-emerald-300/35 to-teal-400/35 dark:from-emerald-800/25 dark:to-teal-900/25 rounded-full blur-xl animate-bounce delay-300"></div>
        <div className="absolute bottom-16 left-16 w-20 h-20 bg-gradient-to-br from-sky-300/35 to-blue-400/35 dark:from-sky-800/25 dark:to-blue-900/25 rounded-full blur-xl animate-bounce delay-800"></div>
        <div className="absolute top-3/4 left-10 w-12 h-12 bg-gradient-to-br from-cyan-300/35 to-blue-400/35 dark:from-cyan-800/25 dark:to-blue-900/25 rounded-full blur-lg animate-pulse delay-600"></div>
        <div className="absolute top-10 right-1/2 w-14 h-14 bg-gradient-to-br from-blue-300/35 to-indigo-400/35 dark:from-blue-800/25 dark:to-indigo-900/25 rounded-full blur-lg animate-pulse delay-1100"></div>
        <div className="absolute top-1/5 left-0 w-6 h-6 bg-blue-400/20 dark:bg-blue-600/15 rounded-full blur-sm" style={{ animation: 'slideRight 15s linear infinite', animationDelay: '0s' }}></div>
        <div className="absolute bottom-1/4 right-0 w-8 h-8 bg-cyan-400/20 dark:bg-cyan-600/15 rounded-full blur-sm" style={{ animation: 'slideLeft 12s linear infinite', animationDelay: '3s' }}></div>
        <div className="absolute top-3/5 left-1/2 w-4 h-4 bg-indigo-400/20 dark:bg-indigo-600/15 rounded-full blur-sm" style={{ animation: 'floatVertical 10s ease-in-out infinite', animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Parent container needs a high z-index and relative positioning to escape stacking context issues */}
        <div className={`relative z-50 flex flex-col items-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-default">
            Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full hover:w-32 transition-all duration-300 mb-8"></div>
          
          {/* Filters */}
          <div className="w-full max-w-2xl relative z-50">
            {/* Blur layer decoupled from children to fix Safari/Mobile nested backdrop bugs */}
            <div className="absolute inset-0 backdrop-blur-xl bg-white/20 dark:bg-gray-800/20 rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg theme-glow pointer-events-none"></div>
            
            <div className="flex flex-wrap justify-center gap-4 px-6 py-4 w-full relative z-10">
              <div className="flex items-center gap-2">
                <ArrowUpDown size={18} className="text-blue-500" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Sort by:</span>
              </div>
            {/* Custom Sort Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => { setIsSortOpen(!isSortOpen); setIsLangOpen(false); }}
                className="flex items-center justify-between gap-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 text-gray-800 dark:text-gray-200 text-sm rounded-xl p-2.5 min-w-[140px] hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors"
              >
                <span key={sortBy} className="animate-in fade-in slide-in-from-bottom-1 duration-300">{sortBy === 'newest' ? 'Newest First' : sortBy === 'oldest' ? 'Oldest First' : sortBy === 'forks' ? 'Most Forked' : 'Most Stars'}</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[180px] bg-white/20 dark:bg-gray-800/20 backdrop-blur-[40px] border border-gray-300/30 dark:border-gray-700/30 rounded-2xl shadow-2xl p-2 flex flex-col gap-1.5 z-50 transform transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] origin-top ${isSortOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-90 -translate-y-4 pointer-events-none'}`}>
                {[
                    { value: 'newest', label: 'Newest First' },
                    { value: 'oldest', label: 'Oldest First' },
                    { value: 'stars', label: 'Most Stars' },
                    { value: 'forks', label: 'Most Forked' }
                  ].map((option, index, array) => {
                    const isFirst = index === 0;
                    const isLast = index === array.length - 1;
                    const isActive = sortBy === option.value;
                    let roundingClass = isActive ? 'rounded-xl' : (isFirst ? 'rounded-t-xl rounded' : isLast ? 'rounded-b-xl rounded' : 'rounded');

                    return (
                      <button
                        key={option.value}
                        style={{ animationDelay: `${index * 50}ms` }}
                        onClick={() => { setSortBy(option.value as any); setIsSortOpen(false); }}
                        className={`anim-outback w-full text-left px-4 py-3 text-sm transition-[transform,box-shadow,background-color,border-radius] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] backdrop-blur-sm transform origin-center hover:scale-[1.03] hover:-translate-y-1 hover:rounded-xl font-medium ${roundingClass} ${isActive ? 'bg-blue-500/30 text-blue-700 dark:text-blue-300 shadow-md border border-blue-300/50 dark:border-blue-500/50 glow-blue active-glow' : 'text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/30 glow-blue'}`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
              </div>
            </div>
            
            <div className="w-px h-10 bg-gray-300/50 dark:bg-gray-700/50 hidden sm:block mx-2"></div>
            
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-blue-500" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Language:</span>
            </div>
            
            {/* Custom Language Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => { setIsLangOpen(!isLangOpen); setIsSortOpen(false); }}
                className="flex items-center justify-between gap-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 text-gray-800 dark:text-gray-200 text-sm rounded-xl p-2.5 min-w-[140px] hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors"
              >
                <span key={filterLang} className="truncate max-w-[100px] animate-in fade-in slide-in-from-bottom-1 duration-300">{filterLang}</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[220px] bg-white/20 dark:bg-gray-800/20 backdrop-blur-[40px] border border-gray-300/30 dark:border-gray-700/30 rounded-2xl shadow-2xl p-2 flex flex-col gap-1.5 z-50 transform transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] origin-top ${isLangOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-90 -translate-y-4 pointer-events-none'}`}>
                <div className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/30 dark:bg-gray-700/30 backdrop-blur-sm shadow-sm border border-gray-300/40 dark:border-gray-600/40 mb-1">
                    <Search size={14} className="text-gray-600 dark:text-gray-300" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search..."
                      value={langSearchTerm}
                      onChange={(e) => setLangSearchTerm(e.target.value)}
                      className="bg-transparent border-none outline-none text-sm w-full text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 p-2 overflow-y-scroll overflow-x-hidden always-show-scrollbar max-h-56">
                    {(() => {
                      const filteredLangs = allLanguages.filter(l => l.toLowerCase().includes(langSearchTerm.toLowerCase()));
                      
                      if (filteredLangs.length === 0) {
                        return (
                          <div className="flex flex-col items-center justify-center py-6 px-4 text-center bg-white/10 dark:bg-gray-800/10 rounded-xl border border-gray-300/20 dark:border-gray-600/20 my-1">
                            <SearchX size={24} className="mb-2 text-gray-500 dark:text-gray-400 opacity-60" />
                            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">No matches found</p>
                          </div>
                        );
                      }

                      return filteredLangs.map((lang, index, array) => {
                        const isFirst = index === 0;
                        const isLast = index === array.length - 1;
                        const isActive = filterLang === lang;
                        let roundingClass = isActive ? 'rounded-xl' : (isFirst ? 'rounded-t-xl rounded' : isLast ? 'rounded-b-xl rounded' : 'rounded');

                        return (
                          <button
                            key={lang}
                            style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
                            onClick={() => { setFilterLang(lang); setIsLangOpen(false); }}
                            className={`anim-outback w-full text-left px-3 py-2.5 text-sm transition-[transform,box-shadow,background-color,border-radius] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] backdrop-blur-sm transform origin-center hover:scale-[1.03] hover:-translate-y-1 hover:rounded-xl font-medium ${roundingClass} ${isActive ? 'bg-blue-500/30 text-blue-700 dark:text-blue-300 shadow-md border border-blue-300/50 dark:border-blue-500/50 glow-blue active-glow' : 'text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/30 glow-blue'}`}
                          >
                            {lang}
                          </button>
                        );
                      });
                    })()}
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>

        <div ref={gridRef} className="relative grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          {allProjects.map((project, originalIndex) => {
            const isProjectVisible = filteredAndSortedProjects.some(p => p.title === project.title);
            const sortIndex = filteredAndSortedProjects.findIndex(p => p.title === project.title);
            const isExpanded = expandedProjects.includes(originalIndex);
            const previewDescription = getPreviewDescription(project.description);
            const hasMoreContent = project.description.length > 120;
            const hasDemoLink = !!project.demoUrl;

            return (
              <div
                key={project.title}
                data-id={project.title}
                style={{ 
                  order: isProjectVisible ? sortIndex : 9999,
                  zIndex: isProjectVisible ? 10 : 0,
                  animationDelay: `${Math.min(sortIndex * 50, 400)}ms`
                }}
                className={`transition-[opacity,transform,box-shadow,border-radius] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group flex flex-col min-w-0 backdrop-blur-xl bg-white/15 dark:bg-gray-800/15 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 theme-glow ${
                  isProjectVisible 
                    ? `relative scale-100 ${visibleCards.has(project.title) ? 'anim-outback opacity-100' : 'opacity-0 translate-y-10'}` 
                    : 'absolute top-0 left-0 w-full md:w-[calc(50%-1.25rem)] opacity-0 scale-50 pointer-events-none'
                } ${hasMoreContent ? 'cursor-pointer' : 'cursor-default'} ${isExpanded ? 'scale-[1.02] shadow-3xl bg-white/25 dark:bg-gray-800/25' : 'hover:scale-[1.02] hover:bg-white/20 dark:hover:bg-gray-800/20'}`}
                onClick={() => hasMoreContent && toggleExpanded(originalIndex)}
              >
                {/* Header Section */}
                <div className="p-6 sm:p-8 pb-6">
                  <div className="mb-3">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight break-words">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300 break-words">
                    {project.subtitle}
                  </p>

                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                    <Calendar size={16} className="group-hover:animate-pulse flex-shrink-0" />
                    <span className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">
                      {project.period}
                    </span>
                  </div>

                  {/* GitHub Stats */}
                  {(project as any).stats && (
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      <span className="flex items-center gap-1.5 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-300">
                        <Star size={14} className="group-hover:animate-pulse" /> {(project as any).stats.stars}
                      </span>
                      <span className="flex items-center gap-1.5 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">
                        <GitFork size={14} className="group-hover:animate-pulse" /> {(project as any).stats.forks}
                      </span>
                      <span className="flex items-center gap-1.5 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-300">
                        <Clock size={14} className="group-hover:animate-pulse" /> {(project as any).stats.updatedAt}
                      </span>
                    </div>
                  )}
                </div>

                {/* Description Section */}
                <div className="px-6 sm:px-8 pb-6 flex-1">
                  <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${isExpanded ? 'max-h-96' : 'max-h-20'
                    }`}>
                    <div className={`transform transition-all duration-500`}>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300">
                        {isExpanded ? project.description : previewDescription}
                        {!isExpanded && hasMoreContent && '...'}
                      </p>
                    </div>
                  </div>

                  {hasMoreContent && (
                    <div className="flex justify-center mt-4">
                      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors duration-300 border border-blue-100 dark:border-blue-800/30">
                        <span className="text-sm font-medium">
                          {isExpanded ? 'Show Less' : 'Show More'}
                        </span>
                        <ChevronDown size={16} className={`transform transition-transform duration-500 ${isExpanded ? 'rotate-180' : 'rotate-0 group-hover:animate-bounce'}`} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Technologies Section */}
                <div className="px-6 sm:px-8 pb-6">
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                    <Code size={16} className="text-indigo-600 dark:text-indigo-400" />
                    Technologies Used:
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        // MODIFIED: Added glow
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 dark:from-blue-900/50 dark:to-cyan-900/50 text-white dark:text-blue-100 rounded-lg text-sm font-medium hover:scale-110 transition-all duration-300 cursor-pointer backdrop-blur-sm theme-glow"
                        style={{ animationDelay: `${i * 50}ms` }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 sm:p-8 pt-0 mt-auto">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      // MODIFIED: Added glow
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:scale-105 transition-all duration-300 group/btn flex-1 justify-center backdrop-blur-sm theme-glow"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={16} className="group-hover/btn:animate-pulse" />
                      <span className="font-medium">Code</span>
                    </a>
                    <a
                      href={hasDemoLink ? project.demoUrl : undefined}
                      target={hasDemoLink ? "_blank" : undefined}
                      rel={hasDemoLink ? "noopener noreferrer" : undefined}
                      // MODIFIED: Added glow
                      className={`flex items-center gap-2 px-6 py-3 border-2 rounded-xl transition-all duration-300 hover:scale-105 group/btn flex-1 justify-center backdrop-blur-sm theme-glow ${hasDemoLink
                        ? "border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-500 dark:hover:bg-blue-600 hover:text-white"
                        : "border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50"
                        }`}
                      onClick={(e) => {
                        if (!hasDemoLink) e.preventDefault();
                        e.stopPropagation();
                      }}
                      aria-disabled={!hasDemoLink}
                      tabIndex={hasDemoLink ? 0 : -1}
                    >
                      <Eye size={16} className="group-hover/btn:animate-pulse" />
                      <span className="font-medium">Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideRight {
          0% { transform: translateX(-100px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(calc(100vw + 100px)); opacity: 0; }
        }
        @keyframes slideLeft {
          0% { transform: translateX(100px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(calc(-100vw - 100px)); opacity: 0; }
        }
        @keyframes floatVertical {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-50px); }
        }
      `}</style>
    </section>
  );
};

export default Projects;