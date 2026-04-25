import { Response } from "next-lib-utils";
import { userService } from "@/services/userService";
import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/utils/auth";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(req) {
    try {
        const user = await getUserFromToken();
        if (!user) return Response.error("Não autorizado", null, 401);

        const find = await userService.getById(user.id);

        if (!find) return Response.error("Usuário não encontrado", null, 404);
        if (!find.avatarId) return Response.error("Usuário não possui avatar", null, 400);

        await cloudinary.uploader.destroy(find.avatarId);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                avatar: null,
                avatarId: null
            }
        });

        return Response.success(null, "Avatar removido");
    } catch (error) {
        return Response.error("Erro ao remover avatar", error);
    }
};