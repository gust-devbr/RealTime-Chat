"use client"

import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { apiFetch } from "@/utils/api";
import { ChatOptionPortal } from "../portal/ChatOptions";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function ChatHeader({ contactId }) {
    const router = useRouter()
    const [contact, setContact] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function loadContact() {
            try {
                setLoading(true)
                const res = await apiFetch(`/private/contact/${contactId}`, { method: "GET" })
                setContact(res.data.contact || res.data.data.contact || null)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        loadContact()
    }, [])

    return (
        <header className="border p-4 flex flex-row justify-between items-center">
            <main className="flex flex-row gap-3 items-center">
                <Button variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="w-6! h-6!" />
                </Button>

                <Avatar className="w-13 h-13 items-center">
                    <AvatarImage
                        src={contact?.avatar || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
                        alt="user-icon"
                    />
                </Avatar>

                <div className="flex flex-col">
                    <p className="md:text-2xl text-lg">{contact?.name}</p>
                    <p className="text-zinc-500 md:text-lg">{contact?.phone}</p>
                </div>
            </main>

            {!loading && (
                <ChatOptionPortal
                    contact={contact}
                />
            )}
        </header>
    )
}