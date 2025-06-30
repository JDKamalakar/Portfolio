import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Calendar, ChevronDown, ChevronUp, Code, Eye, MoreHorizontal } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Projects = () => {
  const { projects } = portfolioData;
  const [expandedProjects, setExpandedProjects] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
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
      className="py-20 px-6 relative overflow-hidden bg-gradient-to-b from-violet-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 transition-all duration-700 ease-in-out"
    >
      {/* Enhanced Animated Background Flairs */}
      {/* Primary Large Gradient Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-200/50 via-indigo-200/40 to-blue-300/50 dark:from-purple-900/30 dark:via-indigo-900/25 dark:to-blue-800/30 rounded-full blur-3xl transition-all duration-1000 animate-pulse"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-br from-fuchsia-200/50 via-pink-200/40 to-violet-300/50 dark:from-fuchsia-900/30 dark:via-pink-900/25 dark:to-violet-800/30 rounded-full blur-3xl transition-all duration-1000 animate-pulse delay-1000"></div>

      {/* Secondary Medium Gradient Orbs */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-br from-blue-200/40 via-cyan-300/30 to-teal-300/40 dark:from-blue-900/25 dark:via-cyan-800/20 dark:to-teal-900/25 rounded-full blur-2xl animate-pulse delay-500 transition-all duration-1000"></div>
      <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-gradient-to-br from-purple-200/40 via-indigo-300/30 to-violet-300/40 dark:from-purple-900/25 dark:via-indigo-800/20 dark:to-violet-900/25 rounded-full blur-2xl animate-pulse delay-1500 transition-all duration-1000"></div>

      {/* Floating animated orbs with enhanced colors */}
      <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-gradient-to-br from-indigo-300/40 to-violet-400/40 dark:from-indigo-800/30 dark:to-violet-900/30 rounded-full blur-2xl animate-bounce delay-500"></div>
      <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-gradient-to-br from-pink-300/40 to-fuchsia-400/40 dark:from-pink-800/30 dark:to-fuchsia-900/30 rounded-full blur-2xl animate-bounce delay-1500"></div>

      {/* Additional Small Floating Elements */}
      <div className="absolute top-16 right-16 w-16 h-16 bg-gradient-to-br from-purple-300/35 to-blue-400/35 dark:from-purple-800/25 dark:to-blue-900/25 rounded-full blur-xl animate-bounce delay-300"></div>
      <div className="absolute bottom-16 left-16 w-20 h-20 bg-gradient-to-br from-teal-300/35 to-cyan-400/35 dark:from-teal-800/25 dark:to-cyan-900/25 rounded-full blur-xl animate-bounce delay-800"></div>
      <div className="absolute top-3/4 left-10 w-12 h-12 bg-gradient-to-br from-lime-300/35 to-green-400/35 dark:from-lime-800/25 dark:to-green-900/25 rounded-full blur-lg animate-pulse delay-600"></div>
      <div className="absolute top-10 right-1/2 w-14 h-14 bg-gradient-to-br from-rose-300/35 to-red-400/35 dark:from-rose-800/25 dark:to-red-900/25 rounded-full blur-lg animate-pulse delay-1100"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300 cursor-default">
            Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-indigo-600 mx-auto rounded-full hover:w-32 transition-all duration-300"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => {
            const isExpanded = expandedProjects.includes(index);
            const previewDescription = getPreviewDescription(project.description);
            const hasMoreContent = project.description.length > 120;
            const hasDemoLink = !!project.demoUrl; // Check if demoUrl is truthy

            return (
              <div
                key={index}
                className={`backdrop-blur-xl bg-white/15 dark:bg-gray-800/15 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 hover:shadow-3xl transition-all duration-500 group flex flex-col cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } ${isExpanded ? 'scale-[1.02] shadow-3xl bg-white/25 dark:bg-gray-800/25' : 'hover:scale-[1.02] hover:bg-white/20 dark:hover:bg-gray-800/20'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onClick={() => toggleExpanded(index)}
              >
                {/* Header Section */}
                <div className="p-8 pb-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors duration-300 flex-1 leading-tight">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                      <span className="text-sm font-medium text-fuchsia-600 dark:text-fuchsia-400">
                        {isExpanded ? 'Show Less' : 'Show More'}
                      </span>
                      <div className={`transform transition-all duration-500 ease-in-out ${
                        isExpanded ? 'rotate-180 scale-110' : 'rotate-0 scale-100'
                      }`}>
                        <ChevronDown size={20} className="text-fuchsia-600 dark:text-fuchsia-400 group-hover:animate-bounce" />
                      </div>
                    </div>
                  </div>

                  <p className="text-violet-600 dark:text-violet-400 font-medium mb-3 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors duration-300">
                    {project.subtitle}
                  </p>

                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6">
                    <Calendar size={16} className="group-hover:animate-pulse flex-shrink-0" />
                    <span className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">
                      {project.period}
                    </span>
                  </div>
                </div>

                {/* Description Section */}
                <div className="px-8 pb-6 flex-1">
                  <div className={`overflow-hidden transition-all duration-700 ease-in-out ${
                    isExpanded ? 'max-h-96' : 'max-h-20'
                  }`}>
                    <div className={`transform transition-all duration-500 ${
                      isExpanded ? 'translate-y-0 scale-100' : 'translate-y-0 scale-100'
                    }`}>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300">
                        {isExpanded ? project.description : previewDescription}
                      </p>
                    </div>
                  </div>

                  {hasMoreContent && !isExpanded && (
                    <div className="flex justify-center mt-3">
                      <MoreHorizontal size={16} className="text-gray-400 dark:text-gray-500 animate-pulse" />
                    </div>
                  )}
                </div>

                {/* Technologies Section */}
                <div className="px-8 pb-6">
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                    <Code size={16} className="text-violet-600 dark:text-violet-400" />
                    Technologies Used:
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white rounded-full text-sm font-medium hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer backdrop-blur-sm"
                        style={{ animationDelay: `${i * 50}ms` }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons - Anchored to bottom */}
                <div className="p-8 pt-0 mt-auto">
                  <div className="flex gap-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 group/btn flex-1 justify-center backdrop-blur-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={16} className="group-hover/btn:animate-pulse" />
                      <span className="font-medium">Code</span>
                    </a>
                    <a
                      href={hasDemoLink ? project.demoUrl : undefined} // Only set href if link exists
                      target={hasDemoLink ? "_blank" : undefined} // Only set target if link exists
                      rel={hasDemoLink ? "noopener noreferrer" : undefined} // Only set rel if link exists
                      className={`flex items-center gap-2 px-6 py-3 border-2 rounded-lg transition-all duration-300 hover:scale-105 group/btn flex-1 justify-center backdrop-blur-sm ${
                        hasDemoLink
                          ? "border-fuchsia-500 dark:border-fuchsia-400 text-fuchsia-600 dark:text-fuchsia-400 hover:bg-fuchsia-500 dark:hover:bg-fuchsia-600 hover:text-white"
                          : "border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50"
                      }`}
                      onClick={(e) => {
                        if (!hasDemoLink) e.preventDefault(); // Prevent default if no demo link
                        e.stopPropagation();
                      }}
                      aria-disabled={!hasDemoLink} // Accessibility for disabled state
                      tabIndex={hasDemoLink ? 0 : -1} // Prevent tabbing if disabled
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
    </section>
  );
};

export default Projects;