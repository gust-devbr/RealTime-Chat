export async function apiFetch(url, options = {}) {
    const res = await fetch(`/api/${url}`, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        ...options
    });

    const data = await res.json();

    return {
        ok: res.ok,
        status: res.status,
        ...data
    };
};