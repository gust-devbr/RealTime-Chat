import { Avatar, AvatarImage } from "../ui/avatar";
import { useAuth } from "@/context/AuthContext";

export function ContactsFooter() {
    const { user } = useAuth()

    return (
        <div className="border p-3 flex flex-row justify-start items-center">
            <main className="flex flex-row gap-3 items-center">
                <Avatar className="w-13 h-13 items-center">
                    <AvatarImage
                        src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                        alt="user-icon"
                    />
                </Avatar>

                <div className="flex flex-col">
                    <p className="md:text-2xl text-lg">{user?.name}</p>
                    <p className="text-zinc-500 md:text-lg">{user?.phone}</p>
                </div>
            </main>
        </div>
    )
}