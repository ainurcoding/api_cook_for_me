import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

interface CreateUserPayload {
  email: string;
  password_hash: string;
  full_name: string;
  user_type: string;
  profile_picture?: string;
  bio?: string;
  location?: string;
}

export const createUser = async (data: CreateUserPayload) => {
  return prisma.users.create({
    data,
  });
};