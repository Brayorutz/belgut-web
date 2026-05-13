import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Trash2, Plus, Newspaper, FileText, Briefcase, Users,
  MessageSquare, LayoutDashboard, Lock, LogOut, Eye, EyeOff
} from "lucide-react";
import type { NewsItem, Tender, JobPosting, Application, Inquiry } from "@shared/schema";

function apiRequest(method: string, url: string, body?: unknown) {
  return fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });
}

function LoginForm() {
  const { login, loginError, isLoggingIn } = useAdminAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex items-center justify-center min-h-[calc(100vh-130px)] px-4">
        <Card className="w-full max-w-sm shadow-lg border-0">
          <CardHeader className="text-center pb-2">
            <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="admin-username">Username</Label>
                <Input
                  id="admin-username"
                  data-testid="input-admin-username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Enter username"
                  autoComplete="username"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="admin-password">Password</Label>
                <div className="relative">
                  <Input
                    id="admin-password"
                    data-testid="input-admin-password"
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPw(v => !v)}
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              {loginError && (
                <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">
                  {loginError}
                </p>
              )}
              <Button type="submit" className="w-full" disabled={isLoggingIn} data-testid="button-admin-login">
                {isLoggingIn ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function Admin() {
  const { isAdmin, isLoading, logout, isLoggingOut } = useAdminAuth();
  const { toast } = useToast();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage BTTI website content from here.</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
            onClick={() => logout()}
            disabled={isLoggingOut}
            data-testid="button-admin-logout"
          >
            <LogOut className="h-4 w-4" />
            {isLoggingOut ? "Signing out..." : "Sign Out"}
          </Button>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="mb-6 flex flex-wrap gap-1 h-auto bg-white border shadow-sm p-1 rounded-lg">
            <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <LayoutDashboard className="h-4 w-4" /> Overview
            </TabsTrigger>
            <TabsTrigger value="news" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Newspaper className="h-4 w-4" /> News & Events
            </TabsTrigger>
            <TabsTrigger value="tenders" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <FileText className="h-4 w-4" /> Tenders
            </TabsTrigger>
            <TabsTrigger value="jobs" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Briefcase className="h-4 w-4" /> Job Postings
            </TabsTrigger>
            <TabsTrigger value="applications" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <Users className="h-4 w-4" /> Applications
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              <MessageSquare className="h-4 w-4" /> Inquiries
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview"><OverviewTab /></TabsContent>
          <TabsContent value="news"><NewsTab toast={toast} /></TabsContent>
          <TabsContent value="tenders"><TendersTab toast={toast} /></TabsContent>
          <TabsContent value="jobs"><JobsTab toast={toast} /></TabsContent>
          <TabsContent value="applications"><ApplicationsTab /></TabsContent>
          <TabsContent value="inquiries"><InquiriesTab /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function OverviewTab() {
  const { data: news } = useQuery<NewsItem[]>({ queryKey: ["/api/news"] });
  const { data: tenders } = useQuery<Tender[]>({ queryKey: ["/api/tenders"] });
  const { data: jobs } = useQuery<JobPosting[]>({ queryKey: ["/api/job-postings"] });
  const { data: applications } = useQuery<Application[]>({ queryKey: ["/api/applications"] });
  const { data: inquiries } = useQuery<Inquiry[]>({ queryKey: ["/api/inquiries"] });

  const stats = [
    { label: "News Articles", value: news?.length ?? 0, icon: Newspaper, color: "bg-blue-500" },
    { label: "Active Tenders", value: tenders?.filter(t => t.status === "Open").length ?? 0, icon: FileText, color: "bg-green-500" },
    { label: "Job Postings", value: jobs?.length ?? 0, icon: Briefcase, color: "bg-purple-500" },
    { label: "Applications", value: applications?.length ?? 0, icon: Users, color: "bg-orange-500" },
    { label: "Inquiries", value: inquiries?.length ?? 0, icon: MessageSquare, color: "bg-pink-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map(stat => (
          <Card key={stat.label} className="bg-white border-0 shadow-sm">
            <CardContent className="p-5">
              <div className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="bg-white border-0 shadow-sm">
        <CardHeader><CardTitle className="text-base">About Admin Access</CardTitle></CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-1">
          <p>Use the tabs above to manage news articles, tenders, job postings, and view applications and inquiries.</p>
          <p>Changes take effect immediately on the public-facing website.</p>
        </CardContent>
      </Card>
    </div>
  );
}

function NewsTab({ toast }: { toast: ReturnType<typeof useToast>["toast"] }) {
  const [form, setForm] = useState({ title: "", content: "", category: "News", imageUrl: "" });
  const { data: newsList, isLoading } = useQuery<NewsItem[]>({ queryKey: ["/api/news"] });

  const createMutation = useMutation({
    mutationFn: (data: typeof form) => apiRequest("POST", "/api/news", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/news"] });
      setForm({ title: "", content: "", category: "News", imageUrl: "" });
      toast({ title: "News article published successfully." });
    },
    onError: () => toast({ title: "Failed to publish article.", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/news/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/news"] });
      toast({ title: "Article deleted." });
    },
  });

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <Card className="lg:col-span-2 bg-white border-0 shadow-sm h-fit">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Plus className="h-4 w-4" /> Add News Article</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={e => { e.preventDefault(); createMutation.mutate(form); }} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="news-title">Title</Label>
              <Input id="news-title" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Article title" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="news-category">Category</Label>
              <select id="news-category" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full border rounded-md px-3 py-2 text-sm bg-background">
                <option>News</option>
                <option>Event</option>
                <option>Announcement</option>
                <option>General</option>
              </select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="news-image">Image URL (optional)</Label>
              <Input id="news-image" value={form.imageUrl} onChange={e => setForm(p => ({ ...p, imageUrl: e.target.value }))} placeholder="https://..." />
            </div>
            <div className="space-y-1">
              <Label htmlFor="news-content">Content</Label>
              <Textarea id="news-content" value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} placeholder="Write the article content..." rows={5} required />
            </div>
            <Button type="submit" className="w-full" disabled={createMutation.isPending}>
              {createMutation.isPending ? "Publishing..." : "Publish Article"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="lg:col-span-3 space-y-3">
        <h3 className="font-semibold text-gray-700">Published Articles ({newsList?.length ?? 0})</h3>
        {isLoading && <div className="text-muted-foreground text-sm">Loading...</div>}
        {newsList?.map(item => (
          <Card key={item.id} className="bg-white border-0 shadow-sm">
            <CardContent className="p-4 flex items-start justify-between gap-3">
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-medium text-sm truncate">{item.title}</p>
                  <Badge variant="secondary" className="text-xs shrink-0">{item.category}</Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{item.content}</p>
                <p className="text-xs text-muted-foreground">{item.date ? new Date(item.date).toLocaleDateString() : ""}</p>
              </div>
              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0" onClick={() => deleteMutation.mutate(item.id)} disabled={deleteMutation.isPending}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
        {!isLoading && newsList?.length === 0 && <p className="text-muted-foreground text-sm py-4 text-center">No news articles yet.</p>}
      </div>
    </div>
  );
}

function TendersTab({ toast }: { toast: ReturnType<typeof useToast>["toast"] }) {
  const [form, setForm] = useState({ title: "", description: "", deadline: "", documentUrl: "", status: "Open" });
  const { data: tendersList, isLoading } = useQuery<Tender[]>({ queryKey: ["/api/tenders"] });

  const createMutation = useMutation({
    mutationFn: (data: typeof form) => apiRequest("POST", "/api/tenders", { ...data, deadline: new Date(data.deadline) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tenders"] });
      setForm({ title: "", description: "", deadline: "", documentUrl: "", status: "Open" });
      toast({ title: "Tender posted successfully." });
    },
    onError: () => toast({ title: "Failed to post tender.", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/tenders/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tenders"] });
      toast({ title: "Tender removed." });
    },
  });

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <Card className="lg:col-span-2 bg-white border-0 shadow-sm h-fit">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Plus className="h-4 w-4" /> Post New Tender</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={e => { e.preventDefault(); createMutation.mutate(form); }} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="tender-title">Tender Title</Label>
              <Input id="tender-title" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Invitation to Tender for..." required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="tender-desc">Description / Reference No.</Label>
              <Textarea id="tender-desc" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Tender reference and description" rows={3} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="tender-deadline">Deadline</Label>
              <Input id="tender-deadline" type="date" value={form.deadline} onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="tender-doc">Document URL (optional)</Label>
              <Input id="tender-doc" value={form.documentUrl} onChange={e => setForm(p => ({ ...p, documentUrl: e.target.value }))} placeholder="https://..." />
            </div>
            <div className="space-y-1">
              <Label htmlFor="tender-status">Status</Label>
              <select id="tender-status" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full border rounded-md px-3 py-2 text-sm bg-background">
                <option>Open</option>
                <option>Closed</option>
              </select>
            </div>
            <Button type="submit" className="w-full" disabled={createMutation.isPending}>
              {createMutation.isPending ? "Posting..." : "Post Tender"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="lg:col-span-3 space-y-3">
        <h3 className="font-semibold text-gray-700">All Tenders ({tendersList?.length ?? 0})</h3>
        {isLoading && <div className="text-muted-foreground text-sm">Loading...</div>}
        {tendersList?.map(tender => (
          <Card key={tender.id} className="bg-white border-0 shadow-sm">
            <CardContent className="p-4 flex items-start justify-between gap-3">
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-medium text-sm">{tender.title}</p>
                  <Badge variant={tender.status === "Open" ? "default" : "secondary"} className="text-xs shrink-0">{tender.status}</Badge>
                </div>
                {tender.description && <p className="text-xs text-muted-foreground">{tender.description}</p>}
                <p className="text-xs text-muted-foreground">Deadline: {new Date(tender.deadline).toLocaleDateString()}</p>
              </div>
              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0" onClick={() => deleteMutation.mutate(tender.id)} disabled={deleteMutation.isPending}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
        {!isLoading && tendersList?.length === 0 && <p className="text-muted-foreground text-sm py-4 text-center">No tenders posted yet.</p>}
      </div>
    </div>
  );
}

function JobsTab({ toast }: { toast: ReturnType<typeof useToast>["toast"] }) {
  const [form, setForm] = useState({ title: "", department: "", type: "Full-time", description: "", requirements: "", deadline: "", isActive: true });
  const { data: jobs, isLoading } = useQuery<JobPosting[]>({ queryKey: ["/api/job-postings"] });

  const createMutation = useMutation({
    mutationFn: (data: typeof form) => apiRequest("POST", "/api/job-postings", { ...data, deadline: new Date(data.deadline) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/job-postings"] });
      setForm({ title: "", department: "", type: "Full-time", description: "", requirements: "", deadline: "", isActive: true });
      toast({ title: "Job posting published." });
    },
    onError: () => toast({ title: "Failed to publish job posting.", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/job-postings/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/job-postings"] });
      toast({ title: "Job posting removed." });
    },
  });

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <Card className="lg:col-span-2 bg-white border-0 shadow-sm h-fit">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Plus className="h-4 w-4" /> Post Job Vacancy</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={e => { e.preventDefault(); createMutation.mutate(form); }} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="job-title">Job Title</Label>
              <Input id="job-title" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Lecturer – Computing" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="job-dept">Department</Label>
              <Input id="job-dept" value={form.department} onChange={e => setForm(p => ({ ...p, department: e.target.value }))} placeholder="e.g. Computing & Informatics" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="job-type">Employment Type</Label>
              <select id="job-type" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} className="w-full border rounded-md px-3 py-2 text-sm bg-background">
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
              </select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="job-deadline">Application Deadline</Label>
              <Input id="job-deadline" type="date" value={form.deadline} onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="job-desc">Job Description</Label>
              <Textarea id="job-desc" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Role responsibilities and overview..." rows={3} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="job-req">Requirements</Label>
              <Textarea id="job-req" value={form.requirements} onChange={e => setForm(p => ({ ...p, requirements: e.target.value }))} placeholder="Qualifications and experience required..." rows={3} required />
            </div>
            <Button type="submit" className="w-full" disabled={createMutation.isPending}>
              {createMutation.isPending ? "Publishing..." : "Publish Job Posting"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="lg:col-span-3 space-y-3">
        <h3 className="font-semibold text-gray-700">Job Postings ({jobs?.length ?? 0})</h3>
        {isLoading && <div className="text-muted-foreground text-sm">Loading...</div>}
        {jobs?.map(job => (
          <Card key={job.id} className="bg-white border-0 shadow-sm">
            <CardContent className="p-4 flex items-start justify-between gap-3">
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-medium text-sm">{job.title}</p>
                  <Badge variant="outline" className="text-xs shrink-0">{job.type}</Badge>
                  {job.isActive && <Badge className="text-xs shrink-0 bg-green-500">Active</Badge>}
                </div>
                <p className="text-xs text-muted-foreground">{job.department}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">{job.description}</p>
                <p className="text-xs text-muted-foreground">Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
              </div>
              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0" onClick={() => deleteMutation.mutate(job.id)} disabled={deleteMutation.isPending}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
        {!isLoading && jobs?.length === 0 && <p className="text-muted-foreground text-sm py-4 text-center">No job postings yet. Post a vacancy above.</p>}
      </div>
    </div>
  );
}

function ApplicationsTab() {
  const { data: applications, isLoading } = useQuery<Application[]>({ queryKey: ["/api/applications"] });

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-700">Student Applications ({applications?.length ?? 0})</h3>
      {isLoading && <div className="text-muted-foreground text-sm">Loading...</div>}
      {applications?.length === 0 && !isLoading && (
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="py-12 text-center text-muted-foreground">No applications received yet.</CardContent>
        </Card>
      )}
      <div className="space-y-3">
        {applications?.map(app => (
          <Card key={app.id} className="bg-white border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-sm">{app.applicantName}</p>
                    <Badge variant={app.status === "Pending" ? "secondary" : app.status === "Approved" ? "default" : "destructive"} className="text-xs">
                      {app.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{app.email} · {app.phone}</p>
                  <p className="text-xs text-muted-foreground">KCSE Grade: {app.kcseGrade}</p>
                  {app.createdAt && <p className="text-xs text-muted-foreground">Submitted: {new Date(app.createdAt).toLocaleDateString()}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function InquiriesTab() {
  const { data: inquiries, isLoading } = useQuery<Inquiry[]>({ queryKey: ["/api/inquiries"] });

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-700">Contact Inquiries ({inquiries?.length ?? 0})</h3>
      {isLoading && <div className="text-muted-foreground text-sm">Loading...</div>}
      {inquiries?.length === 0 && !isLoading && (
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="py-12 text-center text-muted-foreground">No inquiries received yet.</CardContent>
        </Card>
      )}
      <div className="space-y-3">
        {inquiries?.map(inq => (
          <Card key={inq.id} className="bg-white border-0 shadow-sm">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm">{inq.name}</p>
                {inq.createdAt && <p className="text-xs text-muted-foreground">{new Date(inq.createdAt).toLocaleDateString()}</p>}
              </div>
              <p className="text-xs text-muted-foreground">{inq.email}</p>
              {inq.subject && <p className="text-xs font-medium text-primary">{inq.subject}</p>}
              <p className="text-sm text-gray-700 bg-gray-50 rounded-md p-3">{inq.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
