import { Response } from "next-lib-utils";
import { userService } from "@/services/userService";
import { getUserFromToken } from "@/utils/auth";
import bcrypt from "bcryptjs";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(req) {
    try {
        const user = await getUserFromToken();
        if (!user) return Response.error("Não autorizado", null, 401);

        const { password } = await req.json();

        const exist = await userService.getById(user.id);
        if (!exist) return Response.error("Usuário não encontrado", null, 404);

        const valid = await bcrypt.compare(password, exist.password);
        if (!valid) return Response.error("Senha incorreta", null, 401);

        if (exist.avatarId) {
            await cloudinary.uploader.destroy(exist.avatarId);
        }
        await userService.delete(user.id);

        return Response.success(null, "Conta excluída com sucesso");
    } catch (error) {
        return Response.error("Erro ao excluir conta", error);
    }
};

export async function PUT(req) {
    try {
        const user = await getUserFromToken();
        if (!user) return Response.error("Não autorizado", null, 401);

        const { name, phone } = await req.json();

        const exist = await userService.getById(user.id);
        if (!exist) return Response.error("Usuário não encontrado", null, 401);

        await userService.update(user.id, name, phone);

        return Response.success(null, "Dado(s) alterado(s)");
    } catch (error) {
        return Response.error("Erro ao alterar dados", error);
    }
};