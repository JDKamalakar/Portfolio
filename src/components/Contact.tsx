import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Contact = () => {
  const { personal } = portfolioData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(`Portfolio Contact: Message from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n\n` +
        `Message:\n${formData.message}\n\n` +
        `---\nSent from Portfolio Website`
      );
      
      const mailtoLink = `mailto:${personal.email}?subject=${subject}&body=${body}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Show success message
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 3000);
      }, 1000);
      
    } catch (error) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }
  };

  const openGoogleMaps = () => {
    const encodedAddress = encodeURIComponent(personal.fullAddress);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="py-20 px-6 relative overflow-hidden bg-gray-900 dark:bg-black transition-all duration-700 ease-in-out rounded-t-3xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 dark:from-black dark:via-blue-900 dark:to-purple-900 transition-colors duration-500"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 dark:bg-blue-400/10 rounded-full blur-3xl transition-colors duration-500"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/20 dark:bg-purple-400/10 rounded-full blur-3xl transition-colors duration-500"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl font-bold text-white mb-4 hover:text-blue-400 transition-colors duration-300 cursor-default">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full hover:w-32 transition-all duration-300"></div>
          <p className="text-gray-300 dark:text-gray-400 mt-6 text-lg hover:text-gray-200 dark:hover:text-gray-300 transition-colors duration-300 cursor-default">
            Let's discuss opportunities and create something amazing together
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className={`space-y-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <a
              href={`tel:${personal.phone}`}
              className="block backdrop-blur-sm bg-white/10 dark:bg-white/5 p-6 rounded-xl border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500 dark:bg-blue-600 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <Phone className="text-white group-hover:animate-pulse" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg group-hover:text-blue-300 transition-colors duration-300">Phone</h3>
                  <p className="text-gray-300 dark:text-gray-400 group-hover:text-gray-200 dark:group-hover:text-gray-300 transition-colors duration-300">{personal.phone}</p>
                </div>
              </div>
            </a>
            
            <a
              href={`mailto:${personal.email}`}
              className="block backdrop-blur-sm bg-white/10 dark:bg-white/5 p-6 rounded-xl border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500 dark:bg-purple-600 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <Mail className="text-white group-hover:animate-pulse" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg group-hover:text-purple-300 transition-colors duration-300">Email</h3>
                  <p className="text-gray-300 dark:text-gray-400 group-hover:text-gray-200 dark:group-hover:text-gray-300 transition-colors duration-300">{personal.email}</p>
                </div>
              </div>
            </a>
            
            <button
              onClick={openGoogleMaps}
              className="w-full backdrop-blur-sm bg-white/10 dark:bg-white/5 p-6 rounded-xl border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-500 dark:bg-indigo-600 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="text-white group-hover:animate-pulse" size={24} />
                </div>
                <div className="text-left">
                  <h3 className="text-white font-semibold text-lg group-hover:text-indigo-300 transition-colors duration-300">Location</h3>
                  <p className="text-gray-300 dark:text-gray-400 group-hover:text-gray-200 dark:group-hover:text-gray-300 transition-colors duration-300">{personal.fullAddress}</p>
                </div>
              </div>
            </button>
          </div>
          
          {/* Contact Form */}
          <div className={`backdrop-blur-sm bg-white/10 dark:bg-white/5 p-8 rounded-2xl border border-white/20 dark:border-white/10 hover:bg-white/15 dark:hover:bg-white/10 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 backdrop-blur-sm hover:bg-white/15 dark:hover:bg-white/10 transition-all duration-300"
                  placeholder="Your Name"
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 backdrop-blur-sm hover:bg-white/15 dark:hover:bg-white/10 transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Message</label>
                <textarea 
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 backdrop-blur-sm resize-none hover:bg-white/15 dark:hover:bg-white/10 transition-all duration-300"
                  placeholder="Your message..."
                ></textarea>
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                  submitStatus === 'success' 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : submitStatus === 'error'
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                } text-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Opening Email Client...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle size={20} />
                    Email Client Opened!
                  </>
                ) : submitStatus === 'error' ? (
                  <>
                    <AlertCircle size={20} />
                    Try Again
                  </>
                ) : (
                  <>
                    <Send size={20} className="group-hover:animate-pulse" />
                    Send via Email
                  </>
                )}
              </button>
              
              <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                This will open your default email client with the message pre-filled
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;