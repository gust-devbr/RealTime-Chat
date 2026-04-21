"use client"

import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover"
import { Button } from "../ui/button"
import { Ellipsis } from "lucide-react"
import { useRouter } from "next/navigation"

export function ChatOptionPortal({ contact }) {
    const router = useRouter()

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost">
                    <Ellipsis className="w-5! h-5!" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-20" align="end">
                <Button variant="ghost" onClick={() => router.push(`/screens/contacts/info/${contact.id}`)}>
                    Ver contato
                </Button>
            </PopoverContent>
        </Popover>
    )
};