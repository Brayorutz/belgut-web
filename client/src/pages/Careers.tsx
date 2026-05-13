import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, Upload, Info, Calendar, Building2 } from "lucide-react";
import type { JobPosting } from "@shared/schema";

export default function Careers() {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const { data: jobs, isLoading } = useQuery<JobPosting[]>({ queryKey: ["/api/job-postings"] });

  const activeJobs = jobs?.filter(j => j.isActive) ?? [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Application Received",
        description: "Your CV has been successfully uploaded to our talent pool.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight">Careers at BTTI</h1>
            <p className="text-muted-foreground text-lg">
              Join our team and help shape the future of technical education.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : activeJobs.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">Current Vacancies</h2>
              {activeJobs.map(job => (
                <Card key={job.id} className="border border-primary/10 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="space-y-3 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                          <Badge variant="outline">{job.type}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" /> {job.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" /> Deadline: {new Date(job.deadline).toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{job.description}</p>
                        <div className="bg-gray-50 rounded-md p-3">
                          <p className="text-xs font-semibold text-gray-600 mb-1">Requirements</p>
                          <p className="text-sm text-gray-700">{job.requirements}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-muted/50 border-dashed">
              <CardContent className="py-12 text-center space-y-4">
                <div className="bg-background w-12 h-12 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">No Current Vacancies</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    We don't have any open positions at the moment, but we are always looking for talented individuals to join our talent pool.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-primary">Join our Talent Pool</h3>
                <p className="text-muted-foreground">
                  Upload your CV today, and we'll contact you when a position that matches your profile becomes available.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg h-fit">
                    <Info className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Why join BTTI?</h4>
                    <p className="text-sm text-muted-foreground">We offer a dynamic working environment, continuous professional development, and the opportunity to make a real impact.</p>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Submit your CV</CardTitle>
                <CardDescription>We accept PDF or Word documents (max 5MB).</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cv">Upload CV</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer group relative">
                      <Input 
                        id="cv" 
                        type="file" 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        accept=".pdf,.doc,.docx"
                        required 
                      />
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground group-hover:text-primary transition-colors" />
                      <p className="mt-2 text-sm text-muted-foreground">Click or drag and drop to upload</p>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Submit to Talent Pool"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
