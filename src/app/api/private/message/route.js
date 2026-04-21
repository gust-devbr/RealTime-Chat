import { Response } from "next-lib-utils";
import { getUserFromToken } from "@/utils/auth";
import { msgService } from "@/services/msgService";
import { getSearchParams } from "@/utils/searchParams";

export async function GET(req) {
    try {
        const user = await getUserFromToken();
        if (!user) return Response.error("Não autorizado", null, 401);

        const { senderId, receiverId } = getSearchParams(req);

        const messages = await msgService.getAll(senderId, receiverId);
        if (!messages) return Response.error("Mensagens não encontradas", null, 404);

        return Response.success({ messages });
    } catch (error) {
        return Response.error("Erro ao buscar mensagens", error);
    }
};

export async function POST(req) {
    try {
        const user = await getUserFromToken();
        if (!user) return Response.error("Não autorizado", null, 401);

        const { senderId, receiverId } = getSearchParams(req);

        const { content } = await req.json();

        if (senderId === receiverId) return Response.error("Não pode enviar mensagens a si mesmo", null, 400);

        const message = await msgService.create(content, senderId, receiverId);

        return Response.success({ message });
    } catch (error) {
        return Response.error("Erro ao enviar mensagem", error);
    }
};