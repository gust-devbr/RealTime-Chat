"use client"

function formatTime(date) {
    const d = new Date(date);

    return d.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function MessageBubble({ message, currentUser }) {
    const isMine = message.senderId === currentUser.id;

    return (
        <div className={`flex w-full mb-2 ${isMine ? "justify-end" : "justify-start"}`}>

            <div className={`flex items-end gap-2 max-w-[75%] ${isMine ? "flex-row-reverse" : ""}`}>

                <div
                    className={`
                    px-4 py-2 rounded-2xl text-sm
                    ${isMine
                            ? "bg-blue-600 text-white rounded-br-none"
                            : "bg-gray-200 text-black rounded-bl-none"}
                    `}
                >
                    {message.content}
                </div>

                <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formatTime(message.createdAt)}
                </span>

            </div>
        </div>
    );
}