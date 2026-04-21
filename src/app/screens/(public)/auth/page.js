"use client"

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

export default function AuthPage() {
    const router = useRouter();
    const { login, register } = useAuth();

    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        phone: "",
        password: ""
    });

    async function handleSubmit(e) {
        e.preventDefault();
        const { name, phone, password } = form;

        if (!isLogin && !name || !phone || !password) {
            toast.error("Complete os campos")
            return
        }

        try {
            setLoading(true)

            const data = isLogin
                ? await login(phone, password)
                : await register(name, phone, password)

            if (data.ok) {
                toast.success(data.message)
                setTimeout(() => router.replace("/screens/contacts"), 800)
            } else {
                toast.error(data.message)
                return;
            }
        } catch (err) {
            console.error(err.message)
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="p-5 flex justify-center items-center h-screen">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-2xl">{isLogin ? "Login" : "Cadastro"}</CardTitle>
                    <CardAction>
                        <Button
                            className="text-lg"
                            variant="link"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? "Login" : "Cadastro"}
                        </Button>
                    </CardAction>
                </CardHeader>

                <CardContent>
                    <div className="space-y-1">

                        {!isLogin && (
                            <>
                                <Label className="text-lg" htmlFor="name">Nome</Label>
                                <Input
                                    id="name"
                                    autoFocus={!isLogin}
                                    value={form.name}
                                    onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                                    className="py-5 text-lg"
                                />
                            </>
                        )}

                        <Label className="text-lg" htmlFor="phone">Telefone</Label>
                        <Input
                            id="phone"
                            type="number"
                            autoFocus={isLogin}
                            value={form.phone}
                            onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                            className="py-5 text-lg"
                        />

                        <Label className="text-lg" htmlFor="password">Senha</Label>
                        <Input
                            id="password"
                            value={form.password}
                            onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
                            className="py-5 text-lg"
                        />

                        <Button
                            onClick={handleSubmit}
                            className="w-full py-5 text-lg mt-5"
                        >
                            {loading
                                ? <Spinner className="w-5! h-5!" />
                                : (isLogin ? "Entrar" : "Cadastrar")
                            }
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
};