import { Response } from "next-lib-utils";
import { userService } from "@/services/userService";
import { getUserFromToken } from "@/utils/auth";

export async function GET(req) {
    try {
        const user = await getUserFromToken();
        if (!user) return Response.error("Não autorizado", null, 401);

        const findUser = await userService.getById(user.id);
        if (!findUser) return Response.error("Usuário não encontrado", null, 404);

        return Response.success({ user: findUser });
    } catch (error) {
        return Response.error("Erro ao buscar usuário", error);
    }
};