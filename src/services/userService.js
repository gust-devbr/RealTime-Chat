import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const userService = {
    getByPhone: async (phone) => {
        return await prisma.user.findUnique({ where: { phone } });
    },

    getById: async (id) => {
        return await prisma.user.findFirst({ where: { id } });
    },

    delete: async (id) => {
        await prisma.user.delete({ where: { id } });
    },

    update: async (id, name, phone) => {
        await prisma.user.update({
            where: { id },
            data: {
                ...(name !== undefined && { name }),
                ...(phone !== undefined && { phone }),
            }
        })
    },

    create: async (name, phone, password) => {
        const hashed = await bcrypt.hash(password, 10);
        return await prisma.user.create({
            data: { name, phone, password: hashed }
        });
    },
};