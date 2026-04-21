"use client"

import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover"
import { Button } from "../ui/button"
import { Ellipsis, Pin, PinOff } from "lucide-react"
import { apiFetch } from "@/utils/api"
import { DeleteContactDialog } from "../dialog/DeleteContact"

export function ContactOptionPortal({ contact }) {

    async function pinnedContact(id) {
        await apiFetch(`/private/contact/${id}`, { method: "PATCH" });
        setTimeout(() => window.location.reload(), 400)
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost">
                    <Ellipsis className="w-6! h-6!" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-30">
                <DeleteContactDialog contact={contact} btnVariant="ghost" />

                <Button
                    onClick={() => pinnedContact(contact.id)}
                    variant="ghost"
                >
                    {contact.pinned ? (
                        <>
                            <PinOff />
                            Desfixar
                        </>
                    ) : (
                        <>
                            <Pin />
                            Fixar
                        </>
                    )}
                </Button>
            </PopoverContent>
        </Popover>
    )
};