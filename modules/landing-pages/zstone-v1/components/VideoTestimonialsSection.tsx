import React, { useState, useRef } from 'react';
import { Play, CheckCircle2, Quote } from 'lucide-react';

const SAMPLE_VIDEO_URL = "https://www.w3schools.com/html/mov_bbb.mp4";

const defaultFeaturedTestimonial = {
  quote: "Zevenstone didn't just give us extra hands; they gave us a flawless delivery engine. We scaled our client base by 40% in six months with zero hiring friction.",
  author: "Marcus Thorne",
  role: "Managing Director, Thorne Digital",
  duration: "3:45",
  videoUrl: SAMPLE_VIDEO_URL,
};

const defaultGridTestimonials = [
  {
    quote: "\"Scaling to $1.8M/yr with zero hiring overhead\"",
    author: "Sarah Lin",
    role: "Founder, Vertex Media",
    duration: "2:14",
    videoUrl: SAMPLE_VIDEO_URL
  },
  {
    quote: "\"Standardizing our analytics delivery overnight\"",
    author: "David Vance",
    role: "Operations Director, Apex Analytics",
    duration: "3:05",
    videoUrl: SAMPLE_VIDEO_URL
  },
  {
    quote: "\"Delivering high-end design under our own brand\"",
    author: "Elena Rostova",
    role: "Creative Partner, Vanguard Brand Group",
    duration: "1:58",
    videoUrl: SAMPLE_VIDEO_URL
  },
  {
    quote: "\"How we turned scope creep into predictable profit\"",
    author: "James Cooper",
    role: "Technical Lead, ScaleFlow Agency",
    duration: "2:40",
    videoUrl: SAMPLE_VIDEO_URL
  },
  {
    quote: "\"Flawless white-label execution that clients love\"",
    author: "Aria Sterling",
    role: "Managing Director, Nova Partners",
    duration: "3:12",
    videoUrl: SAMPLE_VIDEO_URL
  },
  {
    quote: "\"Fulfilling complex enterprise development smoothly\"",
    author: "Devon Cole",
    role: "Founder, Hyperion Growth",
    duration: "4:01",
    videoUrl: SAMPLE_VIDEO_URL
  }
];

interface VideoTestimonial {
  quote?: string;
  author?: string;
  role?: string;
  duration?: string;
  videoUrl?: string;
}

interface VideoTestimonialsSectionProps {
  badge?: string;
  heading?: string;
  subtitle?: string;
  featuredTestimonial?: VideoTestimonial;
  gridTestimonials?: VideoTestimonial[];
}

export function VideoTestimonialsSection({
  badge,
  heading,
  subtitle,
  featuredTestimonial: propFeaturedTestimonial,
  gridTestimonials: propGridTestimonials
}: VideoTestimonialsSectionProps) {
  
  const featured = propFeaturedTestimonial || defaultFeaturedTestimonial;
  const gridItems = propGridTestimonials || defaultGridTestimonials;

  return (
    <section className="py-16 sm:py-24 bg-[#FAFBFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-block bg-[#EEF2FF] text-[#4F46E5] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            {badge || "VIDEO TESTIMONIALS"}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] mb-4">
            {heading || "Hear It Directly From Our Partners"}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
            {subtitle || "Watch real agency owners share how Zevenstone became their invisible, high-performance delivery engine and unlocked unlimited growth."}
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden flex flex-col lg:flex-row mb-12 sm:mb-16 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
          {/* Left: Video Player */}
          <VideoPlayerCard 
            item={featured}
            className="lg:w-[55%] relative group cursor-pointer overflow-hidden bg-black min-h-[300px] lg:min-h-[500px] flex items-center justify-center"
            isFeatured={true}
          />

          {/* Right: Text Content */}
          <div className="lg:w-[45%] p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative">
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center mb-6 sm:mb-8 text-[#4F46E5]">
              <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.3347 10.3341L10.3341 18.3347M10.3341 10.3341L18.3347 18.3347M27.6688 14.3344C27.6688 21.6988 21.6988 27.6688 14.3344 27.6688C6.97001 27.6688 1 21.6988 1 14.3344C1 6.97001 6.97001 1 14.3344 1C21.6988 1 27.6688 6.97001 27.6688 14.3344Z" stroke="#EEF2FF" stroke-width="2" stroke-linecap="round"/>
</svg>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#111827] leading-relaxed mb-10 sm:mb-12">
              "{featured.quote}"
            </h3>
            <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-[#111827] text-base sm:text-lg mb-1">{featured.author}</h4>
                <p className="text-gray-500 text-xs sm:text-sm font-medium">{featured.role}</p>
              </div>
              <div className="bg-indigo-50 text-[#4F46E5] px-3 py-1.5 rounded-md text-[10px] sm:text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                VERIFIED
              </div>
            </div>
          </div>
        </div>

        {/* Grid Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 hidden">
          {gridItems.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group cursor-pointer flex flex-col h-full">
              {/* Video Player */}
              <VideoPlayerCard 
                item={item} 
                className="relative h-48 sm:h-56 bg-black overflow-hidden shrink-0 flex items-center justify-center"
              />
              
              {/* Text Content */}
              <div className="p-6 flex flex-col flex-1">
                <h4 className="font-bold text-[#111827] text-base leading-relaxed mb-6 flex-1">
                  {item.quote}
                </h4>
                <div className="mt-auto">
                  <div className="font-extrabold text-[#111827] text-sm mb-0.5">{item.author}</div>
                  <div className="text-gray-500 text-xs font-medium">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// Sub-component to manage video play state isolated for each item
function VideoPlayerCard({ item, className, isFeatured = false }: { item: VideoTestimonial, className: string, isFeatured?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div className={className} onClick={!isPlaying ? handlePlay : undefined}>
      <video 
        ref={videoRef}
        src={item.videoUrl} 
        className="absolute inset-0 w-full h-full object-cover"
        controls={isPlaying}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
      
      {!isPlaying && (
        <>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className={`bg-[#4F46E5] rounded-full flex items-center justify-center shadow-lg group-hover:bg-[#4338CA] group-hover:scale-110 transition-all duration-300 ${isFeatured ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-12 h-12'}`}>
              <Play className={`text-white fill-white ml-1 ${isFeatured ? 'w-6 h-6 sm:w-8 sm:h-8' : 'w-4 h-4'}`} />
            </div>
          </div>

          {/* Badges */}
          {isFeatured ? (
            <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 pointer-events-none">
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
              Watch Story ({item.duration})
            </div>
          ) : (
            <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-[10px] font-bold pointer-events-none">
              {item.duration}
            </div>
          )}
        </>
      )}
    </div>
  );
}
