import { useEffect, useState } from 'react';

export const useScrollFade = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      e.preventDefault();
      setIsScrolling(true);

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSection = Math.max(0, Math.min(sections.length - 1, activeSection + direction));

      if (nextSection !== activeSection) {
        // Fade out current section
        sections[activeSection].classList.add('fade-out');
        
        setTimeout(() => {
          setActiveSection(nextSection);
          sections[nextSection].scrollIntoView({ behavior: 'smooth' });
          sections[activeSection].classList.remove('fade-out');
          
          setTimeout(() => {
            setIsScrolling(false);
          }, 1000);
        }, 300);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    // Show first section
    if (sections.length > 0) {
      sections.forEach((section, i) => {
        if (i === 0) {
          section.classList.add('visible');
        }
      });
    }

    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, [activeSection, isScrolling]);
};