import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import kitchenImg from "@/assets/services/kitchen-3.jpg";
import loftImg from "@/assets/services/loft-3.jpg";
import bathroomImg from "@/assets/services/bathroom-3.jpg";
import residentialImg from "@/assets/services/residential-1.jpg";
import commercialImg from "@/assets/services/commercial-1.jpg";

const categories = ["All", "Residential", "Kitchens", "Bathrooms", "Commercial", "Extensions"];

const projects = [
  { image: kitchenImg, title: "Modern Kitchen Renovation", category: "Kitchens", location: "Stanmore", description: "Complete kitchen redesign with custom cabinetry and worktops" },
  { image: loftImg, title: "Loft Conversion Master Suite", category: "Residential", location: "Harrow", description: "Spacious loft conversion with skylights and en-suite bathroom" },
  { image: bathroomImg, title: "Contemporary Bathroom", category: "Bathrooms", location: "Edgware", description: "Modern walk-in shower room with chrome fixtures" },
  { image: residentialImg, title: "Rear House Extension", category: "Extensions", location: "Wembley", description: "Open-plan living extension with bi-fold doors" },
  { image: commercialImg, title: "Office Fit-out", category: "Commercial", location: "Stanmore", description: "Modern open-plan office space with glass partitions" },
  { image: kitchenImg, title: "Shaker Style Kitchen", category: "Kitchens", location: "Pinner", description: "Traditional shaker kitchen with island and pendant lighting" },
  { image: residentialImg, title: "Side Return Extension", category: "Extensions", location: "Northwood", description: "Kitchen extension maximising natural light" },
  { image: bathroomImg, title: "Family Bathroom Renovation", category: "Bathrooms", location: "Barnet", description: "Family bathroom with freestanding bath and heated floors" },
];

const ITEMS_PER_PAGE = 9;

const Projects = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const pageParam = searchParams.get("page");
  const [activeCategory, setActiveCategory] = useState(categoryParam || "All");
  const [currentPage, setCurrentPage] = useState(parseInt(pageParam || "1", 10));

  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    if (pageParam) {
      setCurrentPage(parseInt(pageParam, 10));
    }
  }, [pageParam]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params: Record<string, string> = {};
    if (activeCategory !== "All") params.category = activeCategory;
    if (page > 1) params.page = page.toString();
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SEO
        title="Our Projects | Alpha Global Builders - Project Portfolio North West London"
        description="Browse our portfolio of completed construction projects across North West London. Kitchens, bathrooms, extensions, loft conversions & commercial fit-outs."
        canonicalUrl="/projects"
      />
      <Layout>
      {/* Hero */}
      <section className="bg-accent text-accent-foreground pt-32 pb-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Projects</h1>
            <p className="text-lg text-accent-foreground/90 leading-relaxed">
              Browse our portfolio of completed projects across North West London. 
              From stunning kitchens to complete home transformations.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 border-b border-border sticky top-0 bg-background z-40">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProjects.map((project, index) => (
              <div 
                key={index}
                className="group bg-card rounded-lg overflow-hidden shadow-card card-hover"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    loading="lazy"
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                  <p className="text-muted-foreground text-sm flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {project.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found in this category.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              ))}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to See Your Project Here?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create something amazing together.
          </p>
          <Button asChild size="xl">
            <Link to="/contact">Start Your Project</Link>
          </Button>
        </div>
      </section>
    </Layout>
    </>
  );
};

export default Projects;
