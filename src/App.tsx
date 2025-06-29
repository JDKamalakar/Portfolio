import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import Navigation from './components/Navigation';
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollBounceEffect from './components/ScrollBounceEffect';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-all duration-700 ease-in-out">
        <ThemeToggle />
        <Navigation />
        <ScrollBounceEffect />
        <Header />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;