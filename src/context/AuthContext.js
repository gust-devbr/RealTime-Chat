"use client"

import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { apiFetch } from "@/utils/api";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadUser = useCallback(async () => {
        try {
            setLoading(true);
            const res = await apiFetch("/private/me");
            setUser(res?.data?.user || res?.data?.data?.user);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUser();
    }, [loadUser])

    async function login(phone, password) {
        try {
            const res = await apiFetch("/auth/login", {
                method: "POST",
                body: JSON.stringify({ phone, password })
            });
            return res;
        } catch (error) {
            console.error(error);
        }
    };

    async function register(name, phone, password) {
        try {
            const res = await apiFetch("/auth/register", {
                method: "POST",
                body: JSON.stringify({ name, phone, password })
            });
            return res;
        } catch (error) {
            console.error(error);
        }
    };

    async function logout() {
        await apiFetch("/auth/logout", { method: "POST" });
        setUser(null);
        router.replace("/screens/auth");
    };

    return (
        <AuthContext.Provider value={{ user, loading, loadUser, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth fora do provider");
    return context;
};