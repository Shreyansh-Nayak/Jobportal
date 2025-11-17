import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Search, Building2, Briefcase, Users, TrendingUp, Star, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Front = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const categories = [
    { icon: <Briefcase className="w-8 h-8" />, title: 'Development & IT', count: '2,500+ jobs' },
    { icon: <Building2 className="w-8 h-8" />, title: 'Marketing & Sales', count: '1,800+ jobs' },
    { icon: <Users className="w-8 h-8" />, title: 'Customer Service', count: '1,200+ jobs' },
    { icon: <TrendingUp className="w-8 h-8" />, title: 'Design & Creative', count: '950+ jobs' },
    { icon: <Star className="w-8 h-8" />, title: 'Legal & Finance', count: '800+ jobs' },
    { icon: <CheckCircle2 className="w-8 h-8" />, title: 'Product Management', count: '600+ jobs' },
  ];

  const companies = [
    'Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix'
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      company: 'Tech Corp',
      text: 'JobKonnect helped me find my dream job in just 2 weeks! The platform is intuitive and the job matches were perfect.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'HR Manager',
      company: 'Innovation Labs',
      text: 'As an employer, JobKonnect has made hiring so much easier. We found qualified candidates quickly and efficiently.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director',
      company: 'Creative Studios',
      text: 'The best job platform I have used. Great interface, responsive support, and quality job listings.',
      rating: 5
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Jobs' },
    { number: '100K+', label: 'Job Seekers' },
    { number: '10K+', label: 'Companies' },
    { number: '95%', label: 'Success Rate' }
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/10 to-background -z-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-foreground/10 rounded-full blur-3xl -z-10 animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <Star className="w-4 h-4 text-primary fill-primary" />
                <span className="text-sm font-medium text-primary">Trusted by 100K+ professionals</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                Find the <span className="text-primary relative">
                  perfect job
                  <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                    <path d="M0 4 Q50 0, 100 4 T200 4" stroke="hsl(var(--primary))" strokeWidth="3" fill="none"/>
                  </svg>
                </span> for you
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Fill your job in hours, not weeks. Search for free and connect with top employers.
              </p>
              
              <div className="flex flex-wrap gap-4 items-center pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">No hidden fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Quick applications</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Real opportunities</span>
                </div>
              </div>
              
              {/* Search Bar */}
              <Card className="p-6 shadow-2xl border-primary/20 animate-scale-in">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1 flex items-center gap-3 px-5 py-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors border border-border/50">
                      <Search className="w-5 h-5 text-primary" />
                      <input
                        type="text"
                        placeholder="Job title or keywords"
                        className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                      />
                    </div>
                    <div className="flex-1 flex items-center gap-3 px-5 py-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors border border-border/50">
                      <Building2 className="w-5 h-5 text-primary" />
                      <input
                        type="text"
                        placeholder="City or location"
                        className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                      />
                    </div>
                    <Button size="lg" className="px-10 shadow-lg hover:shadow-xl transition-shadow">
                      <Search className="w-5 h-5 mr-2" />
                      Search
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-wrap gap-3 items-center animate-fade-in delay-200">
                <span className="text-sm font-medium text-muted-foreground">Popular searches:</span>
                <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Briefcase className="w-3 h-3 mr-1" />
                  Designer
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Briefcase className="w-3 h-3 mr-1" />
                  Developer
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Marketing
                </Button>
              </div>
            </div>

            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md h-[400px] flex items-center justify-center">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 -z-10">
                  <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-20 right-10 w-16 h-16 bg-accent-foreground/20 rounded-full animate-pulse delay-100"></div>
                  <div className="absolute top-1/2 right-20 w-12 h-12 bg-primary/30 rounded-lg animate-bounce"></div>
                </div>
                
                {/* Main Illustration */}
                <svg viewBox="0 0 500 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  {/* Person with laptop */}
                  <g className="animate-fade-in">
                    {/* Desk */}
                    <rect x="150" y="280" width="200" height="8" fill="hsl(var(--primary))" opacity="0.3" rx="4"/>
                    
                    {/* Laptop */}
                    <rect x="200" y="240" width="100" height="60" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="3" rx="4"/>
                    <rect x="210" y="250" width="80" height="40" fill="hsl(var(--primary))" opacity="0.2" rx="2"/>
                    
                    {/* Person head */}
                    <circle cx="250" cy="180" r="30" fill="hsl(var(--primary))" opacity="0.8"/>
                    
                    {/* Body */}
                    <rect x="220" y="210" width="60" height="70" fill="hsl(var(--primary))" opacity="0.6" rx="30"/>
                    
                    {/* Arms */}
                    <rect x="190" y="230" width="30" height="50" fill="hsl(var(--primary))" opacity="0.6" rx="15" transform="rotate(-20 205 255)"/>
                    <rect x="280" y="230" width="30" height="50" fill="hsl(var(--primary))" opacity="0.6" rx="15" transform="rotate(20 295 255)"/>
                  </g>
                  
                  {/* Floating elements representing job opportunities */}
                  <g className="animate-float">
                    <circle cx="100" cy="100" r="8" fill="hsl(var(--primary))" opacity="0.6"/>
                    <circle cx="400" cy="150" r="6" fill="hsl(var(--primary))" opacity="0.7"/>
                    <circle cx="380" cy="80" r="10" fill="hsl(var(--accent-foreground))" opacity="0.5"/>
                  </g>
                  
                  {/* Document/Resume icons */}
                  <g className="animate-slide-in-right">
                    <rect x="80" y="200" width="40" height="50" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" rx="2"/>
                    <line x1="90" y1="215" x2="110" y2="215" stroke="hsl(var(--primary))" strokeWidth="2"/>
                    <line x1="90" y1="225" x2="110" y2="225" stroke="hsl(var(--primary))" strokeWidth="2"/>
                    <line x1="90" y1="235" x2="105" y2="235" stroke="hsl(var(--primary))" strokeWidth="2"/>
                  </g>
                  
                  {/* Briefcase icon */}
                  <g className="animate-scale-in delay-200">
                    <rect x="370" y="250" width="50" height="40" fill="hsl(var(--card))" stroke="hsl(var(--accent-foreground))" strokeWidth="3" rx="4"/>
                    <rect x="390" y="240" width="10" height="15" fill="hsl(var(--accent-foreground))" rx="2"/>
                    <line x1="380" y1="270" x2="410" y2="270" stroke="hsl(var(--accent-foreground))" strokeWidth="2"/>
                  </g>
                  
                  {/* Checkmark (success icon) */}
                  <g className="animate-scale-in delay-300">
                    <circle cx="120" cy="320" r="15" fill="hsl(var(--primary))" opacity="0.2"/>
                    <path d="M 112 320 L 117 325 L 128 314" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <p className="text-center text-muted-foreground mb-8">Trusted by leading brands and startups</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {companies.map((company, index) => (
              <div key={index} className="text-2xl font-bold text-muted-foreground/50 hover:text-primary transition-colors cursor-pointer">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Popular Categories</h2>
            <p className="text-lg text-muted-foreground">Find and hire professionals across all skills</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{category.title}</h3>
                      <p className="text-muted-foreground text-sm">{category.count}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* For Employers CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/20 to-primary/10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">For Employers</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Find professionals from around the world and across all skills. Post your jobs and connect with talented candidates today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8" onClick={() => navigate('/auth')}>
                Post a Job
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">What Our Users Say</h2>
            <p className="text-lg text-muted-foreground">Success stories from job seekers and employers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">{testimonial.text}</p>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Ready to Find Your Dream Job?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of professionals who have found their perfect career match through JobKonnect.
            </p>
            <Button size="lg" className="px-12" onClick={() => navigate('/auth')}>
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-card border-t">
        <div className="container mx-auto px-6">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2025 JobKonnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Front;
