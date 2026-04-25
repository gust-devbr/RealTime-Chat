"use client"

import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover"
import { Button } from "../ui/button"
import { Ellipsis } from "lucide-react"
import { apiFetch } from "@/utils/api"
import { toast } from "sonner"

export function AvatarOptionsPortal({ onUpload }) {

    async function handleDelete() {
        const data = await apiFetch("/private/avatar/remove", { method: "DELETE" });
        toast.success(data.message)
        setTimeout(() => window.location.reload(), 700)
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost">
                    <Ellipsis className="w-5! h-5!" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-20" align="end">
                <Button variant="ghost" onClick={onUpload}>
                    Alterar
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                    Remover
                </Button>
            </PopoverContent>
        </Popover>
    )
};