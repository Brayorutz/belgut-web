import type { Express } from "express";
import type { Server } from "http";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Auth Setup
  await setupAuth(app);
  registerAuthRoutes(app);

  // Departments
  app.get(api.departments.list.path, async (_req, res) => {
    const result = await storage.getDepartments();
    res.json(result);
  });
  app.get(api.departments.get.path, async (req, res) => {
    const result = await storage.getDepartment(Number(req.params.id));
    if (!result) return res.status(404).json({ message: "Not found" });
    res.json(result);
  });
  app.post(api.departments.create.path, async (req, res) => {
    const result = await storage.createDepartment(req.body);
    res.status(201).json(result);
  });

  // Courses
  app.get(api.courses.list.path, async (req, res) => {
    const departmentId = req.query.departmentId ? Number(req.query.departmentId) : undefined;
    const search = req.query.search as string | undefined;
    const result = await storage.getCourses(departmentId, search);
    res.json(result);
  });
  app.get(api.courses.get.path, async (req, res) => {
    const result = await storage.getCourse(Number(req.params.id));
    if (!result) return res.status(404).json({ message: "Not found" });
    res.json(result);
  });
  app.post(api.courses.create.path, async (req, res) => {
    const result = await storage.createCourse(req.body);
    res.status(201).json(result);
  });

  // Campuses
  app.get(api.campuses.list.path, async (_req, res) => {
    const result = await storage.getCampuses();
    res.json(result);
  });
  app.post(api.campuses.create.path, async (req, res) => {
    const result = await storage.createCampus(req.body);
    res.status(201).json(result);
  });

  // Board Members
  app.get(api.boardMembers.list.path, async (_req, res) => {
    const result = await storage.getBoardMembers();
    res.json(result);
  });
  app.post(api.boardMembers.create.path, async (req, res) => {
    const result = await storage.createBoardMember(req.body);
    res.status(201).json(result);
  });

  // News
  app.get(api.news.list.path, async (_req, res) => {
    const result = await storage.getNews();
    res.json(result);
  });
  app.get(api.news.get.path, async (req, res) => {
    const result = await storage.getNewsItem(Number(req.params.id));
    if (!result) return res.status(404).json({ message: "Not found" });
    res.json(result);
  });
  app.post(api.news.create.path, async (req, res) => {
    const result = await storage.createNews(req.body);
    res.status(201).json(result);
  });

  // Tenders
  app.get(api.tenders.list.path, async (_req, res) => {
    const result = await storage.getTenders();
    res.json(result);
  });
  app.post(api.tenders.create.path, async (req, res) => {
    const result = await storage.createTender(req.body);
    res.status(201).json(result);
  });

  // Downloads
  app.get(api.downloads.list.path, async (_req, res) => {
    const result = await storage.getDownloads();
    res.json(result);
  });
  app.post(api.downloads.create.path, async (req, res) => {
    const result = await storage.createDownload(req.body);
    res.status(201).json(result);
  });

  // Applications
  app.post(api.applications.create.path, async (req, res) => {
    const result = await storage.createApplication(req.body);
    res.status(201).json(result);
  });
  app.get(api.applications.list.path, async (_req, res) => {
    const result = await storage.getApplications();
    res.json(result);
  });

  // Inquiries
  app.post(api.inquiries.create.path, async (req, res) => {
    const result = await storage.createInquiry(req.body);
    res.status(201).json(result);
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const departments = await storage.getDepartments();
  if (departments.length === 0) {
    // 1. Agriculture
    const deptAgri = await storage.createDepartment({
      name: "Department of Agriculture and Agribusiness",
      description: "Training in modern agricultural practices and agribusiness.",
      imageUrl: "https://images.unsplash.com/photo-1625246333195-551e5a20298d?auto=format&fit=crop&q=80"
    });
    await storage.createCourse({ title: "Agriculture and Extension – Levels 5 & 6", departmentId: deptAgri.id, level: "Level 6", duration: "6-8 terms", requirements: "KCSE Mean Grade C-", description: "Agricultural extension services training." });
    await storage.createCourse({ title: "Agripreneurship – Levels 4, 5 & 6", departmentId: deptAgri.id, level: "Level 6", duration: "6-8 terms", requirements: "KCSE Mean Grade C-", description: "Entrepreneurship in agriculture." });

    // 2. Computing
    const deptComp = await storage.createDepartment({
      name: "Department of Computing and Informatics",
      description: "Cutting-edge ICT training and computer science.",
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80"
    });
    await storage.createCourse({ title: "Computer Science – Level 6", departmentId: deptComp.id, level: "Level 6", duration: "6-8 terms", requirements: "KCSE Mean Grade C-", description: "Computer systems and software development." });

    // 3. Electrical
    const deptElec = await storage.createDepartment({
      name: "Department of Electrical and Electronics Engineering",
      description: "Electrical engineering and installation technology.",
      imageUrl: "https://images.unsplash.com/photo-1517420728644-80695f269a21?auto=format&fit=crop&q=80"
    });

    // 4. Building
    const deptBuild = await storage.createDepartment({
      name: "Department of Building and Civil Engineering",
      description: "Civil engineering, masonry, and plumbing.",
      imageUrl: "https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&q=80"
    });

    // 5. Hospitality
    const deptHosp = await storage.createDepartment({
      name: "Department of Hospitality and Institutional Management",
      description: "Catering, accommodation, and food management.",
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80"
    });

    // 6. Cosmetology
    const deptCosm = await storage.createDepartment({
      name: "Department of Cosmetology",
      description: "Beauty therapy and hairdressing.",
      imageUrl: "https://images.unsplash.com/photo-1522335789183-b15c272ff753?auto=format&fit=crop&q=80"
    });

    // 7. Mechanical
    const deptMech = await storage.createDepartment({
      name: "Department of Mechanical and Automotive Engineering",
      description: "Automotive technology and welding.",
      imageUrl: "https://images.unsplash.com/photo-1530046339160-ce3e5b0c7a2f?auto=format&fit=crop&q=80"
    });

    // 8. Business
    const deptBus = await storage.createDepartment({
      name: "Department of Business and Liberal Studies",
      description: "Management, HR, and social work.",
      imageUrl: "https://images.unsplash.com/photo-1454165833767-027ffec95c1a?auto=format&fit=crop&q=80"
    });

    // 9. Applied Sciences
    const deptSci = await storage.createDepartment({
      name: "Department of Applied and Health Sciences",
      description: "Chemistry, biology, and nutrition.",
      imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9d3a35263?auto=format&fit=crop&q=80"
    });

    // 10. Media
    const deptMedia = await storage.createDepartment({
      name: "Department of Media and Journalism",
      description: "Broadcasting and digital journalism.",
      imageUrl: "https://images.unsplash.com/photo-1521474672612-452935520a28?auto=format&fit=crop&q=80"
    });

    // 11. Fashion
    const deptFashion = await storage.createDepartment({
      name: "Department of Fashion Design",
      description: "Professional fashion design and tailoring.",
      imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80"
    });
  }

  const downloads = await storage.getDownloads();
  if (downloads.length === 0) {
    await storage.createDownload({
      title: "Institution Service Charter",
      category: "Service Charter",
      fileUrl: "https://betti.ac.ke/wp-content/uploads/2026/01/SERVICE-CHARTER-MAIN.pdf"
    });
    await storage.createDownload({
      title: "Finance Services Charter",
      category: "Service Charter",
      fileUrl: "https://betti.ac.ke/wp-content/uploads/2026/01/FINANCE-SERVICE-CHATTER_compressed-1-1.pdf"
    });
    await storage.createDownload({
      title: "Procurement Service Charter",
      category: "Service Charter",
      fileUrl: "https://betti.ac.ke/wp-content/uploads/2026/01/SERVICE-CHARTER-FOR-PROCUREMENT.pdf"
    });
    await storage.createDownload({
      title: "Hati ya Huduma za Ununuzi",
      category: "Service Charter",
      fileUrl: "https://betti.ac.ke/wp-content/uploads/2026/01/HATI-YA-HUDUMA-ZA-UNUNUZI.pdf"
    });
  }

  const campuses = await storage.getCampuses();
  if (campuses.length === 0) {
    await storage.createCampus({
      name: "Main Campus",
      location: "Belgut",
      description: "The administrative and academic hub of the institute.",
      contactInfo: "info@btti.ac.ke",
      imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80"
    });
  }
}
