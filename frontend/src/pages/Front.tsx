import React, { useState, useEffect } from 'react';
import { Search, Building2, Briefcase, Users, TrendingUp, Star, CheckCircle2, ArrowRight, Sparkles, Target, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EnhancedJobKonnect = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [activePopularIndex, setActivePopularIndex] = useState(0);
  const navigate = useNavigate();

  const popularTags = ['Designer', 'Developer', 'Marketing', 'Sales'];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Rotate through popular tags
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePopularIndex((prev) => (prev + 1) % popularTags.length);
    }, 3000); // Change every 3 seconds to allow full typing animation
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { icon: <Briefcase className="w-8 h-8" />, title: 'Development & IT', count: '2,500+ jobs', gradient: 'from-blue-500 to-cyan-500' },
    { icon: <Building2 className="w-8 h-8" />, title: 'Marketing & Sales', count: '1,800+ jobs', gradient: 'from-purple-500 to-pink-500' },
    { icon: <Users className="w-8 h-8" />, title: 'Customer Service', count: '1,200+ jobs', gradient: 'from-green-500 to-emerald-500' },
    { icon: <TrendingUp className="w-8 h-8" />, title: 'Design & Creative', count: '950+ jobs', gradient: 'from-orange-500 to-red-500' },
    { icon: <Star className="w-8 h-8" />, title: 'Legal & Finance', count: '800+ jobs', gradient: 'from-yellow-500 to-amber-500' },
    { icon: <CheckCircle2 className="w-8 h-8" />, title: 'Product Management', count: '600+ jobs', gradient: 'from-indigo-500 to-blue-500' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      company: 'Tech Corp',
      text: 'JobKonnect helped me find my dream job in just 2 weeks! The platform is intuitive and the job matches were perfect.',
      image: '👩‍💻'
    },
    {
      name: 'Michael Chen',
      role: 'HR Manager',
      company: 'Innovation Labs',
      text: 'As an employer, JobKonnect has made hiring so much easier. We found qualified candidates quickly and efficiently.',
      image: '👨‍💼'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director',
      company: 'Creative Studios',
      text: 'The best job platform I have used. Great interface, responsive support, and quality job listings.',
      image: '👩‍🎨'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Jobs', icon: <Briefcase className="w-6 h-6" /> },
    { number: '100K+', label: 'Job Seekers', icon: <Users className="w-6 h-6" /> },
    { number: '10K+', label: 'Companies', icon: <Building2 className="w-6 h-6" /> },
    { number: '95%', label: 'Success Rate', icon: <Target className="w-6 h-6" /> }
  ];

  const features = [
    { icon: <Zap className="w-6 h-6" />, title: 'Instant Matching', desc: 'AI-powered job recommendations' },
    { icon: <CheckCircle2 className="w-6 h-6" />, title: 'Verified Companies', desc: 'Only trusted employers' },
    { icon: <Sparkles className="w-6 h-6" />, title: 'Smart Filters', desc: 'Find exactly what you need' },
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (keyword) params.append("keyword", keyword);
    if (location) params.append("location", location);

    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 overflow-hidden relative">
        {/* Animated background elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full border border-blue-200">
              <Star className="w-4 h-4 text-blue-600 fill-blue-600" />
              <span className="text-sm font-medium text-blue-700">Trusted by 100K+ professionals</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Find Your{' '}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent animate-gradient">
                Dream Job
              </span>
              <br />Today
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Connect with top employers and discover opportunities that match your skills and ambitions.
            </p>

            {/* Enhanced Popular Section with Letter-by-Letter Typing Animation */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-lg text-muted-foreground font-medium">Popular:</span>
              <div className="relative h-12 flex items-center min-w-[200px]">
                {popularTags.map((tag, index) => (
                  <div
                    key={tag}
                    className={`absolute left-0 text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent transition-opacity duration-300 ${
                      index === activePopularIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {tag.split('').map((letter, letterIndex) => (
                      <span
                        key={letterIndex}
                        className="inline-block animate-letter-appear"
                        style={{
                          animationDelay: `${letterIndex * 80}ms`,
                          animationFillMode: 'backwards'
                        }}
                      >
                        {letter}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
              
              {/* Dots indicator */}
              <div className="flex items-center gap-1.5 ml-2">
                {popularTags.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === activePopularIndex 
                        ? 'w-6 bg-blue-600' 
                        : 'w-1.5 bg-muted-foreground'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Animated Illustration */}
          <div className="relative h-[500px] hidden lg:block">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full max-w-md">
                {/* Floating cards animation */}
                <div className="absolute top-0 left-0 w-48 bg-card rounded-xl shadow-lg p-4 animate-float">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-2 bg-muted-foreground/20 rounded mb-1"></div>
                      <div className="h-2 bg-muted-foreground/10 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="h-1 bg-blue-500 rounded w-3/4"></div>
                </div>

                <div className="absolute top-40 right-0 w-48 bg-card rounded-xl shadow-lg p-4 animate-float" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-2 bg-muted-foreground/20 rounded mb-1"></div>
                      <div className="h-2 bg-muted-foreground/10 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="h-1 bg-purple-500 rounded w-3/4"></div>
                </div>

                <div className="absolute bottom-0 left-1/4 w-48 bg-card rounded-xl shadow-lg p-4 animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-2 bg-muted-foreground/20 rounded mb-1"></div>
                      <div className="h-2 bg-muted-foreground/10 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="h-1 bg-green-500 rounded w-3/4"></div>
                </div>

                {/* Central element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                  <Briefcase className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with animation */}
      <section className="py-16 px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-blue-600">{stat.icon}</div>
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose JobKonnect?</h2>
            <p className="text-xl text-muted-foreground">Everything you need to find or fill your perfect position</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <div className="text-blue-600">{feature.icon}</div>
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories with gradient cards */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Browse by Category</h2>
            <p className="text-xl text-muted-foreground">Explore opportunities across all industries</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer group overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`p-4 bg-gradient-to-br ${category.gradient} rounded-xl text-white group-hover:scale-110 transition-transform`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{category.title}</h3>
                    <p className="text-muted-foreground text-sm">{category.count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground">See what our community has to say</p>
          </div>

          <div className="relative bg-white rounded-3xl shadow-2xl p-12 overflow-hidden">
            <div className="absolute top-0 left-0 text-blue-100 text-9xl font-serif leading-none">"</div>

            <div className="relative z-10 text-center">
              <p className="text-xl text-muted-foreground mb-8 italic leading-relaxed">
                {testimonials[activeTestimonial].text}
              </p>

              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="text-5xl">{testimonials[activeTestimonial].image}</div>
                <div className="text-left">
                  <div className="font-bold text-lg">{testimonials[activeTestimonial].name}</div>
                  <div className="text-muted-foreground">{testimonials[activeTestimonial].role}</div>
                  <div className="text-muted-foreground text-sm">{testimonials[activeTestimonial].company}</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${index === activeTestimonial ? 'bg-blue-600 w-8' : 'bg-slate-300'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Take the Next Step?</h2>
          <p className="text-xl mb-10 opacity-90">Join thousands finding their dream careers today</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() =>
              navigate("/auth?mode=signup&role=job_seeker")
            } className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:shadow-2xl transition-all flex items-center gap-2 justify-center">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() =>
              navigate("/auth?mode=signup&role=employer")
            } className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all">
              For Employers
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 text-white">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">JobKonnect</span>
          </div>
          <p className="text-muted-foreground/80">© 2025 JobKonnect. Connecting talent with opportunity.</p>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes letter-appear {
          from { 
            opacity: 0; 
            transform: translateY(10px) scale(0.8);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-letter-appear {
          animation: letter-appear 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EnhancedJobKonnect;