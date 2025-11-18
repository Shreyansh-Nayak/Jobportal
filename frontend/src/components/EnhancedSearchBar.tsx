import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, ChevronDown, Briefcase, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card } from '@/components/ui/card';

interface EnhancedSearchBarProps {
  onSearch?: (keyword: string, location: string, category: string) => void;
}

export const EnhancedSearchBar = ({ onSearch }: EnhancedSearchBarProps) => {
  const [keyword, setKeyword] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [category, setCategory] = useState('all');
  const [showJobSuggestions, setShowJobSuggestions] = useState(false);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [filteredJobSuggestions, setFilteredJobSuggestions] = useState<string[]>([]);
  const [filteredCitySuggestions, setFilteredCitySuggestions] = useState<string[]>([]);
  const keywordInputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const jobSuggestionsRef = useRef<HTMLDivElement>(null);
  const citySuggestionsRef = useRef<HTMLDivElement>(null);

  // Comprehensive list of major Indian cities
  const indianCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat',
    'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal',
    'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana',
    'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivali', 'Vasai-Virar',
    'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad',
    'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada', 'Jodhpur',
    'Madurai', 'Raipur', 'Kota', 'Chandigarh', 'Guwahati', 'Solapur', 'Hubli-Dharwad',
    'Mysore', 'Tiruchirappalli', 'Bareilly', 'Aligarh', 'Tiruppur', 'Moradabad', 'Jalandhar',
    'Bhubaneswar', 'Salem', 'Warangal', 'Guntur', 'Bhiwandi', 'Saharanpur', 'Gorakhpur',
    'Bikaner', 'Amravati', 'Noida', 'Jamshedpur', 'Bhilai', 'Cuttack', 'Firozabad',
    'Kochi', 'Nellore', 'Bhavnagar', 'Dehradun', 'Durgapur', 'Asansol', 'Rourkela',
    'Nanded', 'Kolhapur', 'Ajmer', 'Akola', 'Gulbarga', 'Jamnagar', 'Ujjain', 'Loni',
    'Siliguri', 'Jhansi', 'Ulhasnagar', 'Jammu', 'Sangli-Miraj', 'Mangalore', 'Erode',
    'Belgaum', 'Ambattur', 'Tirunelveli', 'Malegaon', 'Gaya', 'Jalgaon', 'Udaipur',
    'Maheshtala', 'Thiruvananthapuram', 'Puducherry', 'Panipat', 'Karnal', 'Rohtak',
    'Mira-Bhayandar', 'Bellary', 'Patiala', 'Gopalpur', 'Agartala', 'Bhagalpur',
    'Muzaffarnagar', 'Bhatpara', 'Panihati', 'Latur', 'Dhule', 'Rohtak', 'Korba',
    'Bhilwara', 'Brahmapur', 'Muzaffarpur', 'Ahmednagar', 'Mathura', 'Kollam', 'Avadi',
    'Kadapa', 'Kamarhati', 'Sambalpur', 'Bilaspur', 'Shahjahanpur', 'Satara', 'Bijapur',
    'Rampur', 'Shimoga', 'Chandrapur', 'Junagadh', 'Thrissur', 'Alwar', 'Bardhaman',
    'Kulti', 'Kakinada', 'Nizamabad', 'Parbhani', 'Tumkur', 'Khammam', 'Ozhukarai',
    'Bihar Sharif', 'Panipat', 'Darbhanga', 'Bally', 'Aizawl', 'Dewas', 'Ichalkaranji'
  ].sort();

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'development', label: 'Development & IT' },
    { value: 'design', label: 'Design & Creative' },
    { value: 'marketing', label: 'Marketing & Sales' },
    { value: 'finance', label: 'Finance & Legal' },
    { value: 'customer-service', label: 'Customer Service' },
    { value: 'product', label: 'Product Management' },
    { value: 'data', label: 'Data & Analytics' },
    { value: 'hr', label: 'Human Resources' },
  ];

  const jobSuggestions = [
    'Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'UI/UX Designer',
    'Graphic Designer',
    'Product Designer',
    'Product Manager',
    'Marketing Manager',
    'Sales Representative',
    'Customer Success Manager',
    'Data Analyst',
    'Business Analyst',
    'Project Manager',
    'DevOps Engineer',
    'Mobile Developer',
    'Quality Assurance Engineer',
    'Content Writer',
    'Social Media Manager',
    'HR Manager',
  ];

  // Filter job suggestions
  useEffect(() => {
    if (keyword.length > 0) {
      const filtered = jobSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredJobSuggestions(filtered.slice(0, 8));
      setShowJobSuggestions(true);
    } else {
      setShowJobSuggestions(false);
    }
  }, [keyword]);

  // Filter city suggestions
  useEffect(() => {
    if (locationInput.length > 0) {
      const filtered = indianCities.filter(city =>
        city.toLowerCase().startsWith(locationInput.toLowerCase())
      );
      setFilteredCitySuggestions(filtered.slice(0, 10));
      setShowCitySuggestions(true);
    } else {
      setShowCitySuggestions(false);
    }
  }, [locationInput]);

  // Click outside handler to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        jobSuggestionsRef.current && 
        !jobSuggestionsRef.current.contains(event.target as Node) &&
        keywordInputRef.current &&
        !keywordInputRef.current.contains(event.target as Node)
      ) {
        setShowJobSuggestions(false);
      }
      
      if (
        citySuggestionsRef.current && 
        !citySuggestionsRef.current.contains(event.target as Node) &&
        locationInputRef.current &&
        !locationInputRef.current.contains(event.target as Node)
      ) {
        setShowCitySuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(keyword, selectedLocation || locationInput || 'All Cities', category);
    }
    setShowJobSuggestions(false);
    setShowCitySuggestions(false);
  };

  const handleJobSuggestionClick = (suggestion: string) => {
    setKeyword(suggestion);
    setShowJobSuggestions(false);
    keywordInputRef.current?.focus();
  };

  const handleCitySuggestionClick = (city: string) => {
    setLocationInput(city);
    setSelectedLocation(city);
    setShowCitySuggestions(false);
    locationInputRef.current?.focus();
  };

  const handleKeywordKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowJobSuggestions(false);
    }
  };

  const handleLocationKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowCitySuggestions(false);
    }
  };

  return (
    <div className="relative w-full">
      <Card className="p-2 shadow-2xl border-border/50 backdrop-blur-sm bg-background/95">
        <div className="flex flex-col lg:flex-row gap-2">
          {/* Job Title/Keyword Input */}
          <div className="relative flex-1 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 bg-background rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
              <input
                ref={keywordInputRef}
                type="text"
                placeholder="Job title or keyword"
                className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base text-foreground placeholder:text-muted-foreground min-w-0"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeywordKeyDown}
                onFocus={() => keyword.length > 0 && setShowJobSuggestions(true)}
              />
              {keyword && (
                <button
                  onClick={() => {
                    setKeyword('');
                    setShowJobSuggestions(false);
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Job Suggestions Dropdown */}
            {showJobSuggestions && filteredJobSuggestions.length > 0 && (
              <div 
                ref={jobSuggestionsRef}
                className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-xl z-[60] max-h-64 overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-200"
              >
                {filteredJobSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleJobSuggestionClick(suggestion)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-left hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2 sm:gap-3 border-b border-border/50 last:border-0"
                  >
                    <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span className="text-sm sm:text-base text-popover-foreground truncate">{suggestion}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Location Input with Autocomplete */}
          <div className="relative w-full lg:w-72 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 bg-background rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
              <input
                ref={locationInputRef}
                type="text"
                placeholder="City (e.g., Mumbai, Delhi)"
                className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base text-foreground placeholder:text-muted-foreground min-w-0"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                onKeyDown={handleLocationKeyDown}
                onFocus={() => locationInput.length > 0 && setShowCitySuggestions(true)}
              />
              {locationInput && (
                <button
                  onClick={() => {
                    setLocationInput('');
                    setSelectedLocation('');
                    setShowCitySuggestions(false);
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* City Suggestions Dropdown */}
            {showCitySuggestions && filteredCitySuggestions.length > 0 && (
              <div 
                ref={citySuggestionsRef}
                className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-xl z-[60] max-h-64 overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-200"
              >
                {filteredCitySuggestions.map((city, index) => (
                  <button
                    key={index}
                    onClick={() => handleCitySuggestionClick(city)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-left hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2 sm:gap-3 border-b border-border/50 last:border-0"
                  >
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                    <span className="text-sm sm:text-base text-popover-foreground truncate">{city}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Category Filter (Optional - shown on larger screens) */}
          <div className="hidden xl:block w-64 min-w-0">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-full px-3 sm:px-4 py-3 bg-background border-border/50 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-2 sm:gap-3 w-full min-w-0">
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
                  <SelectValue className="truncate" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-popover border-border z-50">
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <Button
            size="lg"
            onClick={handleSearch}
            className="px-6 sm:px-8 lg:px-12 shadow-lg hover:shadow-xl transition-all h-auto py-3 text-sm sm:text-base whitespace-nowrap"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2" />
            <span className="hidden sm:inline">Search</span>
          </Button>
        </div>

        {/* Mobile Category Filter */}
        <div className="xl:hidden mt-2">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full px-3 sm:px-4 py-3 bg-background border-border/50 hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-2 sm:gap-3 w-full">
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>
    </div>
  );
};
