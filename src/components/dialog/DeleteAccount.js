"use client"

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogAction,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogTrigger,
    AlertDialogHeader,
    AlertDialogFooter
} from "../ui/alert-dialog";
import { apiFetch } from "@/utils/api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export function DeleteAccountDialog() {
    const { logout } = useAuth()

    const [password, setPassword] = useState("")

    async function deleteAccount() {
        try {
            const data = await apiFetch("/private/user", {
                method: "DELETE",
                body: JSON.stringify({ password })
            });
            if (data.ok) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
                return;
            }

            setTimeout(() => logout(), 800)
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" className="p-5 text-lg">
                    Deletar Conta
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="space-y-5">
                <AlertDialogHeader>
                    <AlertDialogTitle>Deletar conta</AlertDialogTitle>
                    <AlertDialogDescription>
                        Digite sua senha para confirmar
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div>
                    <Input
                        placeholder="Sua Senha:"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="text-lg py-6"
                    />
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteAccount}>
                        Confirmar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )

};