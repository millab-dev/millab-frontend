"use client";

import Image from "next/image";
import cloud from "@/assets/cloudPatternBlue.svg";
import { Language, signupTranslations } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Eye, EyeOff, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    username: z.string().min(1, "Username is required"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .refine(
            (password) => /[A-Z]/.test(password),
            "Password must contain at least one uppercase letter"
        )
        .refine(
            (password) => /[0-9]/.test(password),
            "Password must contain at least one number"
        )
        .refine(
            (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
            "Password must contain at least one special character"
        ),
    gender: z.enum(["Female", "Male"], {
        required_error: "Please select a gender",
    }),
    birthplace: z.string().min(1, "Birthplace is required"),
    birthdate: z.date({
        required_error: "Birthdate is required",
    }),
    socialization: z.string().min(1, "Socialization location is required"),
    email: z.string().email("Invalid email format"),
    phone: z.string().optional(),
});

export interface SignupFormProps {
    language?: Language;
}

export default function SignupForm({ language = 'id' }: SignupFormProps) {
    const t = signupTranslations[language];
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const router = useRouter();    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            username: "",
            password: "",
            gender: "Female",
            birthplace: "",
            socialization: "",
            email: "",
            phone: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        
        // Create a unique toast ID for the loading notification
        const loadingToastId = "signup-loading-" + Date.now();
        
        // Show initial loading toast
        toast.loading(t.creating, { id: loadingToastId });
        
        try {            // Mapping data form ke format API
            const registerData = {
                name: values.name,
                username: values.username,
                email: values.email,
                password: values.password,
                gender: values.gender,
                birthplace: values.birthplace,
                birthdate: values.birthdate.toISOString().split("T")[0], // Format YYYY-MM-DD
                socializationLocation: values.socialization,
                phoneNumber: values.phone || "",
            };

            // Menampilkan notifikasi saat fetch berjalan
            toast.info(language === 'id' ? "Sedang mendaftarkan akun..." : "Registering your account...", {
                id: loadingToastId + "-info",
                duration: 3000
            });
            
            // Direct fetch to API
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(registerData),
                    credentials: "include",
                    cache: "no-store",
                }
            );

            const data = await response.json();

            // Always dismiss the loading toast first
            toast.dismiss(loadingToastId);

            if (data.success) {
                // Pendaftaran berhasil - use a new unique ID for success toast
                const successToastId = "signup-success-" + Date.now();
                toast.success(language === 'id' ? "Pendaftaran berhasil" : "Registration successful", {
                    id: successToastId,
                    description: language === 'id' ? "Akun berhasil dibuat. Mengalihkan ke halaman login..." : "Your account has been created. Redirecting to login...",
                    duration: 3000,
                });

                // Redirect ke halaman login setelah 1.5 detik
                setTimeout(() => {
                    router.push("/signin");
                }, 1500);
            } else {
                // Pendaftaran gagal - use a new unique ID for error toast
                const errorToastId = "signup-error-" + Date.now();
                toast.error(language === 'id' ? "Pendaftaran gagal" : "Registration failed", {
                    id: errorToastId,
                    description: data.error || (language === 'id' ? "Terjadi kesalahan. Silakan coba lagi." : "Something went wrong. Please try again."),
                    duration: 5000, // Keep error message visible for 5 seconds
                });
            }
        } catch (error) {
            // Make sure to dismiss the loading toast before showing error
            toast.dismiss(loadingToastId);
            
            // Show error toast with a new unique ID
            const catchErrorToastId = "signup-catch-error-" + Date.now();
            toast.error(language === 'id' ? "Terjadi kesalahan saat pendaftaran" : "Error during registration", {
                id: catchErrorToastId,
                description: error instanceof Error ? error.message : (language === 'id' ? "Terjadi kesalahan yang tidak diketahui" : "Unknown error occurred"),
                duration: 5000, // Keep error message visible for 5 seconds
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleGoogleSignIn() {
        try {
            setIsGoogleLoading(true);
            
            // Redirect to backend Google OAuth endpoint
            window.location.href = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/auth/google/redirect`;
            
        } catch (error: any) {
            console.error("Google Sign-In error:", error);
            toast.error(language === 'id' ? "Masuk dengan Google gagal. Silakan coba lagi." : "Google Sign-In failed. Please try again.");
            setIsGoogleLoading(false);
        }
    }

    return (
        <div 
            className="flex min-h-screen pb-12 pt-8 items-center justify-center font-jakarta overflow-x-hidden bg-[#F8F8F8] bg-repeat bg-[length:600px] lg:bg-[length:800px]"
            style={{
                backgroundImage: `url(${cloud.src})`,
            }}
        >
            <div className="w-full max-w-md px-4">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <Image
                        src="/millab-logo.svg"
                        alt="MIL Logo"
                        className="object-contain"
                        height={200}
                        width={200}
                    />
                </div>

                <div className="bg-white rounded-xl shadow-[0_0_10px_0_rgba(0,0,0,0.27)] p-8">
                    <h1 className="text-2xl font-bold tracking-tight text-center mb-2">
                        {t.title}
                    </h1>

                    <p className="text-sm text-center text-muted-foreground mb-6">
                        {t.welcome}
                    </p>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t.name}</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Isa Citra Buana"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>                                )}
                            />

                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t.username}</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="isacitra"
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
                                        <FormLabel>{t.password}</FormLabel>
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
                            />

                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t.gender}</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                className="flex gap-6 mt-1"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem
                                                        value="Female"
                                                        id="Female"
                                                    />
                                                    <label htmlFor="Female">
                                                        {t.female}
                                                    </label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem
                                                        value="Male"
                                                        id="Male"
                                                    />
                                                    <label htmlFor="Male">
                                                        {t.male}
                                                    </label>
                                                </div>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="birthplace"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t.birthplace}</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Solo"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="birthdate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>{t.birthdate}</FormLabel>
                                        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"} flex justify-between items-center`}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>{language === 'id' ? "Pilih tanggal" : "Pick a date"}</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 text-primary" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <div className="p-3">
                                                    <DayPicker
                                                        mode="single"
                                                        captionLayout="dropdown"
                                                        selected={field.value}
                                                        onSelect={(date) => {
                                                            field.onChange(date);
                                                            setCalendarOpen(false);
                                                        }}
                                                        disabled={{
                                                            before: new Date("1900-01-01"),
                                                            after: new Date()
                                                        }}
                                                    />
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="socialization"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            School/Socialization Location*
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="SMA Negeri 3 Solo"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t.email}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="citra123@gmail.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t.phone}</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="08123456789"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full py-5 mt-4"
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? t.creating
                                    : t.signUp}
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
                                    {t.orContinueWith}
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
                                t.signingWithGoogle
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
                                    {t.continueWithGoogle}
                                </>
                            )}
                        </Button>
                    </div>

                    <p className="text-center mt-6 text-muted-foreground font-medium">
                        {t.alreadyHaveAccount}{" "}
                        <Link
                            href="/signin"
                            className="font-bold text-foreground"
                        >
                            {t.signIn}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
