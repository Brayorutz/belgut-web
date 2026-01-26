import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { 
  type InsertDepartment, type InsertCourse, type InsertCampus,
  type InsertBoardMember, type InsertNews, type InsertTender,
  type InsertDownload, type InsertApplication, type InsertInquiry
} from "@shared/schema";

// === Departments ===
export function useDepartments() {
  return useQuery({
    queryKey: [api.departments.list.path],
    queryFn: async () => {
      const res = await fetch(api.departments.list.path);
      if (!res.ok) throw new Error("Failed to fetch departments");
      return api.departments.list.responses[200].parse(await res.json());
    },
  });
}

export function useDepartment(id: number) {
  return useQuery({
    queryKey: [api.departments.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.departments.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch department");
      return api.departments.get.responses[200].parse(await res.json());
    },
    enabled: !isNaN(id),
  });
}

// === Courses ===
export function useCourses(departmentId?: number, search?: string) {
  return useQuery({
    queryKey: [api.courses.list.path, departmentId, search],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (departmentId) queryParams.append("departmentId", departmentId.toString());
      if (search) queryParams.append("search", search);
      
      const url = `${api.courses.list.path}?${queryParams.toString()}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch courses");
      return api.courses.list.responses[200].parse(await res.json());
    },
  });
}

export function useCourse(id: number) {
  return useQuery({
    queryKey: [api.courses.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.courses.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch course");
      return api.courses.get.responses[200].parse(await res.json());
    },
    enabled: !isNaN(id),
  });
}

// === Campuses ===
export function useCampuses() {
  return useQuery({
    queryKey: [api.campuses.list.path],
    queryFn: async () => {
      const res = await fetch(api.campuses.list.path);
      if (!res.ok) throw new Error("Failed to fetch campuses");
      return api.campuses.list.responses[200].parse(await res.json());
    },
  });
}

// === Board Members ===
export function useBoardMembers() {
  return useQuery({
    queryKey: [api.boardMembers.list.path],
    queryFn: async () => {
      const res = await fetch(api.boardMembers.list.path);
      if (!res.ok) throw new Error("Failed to fetch board members");
      return api.boardMembers.list.responses[200].parse(await res.json());
    },
  });
}

// === News ===
export function useNews() {
  return useQuery({
    queryKey: [api.news.list.path],
    queryFn: async () => {
      const res = await fetch(api.news.list.path);
      if (!res.ok) throw new Error("Failed to fetch news");
      return api.news.list.responses[200].parse(await res.json());
    },
  });
}

export function useNewsItem(id: number) {
  return useQuery({
    queryKey: [api.news.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.news.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch news item");
      return api.news.get.responses[200].parse(await res.json());
    },
    enabled: !isNaN(id),
  });
}

// === Tenders ===
export function useTenders() {
  return useQuery({
    queryKey: [api.tenders.list.path],
    queryFn: async () => {
      const res = await fetch(api.tenders.list.path);
      if (!res.ok) throw new Error("Failed to fetch tenders");
      return api.tenders.list.responses[200].parse(await res.json());
    },
  });
}

// === Downloads ===
export function useDownloads() {
  return useQuery({
    queryKey: [api.downloads.list.path],
    queryFn: async () => {
      const res = await fetch(api.downloads.list.path);
      if (!res.ok) throw new Error("Failed to fetch downloads");
      return api.downloads.list.responses[200].parse(await res.json());
    },
  });
}

// === Mutations (Admin/Forms) ===
export function useCreateApplication() {
  return useMutation({
    mutationFn: async (data: InsertApplication) => {
      const res = await fetch(api.applications.create.path, {
        method: api.applications.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to submit application");
      return api.applications.create.responses[201].parse(await res.json());
    },
  });
}

export function useCreateInquiry() {
  return useMutation({
    mutationFn: async (data: InsertInquiry) => {
      const res = await fetch(api.inquiries.create.path, {
        method: api.inquiries.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send message");
      return api.inquiries.create.responses[201].parse(await res.json());
    },
  });
}
