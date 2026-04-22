"use client"

import { InputGroup, InputGroupInput, InputGroupButton } from "@/components/ui/input-group";
import { apiFetch } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { MessageBubble } from "@/components/bubble/MessageBubble";
import { ChatHeader } from "@/components/layout/ChatHeader";
import { Send } from "lucide-react";

export default function ChatPage() {
    const { contactId } = useParams();
    const bottomRef = useRef()

    const { user } = useAuth()

    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)

    async function loadMessages() {
        if (!user?.id || !contactId) return;
        if (user.id === contactId) return;

        try {
            setLoading(true)
            const res = await apiFetch(`/private/message?senderId=${user.id}&receiverId=${contactId}`, { method: "GET" })
            const data = res.data.messages || []

            if (res.ok) {
                setMessages(data)
            } else {
                toast.error(res.message)
                setMessages([])
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    async function sendMessage() {
        if (!user?.id || !contactId) return;

        try {
            const res = await apiFetch(`/private/message?senderId=${user.id}&receiverId=${contactId}`, {
                method: "POST",
                body: JSON.stringify({ content: message })
            })
            if (!res.ok) {
                toast.error(res.message)
            }

            setMessage("")
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        loadMessages()

        const interval = setInterval(() => {
            loadMessages()
        }, [4000])

        return () => clearInterval(interval)
    }, [user?.id, contactId])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    return (
        <div ref={bottomRef} className="flex flex-col h-screen">
            <ChatHeader contactId={contactId} />

            <main className="border p-3 flex flex-col h-screen">
                {messages.length === 0 && (
                    <h1 className="text-center text-xl">Nenhuma mensagem encontrada</h1>
                )}

                <div>
                    {messages.map((msg) => (
                        <MessageBubble
                            key={msg.id}
                            message={msg}
                            currentUser={user}
                        />
                    ))}
                </div>

                <footer className="mt-auto md:mb-0 mb-15">
                    <InputGroup className="py-5">
                        <InputGroupInput
                            placeholder="Mensagem..."
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            className="md:text-xl md:placeholder:text-lg"
                        />
                        <InputGroupButton className="md:text-lg" disabled={!message} onClick={sendMessage}>
                            <Send className="w-7! h-7!" />
                        </InputGroupButton>
                    </InputGroup>
                </footer>
            </main>
        </div>
    )
}
