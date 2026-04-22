"use client"

import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { useAuth } from "@/context/AuthContext"
import { apiFetch } from "@/utils/api"
import { toast } from "sonner"

export function UpdateUserDialog() {
    const { user, logout } = useAuth()

    const [form, setForm] = useState(null);

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name,
                phone: user.phone
            })
        } else {
            setForm(null)
        }
    }, [user])

    async function handleUpdate(e) {
        e.preventDefault()
        const { name, phone } = form;

        if (!name || !phone) return;

        try {
            const data = await apiFetch("/private/user", {
                method: "PUT",
                body: JSON.stringify({
                    ...(name && { name }),
                    ...(phone && { phone }),
                })
            })

            if (data.ok) {
                toast.success(data.message)
                setTimeout(() => logout(), 800)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" className="w-full p-5 text-xl bg-blue-600 hover:bg-blue-700 text-white mt-5">
                    Editar
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl">Editar Dados</DialogTitle>
                    <DialogDescription>
                        Caso confirme, você será desconectado, precisando inserir os novos dados.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-3">
                    <Input
                        placeholder="Nome"
                        value={form?.name}
                        onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <Input
                        placeholder="Telefone"
                        value={form?.phone}
                        onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                    />
                </div>

                <DialogFooter>
                    <DialogClose>
                        <Button className="w-full">Cancelar</Button>
                    </DialogClose>
                    <Button onClick={handleUpdate}>
                        Salvar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}