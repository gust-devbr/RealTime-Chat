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
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export function DeleteContactDialog({ contact, btnStyle, btnVariant }) {
    const router = useRouter()

    async function deleteContact(id) {
        await apiFetch(`/private/contact/${id}`, { method: "DELETE" });
        setTimeout(() => router.replace("/screens/contacts"), 400)
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant={btnVariant}
                    className={`text-red-400 hover:text-red-500 ${btnStyle}`}
                >
                    <Trash />
                    Deletar
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Deletar contato</AlertDialogTitle>
                    <AlertDialogDescription>
                        Deseja realmente deletar esse contato?
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteContact(contact.id)}>
                        Continuar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )

};