import { useState, useEffect, useRef, TouchEvent, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "@/lib/projects-data";

interface ProjectCardProps {
  project: Project;
  autoChangeImages?: boolean;
  changeInterval?: number;
}

const ProjectCard = ({ project, autoChangeImages = true, changeInterval = 2500 }: ProjectCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    if (!autoChangeImages || project.images.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }, changeInterval);

    return () => clearInterval(interval);
  }, [autoChangeImages, project.images.length, changeInterval, isPaused]);

  const goToPrevious = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const goToNext = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const goToImage = (index: number, e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  // Touch handlers for swipe on images
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 30;

    if (project.images.length > 1) {
      if (swipeDistance > minSwipeDistance) {
        // Swipe left - go next image
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      } else if (swipeDistance < -minSwipeDistance) {
        // Swipe right - go previous image
        setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
      }
    }
    
    setTimeout(() => setIsPaused(false), 5000);
  };

  return (
    <Link 
      to={`/projects/${project.id}`}
      className="group bg-card rounded-lg overflow-hidden shadow-card card-hover block"
    >
      <div 
        className="relative overflow-hidden aspect-[4/3]"
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image container with fade transition */}
        {project.images.map((image, index) => (
          <img 
            key={index}
            src={image} 
            alt={`${project.title} - Image ${index + 1}`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        
        {/* Category badge */}
        <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium z-10">
          {project.category}
        </span>

        {/* Navigation arrows - show on hover (desktop) */}
        {project.images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className={`absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full z-20 transition-opacity duration-200 ${
                showArrows ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"
              }`}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={goToNext}
              className={`absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full z-20 transition-opacity duration-200 ${
                showArrows ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"
              }`}
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
        
        {/* Image dots indicator - clickable */}
        {project.images.length > 1 && (
          <div className="absolute bottom-4 right-4 flex gap-1.5 z-10">
            {project.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => goToImage(index, e)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? "bg-white w-4" : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{project.description}</p>
        <p className="text-muted-foreground text-sm flex items-center gap-1">
          <MapPin className="h-3 w-3" /> {project.location}
        </p>
      </div>
    </Link>
  );
};

export default ProjectCard;
