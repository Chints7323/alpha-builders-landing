import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ProjectCard";
import { Project, loadProjects } from "@/lib/projects-data";

const ProjectsSlider = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadProjects().then(loaded => {
      setProjects(loaded);
      setLoading(false);
    });
  }, []);

  // Number of visible cards based on screen size (handled by CSS)
  const maxIndex = Math.max(0, projects.length - 3);

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
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
      <div className="overflow-hidden" ref={sliderRef}>
        <div 
          className="flex gap-6 transition-transform duration-500 ease-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / 3 + 2)}%)`,
          }}
        >
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <ProjectCard project={project} autoChangeImages={true} changeInterval={2500} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      {projects.length > 3 && (
        <div className="flex items-center justify-center gap-4 mt-8">
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
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-primary w-6" 
                    : "bg-border hover:bg-primary/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
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
