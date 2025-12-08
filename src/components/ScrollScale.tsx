import { useEffect, useState } from "react";

interface ScrollScaleProps {
  inverted?: boolean;
}

const ScrollScale = ({ inverted = false }: ScrollScaleProps) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxOffset = 120;
      // Move LEFT on scroll DOWN (negative direction), RIGHT on scroll UP
      const direction = inverted ? 1 : -1;
      const newOffset = Math.min(scrollY * 0.08, maxOffset) * direction;
      setOffset(newOffset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [inverted]);

  const tickCount = 120;
  const ticks = Array.from({ length: tickCount }, (_, i) => i);

  return (
    <div className="w-full overflow-hidden py-3">
      <div 
        className="flex items-end gap-0"
        style={{ 
          transform: `translateX(${offset}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        {ticks.map((tick) => {
          const isMajor = tick % 10 === 0;
          const isMedium = tick % 5 === 0 && !isMajor;
          
          return (
            <div key={tick} className="flex flex-col items-center" style={{ width: '12px' }}>
              <div 
                className={`w-px ${
                  isMajor 
                    ? 'h-4 bg-foreground/50' 
                    : isMedium 
                      ? 'h-2.5 bg-foreground/40' 
                      : 'h-1.5 bg-foreground/30'
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
