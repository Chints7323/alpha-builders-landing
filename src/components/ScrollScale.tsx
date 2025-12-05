import { useEffect, useState } from "react";

const ScrollScale = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxOffset = 80;
      const newOffset = Math.min(scrollY * 0.15, maxOffset);
      setOffset(newOffset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tickCount = 60;
  const ticks = Array.from({ length: tickCount }, (_, i) => i);

  return (
    <div className="w-full overflow-hidden py-3 bg-gradient-to-r from-background via-secondary to-background">
      <div 
        className="flex items-end gap-0 transition-transform duration-200 ease-out"
        style={{ transform: `translateX(${offset}px)` }}
      >
        {ticks.map((tick) => {
          const isMajor = tick % 10 === 0;
          const isMedium = tick % 5 === 0 && !isMajor;
          
          return (
            <div key={tick} className="flex flex-col items-center" style={{ width: '30px' }}>
              <div 
                className={`w-px transition-all ${
                  isMajor 
                    ? 'h-4 bg-border' 
                    : isMedium 
                      ? 'h-2.5 bg-border/60' 
                      : 'h-1.5 bg-border/40'
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
