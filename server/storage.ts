import {
  type Department, type InsertDepartment,
  type Course, type InsertCourse,
  type Campus, type InsertCampus,
  type BoardMember, type InsertBoardMember,
  type NewsItem, type InsertNews,
  type Tender, type InsertTender,
  type Download, type InsertDownload,
  type Application, type InsertApplication,
  type Inquiry, type InsertInquiry,
  type JobPosting, type InsertJobPosting,
  type TenderAddendum, type InsertTenderAddendum
} from "@shared/schema";
import { authStorage, type IAuthStorage } from "./replit_integrations/auth/storage";

export interface IStorage extends IAuthStorage {
  getDepartments(): Promise<Department[]>;
  getDepartment(id: number): Promise<Department | undefined>;
  createDepartment(dept: InsertDepartment): Promise<Department>;
  updateDepartment(id: number, dept: Partial<InsertDepartment>): Promise<Department>;
  deleteDepartment(id: number): Promise<void>;

  getCourses(departmentId?: number, search?: string): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: number, course: Partial<InsertCourse>): Promise<Course>;
  deleteCourse(id: number): Promise<void>;

  getCampuses(): Promise<Campus[]>;
  getCampus(id: number): Promise<Campus | undefined>;
  createCampus(campus: InsertCampus): Promise<Campus>;
  updateCampus(id: number, campus: Partial<InsertCampus>): Promise<Campus>;
  deleteCampus(id: number): Promise<void>;

  getBoardMembers(): Promise<BoardMember[]>;
  createBoardMember(member: InsertBoardMember): Promise<BoardMember>;
  updateBoardMember(id: number, member: Partial<InsertBoardMember>): Promise<BoardMember>;
  deleteBoardMember(id: number): Promise<void>;

  getNews(): Promise<NewsItem[]>;
  getNewsItem(id: number): Promise<NewsItem | undefined>;
  createNews(item: InsertNews): Promise<NewsItem>;
  deleteNews(id: number): Promise<void>;

  getTenders(): Promise<Tender[]>;
  createTender(tender: InsertTender): Promise<Tender>;
  updateTender(id: number, tender: Partial<InsertTender>): Promise<Tender>;
  deleteTender(id: number): Promise<void>;

  getTenderAddendums(tenderId: number): Promise<TenderAddendum[]>;
  createTenderAddendum(addendum: InsertTenderAddendum): Promise<TenderAddendum>;
  deleteTenderAddendum(id: number): Promise<void>;

  getDownloads(): Promise<Download[]>;
  createDownload(item: InsertDownload): Promise<Download>;
  deleteDownload(id: number): Promise<void>;

  getApplications(): Promise<Application[]>;
  createApplication(app: InsertApplication): Promise<Application>;

  getInquiries(): Promise<Inquiry[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;

  getJobPostings(): Promise<JobPosting[]>;
  createJobPosting(posting: InsertJobPosting): Promise<JobPosting>;
  deleteJobPosting(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private departments: Map<number, Department> = new Map();
  private courses: Map<number, Course> = new Map();
  private campuses: Map<number, Campus> = new Map();
  private boardMembers: Map<number, BoardMember> = new Map();
  private news: Map<number, NewsItem> = new Map();
  private tenders: Map<number, Tender> = new Map();
  private tenderAddendumsMap: Map<number, TenderAddendum> = new Map();
  private downloads: Map<number, Download> = new Map();
  private applications: Map<number, Application> = new Map();
  private inquiries: Map<number, Inquiry> = new Map();
  private jobPostingsMap: Map<number, JobPosting> = new Map();

  private nextId = {
    departments: 1,
    courses: 1,
    campuses: 1,
    boardMembers: 1,
    news: 1,
    tenders: 1,
    tenderAddendums: 1,
    downloads: 1,
    applications: 1,
    inquiries: 1,
    jobPostings: 1,
  };

  getUser = authStorage.getUser.bind(authStorage);
  upsertUser = authStorage.upsertUser.bind(authStorage);

  async getDepartments(): Promise<Department[]> {
    return Array.from(this.departments.values());
  }
  async getDepartment(id: number): Promise<Department | undefined> {
    return this.departments.get(id);
  }
  async createDepartment(dept: InsertDepartment): Promise<Department> {
    const id = this.nextId.departments++;
    const newDept: Department = { id, ...dept, description: dept.description ?? null, imageUrl: dept.imageUrl ?? null };
    this.departments.set(id, newDept);
    return newDept;
  }
  async updateDepartment(id: number, updates: Partial<InsertDepartment>): Promise<Department> {
    const dept = this.departments.get(id);
    if (!dept) throw new Error("Department not found");
    const updated = { ...dept, ...updates };
    this.departments.set(id, updated);
    return updated;
  }
  async deleteDepartment(id: number): Promise<void> {
    this.departments.delete(id);
  }

  async getCourses(departmentId?: number, search?: string): Promise<Course[]> {
    let result = Array.from(this.courses.values());
    if (departmentId) {
      result = result.filter(c => c.departmentId === departmentId);
    }
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(c => c.title.toLowerCase().includes(s));
    }
    return result;
  }
  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }
  async createCourse(course: InsertCourse): Promise<Course> {
    const id = this.nextId.courses++;
    const newCourse: Course = {
      id,
      title: course.title,
      departmentId: course.departmentId ?? null,
      level: course.level,
      duration: course.duration,
      requirements: course.requirements,
      careerOpportunities: course.careerOpportunities ?? null,
      description: course.description ?? null,
    };
    this.courses.set(id, newCourse);
    return newCourse;
  }
  async updateCourse(id: number, updates: Partial<InsertCourse>): Promise<Course> {
    const course = this.courses.get(id);
    if (!course) throw new Error("Course not found");
    const updated = { ...course, ...updates };
    this.courses.set(id, updated);
    return updated;
  }
  async deleteCourse(id: number): Promise<void> {
    this.courses.delete(id);
  }

  async getCampuses(): Promise<Campus[]> {
    return Array.from(this.campuses.values());
  }
  async getCampus(id: number): Promise<Campus | undefined> {
    return this.campuses.get(id);
  }
  async createCampus(campus: InsertCampus): Promise<Campus> {
    const id = this.nextId.campuses++;
    const newCampus: Campus = {
      id,
      name: campus.name,
      location: campus.location,
      contactInfo: campus.contactInfo ?? null,
      description: campus.description ?? null,
      imageUrl: campus.imageUrl ?? null,
    };
    this.campuses.set(id, newCampus);
    return newCampus;
  }
  async updateCampus(id: number, updates: Partial<InsertCampus>): Promise<Campus> {
    const campus = this.campuses.get(id);
    if (!campus) throw new Error("Campus not found");
    const updated = { ...campus, ...updates };
    this.campuses.set(id, updated);
    return updated;
  }
  async deleteCampus(id: number): Promise<void> {
    this.campuses.delete(id);
  }

  async getBoardMembers(): Promise<BoardMember[]> {
    return Array.from(this.boardMembers.values());
  }
  async createBoardMember(member: InsertBoardMember): Promise<BoardMember> {
    const id = this.nextId.boardMembers++;
    const newMember: BoardMember = {
      id,
      name: member.name,
      title: member.title,
      imageUrl: member.imageUrl ?? null,
      bio: member.bio ?? null,
    };
    this.boardMembers.set(id, newMember);
    return newMember;
  }
  async updateBoardMember(id: number, updates: Partial<InsertBoardMember>): Promise<BoardMember> {
    const member = this.boardMembers.get(id);
    if (!member) throw new Error("Board member not found");
    const updated = { ...member, ...updates };
    this.boardMembers.set(id, updated);
    return updated;
  }
  async deleteBoardMember(id: number): Promise<void> {
    this.boardMembers.delete(id);
  }

  async getNews(): Promise<NewsItem[]> {
    return Array.from(this.news.values()).sort((a, b) => 
      (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0)
    );
  }
  async getNewsItem(id: number): Promise<NewsItem | undefined> {
    return this.news.get(id);
  }
  async createNews(item: InsertNews): Promise<NewsItem> {
    const id = this.nextId.news++;
    const newItem: NewsItem = {
      id,
      title: item.title,
      content: item.content,
      date: new Date(),
      imageUrl: item.imageUrl ?? null,
      category: item.category ?? "General",
    };
    this.news.set(id, newItem);
    return newItem;
  }
  async deleteNews(id: number): Promise<void> {
    this.news.delete(id);
  }

  async getTenders(): Promise<Tender[]> {
    return Array.from(this.tenders.values()).sort((a, b) => 
      b.deadline.getTime() - a.deadline.getTime()
    );
  }
  async createTender(tender: InsertTender): Promise<Tender> {
    const id = this.nextId.tenders++;
    const newTender: Tender = {
      id,
      title: tender.title,
      description: tender.description ?? null,
      deadline: tender.deadline instanceof Date ? tender.deadline : new Date(tender.deadline),
      documentUrl: tender.documentUrl ?? null,
      status: tender.status ?? "Open",
    };
    this.tenders.set(id, newTender);
    return newTender;
  }
  async updateTender(id: number, updates: Partial<InsertTender>): Promise<Tender> {
    const tender = this.tenders.get(id);
    if (!tender) throw new Error("Tender not found");
    const updated: Tender = {
      ...tender,
      ...updates,
      deadline: updates.deadline
        ? (updates.deadline instanceof Date ? updates.deadline : new Date(updates.deadline))
        : tender.deadline,
    };
    this.tenders.set(id, updated);
    return updated;
  }
  async deleteTender(id: number): Promise<void> {
    this.tenders.delete(id);
  }

  async getTenderAddendums(tenderId: number): Promise<TenderAddendum[]> {
    return Array.from(this.tenderAddendumsMap.values())
      .filter(a => a.tenderId === tenderId)
      .sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0));
  }
  async createTenderAddendum(addendum: InsertTenderAddendum): Promise<TenderAddendum> {
    const id = this.nextId.tenderAddendums++;
    const newAddendum: TenderAddendum = {
      id,
      tenderId: addendum.tenderId,
      title: addendum.title,
      documentUrl: addendum.documentUrl,
      date: new Date(),
    };
    this.tenderAddendumsMap.set(id, newAddendum);
    return newAddendum;
  }
  async deleteTenderAddendum(id: number): Promise<void> {
    this.tenderAddendumsMap.delete(id);
  }

  async getDownloads(): Promise<Download[]> {
    return Array.from(this.downloads.values()).sort((a, b) => 
      (b.updatedAt?.getTime() ?? 0) - (a.updatedAt?.getTime() ?? 0)
    );
  }
  async createDownload(item: InsertDownload): Promise<Download> {
    const id = this.nextId.downloads++;
    const newItem: Download = {
      id,
      title: item.title,
      category: item.category,
      fileUrl: item.fileUrl,
      updatedAt: new Date(),
    };
    this.downloads.set(id, newItem);
    return newItem;
  }
  async deleteDownload(id: number): Promise<void> {
    this.downloads.delete(id);
  }

  async getApplications(): Promise<Application[]> {
    return Array.from(this.applications.values()).sort((a, b) => 
      (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0)
    );
  }
  async createApplication(app: InsertApplication): Promise<Application> {
    const id = this.nextId.applications++;
    const newApp: Application = {
      id,
      courseId: app.courseId ?? null,
      campusId: app.campusId ?? null,
      applicantName: app.applicantName,
      email: app.email,
      phone: app.phone,
      kcseGrade: app.kcseGrade,
      status: "Pending",
      createdAt: new Date(),
    };
    this.applications.set(id, newApp);
    return newApp;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values()).sort((a, b) =>
      (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0)
    );
  }

  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.nextId.inquiries++;
    const newInquiry: Inquiry = {
      id,
      name: inquiry.name,
      email: inquiry.email,
      subject: inquiry.subject ?? null,
      message: inquiry.message,
      createdAt: new Date(),
    };
    this.inquiries.set(id, newInquiry);
    return newInquiry;
  }

  async getJobPostings(): Promise<JobPosting[]> {
    return Array.from(this.jobPostingsMap.values()).sort((a, b) =>
      (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0)
    );
  }

  async createJobPosting(posting: InsertJobPosting): Promise<JobPosting> {
    const id = this.nextId.jobPostings++;
    const newPosting: JobPosting = {
      id,
      title: posting.title,
      department: posting.department,
      type: posting.type ?? "Full-time",
      description: posting.description,
      requirements: posting.requirements,
      deadline: posting.deadline instanceof Date ? posting.deadline : new Date(posting.deadline),
      isActive: posting.isActive ?? true,
      createdAt: new Date(),
    };
    this.jobPostingsMap.set(id, newPosting);
    return newPosting;
  }

  async deleteJobPosting(id: number): Promise<void> {
    this.jobPostingsMap.delete(id);
  }

  async seedDatabase() {
    const existingCampuses = await this.getCampuses();
    if (existingCampuses.length === 0) {
      // ... (existing campuses code)
    }

    const existingBoard = await this.getBoardMembers();
    if (existingBoard.length === 0) {
      await this.createBoardMember({
        name: "Mr. Nelson Sang",
        title: "The Principal",
        imageUrl: "attached_assets/the_principal_1769508223006.JPG",
        bio: "Leading Belgut TTI towards excellence in technical education."
      });
      await this.createBoardMember({
        name: "Dean of Students",
        title: "Dean of Students",
        imageUrl: "attached_assets/student_leadership_president_1769508223008.JPG",
        bio: "Dedicated to student welfare and leadership development."
      });
      await this.createBoardMember({
        name: "Dean of Academics",
        title: "Dean of Academics",
        imageUrl: "attached_assets/department_of_food_and_hospitality_1769508223007.JPG",
        bio: "Ensuring academic rigor and quality in all programs."
      });
      await this.createBoardMember({
        name: "The Registrar",
        title: "The Registrar",
        imageUrl: "attached_assets/fashion_design_course_1769508223008.JPG",
        bio: "Managing admissions and student records with precision."
      });
    }

    const existingNews = await this.getNews();
    if (existingNews.length === 0) {
      await this.createNews({
        title: "Campus Life Highlights",
        content: "Experience the vibrant student life at Belgut TTI, from cultural events to sports and leadership.",
        imageUrl: "attached_assets/student_life_main_1769508223007.JPG",
        category: "Event"
      });
    }
  }

  async seedTenders() {
    const existing = await this.getTenders();
    if (existing.length === 0) {
      await this.createTender({
        title: "Invitation to Tender - Proposed completion of two storey for engineering and technology workshop",
        description: "TENDER NO: KCO/BEL/BELGUT TTI/022/2025/2026",
        deadline: new Date("2025-06-20"),
        documentUrl: "attached_assets/NOTICE-ADDENDUM_1769505269041.pdf",
        status: "Open"
      });

      await this.createTender({
        title: "Invitation To Tender For Continous Registration Of Suppliers",
        description: "Continuous registration of suppliers for various categories",
        deadline: new Date("2024-06-20"),
        documentUrl: "attached_assets/Invitation-To-Tender-For-Continous-Registration-Of-Suppliers-F_1769505269042.pdf",
        status: "Closed"
      });
    }
  }
}

export const storage = new MemStorage();
storage.seedTenders();
storage.seedDatabase();
