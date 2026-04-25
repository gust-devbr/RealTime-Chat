import { Response } from "next-lib-utils";
import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/utils/auth";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
    try {
        const user = await getUserFromToken();
        if (!user) return Response.error("Não autorizado", null, 401);

        const data = await req.formData();
        const file = data.get("file");

        if (!file) return Response.error("Nenhum arquivo enviado", null, 400);
        if (!file.type.startsWith("image/")) return Response.error("Arquivo inválido", null, 400);

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const upload = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "uploads" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });

        await prisma.user.update({
            where: { id: user.id },
            data: {
                avatar: upload.secure_url,
                avatarId: upload.public_id
            }
        })

        return Response.success(null, "Avatar salvo com sucesso");
    } catch (error) {
        return Response.error("Erro ao enviar imagem", error)
    }
}