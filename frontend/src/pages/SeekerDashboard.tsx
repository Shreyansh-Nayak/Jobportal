import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Briefcase, BookmarkPlus } from "lucide-react";

export default function SeekerDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">Find your next opportunity</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-hero-glow transition-shadow">
            <CardHeader>
              <Search className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Browse Jobs</CardTitle>
              <CardDescription>Discover thousands of job opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Explore Jobs</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-hero-glow transition-shadow">
            <CardHeader>
              <BookmarkPlus className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Saved Jobs</CardTitle>
              <CardDescription>View your bookmarked opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">View Saved</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-hero-glow transition-shadow">
            <CardHeader>
              <Briefcase className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Applications</CardTitle>
              <CardDescription>Track your job applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">My Applications</Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recommended for You</CardTitle>
            <CardDescription>Jobs matching your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 border rounded-lg hover:border-primary transition-colors"
                >
                  <h3 className="font-semibold text-lg mb-1">Software Engineer</h3>
                  <p className="text-sm text-muted-foreground mb-2">Tech Company • Remote</p>
                  <p className="text-sm mb-3">
                    Join our team to build innovative solutions...
                  </p>
                  <Button size="sm">Apply Now</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
