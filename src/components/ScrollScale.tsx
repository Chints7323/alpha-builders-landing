import { useEffect, useState } from "react";

interface ScrollScaleProps {
  inverted?: boolean;
}

const ScrollScale = ({ inverted = false }: ScrollScaleProps) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxOffset = 80;
      // Move LEFT on scroll DOWN (negative direction), RIGHT on scroll UP
      const direction = inverted ? 1 : -1;
      const newOffset = Math.min(scrollY * 0.06, maxOffset) * direction;
      setOffset(newOffset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [inverted]);

  const tickCount = 100;
  const ticks = Array.from({ length: tickCount }, (_, i) => i);

  return (
    <div className="w-full overflow-hidden py-3">
      <div 
        className="flex items-end gap-0 transition-transform duration-500 ease-out"
        style={{ transform: `translateX(${offset}px)` }}
      >
        {ticks.map((tick) => {
          const isMajor = tick % 10 === 0;
          const isMedium = tick % 5 === 0 && !isMajor;
          
          return (
            <div key={tick} className="flex flex-col items-center" style={{ width: '16px' }}>
              <div 
                className={`w-px transition-all ${
                  isMajor 
                    ? 'h-4 bg-border' 
                    : isMedium 
                      ? 'h-2.5 bg-border/70' 
                      : 'h-1.5 bg-border/50'
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollScale;