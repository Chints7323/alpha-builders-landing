import { useEffect, useState } from "react";
import logo from "@/assets/logo-transparent.png";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setIsLoading(false), 500);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Logo */}
      <img 
        src={logo} 
        alt="Alpha Global Builders" 
        className="h-36 w-auto mb-8 animate-pulse"
      />
      
      {/* Building animation */}
      <div className="flex items-end gap-1.5 h-12">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="w-4 bg-primary rounded-t-sm animate-building"
            style={{
              animationDelay: `${i * 0.15}s`,
              height: '8px',
            }}
          />
        ))}
      </div>
      
      <p className="mt-6 text-muted-foreground font-medium animate-pulse">
        Building your experience...
      </p>
    </div>
  );
};

export default LoadingScreen;
