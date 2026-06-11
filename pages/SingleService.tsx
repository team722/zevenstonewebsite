import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { sanityClient } from '../lib/sanity';
import { SINGLE_SERVICE_QUERY } from '../lib/queries';
import { Play, CheckCircle, ChevronDown, ChevronUp, Star, ArrowRight } from 'lucide-react';
import { LoadingSpinner, ErrorState, Button, ScrollReveal } from '../components/ui';
import { motion } from 'framer-motion';

export const SingleService: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState('All Videos');

  const { data: service, isLoading, error } = useQuery({
    queryKey: ['singleService', slug],
    queryFn: async () => {
      if (!slug) return null;
      return sanityClient.fetch(SINGLE_SERVICE_QUERY, { slug });
    },
    enabled: !!slug,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error || !service) return <ErrorState />;

  const portfolioCategories = service?.portfolio?.examples
    ? ['All Videos', ...Array.from(new Set<string>(service.portfolio.examples.map((ex: any) => ex.category).filter(Boolean)))]
    : ['All Videos'];

  const filteredPortfolio = service?.portfolio?.examples?.filter((ex: any) =>
    activeTab === 'All Videos' || ex.category === activeTab
  );

  return (
    <div className="pt-24 pb-0 bg-white">
      <Helmet>
        <title>{service.title} | Zevenstone</title>
        <meta name="description" content={service.description} />
      </Helmet>

      {/* Hero Section */}
      {service.hero && (
        <section className="container mx-auto px-6 lg:px-12 pt-12 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#F0FDF4] border border-[#86EFAC]/50 text-[#008236] text-xs md:text-sm font-semibold mb-8 shadow-sm mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.4 12.8C8.09739 12.8 9.72525 12.1257 10.9255 10.9255C12.1257 9.72525 12.8 8.09739 12.8 6.4C12.8 4.70261 12.1257 3.07475 10.9255 1.87452C9.72525 0.674284 8.09739 0 6.4 0C4.70261 0 3.07475 0.674284 1.87452 1.87452C0.674284 3.07475 0 4.70261 0 6.4C0 8.09739 0.674284 9.72525 1.87452 10.9255C3.07475 12.1257 4.70261 12.8 6.4 12.8ZM9.3656 5.3656C9.51133 5.21472 9.59196 5.01264 9.59014 4.80288C9.58832 4.59312 9.50418 4.39247 9.35585 4.24415C9.20753 4.09582 9.00688 4.01168 8.79712 4.00986C8.58736 4.00804 8.38528 4.08867 8.2344 4.2344L5.6 6.8688L4.5656 5.8344C4.41472 5.68867 4.21264 5.60804 4.00288 5.60986C3.79312 5.61168 3.59247 5.69582 3.44415 5.84415C3.29582 5.99247 3.21168 6.19312 3.20986 6.40288C3.20804 6.61264 3.28867 6.81472 3.4344 6.9656L5.0344 8.5656C5.18442 8.71558 5.38787 8.79983 5.6 8.79983C5.81213 8.79983 6.01558 8.71558 6.1656 8.5656L9.3656 5.3656Z" fill="#008236" />
              </svg>
              <span dangerouslySetInnerHTML={{ __html: service?.label || "500+ Videos Delivered • 98% Client Satisfaction" }}></span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-zeven-dark mb-6 leading-tight max-w-4xl mx-auto tracking-tight"
              dangerouslySetInnerHTML={{ __html: service.hero.title }}
            />
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p 
              className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
              dangerouslySetInnerHTML={{ __html: service.hero.subtitle }}
            />
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12">
              {service.hero.stats?.map((stat: any, index: number) => (
                <div key={index} className="text-center group">
                  <div className="text-3xl md:text-4xl font-bold text-zeven-dark group-hover:text-zeven-blue transition-colors duration-300">{stat.value}</div>
                  <div className="text-xs md:text-sm text-gray-400 uppercase tracking-widest mt-2 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-24">
              {service.ctaButton?.text && (
                <Link
                  to={service.ctaButton.url?.startsWith('http') ? service.ctaButton.url : `/${service.ctaButton.url?.replace(/^\//, '') || ''}`}
                  className="bg-zeven-blue text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition duration-300 shadow-xl shadow-blue-500/20 text-center"
                >
                  {service.ctaButton.text}
                </Link>
              )}
              {service.secondaryCtaButton?.text && (
                <Link
                  to={`/${service.secondaryCtaButton.url}` || '#'}
                  rel="noopener noreferrer"
                  className="bg-white text-zeven-dark border-2 border-gray-100 px-10 py-4 rounded-xl font-bold text-lg hover:border-zeven-blue hover:text-zeven-blue transition duration-300 text-center"
                >
                  {service.secondaryCtaButton.text}
                </Link>
              )}
              {!service.ctaButton?.text && !service.secondaryCtaButton?.text && (
                <>
                  <Link
                    to="/contact"
                    className="bg-zeven-blue text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition duration-300 shadow-xl shadow-blue-500/20 text-center"
                  >
                    👉 Book a Strategy Call
                  </Link>
                  <a
                    href={service.secondaryCtaButton?.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-zeven-dark border-2 border-gray-100 px-10 py-4 rounded-xl font-bold text-lg hover:border-zeven-blue hover:text-zeven-blue transition duration-300 text-center"
                  >
                    Watch Showreel
                  </a>
                </>
              )}
            </div>
          </ScrollReveal>

        </section>
      )}

      {/* Trust Strip */}
      {service.hero?.trustedBrands && service.hero.trustedBrands.length > 0 && (
        <section className="py-12 px-4 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
              Brands That Trust Our Work
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
              {service.hero.trustedBrands.map((brand: string, idx: number) => (
                <div key={idx} className="text-2xl font-bold text-gray-400 uppercase">{brand}</div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Video Highlight */}
      {service.featuredVideo && (
        <section className="bg-[#0A0F1C] py-24 md:py-32 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">{service.featuredVideo.title}</h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-16 text-lg font-light leading-relaxed">{service.featuredVideo.description}</p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <a
                href={service.featuredVideo.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="max-w-5xl mx-auto block group cursor-pointer text-left"
              >
                {/* Video Container */}
                <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden aspect-[16/10] md:aspect-video bg-[#1a1f2e] border border-white/5 shadow-2xl">
                  {service.featuredVideo.thumbnailUrl ? (
                    <img src={service.featuredVideo.thumbnailUrl} alt="Video Thumbnail" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition duration-1000 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full bg-[#1a1f2e]" />
                  )}

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl pointer-events-auto">
                      <Play className="w-6 h-6 md:w-10 md:h-10 text-blue-500 ml-1 md:ml-2" fill="currentColor" />
                    </div>
                  </div>

                  {/* Decorative dark gradient for text legibility at bottom (Desktop Only) */}
                  <div className="hidden md:block absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0A0F1C] via-[#0A0F1C]/40 to-transparent pointer-events-none opacity-90" />

                  {/* Desktop Overlay Content (Hidden on Mobile) */}
                  <div className="hidden md:flex absolute bottom-8 left-8 right-8 items-end justify-between gap-6 pointer-events-none">
                    {/* Info Overlay */}
                    <div>
                      <p className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-2">{service.featuredVideo.overlay?.badge || 'Featured Showreel'}</p>
                      <p className="text-3xl font-extrabold text-white mb-2 leading-tight">{service.featuredVideo.overlay?.title || 'Zevenstone Video Production 2026'}</p>
                      <p className="text-sm text-gray-400">{service.featuredVideo.overlay?.description || 'Award-winning video content that drives growth'}</p>
                    </div>

                    {/* Portfolio View Counter Box */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 text-left min-w-[200px] pointer-events-auto">
                      <p className="text-xs text-gray-300 mb-1">{service.featuredVideo.overlay?.counter?.label || 'Total Portfolio Views'}</p>
                      <p className="text-3xl font-bold text-white tracking-tight">{service.featuredVideo.overlay?.counter?.value || '12.4M+'}</p>
                    </div>
                  </div>
                </div>

                {/* Mobile Info & Counter (Below Video, Hidden on Desktop) */}
                <div className="md:hidden mt-6 flex flex-col gap-5 px-2">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{service.featuredVideo.overlay?.badge || 'Featured Showreel'}</p>
                    <p className="text-2xl font-extrabold text-white mb-1.5 leading-tight">{service.featuredVideo.overlay?.title || 'Zevenstone Video Production 2026'}</p>
                    <p className="text-sm text-gray-400">{service.featuredVideo.overlay?.description || 'Award-winning video content that drives growth'}</p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-left inline-block w-max">
                    <p className="text-[10px] text-gray-400 mb-1">{service.featuredVideo.overlay?.counter?.label || 'Total Portfolio Views'}</p>
                    <p className="text-2xl font-bold text-white tracking-tight">{service.featuredVideo.overlay?.counter?.value || '12.4M+'}</p>
                  </div>
                </div>
              </a>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Benefits */}
      {service.benefits && (
        <section className="py-24 md:py-32 bg-gray-50/30">
          <div className="container mx-auto px-6 lg:px-12">
            <ScrollReveal>
              <div className="text-center mb-20 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-zeven-dark mb-6 tracking-tight">{service.benefits.title}</h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {service.benefits.benefitsList?.map((benefit: any, index: number) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                    <div className="w-16 h-16 bg-blue-50 text-zeven-blue rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                      {benefit.icon ? (
                        <img src={benefit.icon} alt={benefit.title} className="object-contain" />
                      ) : (
                        <span className="font-bold text-2xl">{index + 1}</span>
                      )}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-zeven-dark mb-4">{benefit.title}</h3>
                    <p className="text-gray-500 leading-relaxed font-light">{benefit.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Strip */}
      {service.process && (
        <section className="py-12  bg-white overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12">
            <ScrollReveal>
              <div className="text-center mb-20 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-zeven-dark mb-6 tracking-tight">{service.process.title}</h2>
                <p className="text-gray-500 text-lg font-light">{service.process.subtitle}</p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.steps?.map((step: any, index: number) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-[2.5rem] text-left text-white relative overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                    <div className="absolute -right-10 -top-10 text-[12rem] font-black text-white/5 group-hover:scale-110 transition duration-1000 group-hover:text-white/10 select-none">
                      {index + 1}
                    </div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-10 border border-white/20">
                        <span className="font-bold text-xl">{index + 1}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 tracking-tight">{step.title}</h3>
                      <p className="text-blue-100/80 leading-relaxed font-light">{step.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Portfolio Gallery */}
      {service.portfolio && (
        <section className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold text-zeven-dark mb-6 tracking-tight">{service.portfolio.title || "Our Work in Action"}</h2>
                <p className="text-gray-500 text-lg font-light max-w-2xl mx-auto">
                  {service.portfolio.subtitle || "Explore a selection of our most impactful video projects, showcasing the results we've achieved for our clients across various industries."}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap justify-center gap-3 mb-16">
                {portfolioCategories.map((category: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(category)}
                    className={`px-8 py-3 rounded-full font-bold transition-all duration-300 text-sm md:text-base ${activeTab === category
                      ? 'bg-zeven-blue text-white shadow-xl shadow-blue-500/20 scale-105'
                      : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPortfolio?.map((example: any, index: number) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="bg-[#111827] rounded-[2rem] p-10 flex flex-col justify-center min-h-[250px] shadow-xl hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <h3 className="text-white font-bold text-2xl mb-6 group-hover:text-blue-400 transition-colors">{example.title}</h3>
                      <div className="space-y-3">
                        {example.objective && (
                          <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                            <p className="text-slate-400 text-sm font-medium">Objective: {example.objective}</p>
                          </div>
                        )}
                        {example.result && (
                          <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <p className="text-emerald-400 text-sm font-bold">Result: {example.result}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Stats/Numbers Strip */}
      {service.metrics && (
        <section className="bg-[#0A0F1C] py-24 md:py-32 text-white relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-64 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <ScrollReveal>
              <h2 className="text-center text-2xl md:text-3xl text-white font-bold tracking-widest uppercase mb-20 opacity-80">{service.metrics.title}</h2>
            </ScrollReveal>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 text-center">
              {service.metrics.list?.map((metric: any, index: number) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="group">
                    <div className="text-5xl md:text-7xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 group-hover:scale-110 transition-transform duration-500 inline-block">
                      {metric.value}
                    </div>
                    <div className="text-xs md:text-sm text-slate-400 tracking-[0.2em] font-bold uppercase">{metric.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What We Create (Features List) */}
      {service.features && (
        <section className="py-24 md:py-32 bg-slate-50/50">
          <div className="container mx-auto px-6 lg:px-12">
            <ScrollReveal>
              <div className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-bold text-zeven-dark mb-6 tracking-tight">{service.features.title}</h2>
                <p className="text-gray-500 text-lg font-light max-w-2xl mx-auto">{service.features.subtitle}</p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {service.features.list?.map((feature: any, index: number) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <Link 
                    to={`/services/${slug}/${feature.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`} 
                    className="block bg-white border border-slate-100 p-10 md:p-12 rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-2 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 h-full relative group cursor-pointer"
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-zeven-dark mb-6 tracking-tight">{feature.title}</h3>
                    <p className="text-gray-500 mb-8 text-lg font-light leading-relaxed">{feature.subTitle}</p>
                    <ul className="space-y-5">
                      {feature.inclusions?.map((inclusion: string, i: number) => (
                        <li key={i} className="flex items-start group/item">
                          <div className="mt-1 mr-4 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover/item:bg-zeven-blue group-hover/item:text-white transition-colors duration-300">
                            <CheckCircle className="w-4 h-4 text-zeven-blue group-hover/item:text-white" />
                          </div>
                          <span className="text-slate-700 text-lg font-medium">{inclusion}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex justify-end">
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-zeven-blue transition-colors duration-300">
                        <ArrowRight className="w-6 h-6 text-zeven-blue group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {service.testimonials && (
        <section className="py-24 md:py-32 bg-slate-50/30 border-t border-slate-100">
          <div className="container mx-auto px-6 lg:px-12">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-bold text-center text-zeven-dark mb-20 tracking-tight">{service.testimonials.title}</h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {service.testimonials.list?.map((testimonial: any, index: number) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 h-full flex flex-col">
                    <div className="flex text-amber-400 mb-8 gap-1">
                      {[...Array(testimonial.rating || 5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                    </div>
                    <p className="text-xl md:text-2xl text-slate-700 mb-10 leading-relaxed font-light italic flex-grow">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-5 pt-8 border-t border-slate-50">
                      <div className="w-14 h-14 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center text-slate-500 font-bold text-xl shadow-inner">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-zeven-dark text-lg">{testimonial.author}</div>
                        <div className="text-slate-400 text-sm font-medium tracking-wide">{testimonial.company}</div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Engagement Models (Custom Quote) */}
      {service.engagement && (
        <section className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-zeven-dark mb-6 tracking-tight">{service.engagement.title}</h2>
                <p className="text-gray-500 text-lg font-light max-w-2xl mx-auto">{service.engagement.subtitle}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border border-blue-100 p-10 md:p-20 rounded-[3rem] text-center shadow-xl shadow-blue-500/5 relative overflow-hidden group">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors duration-700" />

                <div className="relative z-10">
                  <h3 className="text-3xl md:text-5xl font-extrabold text-zeven-dark mb-8 tracking-tight">{service.engagement.cardTitle}</h3>
                  <p className="text-slate-500 mb-12 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">{service.engagement.description}</p>
                  <Link
                    to={service.engagement.ctaUrl?.startsWith('http') ? service.engagement.ctaUrl : `/${service.engagement.ctaUrl?.replace(/^\//, '') || 'contact'}`}
                    className="inline-block bg-zeven-blue text-white px-6 sm:px-12 py-5 rounded-xl font-bold text-xl hover:bg-blue-700 transition-all duration-300 shadow-2xl shadow-blue-500/30 hover:-translate-y-1"
                  >
                    {service.engagement.ctaText || "Get Started"}
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* FAQs */}
      {service.faqs && (
        <section className="py-24 md:py-32 bg-slate-50/50 border-t border-slate-100">
          <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
            <ScrollReveal>
              <div className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-bold text-zeven-dark mb-6 tracking-tight">{service.faqs.title}</h2>
                <p className="text-gray-500 text-lg font-light max-w-2xl mx-auto">{service.faqs.description}</p>
              </div>
            </ScrollReveal>

            <div className="space-y-4">
              {service.faqs.list?.map((faq: any, index: number) => (
                <ScrollReveal key={index} delay={index * 0.05}>
                  <details className="bg-white rounded-[2rem] border border-slate-100 group overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-md transition-all duration-300">
                    <summary className="flex items-center justify-between p-8 md:p-10 cursor-pointer list-none font-bold text-xl md:text-2xl text-zeven-dark">
                      {faq.question}
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-open:bg-blue-50 group-open:text-zeven-blue transition-all duration-300">
                        <ChevronDown className="w-6 h-6 text-slate-400 group-open:hidden" />
                        <ChevronUp className="w-6 h-6 text-zeven-blue hidden group-open:block" />
                      </div>
                    </summary>
                    <div className="px-8 md:px-10 pb-10 text-slate-500 text-lg md:text-xl font-light leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      {service.bottomCta && (
        <section className=" py-32 md:py-20 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2B7FFF]  to-[#AD46FF]" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <ScrollReveal>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white tracking-tight leading-tight max-w-4xl mx-auto">
                {service.bottomCta.title}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-white/60 mb-12 max-w-2xl mx-auto text-lg md:text-xl font-light">{service.bottomCta.subtitle}</p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <Link
                to={service.bottomCta.buttonUrl?.startsWith('http') ? service.bottomCta.buttonUrl : `/${service.bottomCta.buttonUrl?.replace(/^\//, '') || 'contact'}`}
                className="inline-block bg-white text-zeven-blue px-12 py-5 rounded-xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:bg-blue-50"
              >
                {service.bottomCta.buttonText || "Let's Talk"}
              </Link>
            </ScrollReveal>

            {service.bottomCta.note && (
              <ScrollReveal delay={0.6}>
                <p className="mt-8 text-gray-200 text-sm font-medium tracking-widest uppercase">
                  {service.bottomCta.note}
                </p>
              </ScrollReveal>
            )}
          </div>
        </section>
      )}
    </div>
  );
};
