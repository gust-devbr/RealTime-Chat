"use client"

import { useAuth } from "@/context/AuthContext";
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
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

export function LogoutDialog() {
    const { logout } = useAuth()

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" className="flex flex-row items-center gap-4 text-[18px] text-red-600 hover:text-red-700">
                    <LogOut className="w-5! h-5!" />
                    Logout
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Sair da conta</AlertDialogTitle>
                    <AlertDialogDescription>
                        Deseja realmente sair da conta?
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={logout}>
                        Continuar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )

};