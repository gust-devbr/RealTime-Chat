"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { apiFetch } from "@/utils/api";
import { MoreVertical, Copy, Trash } from "lucide-react"
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function formatTime(date) {
    const d = new Date(date);

    return d.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function MessageBubble({ message, currentUser }) {
    const router = useRouter()
    const isMine = message?.senderId === currentUser?.id;

    function handleCopy() {
        navigator.clipboard.writeText(message.content);
        toast.success("Mensagem copiada!")
    }

    async function handleDelete() {
        try {
            apiFetch(`/private/message/${message.id}`, { method: "DELETE" })
            setTimeout(() => router.refresh(), 400)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={`flex w-full mb-2 ${isMine ? "justify-end" : "justify-start"}`}>

            <div className={`group flex items-end gap-2 max-w-[75%] ${isMine ? "flex-row-reverse" : ""}`}>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="opacity-0 group-hover:opacity-100 transition">
                            <MoreVertical size={16} />
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align={isMine ? "end" : "start"}>
                        <DropdownMenuItem onClick={handleCopy}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copiar
                        </DropdownMenuItem>

                        {isMine && (
                            <DropdownMenuItem onClick={handleDelete} className="text-red-500">
                                <Trash className="mr-2 h-4 w-4" />
                                Deletar
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>

                <div
                    className={`
                    px-4 py-2 rounded-2xl text-sm
                    ${isMine
                            ? "bg-blue-600 text-white rounded-br-none"
                            : "bg-gray-200 text-black rounded-bl-none"}
                    `}
                >
                    {message.content}
                </div>

                <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formatTime(message.createdAt)}
                </span>

            </div>
        </div>
    );
}