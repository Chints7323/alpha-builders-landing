import { useEffect, useState } from "react";

const ScrollScale = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate offset based on scroll position (max 100px movement)
      const scrollY = window.scrollY;
      const maxOffset = 100;
      const newOffset = Math.min(scrollY * 0.2, maxOffset);
      setOffset(newOffset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tickCount = 50;
  const ticks = Array.from({ length: tickCount }, (_, i) => i);

  return (
    <div className="w-full overflow-hidden py-6 bg-background">
      <div 
        className="flex items-end gap-0 transition-transform duration-150 ease-out"
        style={{ transform: `translateX(${offset}px)` }}
      >
        {ticks.map((tick) => {
          const isMajor = tick % 10 === 0;
          const isMedium = tick % 5 === 0 && !isMajor;
          
          return (
            <div key={tick} className="flex flex-col items-center" style={{ width: '40px' }}>
              <div 
                className={`w-0.5 bg-accent transition-all ${
                  isMajor ? 'h-8' : isMedium ? 'h-5' : 'h-3'
                }`}
              />
              {isMajor && (
                <span className="text-xs text-muted-foreground mt-1 font-medium">
                  {tick}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollScale;
