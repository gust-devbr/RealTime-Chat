export function getSearchParams(req) {
    const url = new URL(req.url);

    const senderId = url.searchParams.get("senderId");
    const receiverId = url.searchParams.get("receiverId");
    const contactPhone = url.searchParams.get("contactPhone");
    const contactId = url.searchParams.get("contactId");

    return { senderId, receiverId, contactPhone, contactId }
};