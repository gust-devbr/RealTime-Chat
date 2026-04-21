import { prisma } from "@/lib/prisma";

export const msgService = {
    getAll: async (senderId, receiverId) => {
        return await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: senderId, receiverId: receiverId },
                    { senderId: receiverId, receiverId: senderId }
                ]
            },
            orderBy: { createdAt: "asc" }
        });
    },

    create: async (content, senderId, receiverId) => {
        return await prisma.message.create({
            data: { content, senderId, receiverId }
        });
    },

    delete: async (id) => {
        if (!id) throw new Error("ID não fornecido");
        await prisma.message.delete({ where: { id } });
    },

    update: async (content, id) => {
        if (!id) throw new Error("ID não fornecido");
        return await prisma.message.update({
            where: { id },
            data: { content }
        });
    },

};