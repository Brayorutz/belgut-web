import { useState, useRef } from "react";
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
  MessageSquare, LayoutDashboard, Lock, LogOut, Eye, EyeOff,
  Pencil, Check, X, Paperclip, ChevronDown, ChevronUp, UserSquare2,
  Upload, Link2, FileUp, Loader2
} from "lucide-react";
import type { NewsItem, Tender, TenderAddendum, JobPosting, Application, Inquiry, BoardMember } from "@shared/schema";

function req(method: string, url: string, body?: unknown) {
  return fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });
}

// ─── File Upload Input ────────────────────────────────────────
function FileUploadInput({
  value,
  onChange,
  placeholder = "https://... or upload a file",
  label,
}: {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  label?: string;
}) {
  const [mode, setMode] = useState<"url" | "file">("url");
  const [uploading, setUploading] = useState(false);
  const [uploadedName, setUploadedName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd, credentials: "include" });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Upload failed");
      }
      const data = await res.json();
      onChange(data.url);
      setUploadedName(file.name);
      toast({ title: "File uploaded successfully." });
    } catch (err: any) {
      toast({ title: err.message || "Upload failed.", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="flex gap-1.5 mb-1.5">
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border transition-colors ${mode === "url" ? "bg-primary text-white border-primary" : "bg-background text-muted-foreground border-border hover:bg-muted"}`}
        >
          <Link2 className="h-3 w-3" /> Paste URL
        </button>
        <button
          type="button"
          onClick={() => setMode("file")}
          className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border transition-colors ${mode === "file" ? "bg-primary text-white border-primary" : "bg-background text-muted-foreground border-border hover:bg-muted"}`}
        >
          <Upload className="h-3 w-3" /> Upload PDF
        </button>
      </div>

      {mode === "url" ? (
        <Input
          value={value}
          onChange={e => { onChange(e.target.value); setUploadedName(null); }}
          placeholder={placeholder}
        />
      ) : (
        <div
          className="border-2 border-dashed border-border rounded-lg px-4 py-5 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
          onClick={() => fileRef.current?.click()}
        >
          <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.xlsx,.xls,.zip" className="hidden" onChange={handleFile} />
          {uploading ? (
            <div className="flex items-center justify-center gap-2 text-primary">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm">Uploading...</span>
            </div>
          ) : uploadedName || value ? (
            <div className="space-y-1">
              <FileUp className="h-6 w-6 mx-auto text-primary" />
              <p className="text-sm font-medium text-primary">{uploadedName || "File uploaded"}</p>
              <p className="text-xs text-muted-foreground">Click to replace</p>
            </div>
          ) : (
            <div className="space-y-1">
              <FileUp className="h-6 w-6 mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Click to select a PDF or document</p>
              <p className="text-xs text-muted-foreground">PDF, DOC, DOCX, XLS, XLSX, ZIP — max 20 MB</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Login Form ───────────────────────────────────────────────
function LoginForm() {
  const { login, loginError, isLoggingIn } = useAdminAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

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
            <form onSubmit={e => { e.preventDefault(); login({ username, password }); }} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="admin-username">Username</Label>
                <Input id="admin-username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" autoComplete="username" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="admin-password">Password</Label>
                <div className="relative">
                  <Input id="admin-password" type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" autoComplete="current-password" required />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPw(v => !v)}>
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              {loginError && <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">{loginError}</p>}
              <Button type="submit" className="w-full" disabled={isLoggingIn}>{isLoggingIn ? "Signing in..." : "Sign In"}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─── Main Admin Dashboard ─────────────────────────────────────
export default function Admin() {
  const { isAdmin, isLoading, logout, isLoggingOut } = useAdminAuth();
  const { toast } = useToast();

  if (isLoading) return (
    <div className="min-h-screen bg-gray-50"><Navigation />
      <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>
    </div>
  );

  if (!isAdmin) return <LoginForm />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage BTTI website content.</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => logout()} disabled={isLoggingOut}>
            <LogOut className="h-4 w-4" />{isLoggingOut ? "Signing out..." : "Sign Out"}
          </Button>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="mb-6 flex flex-wrap gap-1 h-auto bg-white border shadow-sm p-1 rounded-lg">
            {[
              { value: "overview", icon: LayoutDashboard, label: "Overview" },
              { value: "board", icon: UserSquare2, label: "Board Members" },
              { value: "news", icon: Newspaper, label: "News & Events" },
              { value: "tenders", icon: FileText, label: "Tenders" },
              { value: "jobs", icon: Briefcase, label: "Job Postings" },
              { value: "applications", icon: Users, label: "Applications" },
              { value: "inquiries", icon: MessageSquare, label: "Inquiries" },
            ].map(t => (
              <TabsTrigger key={t.value} value={t.value} className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <t.icon className="h-4 w-4" /> {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview"><OverviewTab /></TabsContent>
          <TabsContent value="board"><BoardTab toast={toast} /></TabsContent>
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

// ─── Overview ────────────────────────────────────────────────
function OverviewTab() {
  const { data: news } = useQuery<NewsItem[]>({ queryKey: ["/api/news"] });
  const { data: tenders } = useQuery<Tender[]>({ queryKey: ["/api/tenders"] });
  const { data: jobs } = useQuery<JobPosting[]>({ queryKey: ["/api/job-postings"] });
  const { data: applications } = useQuery<Application[]>({ queryKey: ["/api/applications"] });
  const { data: inquiries } = useQuery<Inquiry[]>({ queryKey: ["/api/inquiries"] });
  const { data: board } = useQuery<BoardMember[]>({ queryKey: ["/api/board-members"] });

  const stats = [
    { label: "Board Members", value: board?.length ?? 0, icon: UserSquare2, color: "bg-teal-500" },
    { label: "News Articles", value: news?.length ?? 0, icon: Newspaper, color: "bg-blue-500" },
    { label: "Active Tenders", value: tenders?.filter(t => t.status === "Open").length ?? 0, icon: FileText, color: "bg-green-500" },
    { label: "Job Postings", value: jobs?.length ?? 0, icon: Briefcase, color: "bg-purple-500" },
    { label: "Applications", value: applications?.length ?? 0, icon: Users, color: "bg-orange-500" },
    { label: "Inquiries", value: inquiries?.length ?? 0, icon: MessageSquare, color: "bg-pink-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map(s => (
          <Card key={s.label} className="bg-white border-0 shadow-sm">
            <CardContent className="p-5">
              <div className={`${s.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
                <s.icon className="h-5 w-5 text-white" />
              </div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Board Members ────────────────────────────────────────────
function BoardTab({ toast }: { toast: ReturnType<typeof useToast>["toast"] }) {
  const emptyForm = { name: "", title: "", bio: "", imageUrl: "" };
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);

  const { data: members, isLoading } = useQuery<BoardMember[]>({ queryKey: ["/api/board-members"] });

  const createMutation = useMutation({
    mutationFn: (data: typeof form) => req("POST", "/api/board-members", data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/board-members"] }); setForm(emptyForm); toast({ title: "Board member added." }); },
    onError: () => toast({ title: "Failed to add member.", variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: typeof editForm }) => req("PUT", `/api/board-members/${id}`, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/board-members"] }); setEditingId(null); toast({ title: "Member updated." }); },
    onError: () => toast({ title: "Failed to update.", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => req("DELETE", `/api/board-members/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/board-members"] }); toast({ title: "Member removed." }); },
  });

  const startEdit = (m: BoardMember) => {
    setEditingId(m.id);
    setEditForm({ name: m.name, title: m.title, bio: m.bio ?? "", imageUrl: m.imageUrl ?? "" });
  };

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      {/* Add form */}
      <Card className="lg:col-span-2 bg-white border-0 shadow-sm h-fit">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Plus className="h-4 w-4" /> Add Board Member</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={e => { e.preventDefault(); createMutation.mutate(form); }} className="space-y-3">
            <div className="space-y-1"><Label>Full Name</Label>
              <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Mr. John Doe" required />
            </div>
            <div className="space-y-1"><Label>Title / Position</Label>
              <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Chairperson" required />
            </div>
            <div className="space-y-1"><Label>Photo URL</Label>
              <Input value={form.imageUrl} onChange={e => setForm(p => ({ ...p, imageUrl: e.target.value }))} placeholder="https://example.com/photo.jpg" />
            </div>
            <div className="space-y-1"><Label>Bio (optional)</Label>
              <Textarea value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} placeholder="Brief biography..." rows={3} />
            </div>
            <Button type="submit" className="w-full" disabled={createMutation.isPending}>
              {createMutation.isPending ? "Adding..." : "Add Member"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* List */}
      <div className="lg:col-span-3 space-y-3">
        <h3 className="font-semibold text-gray-700">Board Members ({members?.length ?? 0})</h3>
        {isLoading && <div className="text-muted-foreground text-sm">Loading...</div>}
        {members?.map(m => (
          <Card key={m.id} className="bg-white border-0 shadow-sm">
            <CardContent className="p-4">
              {editingId === m.id ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1"><Label className="text-xs">Name</Label>
                      <Input value={editForm.name} onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))} className="h-8 text-sm" />
                    </div>
                    <div className="space-y-1"><Label className="text-xs">Title</Label>
                      <Input value={editForm.title} onChange={e => setEditForm(p => ({ ...p, title: e.target.value }))} className="h-8 text-sm" />
                    </div>
                  </div>
                  <div className="space-y-1"><Label className="text-xs">Photo URL</Label>
                    <Input value={editForm.imageUrl} onChange={e => setEditForm(p => ({ ...p, imageUrl: e.target.value }))} className="h-8 text-sm" placeholder="https://..." />
                  </div>
                  <div className="space-y-1"><Label className="text-xs">Bio</Label>
                    <Textarea value={editForm.bio} onChange={e => setEditForm(p => ({ ...p, bio: e.target.value }))} rows={2} className="text-sm" />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="gap-1" onClick={() => updateMutation.mutate({ id: m.id, data: editForm })} disabled={updateMutation.isPending}>
                      <Check className="h-3.5 w-3.5" /> Save
                    </Button>
                    <Button size="sm" variant="ghost" className="gap-1" onClick={() => setEditingId(null)}>
                      <X className="h-3.5 w-3.5" /> Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  {m.imageUrl && (
                    <img src={m.imageUrl} alt={m.name} className="w-12 h-12 rounded-full object-cover shrink-0 border" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  )}
                  {!m.imageUrl && (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <UserSquare2 className="h-5 w-5 text-primary" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{m.name}</p>
                    <p className="text-xs text-primary font-medium">{m.title}</p>
                    {m.bio && <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{m.bio}</p>}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEdit(m)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => deleteMutation.mutate(m.id)} disabled={deleteMutation.isPending}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        {!isLoading && members?.length === 0 && <p className="text-muted-foreground text-sm py-4 text-center">No board members yet.</p>}
      </div>
    </div>
  );
}

// ─── News ─────────────────────────────────────────────────────
function NewsTab({ toast }: { toast: ReturnType<typeof useToast>["toast"] }) {
  const [form, setForm] = useState({ title: "", content: "", category: "News", imageUrl: "" });
  const { data: newsList, isLoading } = useQuery<NewsItem[]>({ queryKey: ["/api/news"] });

  const createMutation = useMutation({
    mutationFn: (data: typeof form) => req("POST", "/api/news", data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/news"] }); setForm({ title: "", content: "", category: "News", imageUrl: "" }); toast({ title: "Article published." }); },
    onError: () => toast({ title: "Failed to publish.", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => req("DELETE", `/api/news/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/news"] }); toast({ title: "Article deleted." }); },
  });

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <Card className="lg:col-span-2 bg-white border-0 shadow-sm h-fit">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Plus className="h-4 w-4" /> Add News Article</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={e => { e.preventDefault(); createMutation.mutate(form); }} className="space-y-4">
            <div className="space-y-1"><Label>Title</Label>
              <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Article title" required />
            </div>
            <div className="space-y-1"><Label>Category</Label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full border rounded-md px-3 py-2 text-sm bg-background">
                <option>News</option><option>Event</option><option>Announcement</option><option>General</option>
              </select>
            </div>
            <div className="space-y-1"><Label>Image URL (optional)</Label>
              <Input value={form.imageUrl} onChange={e => setForm(p => ({ ...p, imageUrl: e.target.value }))} placeholder="https://..." />
            </div>
            <div className="space-y-1"><Label>Content</Label>
              <Textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} placeholder="Write the article content..." rows={5} required />
            </div>
            <Button type="submit" className="w-full" disabled={createMutation.isPending}>{createMutation.isPending ? "Publishing..." : "Publish Article"}</Button>
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
              <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 shrink-0" onClick={() => deleteMutation.mutate(item.id)} disabled={deleteMutation.isPending}>
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

// ─── Tenders ──────────────────────────────────────────────────
function TendersTab({ toast }: { toast: ReturnType<typeof useToast>["toast"] }) {
  const emptyForm = { title: "", description: "", deadline: "", documentUrl: "", status: "Open" };
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [openAddendum, setOpenAddendum] = useState<number | null>(null);

  const { data: tendersList, isLoading } = useQuery<Tender[]>({ queryKey: ["/api/tenders"] });

  const createMutation = useMutation({
    mutationFn: (data: typeof form) => req("POST", "/api/tenders", { ...data, deadline: new Date(data.deadline) }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/tenders"] }); setForm(emptyForm); toast({ title: "Tender posted." }); },
    onError: () => toast({ title: "Failed to post tender.", variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: typeof editForm }) => req("PUT", `/api/tenders/${id}`, { ...data, deadline: new Date(data.deadline) }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/tenders"] }); setEditingId(null); toast({ title: "Tender updated." }); },
    onError: () => toast({ title: "Failed to update tender.", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => req("DELETE", `/api/tenders/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/tenders"] }); toast({ title: "Tender removed." }); },
  });

  const startEdit = (t: Tender) => {
    setEditingId(t.id);
    const d = new Date(t.deadline);
    const deadlineStr = d.toISOString().substring(0, 10);
    setEditForm({ title: t.title, description: t.description ?? "", deadline: deadlineStr, documentUrl: t.documentUrl ?? "", status: t.status ?? "Open" });
  };

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      {/* Add form */}
      <Card className="lg:col-span-2 bg-white border-0 shadow-sm h-fit">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Plus className="h-4 w-4" /> Post New Tender</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={e => { e.preventDefault(); createMutation.mutate(form); }} className="space-y-3">
            <div className="space-y-1"><Label>Tender Title</Label>
              <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Invitation to Tender for..." required />
            </div>
            <div className="space-y-1"><Label>Description / Reference No.</Label>
              <Textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={2} placeholder="TENDER NO: ..." />
            </div>
            <div className="space-y-1"><Label>Deadline</Label>
              <Input type="date" value={form.deadline} onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} required />
            </div>
            <FileUploadInput
              label="Tender Document"
              value={form.documentUrl}
              onChange={url => setForm(p => ({ ...p, documentUrl: url }))}
              placeholder="https://..."
            />
            <div className="space-y-1"><Label>Status</Label>
              <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full border rounded-md px-3 py-2 text-sm bg-background">
                <option>Open</option><option>Closed</option>
              </select>
            </div>
            <Button type="submit" className="w-full" disabled={createMutation.isPending}>{createMutation.isPending ? "Posting..." : "Post Tender"}</Button>
          </form>
        </CardContent>
      </Card>

      {/* List */}
      <div className="lg:col-span-3 space-y-3">
        <h3 className="font-semibold text-gray-700">All Tenders ({tendersList?.length ?? 0})</h3>
        {isLoading && <div className="text-muted-foreground text-sm">Loading...</div>}
        {tendersList?.map(tender => (
          <Card key={tender.id} className="bg-white border-0 shadow-sm">
            <CardContent className="p-4 space-y-3">
              {editingId === tender.id ? (
                /* Edit mode */
                <div className="space-y-3">
                  <div className="space-y-1"><Label className="text-xs">Title</Label>
                    <Input value={editForm.title} onChange={e => setEditForm(p => ({ ...p, title: e.target.value }))} className="text-sm h-8" />
                  </div>
                  <div className="space-y-1"><Label className="text-xs">Description / Reference</Label>
                    <Textarea value={editForm.description} onChange={e => setEditForm(p => ({ ...p, description: e.target.value }))} rows={2} className="text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1"><Label className="text-xs">Deadline</Label>
                      <Input type="date" value={editForm.deadline} onChange={e => setEditForm(p => ({ ...p, deadline: e.target.value }))} className="text-sm h-8" />
                    </div>
                    <div className="space-y-1"><Label className="text-xs">Status</Label>
                      <select value={editForm.status} onChange={e => setEditForm(p => ({ ...p, status: e.target.value }))} className="w-full border rounded-md px-2 py-1.5 text-sm bg-background h-8">
                        <option>Open</option><option>Closed</option>
                      </select>
                    </div>
                  </div>
                  <FileUploadInput
                    label="Tender Document"
                    value={editForm.documentUrl}
                    onChange={url => setEditForm(p => ({ ...p, documentUrl: url }))}
                    placeholder="https://..."
                  />
                  <div className="flex gap-2">
                    <Button size="sm" className="gap-1" onClick={() => updateMutation.mutate({ id: tender.id, data: editForm })} disabled={updateMutation.isPending}>
                      <Check className="h-3.5 w-3.5" /> Save Changes
                    </Button>
                    <Button size="sm" variant="ghost" className="gap-1" onClick={() => setEditingId(null)}>
                      <X className="h-3.5 w-3.5" /> Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                /* View mode */
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-sm">{tender.title}</p>
                      <Badge variant={tender.status === "Open" ? "default" : "secondary"} className="text-xs shrink-0">{tender.status}</Badge>
                    </div>
                    {tender.description && <p className="text-xs text-muted-foreground">{tender.description}</p>}
                    <p className="text-xs text-muted-foreground">Deadline: {new Date(tender.deadline).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEdit(tender)}><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => deleteMutation.mutate(tender.id)} disabled={deleteMutation.isPending}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Addendums section */}
              <div className="border-t pt-2">
                <button
                  className="flex items-center gap-1.5 text-xs text-primary font-medium hover:underline"
                  onClick={() => setOpenAddendum(openAddendum === tender.id ? null : tender.id)}
                >
                  <Paperclip className="h-3.5 w-3.5" />
                  Addendums
                  {openAddendum === tender.id ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </button>
                {openAddendum === tender.id && <AddendumManager tenderId={tender.id} toast={toast} />}
              </div>
            </CardContent>
          </Card>
        ))}
        {!isLoading && tendersList?.length === 0 && <p className="text-muted-foreground text-sm py-4 text-center">No tenders posted yet.</p>}
      </div>
    </div>
  );
}

// ─── Addendum Manager (inline per tender) ─────────────────────
function AddendumManager({ tenderId, toast }: { tenderId: number; toast: ReturnType<typeof useToast>["toast"] }) {
  const [addForm, setAddForm] = useState({ title: "", documentUrl: "" });

  const { data: addendums, isLoading } = useQuery<TenderAddendum[]>({
    queryKey: ["/api/tender-addendums", tenderId],
    queryFn: async () => {
      const res = await fetch(`/api/tender-addendums?tenderId=${tenderId}`, { credentials: "include" });
      return res.json();
    },
    staleTime: Infinity,
  });

  const createMutation = useMutation({
    mutationFn: (data: typeof addForm) => req("POST", "/api/tender-addendums", { ...data, tenderId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tender-addendums", tenderId] });
      setAddForm({ title: "", documentUrl: "" });
      toast({ title: "Addendum added." });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => req("DELETE", `/api/tender-addendums/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/tender-addendums", tenderId] }); toast({ title: "Addendum removed." }); },
  });

  return (
    <div className="mt-2 space-y-2">
      {isLoading && <p className="text-xs text-muted-foreground">Loading...</p>}
      {addendums?.map(ad => (
        <div key={ad.id} className="flex items-center justify-between gap-2 bg-amber-50 border border-amber-100 rounded px-2.5 py-1.5">
          <div>
            <p className="text-xs font-medium text-amber-900">{ad.title}</p>
            <a href={ad.documentUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-amber-700 hover:underline truncate max-w-xs block">{ad.documentUrl}</a>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:bg-destructive/10 shrink-0" onClick={() => deleteMutation.mutate(ad.id)}>
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      ))}
      {addendums?.length === 0 && !isLoading && <p className="text-xs text-muted-foreground italic">No addendums yet.</p>}

      {/* Add addendum form */}
      <div className="space-y-2 mt-2 bg-muted/40 rounded-lg p-3">
        <p className="text-xs font-medium text-muted-foreground">Add Addendum</p>
        <Input
          value={addForm.title}
          onChange={e => setAddForm(p => ({ ...p, title: e.target.value }))}
          placeholder="Addendum title (e.g. Addendum No. 1)"
          className="h-8 text-xs"
        />
        <FileUploadInput
          value={addForm.documentUrl}
          onChange={url => setAddForm(p => ({ ...p, documentUrl: url }))}
          placeholder="https://..."
        />
        <Button
          size="sm"
          className="w-full gap-1.5 text-xs"
          onClick={() => { if (addForm.title && addForm.documentUrl) createMutation.mutate(addForm); }}
          disabled={createMutation.isPending || !addForm.title || !addForm.documentUrl}
        >
          <Plus className="h-3 w-3" /> Add Addendum
        </Button>
      </div>
    </div>
  );
}

// ─── Job Postings ─────────────────────────────────────────────
function JobsTab({ toast }: { toast: ReturnType<typeof useToast>["toast"] }) {
  const [form, setForm] = useState({ title: "", department: "", type: "Full-time", description: "", requirements: "", deadline: "", isActive: true });
  const { data: jobs, isLoading } = useQuery<JobPosting[]>({ queryKey: ["/api/job-postings"] });

  const createMutation = useMutation({
    mutationFn: (data: typeof form) => req("POST", "/api/job-postings", { ...data, deadline: new Date(data.deadline) }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/job-postings"] }); setForm({ title: "", department: "", type: "Full-time", description: "", requirements: "", deadline: "", isActive: true }); toast({ title: "Job posting published." }); },
    onError: () => toast({ title: "Failed to publish.", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => req("DELETE", `/api/job-postings/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/job-postings"] }); toast({ title: "Job removed." }); },
  });

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <Card className="lg:col-span-2 bg-white border-0 shadow-sm h-fit">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Plus className="h-4 w-4" /> Post Job Vacancy</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={e => { e.preventDefault(); createMutation.mutate(form); }} className="space-y-3">
            <div className="space-y-1"><Label>Job Title</Label><Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Lecturer – Computing" required /></div>
            <div className="space-y-1"><Label>Department</Label><Input value={form.department} onChange={e => setForm(p => ({ ...p, department: e.target.value }))} placeholder="e.g. Computing & Informatics" required /></div>
            <div className="space-y-1"><Label>Employment Type</Label>
              <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} className="w-full border rounded-md px-3 py-2 text-sm bg-background">
                <option>Full-time</option><option>Part-time</option><option>Contract</option>
              </select>
            </div>
            <div className="space-y-1"><Label>Application Deadline</Label><Input type="date" value={form.deadline} onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} required /></div>
            <div className="space-y-1"><Label>Job Description</Label><Textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} required /></div>
            <div className="space-y-1"><Label>Requirements</Label><Textarea value={form.requirements} onChange={e => setForm(p => ({ ...p, requirements: e.target.value }))} rows={3} required /></div>
            <Button type="submit" className="w-full" disabled={createMutation.isPending}>{createMutation.isPending ? "Publishing..." : "Publish Job Posting"}</Button>
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
              <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 shrink-0" onClick={() => deleteMutation.mutate(job.id)} disabled={deleteMutation.isPending}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
        {!isLoading && jobs?.length === 0 && <p className="text-muted-foreground text-sm py-4 text-center">No job postings yet.</p>}
      </div>
    </div>
  );
}

// ─── Applications ─────────────────────────────────────────────
function ApplicationsTab() {
  const { data: applications, isLoading } = useQuery<Application[]>({ queryKey: ["/api/applications"] });
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-700">Student Applications ({applications?.length ?? 0})</h3>
      {isLoading && <div className="text-muted-foreground text-sm">Loading...</div>}
      {applications?.length === 0 && !isLoading && <Card className="bg-white border-0 shadow-sm"><CardContent className="py-12 text-center text-muted-foreground">No applications received yet.</CardContent></Card>}
      <div className="space-y-3">
        {applications?.map(app => (
          <Card key={app.id} className="bg-white border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <p className="font-medium text-sm">{app.applicantName}</p>
                <Badge variant={app.status === "Pending" ? "secondary" : app.status === "Approved" ? "default" : "destructive"} className="text-xs">{app.status}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{app.email} · {app.phone}</p>
              <p className="text-xs text-muted-foreground">KCSE Grade: {app.kcseGrade}</p>
              {app.createdAt && <p className="text-xs text-muted-foreground">Submitted: {new Date(app.createdAt).toLocaleDateString()}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Inquiries ────────────────────────────────────────────────
function InquiriesTab() {
  const { data: inquiries, isLoading } = useQuery<Inquiry[]>({ queryKey: ["/api/inquiries"] });
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-700">Contact Inquiries ({inquiries?.length ?? 0})</h3>
      {isLoading && <div className="text-muted-foreground text-sm">Loading...</div>}
      {inquiries?.length === 0 && !isLoading && <Card className="bg-white border-0 shadow-sm"><CardContent className="py-12 text-center text-muted-foreground">No inquiries received yet.</CardContent></Card>}
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
