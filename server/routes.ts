import type { Express } from "express";
import type { Server } from "http";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";
import express from "express";

declare module "express-session" {
  interface SessionData {
    isAdmin: boolean;
  }
}

const uploadsDir = path.resolve(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadsDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 60);
      cb(null, `${Date.now()}_${base}${ext}`);
    },
  }),
  fileFilter: (_req, file, cb) => {
    const allowed = [".pdf", ".doc", ".docx", ".xlsx", ".xls", ".zip"];
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowed.includes(ext));
  },
  limits: { fileSize: 20 * 1024 * 1024 },
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Serve uploaded files
  app.use("/uploads", express.static(uploadsDir));

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
  app.put("/api/board-members/:id", async (req, res) => {
    try {
      const result = await storage.updateBoardMember(Number(req.params.id), req.body);
      res.json(result);
    } catch {
      res.status(404).json({ message: "Not found" });
    }
  });
  app.delete("/api/board-members/:id", async (req, res) => {
    await storage.deleteBoardMember(Number(req.params.id));
    res.status(204).end();
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
  app.put("/api/tenders/:id", async (req, res) => {
    try {
      const result = await storage.updateTender(Number(req.params.id), req.body);
      res.json(result);
    } catch {
      res.status(404).json({ message: "Not found" });
    }
  });
  app.delete("/api/tenders/:id", async (req, res) => {
    await storage.deleteTender(Number(req.params.id));
    res.status(204).end();
  });

  // Tender Addendums
  app.get("/api/tender-addendums", async (req, res) => {
    const tenderId = Number(req.query.tenderId);
    if (!tenderId) return res.status(400).json({ message: "tenderId required" });
    const result = await storage.getTenderAddendums(tenderId);
    res.json(result);
  });
  app.post("/api/tender-addendums", async (req, res) => {
    const result = await storage.createTenderAddendum(req.body);
    res.status(201).json(result);
  });
  app.delete("/api/tender-addendums/:id", async (req, res) => {
    await storage.deleteTenderAddendum(Number(req.params.id));
    res.status(204).end();
  });

  // News delete
  app.delete("/api/news/:id", async (req, res) => {
    await storage.deleteNews(Number(req.params.id));
    res.status(204).end();
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
  app.delete("/api/downloads/:id", async (req, res) => {
    await storage.deleteDownload(Number(req.params.id));
    res.status(204).end();
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
  app.get("/api/inquiries", async (_req, res) => {
    const result = await storage.getInquiries();
    res.json(result);
  });
  app.post(api.inquiries.create.path, async (req, res) => {
    const result = await storage.createInquiry(req.body);
    res.status(201).json(result);
  });

  // Job Postings
  app.get("/api/job-postings", async (_req, res) => {
    const result = await storage.getJobPostings();
    res.json(result);
  });
  app.post("/api/job-postings", async (req, res) => {
    const result = await storage.createJobPosting(req.body);
    res.status(201).json(result);
  });
  app.delete("/api/job-postings/:id", async (req, res) => {
    await storage.deleteJobPosting(Number(req.params.id));
    res.status(204).end();
  });

  // Admin Auth (simple username/password)
  // File Upload
  app.post("/api/upload", upload.single("file"), (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded or file type not allowed." });
    const url = `/uploads/${req.file.filename}`;
    res.json({ url, filename: req.file.originalname });
  });

  app.get("/api/admin/me", (req, res) => {
    res.json({ isAdmin: !!req.session.isAdmin });
  });

  app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;
    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    const adminPassword = process.env.ADMIN_PASSWORD || "btti2024";

    if (username === adminUsername && password === adminPassword) {
      req.session.isAdmin = true;
      res.json({ success: true });
    } else {
      res.status(401).json({ message: "Invalid username or password." });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.isAdmin = false;
    res.json({ success: true });
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
    await storage.createCourse({ title: "Agriculture and Extension – Levels 5 & 6", departmentId: deptAgri.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "Agricultural extension services training." });
    await storage.createCourse({ title: "Agripreneurship – Levels 4, 5 & 6", departmentId: deptAgri.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "Entrepreneurship in agriculture." });
    await storage.createCourse({ title: "General Agriculture – Level 4", departmentId: deptAgri.id, level: "Level 4", duration: "3 terms", requirements: "KCSE Mean Grade D- (Minus)", description: "General agricultural training." });
    await storage.createCourse({ title: "Horticulture – Levels 3, 4, 5", departmentId: deptAgri.id, level: "Level 5", duration: "5 terms", requirements: "KCSE Mean Grade D (Plain)/Pass in Level 4", description: "Horticultural studies." });

    // 2. Computing
    const deptComp = await storage.createDepartment({
      name: "Department of Computing and Informatics",
      description: "Cutting-edge ICT training and computer science.",
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80"
    });
    await storage.createCourse({ title: "Computer Science – Level 6", departmentId: deptComp.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "Computer systems and software development." });
    await storage.createCourse({ title: "Information And Communication Technology – Levels 4, 5 & 6", departmentId: deptComp.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "ICT training." });
    await storage.createCourse({ title: "Library and Information Management – Level 6", departmentId: deptComp.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "Information management." });
    await storage.createCourse({ title: "Library and Information Studies – Level 5", departmentId: deptComp.id, level: "Level 5", duration: "5 terms", requirements: "KCSE Mean Grade D (Plain)/Pass in Level 4", description: "Library studies." });
    await storage.createCourse({ title: "Records and Archive Management", departmentId: deptComp.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "Archival studies." });

    // 3. Electrical
    const deptElec = await storage.createDepartment({
      name: "Department of Electrical and Electronics Engineering",
      description: "Electrical engineering and installation technology.",
      imageUrl: "https://images.unsplash.com/photo-1517420728644-80695f269a21?auto=format&fit=crop&q=80"
    });
    await storage.createCourse({ title: "Electrical Engineering – Levels 5 & 6", departmentId: deptElec.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "Electrical engineering studies." });
    await storage.createCourse({ title: "Electrical Installation technology – Levels 3 & 4", departmentId: deptElec.id, level: "Level 4", duration: "3 terms", requirements: "KCSE Mean Grade D- (Minus)", description: "Electrical installation." });
    await storage.createCourse({ title: "Solar Photovoltaic (PV) Installation – Levels 3, 4 & 5", departmentId: deptElec.id, level: "Level 5", duration: "5 terms", requirements: "KCSE Mean Grade D (Plain)/Pass in Level 4", description: "Solar installation." });

    // 4. Building
    const deptBuild = await storage.createDepartment({
      name: "Department of Building and Civil Engineering",
      description: "Civil engineering, masonry, and plumbing.",
      imageUrl: "https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&q=80"
    });
    await storage.createCourse({ title: "Civil Engineering – Level 6", departmentId: deptBuild.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "Structural and civil engineering." });
    await storage.createCourse({ title: "Masonry – Level 3 & 4", departmentId: deptBuild.id, level: "Level 4", duration: "3 terms", requirements: "KCSE Mean Grade D- (Minus)", description: "Professional masonry training." });
    await storage.createCourse({ title: "Plumbing – Level 3, 4 & 5", departmentId: deptBuild.id, level: "Level 5", duration: "5 terms", requirements: "KCSE Mean Grade D (Plain)/Pass in Level 4", description: "Plumbing services." });
    await storage.createCourse({ title: "Water Engineering Technology – Level 6", departmentId: deptBuild.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "Water resource engineering." });

    // 5. Hospitality
    const deptHosp = await storage.createDepartment({
      name: "Department of Hospitality and Institutional Management",
      description: "Catering, accommodation, and food management.",
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80"
    });
    await storage.createCourse({ title: "Catering and Accommodation Management – Level 6", departmentId: deptHosp.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "Hospitality management." });
    await storage.createCourse({ title: "Catering and Accommodation Operations – Level 5", departmentId: deptHosp.id, level: "Level 5", duration: "5 terms", requirements: "KCSE Mean Grade D (Plain)/Pass in Level 4", description: "Catering operations." });
    await storage.createCourse({ title: "Food and Beverage Management (Pathway A) - Level 6", departmentId: deptHosp.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "F&B management." });
    await storage.createCourse({ title: "Food and Beverage Management (Pathway B) - Level 6", departmentId: deptHosp.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "F&B management." });
    await storage.createCourse({ title: "Food and Beverage Operations (Pathway A) - Level 5", departmentId: deptHosp.id, level: "Level 5", duration: "5 terms", requirements: "KCSE Mean Grade D (Plain)/Pass in Level 4", description: "F&B operations." });
    await storage.createCourse({ title: "Food and Beverage Operations (Pathway B) - Level 5", departmentId: deptHosp.id, level: "Level 5", duration: "5 terms", requirements: "KCSE Mean Grade D (Plain)/Pass in Level 4", description: "F&B operations." });
    await storage.createCourse({ title: "Food and Beverage Production (Cookery) – Levels 3 & 4", departmentId: deptHosp.id, level: "Level 4", duration: "3 terms", requirements: "KCSE Mean Grade D- (Minus)", description: "Cookery training." });
    await storage.createCourse({ title: "Food and Beverage Service (Waiter) - Levels 3 & 4", departmentId: deptHosp.id, level: "Level 4", duration: "3 terms", requirements: "KCSE Mean Grade D- (Minus)", description: "Waitstaff services." });

    // 6. Cosmetology
    const deptCosm = await storage.createDepartment({
      name: "Department of Cosmetology",
      description: "Beauty therapy and hairdressing.",
      imageUrl: "https://images.unsplash.com/photo-1522335789183-b15c272ff753?auto=format&fit=crop&q=80"
    });
    await storage.createCourse({ title: "Cosmetology – Level 6", departmentId: deptCosm.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "Advanced cosmetology." });
    await storage.createCourse({ title: "Cosmetology – Level 5", departmentId: deptCosm.id, level: "Level 5", duration: "5 terms", requirements: "KCSE Mean Grade D (Plain)/Pass in Level 4", description: "Cosmetology operations." });
    await storage.createCourse({ title: "Cosmetology – Level 4", departmentId: deptCosm.id, level: "Level 4", duration: "3 terms", requirements: "KCSE Mean Grade D- (Minus)", description: "Basic cosmetology." });
    await storage.createCourse({ title: "Cosmetology – Level 3", departmentId: deptCosm.id, level: "Level 3", duration: "1 term", requirements: "Prior Learning in relevant field", description: "Introductory cosmetology." });

    // 7. Mechanical
    const deptMech = await storage.createDepartment({
      name: "Department of Mechanical and Automotive Engineering",
      description: "Automotive technology and welding.",
      imageUrl: "https://images.unsplash.com/photo-1530046339160-ce3e5b0c7a2f?auto=format&fit=crop&q=80"
    });
    await storage.createCourse({ title: "Automotive Mechanic – Levels 3 & 4", departmentId: deptMech.id, level: "Level 4", duration: "3 terms", requirements: "KCSE Mean Grade D- (Minus)", description: "Auto repair services." });
    await storage.createCourse({ title: "Automotive Mechatronics Technology – Level 6", departmentId: deptMech.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "Auto mechatronics." });
    await storage.createCourse({ title: "Automotive Technology – Levels 5 & 6", departmentId: deptMech.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "Automotive engineering." });
    await storage.createCourse({ title: "Welding – Levels 3, 4, 5 & 6", departmentId: deptMech.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "Welding and fabrication." });

    // 8. Business
    const deptBus = await storage.createDepartment({
      name: "Department of Business and Liberal Studies",
      description: "Management, HR, and social work.",
      imageUrl: "https://images.unsplash.com/photo-1454165833767-027ffec95c1a?auto=format&fit=crop&q=80"
    });
    await storage.createCourse({ title: "Business Management – Levels 5 & 6", departmentId: deptBus.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "Business studies." });
    await storage.createCourse({ title: "Counselling – Levels 5 & 6", departmentId: deptBus.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "Counselling studies." });
    await storage.createCourse({ title: "Human Resource Management – Levels 5 & 6", departmentId: deptBus.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "HR training." });
    await storage.createCourse({ title: "Office Administration – Levels 5 & 6", departmentId: deptBus.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "Office management." });
    await storage.createCourse({ title: "Office Assistance – Level 4", departmentId: deptBus.id, level: "Level 4", duration: "3 terms", requirements: "KCSE Mean Grade D- (Minus)", description: "Secretarial services." });
    await storage.createCourse({ title: "Social Work – levels 5 & 6", departmentId: deptBus.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "Social services." });

    // 9. Applied Sciences
    const deptSci = await storage.createDepartment({
      name: "Department of Applied and Health Sciences",
      description: "Chemistry, biology, and nutrition.",
      imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9d3a35263?auto=format&fit=crop&q=80"
    });
    await storage.createCourse({ title: "Analytical Chemistry Technology – Level 6", departmentId: deptSci.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "Analytical chemistry." });
    await storage.createCourse({ title: "Applied Biology – Level 6", departmentId: deptSci.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "Biological sciences." });
    await storage.createCourse({ title: "Nutrition and Dietetics – Levels 5 & 6", departmentId: deptSci.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "Nutrition studies." });
    await storage.createCourse({ title: "Science Laboratory Technology – Levels 5 & 6", departmentId: deptSci.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "Laboratory technology." });
    await storage.createCourse({ title: "Nurse Aid Course - level 5", departmentId: deptSci.id, level: "Level 5", duration: "5 terms", requirements: "KCSE Mean Grade D (Plain)/Pass in Level 4", description: "Nursing assistant services." });

    // 10. Media
    const deptMedia = await storage.createDepartment({
      name: "Department of Media and Journalism",
      description: "Broadcasting and digital journalism.",
      imageUrl: "https://images.unsplash.com/photo-1521474672612-452935520a28?auto=format&fit=crop&q=80"
    });
    await storage.createCourse({ title: "Broadcast journalism – Level 6", departmentId: deptMedia.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "Media studies." });
    await storage.createCourse({ title: "Digital Journalism – Level 6", departmentId: deptMedia.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "Digital media." });
    await storage.createCourse({ title: "Film Production – Levels 5 & 6", departmentId: deptMedia.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "Film production." });

    // 11. Fashion
    const deptFashion = await storage.createDepartment({
      name: "Department of Fashion Design",
      description: "Professional fashion design and tailoring.",
      imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80"
    });
    await storage.createCourse({ title: "Fashion Design – Level 6", departmentId: deptFashion.id, level: "Level 6", duration: "6 to 8 terms", requirements: "KCSE Mean Grade C- (Minus)/Pass in Level 5", description: "Advanced fashion design." });
    await storage.createCourse({ title: "Fashion Design – Level 5", departmentId: deptFashion.id, level: "Level 5", duration: "5 terms", requirements: "KCSE Mean Grade D (Plain)/Pass in Level 4", description: "Fashion operations." });
    await storage.createCourse({ title: "Fashion Design – Level 4", departmentId: deptFashion.id, level: "Level 4", duration: "3 terms", requirements: "KCSE Mean Grade D- (Minus)", description: "Basic fashion design." });
    await storage.createCourse({ title: "Fashion Design – Level 3", departmentId: deptFashion.id, level: "Level 3", duration: "1 term", requirements: "Prior Learning in relevant field", description: "Introductory fashion design." });
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
