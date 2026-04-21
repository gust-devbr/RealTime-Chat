import { Response } from "next-lib-utils";
import { userService } from "@/services/userService";
import { jwtUtil } from "@/utils/jwt";

export async function POST(req) {
    try {
        const { name, phone, password } = await req.json();

        const user = await userService.getByPhone(phone);
        if (user) return Response.error("Telefone já registrado", null, 409);

        const createUser = await userService.create(name, phone, password);

        const token = jwtUtil.generate(createUser);

        const res = Response.success({ user: createUser }, "Cadastrado com sucesso", 201);
        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
            path: "/"
        });
        return res;
    } catch (error) {
        return Response.error("Erro ao cadastrar", error);
    }
};