import { Response } from "next-lib-utils";
import { getUserFromToken } from "@/utils/auth";
import { msgService } from "@/services/msgService";

export async function DELETE(req, { params }) {
    try {
        const { id } = await params;
        const user = await getUserFromToken();
        if (!user) return Response.error("Não autorizado", null, 401);

        await msgService.delete(id);

        return Response.success(null, "Mensagem apagada");
    } catch (error) {
        return Response.error("Erro ao apagar mensagem", error);
    }
};

export async function PUT(req, { params }) {
    try {
        const { content } = await req.json();

        const user = await getUserFromToken();
        if (!user) return Response.error("Não autorizado", null, 401);

        const { id } = await params;

        const message = await msgService.update(content, id);

        return Response.success({ message }, "Mensagem editada");
    } catch (error) {
        return Response.error("Erro ao editar mensagem", error);
    }
}