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
    <div className="w-full overflow-hidden py-2">
      <div 
        className="flex items-end gap-0 transition-transform duration-300 ease-out"
        style={{ transform: `translateX(${offset}px)` }}
      >
        {ticks.map((tick) => {
          const isMajor = tick % 10 === 0;
          const isMedium = tick % 5 === 0 && !isMajor;
          
          return (
            <div key={tick} className="flex flex-col items-center" style={{ width: '14px' }}>
              <div 
                className={`w-px transition-all ${
                  isMajor 
                    ? 'h-3 bg-foreground/40' 
                    : isMedium 
                      ? 'h-2 bg-foreground/30' 
                      : 'h-1 bg-foreground/20'
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