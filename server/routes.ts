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
    const deptAgri = await storage.createDepartment({
      name: "Department of Agriculture and Agribusiness",
      description: "Training in modern agricultural practices and agribusiness.",
      imageUrl: "https://images.unsplash.com/photo-1625246333195-551e5a20298d?auto=format&fit=crop&q=80"
    });
    
    await storage.createCourse({
      title: "Agriculture and Extension",
      departmentId: deptAgri.id,
      level: "Level 6",
      duration: "3 Years",
      requirements: "KCSE Mean Grade C-",
      description: "Comprehensive training in agricultural extension services.",
      careerOpportunities: "Agricultural Extension Officer, Farm Manager"
    });

    const deptComp = await storage.createDepartment({
      name: "Department of Computing and Informatics",
      description: "Cutting-edge ICT training and computer science.",
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80"
    });

    await storage.createCourse({
      title: "Computer Science",
      departmentId: deptComp.id,
      level: "Level 6",
      duration: "3 Years",
      requirements: "KCSE Mean Grade C-",
      description: "Advanced study of computer systems and software development.",
      careerOpportunities: "Software Developer, Systems Analyst"
    });

    // Seed other departments...
    // (Simplified for brevity, would add all departments from requirements)
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
    await storage.createCampus({
      name: "Litein Campus",
      location: "Litein",
      description: "Specializing in business and liberal studies.",
      contactInfo: "litein@btti.ac.ke",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80"
    });
  }
  
  const board = await storage.getBoardMembers();
  if (board.length === 0) {
    // Seed board members using the moved images
    await storage.createBoardMember({
      name: "Mr. Peter",
      title: "Chairman",
      imageUrl: "/images/board/peter.jpg"
    });
     await storage.createBoardMember({
      name: "Mr. Wesley",
      title: "Member",
      imageUrl: "/images/board/wesley.png"
    });
     await storage.createBoardMember({
      name: "Ms. Milkah",
      title: "Member",
      imageUrl: "/images/board/milkah.jpg"
    });
     await storage.createBoardMember({
      name: "Ms. Caroline",
      title: "Member",
      imageUrl: "/images/board/caroline.jpg"
    });
     await storage.createBoardMember({
      name: "Ms. Linda",
      title: "Member",
      imageUrl: "/images/board/linda.jpg"
    });
    await storage.createBoardMember({
      name: "Mr. Agutu",
      title: "Member",
      imageUrl: "/images/board/agutu.png"
    });
    await storage.createBoardMember({
      name: "Principal",
      title: "Secretary/Principal",
      imageUrl: "/images/board/principal.jpg"
    });
    await storage.createBoardMember({
      name: "Mr. John Rotich",
      title: "Deputy Principal",
      imageUrl: "/images/board/john.png"
    });
  }

  const news = await storage.getNews();
  if (news.length === 0) {
    await storage.createNews({
        title: "January Intake Ongoing",
        content: "Applications are now open for the January intake. Apply online or visit our campuses.",
        category: "Announcement",
        imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80"
    });
  }
}
