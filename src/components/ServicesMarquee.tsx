import { 
  Home, Bath, Building2, Hammer, Fence, Zap, 
  Paintbrush, Wrench, HardHat, Drill 
} from "lucide-react";

const services = [
  { icon: Home, label: "Residential Construction" },
  { icon: Bath, label: "Kitchens & Bathrooms" },
  { icon: Building2, label: "Commercial Projects" },
  { icon: Hammer, label: "Building Concept" },
  { icon: Wrench, label: "Maintenance" },
  { icon: HardHat, label: "General Construction" },
  { icon: Paintbrush, label: "Painting & Decorating" },
  { icon: Fence, label: "Outdoor & Structural" },
  { icon: Zap, label: "Energy Systems" },
  { icon: Drill, label: "Repairs" },
];

const ServicesMarquee = () => {
  // Render 3 sets for truly seamless infinite loop
  const renderServices = () => (
    <>
      {services.map((service, index) => (
        <div key={index} className="flex items-center gap-3 mx-8 flex-shrink-0">
          <service.icon className="h-6 w-6 text-primary-foreground" />
          <span className="text-primary-foreground font-semibold text-lg whitespace-nowrap">
            {service.label}
          </span>
        </div>
      ))}
    </>
  );

  return (
    <div className="bg-primary py-4 overflow-hidden">
      <div className="flex animate-marquee-seamless">
        {renderServices()}
        {renderServices()}
        {renderServices()}
      </div>
    </div>
  );
};

export default ServicesMarquee;
