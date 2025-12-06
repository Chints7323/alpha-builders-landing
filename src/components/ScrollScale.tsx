import { useEffect, useState } from "react";

const ScrollScale = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxOffset = 100;
      const newOffset = Math.min(scrollY * 0.08, maxOffset);
      setOffset(newOffset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tickCount = 80;
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
            <div key={tick} className="flex flex-col items-center" style={{ width: '20px' }}>
              <div 
                className={`w-px transition-all ${
                  isMajor 
                    ? 'h-3 bg-border/50' 
                    : isMedium 
                      ? 'h-2 bg-border/30' 
                      : 'h-1 bg-border/20'
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
