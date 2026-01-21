// Projects and Testimonials data - loads from JSON with fallback

export interface Project {
  index: number;
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  fullDescription: string;
  images: string[];
  completedDate?: string;
}

export interface Testimonial {
  index: number;
  name: string;
  location: string;
  project: string;
  text: string;
  rating: number;
  featured?: boolean;
}

export const categories = ["All", "Residential", "Kitchens", "Bathrooms", "Commercial", "Extensions"];

// Service slug to category mapping
export const serviceToCategoryMap: Record<string, string[]> = {
  "residential": ["Residential", "Extensions"],
  "kitchens-bathrooms": ["Kitchens", "Bathrooms"],
  "commercial": ["Commercial"],
  "general-building": ["Residential", "Extensions"],
  "outdoor-structural": ["Residential", "Extensions"],
  "energy-smart": ["Residential", "Commercial"],
};

// Cache for loaded data
let projectsCache: Project[] | null = null;
let testimonialsCache: Testimonial[] | null = null;

// ============ PROJECTS ============

export async function loadProjects(): Promise<Project[]> {
  if (projectsCache) return projectsCache;
  
  try {
    const response = await fetch('/content/projects.json');
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    projectsCache = data.projects || [];
    return projectsCache;
  } catch (error) {
    console.warn('Loading fallback projects');
    projectsCache = getFallbackProjects();
    return projectsCache;
  }
}

export function getProjectsSync(): Project[] {
  return projectsCache || getFallbackProjects();
}

export function getProjectById(id: string): Project | undefined {
  const projects = getProjectsSync();
  return projects.find(p => p.id === id);
}

export function getRelatedProjects(currentId: string, category: string): Project[] {
  const projects = getProjectsSync();
  return projects
    .filter(p => p.id !== currentId && p.category === category)
    .slice(0, 3);
}

export function getProjectsByCategory(category: string): Project[] {
  const projects = getProjectsSync();
  if (category === "All") return projects;
  return projects.filter(p => p.category === category);
}

export function getProjectsByCategories(categories: string[]): Project[] {
  const projects = getProjectsSync();
  return projects.filter(p => categories.includes(p.category));
}

// ============ TESTIMONIALS ============

export async function loadTestimonials(): Promise<Testimonial[]> {
  if (testimonialsCache) return testimonialsCache;
  
  try {
    const response = await fetch('/content/testimonials.json');
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    testimonialsCache = data.testimonials || [];
    return testimonialsCache;
  } catch (error) {
    console.warn('Loading fallback testimonials');
    testimonialsCache = getFallbackTestimonials();
    return testimonialsCache;
  }
}

export function getTestimonialsSync(): Testimonial[] {
  return testimonialsCache || getFallbackTestimonials();
}

export function getFeaturedTestimonials(): Testimonial[] {
  const testimonials = getTestimonialsSync();
  const featured = testimonials.filter(t => t.featured);
  return featured.length > 0 ? featured : testimonials.slice(0, 4);
}

// ============ FALLBACK DATA ============

