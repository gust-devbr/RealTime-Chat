import { Response } from "next-lib-utils";
import { contactService } from "@/services/contactService";
import { userService } from "@/services/userService";
import { getUserFromToken } from "@/utils/auth";
import { getSearchParams } from "@/utils/searchParams";

export async function GET(req) {
    try {
        const { contactPhone } = getSearchParams(req);

        const user = await getUserFromToken();
        if (!user) return Response.error("Não autorizado", null, 401);

        const contact = await userService.getByPhone(contactPhone);
        if (!contact) return Response.error("Contato não encontrado", null, 404);

        return Response.success({ contact });
    } catch (error) {
        return Response.error("Erro ao encontrar contato", error);
    }
};

export async function POST(req) {
    try {
        const { contactId } = await req.json();

        const user = await getUserFromToken();
        if (!user) return Response.error("Não autorizado", null, 401);

        if (user.id === contactId) return Response.error("Não pode adicionar a si mesmo", null, 400);

        const existing = await contactService.findExisting(user.id, contactId);
        if (existing) return Response.error("Contato já adicionado", null, 409);

        const contact = await contactService.create(user.id, contactId);

        return Response.success({ contact });
    } catch (error) {
        return Response.error("Erro ao criar contato", error);
    }
};