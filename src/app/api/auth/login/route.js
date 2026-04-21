import { Response } from "next-lib-utils";
import { userService } from "@/services/userService";
import { jwtUtil } from "@/utils/jwt";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { phone, password } = await req.json();

        const user = await userService.getByPhone(phone);
        if (!user) return Response.error("Usuário não encontrado", null, 404);

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return Response.error("Credenciais inválidas", null, 401);

        const token = jwtUtil.generate(user);

        const safeUser = {
            id: user.id,
            name: user.name,
            phone: user.phone,
            createdAt: user.createdAt
        };

        const res = Response.success({ user: safeUser }, "Logado com sucesso");
        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
            path: "/"
        });
        return res;
    } catch (error) {
        return Response.error("Erro ao logar", error);
    }
};