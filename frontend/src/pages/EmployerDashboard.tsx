import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Users, FileText } from "lucide-react";

export default function EmployerDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome!</h2>
          <p className="text-muted-foreground">Manage your job postings and candidates</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-hero-glow transition-shadow">
            <CardHeader>
              <PlusCircle className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Post a Job</CardTitle>
              <CardDescription>Create a new job listing</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Create Posting</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-hero-glow transition-shadow">
            <CardHeader>
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Candidates</CardTitle>
              <CardDescription>Review applicant profiles</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">View Candidates</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-hero-glow transition-shadow">
            <CardHeader>
              <FileText className="h-8 w-8 text-primary mb-2" />
              <CardTitle>My Postings</CardTitle>
              <CardDescription>Manage active job listings</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">View Postings</Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Job Postings</CardTitle>
            <CardDescription>Your current openings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 border rounded-lg hover:border-primary transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Senior Developer</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Posted 3 days ago • 24 applicants
                      </p>
                      <p className="text-sm mb-3">
                        Looking for an experienced developer to join our team...
                      </p>
                    </div>
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
