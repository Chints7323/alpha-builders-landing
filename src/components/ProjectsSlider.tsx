import { useState, useEffect, useRef, TouchEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ProjectCard";
import { Project, loadProjects } from "@/lib/projects-data";

const ProjectsSlider = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    loadProjects().then(loaded => {
      setProjects(loaded);
      setLoading(false);
    });
  }, []);

  // Number of visible cards based on screen size (handled by CSS)
  const maxIndex = Math.max(0, projects.length - 1);

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (swipeDistance > minSwipeDistance) {
      goToNext();
    } else if (swipeDistance < -minSwipeDistance) {
      goToPrevious();
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading projects...</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* Slider container */}
      <div 
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Desktop: Show 3 cards sliding */}
        <div 
          className="hidden lg:flex gap-6 transition-transform duration-500 ease-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / 3 + 2)}%)`,
          }}
        >
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="flex-shrink-0 w-[calc(33.333%-16px)]"
            >
              <ProjectCard project={project} autoChangeImages={true} changeInterval={2500} />
            </div>
          ))}
        </div>

        {/* Tablet: Show 2 cards */}
        <div 
          className="hidden sm:flex lg:hidden gap-6 transition-transform duration-500 ease-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / 2 + 3)}%)`,
          }}
        >
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="flex-shrink-0 w-[calc(50%-12px)]"
            >
              <ProjectCard project={project} autoChangeImages={true} changeInterval={2500} />
            </div>
          ))}
        </div>

        {/* Mobile: Show 1 card at a time, full width */}
        <div 
          className="flex sm:hidden transition-transform duration-300 ease-out"
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="flex-shrink-0 w-full px-1"
            >
              <ProjectCard project={project} autoChangeImages={true} changeInterval={2500} />
            </div>
          ))}
        </div>
      </div>

      {/* Swipe hint on mobile */}
      <p className="text-center text-muted-foreground text-sm mt-4 sm:hidden">
        ← Swipe to see more →
      </p>

      {/* Navigation */}
      {projects.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6 sm:mt-8">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Dots */}
          <div className="flex gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-primary w-5" 
                    : "bg-border hover:bg-primary/50"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectsSlider;
