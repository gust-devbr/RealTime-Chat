"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { UpdateUserDialog } from "@/components/dialog/UpdateUser"
import { DeleteAccountDialog } from "@/components/dialog/DeleteAccount"
import { useRef, useState } from "react"
import { AvatarOptionsPortal } from "@/components/portal/AvatarOptions"

export default function SettingsPage() {
    const router = useRouter()
    const { user, loading } = useAuth()

    const fileRef = useRef(null)
    const [preview, setPreview] = useState(null)
    const [uploading, setUploading] = useState(false)

    async function handleSelect(e) {
        const file = e.target.files[0]
        if (!file) return

        const localUrl = URL.createObjectURL(file)
        setPreview(localUrl)

        try {
            setUploading(true)

            const formData = new FormData()
            formData.append("file", file)

            const res = await fetch("/api/private/avatar/upload", {
                method: "POST",
                body: formData
            });

            const data = await res.json();

            setPreview(data.url)
            window.location.reload()
        } catch (err) {
            console.error(err)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="flex-1 md:p-4 p-5 space-y-5">
            <header className="flex flex-col md:gap-10 gap-8">
                <h1 className="md:text-4xl text-3xl font-semibold">Configurações do Usuário</h1>
                <h2 className="text-2xl">Perfil do Usuário</h2>
            </header>

            <Card>
                <CardContent className="flex md:flex-row md:justify-between flex-col gap-4">
                    <section className="flex flex-1 flex-col justify-center items-center gap-3">
                        <div className="relative cursor-pointer">
                            <Avatar className="w-60 h-60">
                                <AvatarImage
                                    src={
                                        preview ||
                                        user?.avatar ||
                                        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                                    }
                                    alt="user-avatar"
                                />
                            </Avatar>

                            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-1 py-1 rounded">
                                {uploading
                                    ? "Enviando..."
                                    : (
                                        <AvatarOptionsPortal onUpload={() => fileRef.current.click()} />
                                    )}
                            </div>
                        </div>

                        <input
                            type="file"
                            ref={fileRef}
                            hidden
                            accept="image/*"
                            onChange={handleSelect}
                        />
                    </section>

                    <section className="space-y-2 px-3 md:w-260">
                        <Label className="text-lg -mb-1" htmlFor="name">Nome</Label>
                        <p className="border py-3 px-2 rounded-lg bg-zinc-100 text-lg">
                            {loading && !user ? "Carregando..." : user?.name}
                        </p>

                        <Label className="text-lg -mb-1" htmlFor="phone">Telefone</Label>
                        <p className="border py-3 px-2 rounded-lg bg-zinc-100 text-lg">
                            {loading && !user ? "Carregando..." : user?.phone}
                        </p>

                        <footer>
                            <UpdateUserDialog />
                            <Button className="w-full p-5 mt-2 text-xl" variant="secondary" onClick={() => router.back()}>
                                Cancelar
                            </Button>
                        </footer>
                    </section>
                </CardContent>

                <CardFooter>
                    <div className="flex flex-col gap-3">
                        <h1 className="text-xl">Segurança</h1>

                        <DeleteAccountDialog />
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
};