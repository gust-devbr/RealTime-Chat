"use client"

import { DeleteContactDialog } from "@/components/dialog/DeleteContact";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { apiFetch } from "@/utils/api";
import { CalendarDays, MessageCircle, Phone } from "lucide-react";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

const formatDate = (date) => new Date(date).toLocaleDateString("pt-BR");

export default function InfoContactPage() {
    const router = useRouter()
    const { contactId } = useParams()

    const [contact, setContact] = useState(null)

    useEffect(() => {
        async function loadContact() {
            try {
                const res = await apiFetch(`/private/contact/${contactId}`, { method: "GET" })
                setContact(res.data.contact || res.data.data.contact || null)
            } catch (error) {
                console.error(error)
            }
        }
        loadContact()
    }, [])

    return (
        <div className="flex justify-center items-center h-screen px-5">
            <header className="border-2 rounded-xl flex flex-col gap-3 w-200 py-5 items-center">
                <section>
                    <Avatar className="w-30 h-30 items-center">
                        <AvatarImage
                            src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                            alt="user-icon"
                        />
                    </Avatar>
                </section>

                <section className="flex flex-col justify-center items-center">
                    <p className="md:text-3xl text-xl">{contact?.name}</p>
                    <p className="text-zinc-500 md:text-lg">{contact?.phone}</p>
                </section>

                <main className="flex flex-col  w-full">
                    <section className="w-full h-8 bg-zinc-100 flex p-5 items-center mb-4">
                        <p className="text-zinc-500 md:text-xl">Informações do Contato</p>
                    </section>

                    <section className="px-4 space-y-4">
                        <div className="flex flex-row items-center gap-5 text-lg md:text-xl text-zinc-600">
                            <Phone />
                            {contact?.phone}
                        </div>

                        <div className="flex flex-row justify-between items-center text-lg md:text-xl text-zinc-600">
                            <p className="flex flex-row gap-5">
                                <CalendarDays />
                                Adicionado em:
                            </p>
                            <p>{formatDate(contact?.createdAt)}</p>
                        </div>

                        <div>
                            <Button
                                onClick={() => router.back()}
                                className="bg-blue-600 md:text-lg p-5 w-full"
                            >
                                <MessageCircle className="w-6! h-6! bg-transparent" color="white" />
                                Mensagem
                            </Button>
                        </div>

                        <Separator />

                        <footer>
                            <DeleteContactDialog
                                contact={contact}
                                btnStyle="w-full text-lg py-5"
                                btnVariant="outline"
                            />
                        </footer>
                    </section>
                </main>
            </header>
        </div>
    )
};