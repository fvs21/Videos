import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRegister } from "@/features/register/api";
import { redirect } from "react-router";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { register, isPending } = useRegister();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        // Handle registration logic here
        
        try {
            await register({
                username,
                email,
                password
            });
            redirect("/")
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <main>
            <div className="max-w-[500px] mx-auto mt-30">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">Register</h1>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Register</CardTitle>
                        <CardDescription>
                            Register to watch videos
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleRegister}>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="username">
                                        Username
                                    </Label>
                                    <Input 
                                        id="username"
                                        type="text"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="email">
                                        Email
                                    </Label>
                                    <Input 
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="password">
                                        Password
                                    </Label>
                                    <Input 
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={handleRegister} disabled={isPending}>
                            Register
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </main>
    )
}