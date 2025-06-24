import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Animated = ({ title, containerClass = '' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context((self) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',      // fire when element’s top hits 80% of viewport
          end: 'center bottom',
          toggleActions: 'play none none reverse',
        },
      });

      tl.to(self.selector('.animated-word'), {
        opacity: 1,
        y: 0,
        rotateY: 0,
        rotateX: 0,
        ease: 'power2.inOut',
        stagger: 0.02,
        duration: 0.6,
      });
    }, containerRef);

    return () => ctx.revert();       // cleanup on unmount
  }, []);

  return (
    <div ref={containerRef} className={`animated-title  ${containerClass}`}>
      {title.split('<br />').map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(' ').map((word, i) => (
            <span
              key={i}
              className="animated-word opacity-0.5  translate-y-4"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Animated;
