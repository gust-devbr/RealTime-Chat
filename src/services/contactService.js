import { prisma } from "@/lib/prisma";

export const contactService = {
    getAll: async (userId) => {
        return await prisma.contact.findMany({
            where: { userId },
            select: {
                id: true,
                pinned: true,
                contact: {
                    select: {
                        id: true,
                        name: true,
                        phone: true
                    }
                }
            },
            orderBy: [
                { pinned: "desc" },
                { createdAt: "desc" }
            ]
        });
    },

    findExisting: async (userId, contactId) => {
        return await prisma.contact.findFirst({ where: { userId, contactId } });
    },

    getById: async (id) => {
        return await prisma.contact.findFirst({ where: { id } });
    },

    create: async (userId, contactId) => {
        return await prisma.contact.create({
            data: { userId, contactId }
        });
    },

    delete: async (id) => {
        await prisma.contact.delete({ where: { id } });
    },

    update: async (id) => {
        const contact = await prisma.contact.findFirst({ where: { id } });
        if (!contact) throw new Error("Contato não encontrado");
        await prisma.contact.update({
            where: { id },
            data: { pinned: !contact.pinned }
        });
    },

};