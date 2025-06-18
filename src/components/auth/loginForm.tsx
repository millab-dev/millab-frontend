"use client";

import Image from "next/image";
import authLogo from "@/assets/authLogo.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import Link from "next/link";

const formSchema = z.object({
    email: z.string().email("Email tidak valid"),
    password: z.string().min(1, "Password harus diisi"),
});

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Handle OAuth error messages
    useEffect(() => {
        const error = searchParams.get('error');
        if (error) {
            switch (error) {
                case 'oauth_cancelled':
                    toast.error('Google sign-in was cancelled');
                    break;
                case 'oauth_failed':
                    toast.error('Google sign-in failed. Please try again.');
                    break;
                case 'oauth_error':
                    toast.error('An error occurred during Google sign-in');
                    break;
                default:
                    toast.error('An error occurred. Please try again.');
            }
            // Clear the error from URL
            const url = new URL(window.location.href);
            url.searchParams.delete('error');
            window.history.replaceState({}, '', url.toString());
        }
    }, [searchParams]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/v1/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                    credentials: "include",
                    cache: "no-store",
                }
            );

            const data = await response.json();

            if (data.success) {
                toast.success("Login berhasil!");
                router.push("/app");
            } else {
                toast.error(data.error || "Login gagal");
            }        } catch (error) {
            toast.error("Terjadi kesalahan saat login");
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    }    async function handleGoogleSignIn() {
        try {
            setIsGoogleLoading(true);
            
            // Redirect to backend Google OAuth endpoint
            window.location.href = `https://api.millabindonesia.com/api/v1/auth/google/redirect`;
            
        } catch (error: any) {
            console.error("Google Sign-In error:", error);
            toast.error("Google Sign-In failed. Please try again.");
            setIsGoogleLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center font-jakarta mx-5 sm:mx-0">
            <div className="w-full max-w-md">
                <div className="flex items-center justify-center gap-2 mb-8">
                    <Image
                        src={authLogo}
                        alt="MIL Logo"
                        className="object-contain"
                    />
                </div>

                <div className="bg-white rounded-xl shadow-[0_0_10px_0_rgba(0,0,0,0.27)] p-8">
                    <h1 className="text-4xl font-bold text-center mb-4">
                        Sign In
                    </h1>

                    <p className="text-center mb-8">
                        Welcome to MilBoard, please enter
                        <br />
                        your login details to continue learning.
                    </p>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="user@example.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input
                                                    type={
                                                        showPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    placeholder="*********"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4 text-primary" />
                                                ) : (
                                                    <Eye className="h-4 w-4 text-primary" />
                                                )}
                                            </Button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />                            <Button
                                type="submit"
                                className="w-full py-5"
                                disabled={isLoading}
                            >
                                {isLoading ? "Loading..." : "Sign In"}
                            </Button>
                        </form>
                    </Form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full mt-6 py-5"
                            onClick={handleGoogleSignIn}
                            disabled={isGoogleLoading}
                        >
                            {isGoogleLoading ? (
                                "Signing in with Google..."
                            ) : (
                                <>
                                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    Continue with Google
                                </>
                            )}
                        </Button>
                    </div>

                    <p className="text-center mt-6 text-muted-foreground font-medium">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/signup"
                            className="font-bold text-foreground"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
