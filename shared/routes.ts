import { z } from 'zod';
import { 
  insertDepartmentSchema, departments,
  insertCourseSchema, courses,
  insertCampusSchema, campuses,
  insertBoardMemberSchema, boardMembers,
  insertNewsSchema, news,
  insertTenderSchema, tenders,
  insertDownloadSchema, downloads,
  insertApplicationSchema, applications,
  insertInquirySchema, inquiries
} from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  departments: {
    list: {
      method: 'GET' as const,
      path: '/api/departments',
      responses: {
        200: z.array(z.custom<typeof departments.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/departments/:id',
      responses: {
        200: z.custom<typeof departments.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/departments',
      input: insertDepartmentSchema,
      responses: {
        201: z.custom<typeof departments.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/departments/:id',
      input: insertDepartmentSchema.partial(),
      responses: {
        200: z.custom<typeof departments.$inferSelect>(),
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/departments/:id',
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    },
  },
  courses: {
    list: {
      method: 'GET' as const,
      path: '/api/courses',
      input: z.object({
        departmentId: z.coerce.number().optional(),
        search: z.string().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof courses.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/courses/:id',
      responses: {
        200: z.custom<typeof courses.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/courses',
      input: insertCourseSchema,
      responses: {
        201: z.custom<typeof courses.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/courses/:id',
      input: insertCourseSchema.partial(),
      responses: {
        200: z.custom<typeof courses.$inferSelect>(),
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/courses/:id',
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    },
  },
  campuses: {
    list: {
      method: 'GET' as const,
      path: '/api/campuses',
      responses: {
        200: z.array(z.custom<typeof campuses.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/campuses/:id',
      responses: {
        200: z.custom<typeof campuses.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/campuses',
      input: insertCampusSchema,
      responses: {
        201: z.custom<typeof campuses.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/campuses/:id',
      input: insertCampusSchema.partial(),
      responses: {
        200: z.custom<typeof campuses.$inferSelect>(),
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/campuses/:id',
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    },
  },
  boardMembers: {
    list: {
      method: 'GET' as const,
      path: '/api/board-members',
      responses: {
        200: z.array(z.custom<typeof boardMembers.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/board-members',
      input: insertBoardMemberSchema,
      responses: {
        201: z.custom<typeof boardMembers.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/board-members/:id',
      input: insertBoardMemberSchema.partial(),
      responses: {
        200: z.custom<typeof boardMembers.$inferSelect>(),
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/board-members/:id',
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    },
  },
  news: {
    list: {
      method: 'GET' as const,
      path: '/api/news',
      responses: {
        200: z.array(z.custom<typeof news.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/news/:id',
      responses: {
        200: z.custom<typeof news.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/news',
      input: insertNewsSchema,
      responses: {
        201: z.custom<typeof news.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/news/:id',
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    },
  },
  tenders: {
    list: {
      method: 'GET' as const,
      path: '/api/tenders',
      responses: {
        200: z.array(z.custom<typeof tenders.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/tenders',
      input: insertTenderSchema,
      responses: {
        201: z.custom<typeof tenders.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/tenders/:id',
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    },
  },
  downloads: {
    list: {
      method: 'GET' as const,
      path: '/api/downloads',
      responses: {
        200: z.array(z.custom<typeof downloads.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/downloads',
      input: insertDownloadSchema,
      responses: {
        201: z.custom<typeof downloads.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/downloads/:id',
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    },
  },
  applications: {
    create: {
      method: 'POST' as const,
      path: '/api/applications',
      input: insertApplicationSchema,
      responses: {
        201: z.custom<typeof applications.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/applications',
      responses: {
        200: z.array(z.custom<typeof applications.$inferSelect>()),
      },
    },
  },
  inquiries: {
    create: {
      method: 'POST' as const,
      path: '/api/inquiries',
      input: insertInquirySchema,
      responses: {
        201: z.custom<typeof inquiries.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
