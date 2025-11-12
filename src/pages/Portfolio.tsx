import React, { useState, useMemo } from 'react';
import { ExternalLink, Filter, Star, TrendingUp, Users, Clock, Link, Search, Globe, Target } from 'lucide-react';
import { Helmet } from 'react-helmet';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState(null);

  const filters = ['All', 'SEO', 'Backlinks', 'Content Marketing', 'Local SEO'];

  const projects = [
    {
      id: 1,
      title: 'TechStart Solutions SEO',
      category: 'SEO',
      description: 'Complete SEO optimization with 300+ premium backlinks resulting in top 3 rankings for 15 competitive keywords',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['300 Backlinks', '15 Keywords', 'Top 3 Rankings'],
      results: '400% increase in organic traffic',
      duration: '6 Weeks',
      client: 'Technology Startup',
      rating: 5,
      backlinks: 300,
      keywords: 15
    },
    {
      id: 2,
      title: 'Fashion Hub Backlink Campaign',
      category: 'Backlinks',
      description: 'Strategic backlink building campaign with 750 premium links across authority sites and social platforms',
      image: 'https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['750 Backlinks', 'Authority Sites', 'Social Bookmarking'],
      results: 'Domain Authority increased from 15 to 35',
      duration: '4 Weeks',
      client: 'Fashion E-commerce',
      rating: 5,
      backlinks: 750,
      keywords: 25
    },
    {
      id: 3,
      title: 'FoodieDelight Local SEO',
      category: 'Local SEO',
      description: 'Local SEO optimization with Google Business setup and 1200+ local citations and backlinks',
      image: 'https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Local Citations', 'Google Business', 'Map Ranking'],
      results: 'Top 3 in local map pack for 8 keywords',
      duration: '5 Weeks',
      client: 'Food Delivery Service',
      rating: 5,
      backlinks: 1200,
      keywords: 8
    },
    {
      id: 4,
      title: 'Content Marketing Strategy',
      category: 'Content Marketing',
      description: 'Comprehensive content strategy with 50+ optimized articles and 2000+ quality backlinks',
      image: 'https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Content Strategy', '2000+ Backlinks', 'Article Marketing'],
      results: '500% increase in organic reach',
      duration: '8 Weeks',
      client: 'Digital Agency',
      rating: 5,
      backlinks: 2000,
      keywords: 50
    },
    {
      id: 5,
      title: 'Healthcare Authority Building',
      category: 'SEO',
      description: 'Authority building campaign with 5000+ premium backlinks and comprehensive on-page optimization',
      image: 'https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['5000+ Backlinks', 'Authority Sites', 'Medical SEO'],
      results: 'First page rankings for 45 health keywords',
      duration: '10 Weeks',
      client: 'Healthcare Provider',
      rating: 5,
      backlinks: 5000,
      keywords: 45
    },
    {
      id: 6,
      title: 'Luxury Brand Backlink Network',
      category: 'Backlinks',
      description: 'Premium backlink network building for luxury brand with high DA sites and influencer collaborations',
      image: 'https://images.pexels.com/photos/1697911/pexels-photo-1697911.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['High DA Sites', 'Influencer Links', 'Premium Placement'],
      results: 'Brand mentions increased by 300%',
      duration: '7 Weeks',
      client: 'Luxury Retail Brand',
      rating: 5,
      backlinks: 1500,
      keywords: 20
    },
    {
      id: 7,
      title: 'E-learning Platform SEO',
      category: 'SEO',
      description: 'Complete SEO overhaul with 3000+ educational backlinks and comprehensive keyword strategy',
      image: 'https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['3000+ Backlinks', 'Educational SEO', 'Video Optimization'],
      results: '10,000+ monthly organic visitors',
      duration: '9 Weeks',
      client: 'E-learning Platform',
      rating: 5,
      backlinks: 3000,
      keywords: 35
    },
    {
      id: 8,
      title: 'Real Estate Local Presence',
      category: 'Local SEO',
      description: 'Local SEO domination with 800+ local citations and Google Business optimization for real estate',
      image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Local Citations', 'GBP Optimization', 'Real Estate SEO'],
      results: '150% increase in property inquiries',
      duration: '6 Weeks',
      client: 'Real Estate Agency',
      rating: 5,
      backlinks: 800,
      keywords: 12
    },
    {
      id: 9,
      title: 'Beauty Brand Content & Links',
      category: 'Content Marketing',
      description: 'Integrated content marketing with 1200+ beauty niche backlinks and social signal building',
      image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Niche Backlinks', 'Content Strategy', 'Social Signals'],
      results: '600% growth in organic traffic',
      duration: '7 Weeks',
      client: 'Beauty & Cosmetics',
      rating: 5,
      backlinks: 1200,
      keywords: 30
    }
  ];

  const filteredProjects = useMemo(() => 
    activeFilter === 'All' 
      ? projects 
      : projects.filter(project => project.category === activeFilter),
    [activeFilter]
  );

  const stats = [
    { icon: Link, value: '50K+', label: 'Backlinks Built' },
    { icon: Search, value: '95%', label: 'Client Satisfaction' },
    { icon: TrendingUp, value: '300%', label: 'Average Traffic Growth' },
    { icon: Target, value: '500+', label: 'Keywords Ranked' }
  ];

  const TestimonialSection = () => (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600">
            Don't just take our word for it
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Rajesh Sharma",
              company: "TechStart Solutions",
              text: "EagleWeb's backlink strategy took our website from page 3 to top 3 rankings. The quality of links is exceptional!",
              rating: 5
            },
            {
              name: "Priya Patel",
              company: "Fashion Hub",
              text: "Our domain authority jumped from 18 to 42 in just 6 weeks. The results speak for themselves!",
              rating: 5
            },
            {
              name: "Amit Kumar",
              company: "FoodieDelight",
              text: "Local SEO campaign brought us 200+ monthly orders from Google Maps. Incredible ROI on our investment!",
              rating: 5
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-blue-600">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Portfolio | EagleWeb – Premium Backlinks & SEO Services</title>
        <meta
          name="description"
          content="Explore EagleWeb's portfolio showcasing successful SEO campaigns, premium backlink building, and content marketing projects. See how we boost rankings."
        />
        <meta
          name="keywords"
          content="EagleWeb portfolio, SEO projects, backlink building, content marketing, local SEO, premium backlinks, SEO case studies"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://eagleweb.com/portfolio" />

        <meta property="og:title" content="Portfolio | EagleWeb – Premium Backlinks & SEO Services" />
        <meta property="og:description" content="Check out our portfolio of successful SEO campaigns, backlink building, and content marketing projects delivering real results." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://eagleweb.com/portfolio" />
        <meta property="og:image" content="https://eagleweb.com/og-image.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfolio | EagleWeb – Premium Backlinks & SEO Services" />
        <meta name="twitter:description" content="Explore our portfolio showcasing successful SEO campaigns and premium backlink building projects." />
        <meta name="twitter:image" content="https://eagleweb.com/og-image.jpg" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "EagleWeb Portfolio",
            "url": "https://eagleweb.com/portfolio",
            "numberOfItems": projects.length,
            "itemListElement": projects.map((project, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": `https://eagleweb.com/portfolio#project-${project.id}`,
              "name": project.title,
              "description": project.description
            }))
          })}
        </script>
      </Helmet>

      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Our <span className="text-yellow-400">Success</span> Stories
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100 leading-relaxed">
              Discover how our premium backlink strategies and SEO expertise have transformed businesses and skyrocketed rankings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#portfolio"
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 shadow-lg"
              >
                🚀 Explore Case Studies
              </a>
              <a
                href="https://wa.me/919310533973"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all"
              >
                💬 Free SEO Audit
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Filter Section */}
      <section id="portfolio" className="py-8 bg-white sticky top-0 z-50 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold text-gray-700">Filter Projects:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600 hover:shadow-md'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Portfolio Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured <span className="text-blue-600">Case Studies</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {activeFilter === 'All' 
                ? 'Showcasing our diverse range of successful SEO and backlink campaigns'
                : `Specialized ${activeFilter} projects delivering exceptional ranking results`
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex">
                    {[...Array(project.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                      ⏱️ {project.duration}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Backlink & Keyword Stats */}
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-2">
                      <Link className="h-4 w-4 text-blue-500" />
                      <span className="bg-blue-50 px-3 py-1 rounded-full text-blue-700 font-medium">
                        {project.backlinks}+ Backlinks
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-green-500" />
                      <span className="bg-green-50 px-3 py-1 rounded-full text-green-700 font-medium">
                        {project.keywords} Keywords
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl mb-4 border border-green-100">
                    <p className="text-green-700 font-semibold text-sm flex items-center">
                      📈 {project.results}
                    </p>
                  </div>
                  
                  <a
                    href={`https://wa.me/919310533973?text=Hello%20EagleWeb,%20I%20want%20to%20discuss%20a%20project%20similar%20to%20${encodeURIComponent(project.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2 group"
                  >
                    <span>Get Similar Results</span>
                    <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our SEO Impact in Numbers
            </h2>
            <p className="text-xl text-gray-600">
              Real results that speak for themselves
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialSection />

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to <span className="text-yellow-400">Skyrocket</span> Your Rankings?
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
            Let's discuss how our premium backlink strategies can deliver similar outstanding results for your website.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919310533973?text=Hello%20EagleWeb,%20I%20want%20to%20skyrocket%20my%20rankings!"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-10 py-5 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3"
            >
              <span>💬 Start Your SEO Journey</span>
              <ExternalLink className="h-5 w-5" />
            </a>
            <a
              href="tel:+919310533973"
              className="border-2 border-white hover:bg-white hover:text-blue-600 px-10 py-5 rounded-xl text-lg font-bold transition-all duration-300"
            >
              📞 Call Us Now
            </a>
          </div>
          <p className="mt-6 text-blue-200">
            🚀 Get free SEO audit within 24 hours
          </p>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;