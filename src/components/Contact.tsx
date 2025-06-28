import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Contact = () => {
  const { personal } = portfolioData;

  return (
    <section className="py-20 px-6 relative overflow-hidden bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          <p className="text-gray-300 mt-6 text-lg">Let's discuss opportunities and create something amazing together</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="backdrop-blur-sm bg-white/10 p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500 rounded-full">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Phone</h3>
                  <p className="text-gray-300">{personal.phone}</p>
                </div>
              </div>
            </div>
            
            <div className="backdrop-blur-sm bg-white/10 p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500 rounded-full">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Email</h3>
                  <p className="text-gray-300">{personal.email}</p>
                </div>
              </div>
            </div>
            
            <div className="backdrop-blur-sm bg-white/10 p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-500 rounded-full">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Location</h3>
                  <p className="text-gray-300">{personal.fullAddress}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="backdrop-blur-sm bg-white/10 p-8 rounded-2xl border border-white/20">
            <form className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 backdrop-blur-sm"
                  placeholder="Your Name"
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 backdrop-blur-sm"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Message</label>
                <textarea 
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 backdrop-blur-sm resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all hover:scale-105"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;