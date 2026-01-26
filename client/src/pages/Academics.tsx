import { useState } from "react";
import { Link } from "wouter";
import { Search, Filter, BookOpen, Clock, BarChart } from "lucide-react";
import { useDepartments, useCourses } from "@/hooks/use-content";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Academics() {
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [search, setSearch] = useState("");
  
  const { data: departments } = useDepartments();
  const { data: courses, isLoading } = useCourses(
    selectedDept !== "all" ? parseInt(selectedDept) : undefined,
    search
  );

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Navigation />

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-16 text-center">
          <h1 className="font-display font-bold text-4xl text-gray-900 mb-4">Academic Programs</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Explore our wide range of technical and vocational courses designed to equip you with marketable skills.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="container-custom py-8 sticky top-0 z-40 bg-gray-50/95 backdrop-blur border-b border-gray-200/50">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Search for a course..." 
              className="pl-10 bg-white shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-64">
            <Select value={selectedDept} onValueChange={setSelectedDept}>
              <SelectTrigger className="bg-white shadow-sm">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments?.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id.toString()}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Course List */}
      <div className="container-custom py-8 flex-grow">
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : courses?.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900">No courses found</h3>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses?.map((course) => (
              <div key={course.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-300 group flex flex-col h-full">
                <div className="mb-4">
                  <Badge variant="secondary" className="bg-primary/5 text-primary mb-3 hover:bg-primary/10 transition-colors">
                    {course.level}
                  </Badge>
                  <h3 className="font-display font-bold text-xl text-gray-900 group-hover:text-primary transition-colors leading-tight">
                    {course.title}
                  </h3>
                </div>
                
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <Clock className="w-4 h-4 mt-0.5 shrink-0 text-gray-400" />
                    <span>Duration: {course.duration}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <BarChart className="w-4 h-4 mt-0.5 shrink-0 text-gray-400" />
                    <span>Req: {course.requirements}</span>
                  </div>
                </div>

                <Link href={`/admissions?course=${course.id}`}>
                  <Button className="w-full bg-gray-900 hover:bg-primary text-white transition-colors">
                    Apply Now
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
