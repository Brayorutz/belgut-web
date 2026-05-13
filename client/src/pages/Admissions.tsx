import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { useCourses, useCreateApplication, useCampuses } from "@/hooks/use-content";
import { insertApplicationSchema, type InsertApplication } from "@shared/schema";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, CheckCircle, Download } from "lucide-react";

export default function Admissions() {
  const [location] = useLocation();
  const { data: courses } = useCourses();
  const { data: campuses } = useCampuses();
  const { mutate, isPending } = useCreateApplication();
  const { toast } = useToast();

  // Parse query param for pre-selecting course
  const params = new URLSearchParams(window.location.search);
  const preSelectedCourseId = params.get("course");

  const form = useForm<InsertApplication>({
    resolver: zodResolver(insertApplicationSchema),
    defaultValues: {
      applicantName: "",
      email: "",
      phone: "",
      kcseGrade: "",
      courseId: preSelectedCourseId ? parseInt(preSelectedCourseId) : undefined,
      campusId: undefined,
    },
  });

  // Update form if preSelectedCourseId changes
  useEffect(() => {
    if (preSelectedCourseId) {
      form.setValue("courseId", parseInt(preSelectedCourseId));
    }
  }, [preSelectedCourseId, form]);

  const onSubmit = (data: InsertApplication) => {
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "Application Submitted!",
          description: "We have received your application. We will contact you soon.",
        });
        form.reset();
      },
      onError: (err) => {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Navigation />
      
      <div className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="font-display font-bold text-4xl mb-4">Admissions</h1>
          <p className="opacity-90 max-w-2xl mx-auto">Start your journey with us. Apply online or download the application form.</p>
        </div>
      </div>

      <div className="container-custom py-12 grid lg:grid-cols-3 gap-12">
        {/* Requirements & Downloads */}
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Entry Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-gray-600">
              <div>
                <strong className="block text-gray-900">Level 6 (Diploma)</strong>
                KCSE Mean Grade C- (Minus) or Pass in Level 5. Duration: 6–8 terms.
              </div>
              <div>
                <strong className="block text-gray-900">Level 5 (Certificate)</strong>
                KCSE Mean Grade D (Plain) or Pass in Level 4. Duration: 5 terms.
              </div>
              <div>
                <strong className="block text-gray-900">Level 4 (Artisan)</strong>
                KCSE Mean Grade D- (Minus). Duration: 3 terms.
              </div>
              <div>
                <strong className="block text-gray-900">Level 3 (Artisan)</strong>
                Prior Learning in relevant field. Duration: 1 term.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Downloads</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Application Form",
                "Fee Structure",
                "Course Prospectus",
                "Student Rules & Regulations"
              ].map((item) => (
                <a key={item} href="#" className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Download className="w-4 h-4 text-primary" />
                  </div>
                  {item}
                </a>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Application Form */}
        <div className="lg:col-span-2">
          <Card className="border-t-4 border-t-primary shadow-lg">
            <CardHeader>
              <CardTitle>Online Application</CardTitle>
              <CardDescription>Fill out the form below to apply for a course.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="applicantName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} className="h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="0700123456" {...field} className="h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="kcseGrade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>KCSE Mean Grade</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select Grade" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "E"].map((grade) => (
                                <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="courseId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select Course</FormLabel>
                          <Select 
                            onValueChange={(val) => field.onChange(parseInt(val))} 
                            defaultValue={field.value?.toString()}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Search course..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {courses?.map((course) => (
                                <SelectItem key={course.id} value={course.id.toString()}>
                                  {course.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="campusId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Campus</FormLabel>
                        <Select onValueChange={(val) => field.onChange(parseInt(val))} value={field.value?.toString()}>
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select Campus" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {campuses?.map((campus: any) => (
                              <SelectItem key={campus.id} value={campus.id.toString()}>
                                {campus.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
