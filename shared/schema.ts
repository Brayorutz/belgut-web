import { pgTable, text, serial, integer, boolean, timestamp, varchar, date } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export * from "./models/auth";

// === TABLE DEFINITIONS ===

export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  departmentId: integer("department_id").references(() => departments.id),
  level: text("level").notNull(), // Level 3, 4, 5, 6
  duration: text("duration").notNull(),
  requirements: text("requirements").notNull(),
  careerOpportunities: text("career_opportunities"),
  description: text("description"),
});

export const campuses = pgTable("campuses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  contactInfo: text("contact_info"),
  description: text("description"),
  imageUrl: text("image_url"),
});

export const boardMembers = pgTable("board_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  imageUrl: text("image_url"),
  bio: text("bio"),
});

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  date: timestamp("date").defaultNow(),
  imageUrl: text("image_url"),
  category: text("category").default("General"), // News, Event, Announcement
});

export const tenders = pgTable("tenders", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  deadline: timestamp("deadline").notNull(),
  documentUrl: text("document_url"),
  status: text("status").default("Open"), // Open, Closed
});

export const downloads = pgTable("downloads", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(), // Prospectus, Application Form, Fee Structure, Policy
  fileUrl: text("file_url").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").references(() => courses.id),
  campusId: integer("campus_id").references(() => campuses.id),
  applicantName: text("applicant_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  kcseGrade: text("kcse_grade").notNull(),
  status: text("status").default("Pending"), // Pending, Approved, Rejected
  createdAt: timestamp("created_at").defaultNow(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tenderAddendums = pgTable("tender_addendums", {
  id: serial("id").primaryKey(),
  tenderId: integer("tender_id").references(() => tenders.id).notNull(),
  title: text("title").notNull(),
  documentUrl: text("document_url").notNull(),
  date: timestamp("date").defaultNow(),
});

export const jobPostings = pgTable("job_postings", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  department: text("department").notNull(),
  type: text("type").notNull().default("Full-time"), // Full-time, Part-time, Contract
  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
  deadline: timestamp("deadline").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// === RELATIONS ===
export const coursesRelations = relations(courses, ({ one }) => ({
  department: one(departments, {
    fields: [courses.departmentId],
    references: [departments.id],
  }),
}));

export const departmentsRelations = relations(departments, ({ many }) => ({
  courses: many(courses),
}));

export const applicationsRelations = relations(applications, ({ one }) => ({
  course: one(courses, {
    fields: [applications.courseId],
    references: [courses.id],
  }),
}));

// === BASE SCHEMAS ===
export const insertDepartmentSchema = createInsertSchema(departments).omit({ id: true });
export const insertCourseSchema = createInsertSchema(courses).omit({ id: true });
export const insertCampusSchema = createInsertSchema(campuses).omit({ id: true });
export const insertBoardMemberSchema = createInsertSchema(boardMembers).omit({ id: true });
export const insertNewsSchema = createInsertSchema(news).omit({ id: true, date: true });
export const insertTenderSchema = createInsertSchema(tenders).omit({ id: true });
export const insertDownloadSchema = createInsertSchema(downloads).omit({ id: true, updatedAt: true });
export const insertApplicationSchema = createInsertSchema(applications).omit({ id: true, createdAt: true, status: true });
export const insertInquirySchema = createInsertSchema(inquiries).omit({ id: true, createdAt: true });
export const insertJobPostingSchema = createInsertSchema(jobPostings).omit({ id: true, createdAt: true });
export const insertTenderAddendumSchema = createInsertSchema(tenderAddendums).omit({ id: true, date: true });

// === TYPES ===
export type Department = typeof departments.$inferSelect;
export type InsertDepartment = z.infer<typeof insertDepartmentSchema>;

export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;

export type Campus = typeof campuses.$inferSelect;
export type InsertCampus = z.infer<typeof insertCampusSchema>;

export type BoardMember = typeof boardMembers.$inferSelect;
export type InsertBoardMember = z.infer<typeof insertBoardMemberSchema>;

export type NewsItem = typeof news.$inferSelect;
export type InsertNews = z.infer<typeof insertNewsSchema>;

export type Tender = typeof tenders.$inferSelect;
export type InsertTender = z.infer<typeof insertTenderSchema>;

export type Download = typeof downloads.$inferSelect;
export type InsertDownload = z.infer<typeof insertDownloadSchema>;

export type Application = typeof applications.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;

export type JobPosting = typeof jobPostings.$inferSelect;
export type InsertJobPosting = z.infer<typeof insertJobPostingSchema>;

export type TenderAddendum = typeof tenderAddendums.$inferSelect;
export type InsertTenderAddendum = z.infer<typeof insertTenderAddendumSchema>;
