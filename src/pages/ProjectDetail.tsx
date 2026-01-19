import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin, Calendar, ArrowLeft } from "lucide-react";
import { getProjectById, getRelatedProjects, Project } from "@/lib/projects-data";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      const foundProject = getProjectById(id);
      if (foundProject) {
        setProject(foundProject);
        setCurrentImageIndex(0);
      } else {
        navigate("/projects");
      }
    }
  }, [id, navigate]);

  if (!project) {
    return null;
  }

  const relatedProjects = getRelatedProjects(project.id, project.category);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  // Touch handlers for swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
  };

  return (
    <>
      <SEO
        title={`${project.title} | Alpha Global Builders Projects`}
        description={project.description}
        canonicalUrl={`/projects/${project.id}`}
      />
      <Layout>
        {/* Back Button */}
        <section className="pt-24 pb-4 bg-background">
          <div className="container-custom">
            <Button 
              variant="ghost" 
              asChild
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <Link to="/projects">
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </div>
        </section>

        {/* Project Header */}
        <section className="pb-8 bg-background">
          <div className="container-custom">
            <div className="max-w-4xl">
              <span className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium mb-4">
                {project.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {project.location}
                </span>
                {project.completedDate && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {project.completedDate}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Image Carousel */}
        <section className="pb-12 bg-background">
          <div className="container-custom">
            <div className="relative max-w-5xl mx-auto">
              {/* Main Image */}
              <div 
                className="relative aspect-[16/10] overflow-hidden rounded-lg bg-muted"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <img
                  src={project.images[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows - Desktop */}
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 rounded-full shadow-lg transition-all hidden md:flex items-center justify-center"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 rounded-full shadow-lg transition-all hidden md:flex items-center justify-center"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-background/80 text-foreground px-3 py-1 rounded-full text-sm font-medium">
                  {currentImageIndex + 1} / {project.images.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {project.images.length > 1 && (
                <div className="flex gap-2 mt-4 justify-center">
                  {project.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex 
                          ? "border-primary ring-2 ring-primary/20" 
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Swipe hint for mobile */}
              <p className="text-center text-muted-foreground text-sm mt-4 md:hidden">
                Swipe to see more photos
              </p>
            </div>
          </div>
        </section>

        {/* Project Description */}
        <section className="pb-16 bg-background">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">About This Project</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {project.fullDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-16 bg-secondary">
            <div className="container-custom">
              <h2 className="text-2xl font-bold mb-8">More {project.category} Projects</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProjects.map((related) => (
                  <Link 
                    key={related.id}
                    to={`/projects/${related.id}`}
                    className="group bg-card rounded-lg overflow-hidden shadow-card card-hover"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={related.images[0]}
                        alt={related.title}
                        className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-muted-foreground text-sm flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {related.location}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="section-padding bg-accent text-accent-foreground">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-accent-foreground/80 mb-8 max-w-2xl mx-auto">
              Let's discuss your ideas and create something amazing together.
            </p>
            <Button asChild size="xl" variant="secondary">
              <Link to="/contact">Get a Free Quote</Link>
            </Button>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ProjectDetail;
