"use client"

import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover"
import { Button } from "../ui/button"
import { ChevronsUpDown, Cog, Ellipsis, Pin, PinOff } from "lucide-react"
import { DeleteContactDialog } from "../dialog/DeleteContact"
import { LogoutDialog } from "../dialog/Logout"

export function UserOptionPortal() {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost">
                    <ChevronsUpDown className="w-5! h-5!" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-40">
                <LogoutDialog />

                <Button variant="ghost" className="text-lg">
                    <Cog className="w-5! h-5!" />
                    Configurações
                </Button>
            </PopoverContent>
        </Popover>
    )
};