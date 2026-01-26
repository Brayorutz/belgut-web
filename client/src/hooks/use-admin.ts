import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { 
  type InsertDepartment, type InsertCourse, type InsertNews, type InsertTender,
  type InsertDownload, type InsertCampus
} from "@shared/schema";

export function useAdmin() {
  const queryClient = useQueryClient();

  // === Applications Management ===
  const applicationsQuery = useQuery({
    queryKey: [api.applications.list.path],
    queryFn: async () => {
      const res = await fetch(api.applications.list.path, { credentials: 'include' });
      if (!res.ok) throw new Error("Failed to fetch applications");
      return api.applications.list.responses[200].parse(await res.json());
    },
  });

  // === Course Management ===
  const createCourse = useMutation({
    mutationFn: async (data: InsertCourse) => {
      const res = await fetch(api.courses.create.path, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: 'include'
      });
      if (!res.ok) throw new Error("Failed to create course");
      return api.courses.create.responses[201].parse(await res.json());
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.courses.list.path] }),
  });

  const deleteCourse = useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.courses.delete.path, { id });
      const res = await fetch(url, { method: 'DELETE', credentials: 'include' });
      if (!res.ok) throw new Error("Failed to delete course");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.courses.list.path] }),
  });

  // === News Management ===
  const createNews = useMutation({
    mutationFn: async (data: InsertNews) => {
      const res = await fetch(api.news.create.path, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: 'include'
      });
      if (!res.ok) throw new Error("Failed to create news");
      return api.news.create.responses[201].parse(await res.json());
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.news.list.path] }),
  });

  const deleteNews = useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.news.delete.path, { id });
      const res = await fetch(url, { method: 'DELETE', credentials: 'include' });
      if (!res.ok) throw new Error("Failed to delete news");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.news.list.path] }),
  });

  return {
    applications: applicationsQuery,
    createCourse,
    deleteCourse,
    createNews,
    deleteNews
  };
}
