"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { apiFetch } from "@/utils/api"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MessageSquareMore, Pin, Plus } from "lucide-react"
import { ContactOptionPortal } from "@/components/portal/ContactOptions"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export default function ContactsPage() {
    const router = useRouter()
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        async function loadContacts() {
            try {
                const res = await apiFetch("/private/contact/list", { method: "GET" })
                const data = res.data?.contacts ?? []
                setContacts(data)
            } catch (err) {
                console.error(err.message)
            }
        }
        loadContacts()
    }, [])

    return (
        <div className="flex-1 md:p-4 p-5">
            <header className="flex flex-row justify-between items-center mb-10">
                <h1 className="text-3xl font-serif">Contatos</h1>
                <Button
                    onClick={() => router.push("/screens/contacts/add")}
                    className="flex flex-row gap-2 items-center py-5 bg-blue-600 hover:bg-blue-700 text-white text-lg"
                >
                    <Plus size={40} />
                    Adicionar contato
                </Button>
            </header>

            <main className="border border-zinc-300">
                <Table>
                    <TableHeader className="bg-zinc-100 ">
                        <TableRow>
                            <TableHead className="text-lg text-zinc-500">Nome</TableHead>
                            <TableHead className="text-lg text-zinc-500">Telefone</TableHead>
                            <TableHead className="text-center text-lg text-zinc-500 md:text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contacts.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center text-xl mt-10">Nenhum contato encontrado</TableCell>
                            </TableRow>
                        )}
                        {contacts.map(contact => (
                            <TableRow key={contact.contact.id}>
                                <TableCell className="md:text-xl text-lg flex flex-row items-center gap-3">
                                    <TextPopup contact={contact} />
                                    {contact.contact.name}
                                </TableCell>
                                <TableCell className="text-zinc-600 md:text-xl">
                                    {contact.contact.phone}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        onClick={() => router.push(`/screens/chat/${contact.contact.id}`)}
                                        className="bg-blue-600 md:text-lg md:p-4"
                                    >
                                        <MessageSquareMore className="w-6! h-6! bg-transparent" color="white" />
                                        Mensagem
                                    </Button>
                                    <ContactOptionPortal contact={contact} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </main>
        </div>
    )
}

function TextPopup({ contact }) {
    return (
        <Tooltip>
            <TooltipTrigger>
                {contact.pinned && <Pin />}
            </TooltipTrigger>
            <TooltipContent className="bg-zinc-300">
                <p className="text-black text-[15px]">Fixado</p>
            </TooltipContent>
        </Tooltip>
    )
}
