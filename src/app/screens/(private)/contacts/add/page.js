"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search, X } from "lucide-react"
import { apiFetch } from "@/utils/api"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export default function AddContactPage() {
    const router = useRouter()

    const [contact, setContact] = useState(null)
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSearch() {
        if (!phone) {
            toast.error("Digite o telefone")
            return
        }

        setLoading(true)
        setContact(null)

        try {
            const data = await apiFetch(`/private/contact/add?contactPhone=${phone}`);

            if (data.ok) {
                setContact(data.data.contact)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    async function handleAdd() {
        if (!contact || !contact.id) return;

        try {
            const data = await apiFetch("/private/contact/add", {
                method: "POST",
                body: JSON.stringify({ contactId: contact.id })
            })

            if (data.ok) {
                toast.success("Contato adicionado")
                setTimeout(() => router.back(), 900)
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            console.error(err.message)
        }
    }

    function clearSearch() {
        setContact(null)
        setPhone("")
    }

    return (
        <div className="flex-1 md:p-4 p-5">
            <header className="flex flex-row justify-between items-center mb-10">
                <Button
                    onClick={() => router.back()}
                    className="flex flex-row gap-2 items-center py-5 bg-blue-600 hover:bg-blue-700 text-white md:text-lg"
                >
                    <ArrowLeft />
                    Voltar
                </Button>
                <h1 className="md:text-3xl text-xl font-serif">Adicionar Novo Contato</h1>
            </header>

            <Card>
                <CardContent className="space-y-5">
                    <h1 className="text-zinc-500 text-lg">Buscar pelo telefone</h1>
                    <InputGroup className="py-5">
                        <InputGroupInput
                            type="number"
                            placeholder="Digite o telefone"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            className="md:text-xl md:placeholder:text-lg"
                        />
                        <InputGroupAddon>
                            <Search className="w-5! h-5!" />
                        </InputGroupAddon>
                        <InputGroupButton onClick={handleSearch} className="md:text-lg">
                            Procurar
                        </InputGroupButton>
                    </InputGroup>

                    {loading && <h1 className="mt-5 md:text-2xl text-xl text-center">Carregando...</h1>}

                    {contact && (
                        <div className="flex flex-col border mt-5 p-4 shadow">
                            <Button variant="ghost" className="self-end" onClick={clearSearch}>
                                <X className="w-5! h-5!" />
                            </Button>
                            <Avatar className="w-15 h-15 -mt-8">
                                <AvatarImage
                                    src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                                    alt="user-icon"
                                />
                            </Avatar>
                            <p className="md:text-2xl text-xl mt-3">{contact.name}</p>
                            <p className="md:text-lg text-zinc-500">{contact.phone}</p>

                            <Button className="w-full mt-5 py-5 text-lg" onClick={handleAdd}>
                                Adicionar
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
};
