import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MapPin, Calendar, ChevronRight } from "lucide-react";
import { loadProjects, getProjectById, getRelatedProjects, Project } from "@/lib/projects-data";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects().then(() => {
      const found = getProjectById(id || "");
      setProject(found);
      if (found) {
        setRelatedProjects(getRelatedProjects(found.id, found.category));
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
            <Button asChild>
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <SEO
        title={`${project.title} | Alpha Global Builders Project`}
        description={project.description}
        canonicalUrl={`/projects/${project.id}`}
      />
      <Layout>
        {/* Back Button */}
        <section className="bg-accent text-accent-foreground pt-28 pb-4">
          <div className="container-custom">
            <Button 
              variant="ghost" 
              className="text-accent-foreground hover:text-primary -ml-4"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Projects
            </Button>
          </div>
        </section>

        {/* Project Header */}
        <section className="bg-accent text-accent-foreground pb-12">
          <div className="container-custom">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                {project.category}
              </span>
              <span className="flex items-center gap-1 text-accent-foreground/80 text-sm">
                <MapPin className="h-4 w-4" /> {project.location}
              </span>
              {project.completedDate && (
                <span className="flex items-center gap-1 text-accent-foreground/80 text-sm">
                  <Calendar className="h-4 w-4" /> {project.completedDate}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">{project.title}</h1>
          </div>
        </section>

        {/* Image Gallery */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid lg:grid-cols-[1fr_200px] gap-6">
              {/* Main Image */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-secondary">
                <img 
                  src={project.images[selectedImage]} 
                  alt={`${project.title} - Image ${selectedImage + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 bg-background/80 text-foreground px-3 py-1 rounded text-sm">
                  {selectedImage + 1} / {project.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-24 h-24 lg:w-full lg:h-32 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? "border-primary" 
                        : "border-transparent hover:border-primary/50"
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
            </div>
          </div>
        </section>

        {/* Project Description */}
        <section className="pb-16">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold mb-4">About This Project</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {project.fullDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="section-padding bg-secondary">
            <div className="container-custom">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold">Related Projects</h2>
                <Button asChild variant="outline">
                  <Link to={`/projects?category=${project.category}`}>
                    View All {project.category}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProjects.map((related) => (
                  <Link 
                    key={related.id}
                    to={`/projects/${related.id}`}
                    className="group bg-card rounded-lg overflow-hidden shadow-card card-hover block"
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
        <section className="section-padding bg-primary">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Want Similar Results?
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and bring your vision to life.
            </p>
            <Button asChild variant="secondary" size="xl">
              <Link to="/contact">Get Your Free Quote</Link>
            </Button>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ProjectDetail;
