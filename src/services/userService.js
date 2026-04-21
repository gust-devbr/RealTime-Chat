import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const userService = {
    getByPhone: async (phone) => {
        return await prisma.user.findUnique({ where: { phone } });
    },

    getById: async (id) => {
        return await prisma.user.findFirst({
            where: { id },
            select: {
                id: true,
                name: true,
                phone: true,
                createdAt: true
            }
        });
    },

    create: async (name, phone, password) => {
        const hashed = await bcrypt.hash(password, 10);
        return await prisma.user.create({
            data: { name, phone, password: hashed }
        });
    },
};