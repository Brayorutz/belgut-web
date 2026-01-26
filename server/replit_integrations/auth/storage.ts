import { type User, type UpsertUser } from "@shared/models/auth";

export interface IAuthStorage {
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
}

class MemAuthStorage implements IAuthStorage {
  private users: Map<string, User> = new Map();

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const existing = userData.id ? this.users.get(userData.id) : undefined;
    const now = new Date();
    const user: User = {
      id: userData.id || crypto.randomUUID(),
      email: userData.email ?? null,
      firstName: userData.firstName ?? null,
      lastName: userData.lastName ?? null,
      profileImageUrl: userData.profileImageUrl ?? null,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };
    this.users.set(user.id, user);
    return user;
  }
}

export const authStorage = new MemAuthStorage();
