import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Project } from "@/lib/projects-data";

interface ProjectCardProps {
  project: Project;
  autoChangeImages?: boolean;
  changeInterval?: number;
}

const ProjectCard = ({ project, autoChangeImages = true, changeInterval = 2000 }: ProjectCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!autoChangeImages || project.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }, changeInterval);

    return () => clearInterval(interval);
  }, [autoChangeImages, project.images.length, changeInterval]);

  return (
    <Link 
      to={`/projects/${project.id}`}
      className="group bg-card rounded-lg overflow-hidden shadow-card card-hover block"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
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
        
        {/* Image count indicator */}
        {project.images.length > 1 && (
          <div className="absolute bottom-4 right-4 flex gap-1 z-10">
            {project.images.map((_, index) => (
              <span 
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  index === currentImageIndex ? "bg-white w-3" : "bg-white/50"
                }`}
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
