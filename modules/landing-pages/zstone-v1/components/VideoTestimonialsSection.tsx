import React from 'react';
import { Play, CheckCircle2, Quote } from 'lucide-react';

const featuredTestimonial = {
  quote: "Zevenstone didn't just give us extra hands; they gave us a flawless delivery engine. We scaled our client base by 40% in six months with zero hiring friction.",
  author: "Marcus Thorne",
  role: "Managing Director, Thorne Digital",
  duration: "3:45",
  imageUrl: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80",
};

const gridTestimonials = [
  {
    quote: "\"Scaling to $1.8M/yr with zero hiring overhead\"",
    author: "Sarah Lin",
    role: "Founder, Vertex Media",
    duration: "2:14",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    quote: "\"Standardizing our analytics delivery overnight\"",
    author: "David Vance",
    role: "Operations Director, Apex Analytics",
    duration: "3:05",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
  },
  {
    quote: "\"Delivering high-end design under our own brand\"",
    author: "Elena Rostova",
    role: "Creative Partner, Vanguard Brand Group",
    duration: "1:58",
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80"
  },
  {
    quote: "\"How we turned scope creep into predictable profit\"",
    author: "James Cooper",
    role: "Technical Lead, ScaleFlow Agency",
    duration: "2:40",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"
  },
  {
    quote: "\"Flawless white-label execution that clients love\"",
    author: "Aria Sterling",
    role: "Managing Director, Nova Partners",
    duration: "3:12",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80"
  },
  {
    quote: "\"Fulfilling complex enterprise development smoothly\"",
    author: "Devon Cole",
    role: "Founder, Hyperion Growth",
    duration: "4:01",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
  }
];

export function VideoTestimonialsSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#FAFBFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-block bg-[#EEF2FF] text-[#4F46E5] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            VIDEO TESTIMONIALS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] mb-4">
            Hear It Directly From Our Partners
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Watch real agency owners share how Zevenstone became their invisible, high-performance delivery engine and unlocked unlimited growth.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden flex flex-col lg:flex-row mb-12 sm:mb-16 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
          {/* Left: Video Thumbnail */}
          <div className="lg:w-[55%] relative group cursor-pointer overflow-hidden bg-gray-900 min-h-[300px] lg:min-h-[500px]">
            <img 
              src={featuredTestimonial.imageUrl} 
              alt={featuredTestimonial.author}
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#4F46E5] rounded-full flex items-center justify-center shadow-lg group-hover:bg-[#4338CA] group-hover:scale-110 transition-all duration-300">
                <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-white ml-1" />
              </div>
            </div>
            {/* Watch Story Badge */}
            <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2">
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
              Watch Story ({featuredTestimonial.duration})
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="lg:w-[45%] p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative">
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center mb-6 sm:mb-8 text-[#4F46E5]">
              <Quote className="w-5 h-5 fill-current" />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#111827] leading-relaxed mb-10 sm:mb-12">
              "{featuredTestimonial.quote}"
            </h3>
            <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-[#111827] text-base sm:text-lg mb-1">{featuredTestimonial.author}</h4>
                <p className="text-gray-500 text-xs sm:text-sm font-medium">{featuredTestimonial.role}</p>
              </div>
              <div className="bg-indigo-50 text-[#4F46E5] px-3 py-1.5 rounded-md text-[10px] sm:text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                VERIFIED
              </div>
            </div>
          </div>
        </div>

        {/* Grid Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {gridTestimonials.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group cursor-pointer flex flex-col h-full">
              {/* Video Thumbnail */}
              <div className="relative h-48 sm:h-56 bg-gray-900 overflow-hidden shrink-0">
                <img 
                  src={item.imageUrl} 
                  alt={item.author}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-[#4F46E5] rounded-full flex items-center justify-center shadow-md group-hover:bg-[#4338CA] group-hover:scale-110 transition-all duration-300">
                    <Play className="w-4 h-4 text-white fill-white ml-1" />
                  </div>
                </div>
                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-[10px] font-bold">
                  {item.duration}
                </div>
              </div>
              
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