function getFallbackProjects(): Project[] {
  return [
    {
      index: 1,
      id: "modern-kitchen-renovation",
      title: "Modern Kitchen Renovation",
      category: "Kitchens",
      location: "Stanmore",
      description: "Complete kitchen redesign with custom cabinetry and worktops",
      fullDescription: "A complete transformation of an outdated kitchen into a stunning modern cooking space. We installed custom-built handleless cabinets, quartz worktops, and integrated appliances. The open-plan design now flows seamlessly into the dining area, creating a perfect space for family gatherings and entertaining.",
      images: ["/images/projects/kitchen-1.jpg", "/images/projects/kitchen-2.jpg", "/images/projects/kitchen-3.jpg"],
      completedDate: "March 2024"
    },
    {
      index: 2,
      id: "loft-conversion-master-suite",
      title: "Loft Conversion Master Suite",
      category: "Residential",
      location: "Harrow",
      description: "Spacious loft conversion with skylights and en-suite bathroom",
      fullDescription: "This loft conversion added a luxurious master suite to the property, complete with a walk-in wardrobe and en-suite bathroom. We installed Velux skylights to flood the space with natural light, and the dormer extension maximised headroom. Full insulation and underfloor heating ensure year-round comfort.",
      images: ["/images/projects/loft-1.jpg", "/images/projects/loft-2.jpg", "/images/projects/loft-3.jpg"],
      completedDate: "January 2024"
    },
    {
      index: 3,
      id: "contemporary-bathroom",
      title: "Contemporary Bathroom",
      category: "Bathrooms",
      location: "Edgware",
      description: "Modern walk-in shower room with chrome fixtures",
      fullDescription: "A complete bathroom renovation featuring a spacious walk-in shower with rainfall head, wall-hung vanity unit, and heated towel rail. We used large format tiles to create a clean, contemporary look, with underfloor heating for added comfort. Chrome fixtures and LED mirror lighting complete the modern aesthetic.",
      images: ["/images/projects/bathroom-1.jpg", "/images/projects/bathroom-2.jpg", "/images/projects/bathroom-3.jpg"],
      completedDate: "February 2024"
    },
    {
      index: 4,
      id: "rear-house-extension",
      title: "Rear House Extension",
      category: "Extensions",
      location: "Wembley",
      description: "Open-plan living extension with bi-fold doors",
      fullDescription: "This rear extension transformed a cramped kitchen into a stunning open-plan living space. Bi-fold doors open onto the garden, blurring the line between indoor and outdoor living. The extension includes a contemporary kitchen, dining area, and family room, with skylights providing abundant natural light throughout.",
      images: ["/images/projects/residential-1.jpg", "/images/projects/residential-2.jpg", "/images/projects/residential-3.jpg"],
      completedDate: "December 2023"
    },
    {
      index: 5,
      id: "office-fit-out",
      title: "Office Fit-out",
      category: "Commercial",
      location: "Stanmore",
      description: "Modern open-plan office space with glass partitions",
      fullDescription: "A complete commercial fit-out for a growing business, featuring open-plan workspaces, private meeting rooms with glass partitions, and a welcoming reception area. We installed suspended ceilings, LED lighting, and a modern HVAC system. The design promotes collaboration while providing quiet spaces for focused work.",
      images: ["/images/projects/commercial-1.jpg", "/images/projects/commercial-2.jpg", "/images/projects/commercial-3.jpg"],
      completedDate: "November 2023"
    }
  ];
}

function getFallbackTestimonials(): Testimonial[] {
  return [
    { index: 1, name: "Sarah Mitchell", location: "Stanmore", project: "Kitchen Renovation", text: "Excellent work on our kitchen renovation. The team was professional, clean, and tidy throughout the entire process. They kept us informed at every stage and the final result exceeded our expectations. Highly recommend Alpha Global Builders!", rating: 5, featured: true },
    { index: 2, name: "David Richardson", location: "Harrow", project: "Loft Conversion", text: "Alpha Global completed our loft conversion on time and within budget. Outstanding quality throughout. The attention to detail was impressive and they managed all the planning permissions for us. Our new master suite is absolutely stunning.", rating: 5, featured: true },
    { index: 3, name: "Emma Thompson", location: "Wembley", project: "House Extension", text: "Fantastic experience from start to finish. They explained every step clearly and were always available to answer questions. Very happy with our new extension - it's transformed how we use our home.", rating: 5, featured: true },
    { index: 4, name: "James Patterson", location: "Edgware", project: "Bathroom Renovation", text: "We hired Alpha Global for two bathroom renovations. Both completed to an excellent standard. The team was respectful of our home and cleaned up daily. Would definitely use again and have recommended to friends.", rating: 5, featured: true },
  ];
}

// Export for backward compatibility
export const projects = getFallbackProjects();
