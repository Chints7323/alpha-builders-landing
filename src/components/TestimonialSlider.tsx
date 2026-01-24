import { useState, useEffect, useRef, TouchEvent } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  name: string;
  location: string;
  project: string;
  text: string;
  rating: number;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

const TestimonialSlider = ({ testimonials }: TestimonialSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Show 2 at a time on desktop, 1 on mobile
  const itemsPerPage = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 2;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, 6000);

    return () => clearInterval(interval);
  }, [totalPages, isPaused]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (swipeDistance > minSwipeDistance) {
      // Swipe left - go next
      goToNext();
    } else if (swipeDistance < -minSwipeDistance) {
      // Swipe right - go previous
      goToPrevious();
    }
    
    setTimeout(() => setIsPaused(false), 5000);
  };

  // Get current testimonials to show
  const startIndex = currentIndex * itemsPerPage;
  const visibleTestimonials = testimonials.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Testimonials grid - 2 at a time on desktop, 1 on mobile */}
      <div className="grid md:grid-cols-2 gap-6">
        {visibleTestimonials.map((testimonial, idx) => (
          <div 
            key={startIndex + idx}
            className="bg-card rounded-xl shadow-card p-6 md:p-8 border border-border animate-fade-in"
          >
            <Quote className="h-8 w-8 text-primary/30 mb-4" />
            
            <p className="text-foreground leading-relaxed mb-6">
              "{testimonial.text}"
            </p>
            
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-muted-foreground text-sm">
                  {testimonial.location} • {testimonial.project}
                </p>
              </div>
              <div className="flex gap-0.5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        {/* Dots */}
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-primary w-6" 
                  : "bg-border hover:bg-primary/50"
              }`}
              aria-label={`Go to testimonials page ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={goToNext}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
