'use client'

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
} from "@/components/ui/sidebar"
import { ContactRound } from "lucide-react"
import { Avatar, AvatarImage } from "../ui/avatar"
import { useAuth } from "@/context/AuthContext"
import { UserOptionPortal } from "../portal/UserOptions"

export function AppSidebar() {
    const { user } = useAuth()

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="flex flex-row gap-3 mt-5 items-center text-[28px]">
                        <ContactRound className="text-blue-700 w-8! h-8!" />
                        <p className="font-semibold">MeusContatos</p>
                    </SidebarGroupLabel>

                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>

                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <main className="flex flex-row justify-between items-center">
                    <section className="flex flex-row gap-2">
                        <Avatar className="w-13 h-13">
                            <AvatarImage
                                src={user?.avatar || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
                                alt="user-icon"
                            />
                        </Avatar>

                        <div className="flex flex-col">
                            <p className="md:text-xl text-lg">{user?.name}</p>
                            <p className="text-zinc-500 md:text-[16px]">{user?.phone}</p>
                        </div>
                    </section>

                    <UserOptionPortal />
                </main>
            </SidebarFooter>
        </Sidebar>
    )
};