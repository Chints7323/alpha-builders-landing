// Projects data with multiple images per project
import kitchenImg1 from "@/assets/services/kitchen-1.jpg";
import kitchenImg2 from "@/assets/services/kitchen-2.jpg";
import kitchenImg3 from "@/assets/services/kitchen-3.jpg";
import loftImg1 from "@/assets/services/loft-1.jpg";
import loftImg2 from "@/assets/services/loft-2.jpg";
import loftImg3 from "@/assets/services/loft-3.jpg";
import bathroomImg1 from "@/assets/services/bathroom-1.jpg";
import bathroomImg2 from "@/assets/services/bathroom-2.jpg";
import bathroomImg3 from "@/assets/services/bathroom-3.jpg";
import residentialImg1 from "@/assets/services/residential-1.jpg";
import residentialImg2 from "@/assets/services/residential-2.jpg";
import residentialImg3 from "@/assets/services/residential-3.jpg";
import commercialImg1 from "@/assets/services/commercial-1.jpg";
import commercialImg2 from "@/assets/services/commercial-2.jpg";
import commercialImg3 from "@/assets/services/commercial-3.jpg";

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  fullDescription: string;
  images: string[];
  completedDate?: string;
}

export const projects: Project[] = [
  {
    id: "modern-kitchen-renovation",
    title: "Modern Kitchen Renovation",
    category: "Kitchens",
    location: "Stanmore",
    description: "Complete kitchen redesign with custom cabinetry and worktops",
    fullDescription: "A complete transformation of an outdated kitchen into a stunning modern cooking space. We installed custom-built handleless cabinets, quartz worktops, and integrated appliances. The open-plan design now flows seamlessly into the dining area, creating a perfect space for family gatherings and entertaining.",
    images: [kitchenImg1, kitchenImg2, kitchenImg3],
    completedDate: "March 2024"
  },
  {
    id: "loft-conversion-master-suite",
    title: "Loft Conversion Master Suite",
    category: "Residential",
    location: "Harrow",
    description: "Spacious loft conversion with skylights and en-suite bathroom",
    fullDescription: "This loft conversion added a luxurious master suite to the property, complete with a walk-in wardrobe and en-suite bathroom. We installed Velux skylights to flood the space with natural light, and the dormer extension maximised headroom. Full insulation and underfloor heating ensure year-round comfort.",
    images: [loftImg1, loftImg2, loftImg3],
    completedDate: "January 2024"
  },
  {
    id: "contemporary-bathroom",
    title: "Contemporary Bathroom",
    category: "Bathrooms",
    location: "Edgware",
    description: "Modern walk-in shower room with chrome fixtures",
    fullDescription: "A complete bathroom renovation featuring a spacious walk-in shower with rainfall head, wall-hung vanity unit, and heated towel rail. We used large format tiles to create a clean, contemporary look, with underfloor heating for added comfort. Chrome fixtures and LED mirror lighting complete the modern aesthetic.",
    images: [bathroomImg1, bathroomImg2, bathroomImg3],
    completedDate: "February 2024"
  },
  {
    id: "rear-house-extension",
    title: "Rear House Extension",
    category: "Extensions",
    location: "Wembley",
    description: "Open-plan living extension with bi-fold doors",
    fullDescription: "This rear extension transformed a cramped kitchen into a stunning open-plan living space. Bi-fold doors open onto the garden, blurring the line between indoor and outdoor living. The extension includes a contemporary kitchen, dining area, and family room, with skylights providing abundant natural light throughout.",
    images: [residentialImg1, residentialImg2, residentialImg3],
    completedDate: "December 2023"
  },
  {
    id: "office-fit-out",
    title: "Office Fit-out",
    category: "Commercial",
    location: "Stanmore",
    description: "Modern open-plan office space with glass partitions",
    fullDescription: "A complete commercial fit-out for a growing business, featuring open-plan workspaces, private meeting rooms with glass partitions, and a welcoming reception area. We installed suspended ceilings, LED lighting, and a modern HVAC system. The design promotes collaboration while providing quiet spaces for focused work.",
    images: [commercialImg1, commercialImg2, commercialImg3],
    completedDate: "November 2023"
  },
  {
    id: "shaker-style-kitchen",
    title: "Shaker Style Kitchen",
    category: "Kitchens",
    location: "Pinner",
    description: "Traditional shaker kitchen with island and pendant lighting",
    fullDescription: "A classic shaker-style kitchen featuring hand-painted cabinets in a timeless grey-green hue. The large central island provides extra storage and a breakfast bar, lit by statement brass pendant lights. Marble-effect worktops and a butler sink complete the traditional English kitchen look.",
    images: [kitchenImg3, kitchenImg1, kitchenImg2],
    completedDate: "October 2023"
  },
  {
    id: "side-return-extension",
    title: "Side Return Extension",
    category: "Extensions",
    location: "Northwood",
    description: "Kitchen extension maximising natural light",
    fullDescription: "By building out into the side return, we created a significantly larger kitchen and dining space. A large rooflight runs the length of the extension, flooding the room with natural light. The result is a bright, airy kitchen that has become the heart of the family home.",
    images: [residentialImg2, residentialImg1, residentialImg3],
    completedDate: "September 2023"
  },
  {
    id: "family-bathroom-renovation",
    title: "Family Bathroom Renovation",
    category: "Bathrooms",
    location: "Barnet",
    description: "Family bathroom with freestanding bath and heated floors",
    fullDescription: "This family bathroom was completely renovated to create a relaxing retreat. A freestanding bath takes centre stage, complemented by a separate walk-in shower. We installed underfloor heating throughout, along with a heated towel rail. The neutral palette and natural stone tiles create a spa-like atmosphere.",
    images: [bathroomImg3, bathroomImg1, bathroomImg2],
    completedDate: "August 2023"
  }
];

export const categories = ["All", "Residential", "Kitchens", "Bathrooms", "Commercial", "Extensions"];

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}

export function getRelatedProjects(currentId: string, category: string): Project[] {
  return projects
    .filter(p => p.id !== currentId && p.category === category)
    .slice(0, 3);
}
