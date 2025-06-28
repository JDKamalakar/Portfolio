import React from 'react';
import { portfolioData } from '../data/portfolioData';

const About = () => {
  const { personal, about } = portfolioData;

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-100/50 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="backdrop-blur-sm bg-white/70 p-8 rounded-2xl shadow-xl border border-white/20">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {personal.objective}
            </p>
            
            <div className="space-y-4">
              {about.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-2 h-2 ${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-purple-500' : 'bg-indigo-500'} rounded-full`}></div>
                  <span className="text-gray-600">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="backdrop-blur-sm bg-white/70 p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {about.languages.map((lang) => (
                  <span key={lang} className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="backdrop-blur-sm bg-white/70 p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Hobbies</h3>
              <div className="flex flex-wrap gap-2">
                {about.hobbies.map((hobby) => (
                  <span key={hobby} className="px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full text-sm">
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;