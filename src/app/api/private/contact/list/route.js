import { Response } from "next-lib-utils";
import { contactService } from "@/services/contactService";
import { getUserFromToken } from "@/utils/auth";

export async function GET(req) {
    try {
        const user = await getUserFromToken();
        if (!user) return Response.error("Não autorizado", null, 401);

        const contacts = await contactService.getAll(user.id);
        if (!contacts) return Response.error("Contatos não encontrados", null, 404);

        return Response.success({ contacts });
    } catch (error) {
        return Response.error("Erro ao buscar contatos", error);
    }
};