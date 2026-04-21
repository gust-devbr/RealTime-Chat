import { Response } from "next-lib-utils";
import { contactService } from "@/services/contactService";
import { getUserFromToken } from "@/utils/auth";
import { userService } from "@/services/userService";

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        const user = await getUserFromToken();
        if (!user) return Response.error("Não autorizado", null, 401);

        const contact = await userService.getById(id);
        if (!contact) return Response.error("Contato não encontrado", null, 404);

        return Response.success({ contact });
    } catch (error) {
        return Response.error("Erro ao buscar contato", error);
    }
};

export async function DELETE(req, { params }) {
    try {
        const { id } = await params;
        const user = await getUserFromToken();
        if (!user) return Response.error("Não autorizado", null, 401);

        await contactService.delete(id);

        return Response.success(null, "Contato excluído");
    } catch (error) {
        return Response.error("Erro ao excluir contato", error)
    }
};

export async function PATCH(req, { params }) {
    try {
        const { id } = await params;
        const user = await getUserFromToken();
        if (!user) return Response.error("Não autorizado", null, 401);

        await contactService.update(id);

        return Response.success(null, "Contato fixado");
    } catch (error) {
        return Response.error("Erro ao fixar contato", error);
    }
};