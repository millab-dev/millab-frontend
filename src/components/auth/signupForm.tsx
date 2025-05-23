"use client";

import Image from "next/image";
import authLogo from "@/assets/authLogo.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Eye, EyeOff, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

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

export default function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    // School list removed as it's no longer needed

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            password: "",
            gender: "Female",
            birthplace: "",
            socialization: "",
            email: "",
            phone: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsSubmitting(true);

            // Tampilkan loading toast
            const loadingToast = toast.loading("Creating your account...");

            // Mapping data form ke format API
            const registerData = {
                name: values.name,
                username: values.name.toLowerCase().replace(/\s+/g, '.'), // Generate username from name
                email: values.email,
                password: values.password,
                gender: values.gender,
                birthplace: values.birthplace,
                birthdate: values.birthdate.toISOString().split("T")[0], // Format YYYY-MM-DD
                socializationLocation: values.socialization,
                phoneNumber: values.phone || "",
            };

            // Direct fetch to API
            const response = await fetch(
                `${
                    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
                }/api/v1/auth/register`,
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

            // Dismiss loading toast
            toast.dismiss(loadingToast);

            if (data.success) {
                // Pendaftaran berhasil
                toast.success("Registration successful", {
                    description:
                        "Your account has been created. Redirecting to login...",
                    duration: 3000,
                });

                // Redirect ke halaman login setelah 1.5 detik
                setTimeout(() => {
                    router.push("/signin");
                }, 1500);
            } else {
                // Pendaftaran gagal
                toast.error("Registration failed", {
                    description:
                        data.error || "Something went wrong. Please try again.",
                });
            }
        } catch (error) {
            toast.error("Error during registration", {
                description:
                    error instanceof Error
                        ? error.message
                        : "Unknown error occurred",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center font-jakarta my-8 mx-5 sm:mx-0">
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
                        Sign Up
                    </h1>

                    <p className="text-center mb-8">
                        Sign up for free and start your
                        <br />
                        learning journey today.
                    </p>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name*</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Citra Lesmana"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Username field removed as requested */}

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password*</FormLabel>
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
                                        <FormLabel>Gender*</FormLabel>
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
                                                        Female
                                                    </label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem
                                                        value="Male"
                                                        id="Male"
                                                    />
                                                    <label htmlFor="Male">
                                                        Male
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
                                        <FormLabel>Birthplace*</FormLabel>
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
                                        <FormLabel>Birthdate*</FormLabel>
                                        <Popover>
                                            <PopoverTrigger
                                                asChild
                                                className="border-primary"
                                            >
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className="w-full pl-3 text-left font-normal flex justify-between items-center h-9"
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP"
                                                            )
                                                        ) : (
                                                            <span className="text-muted-foreground">
                                                                Input your
                                                                Birthdate
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="h-4 w-4 text-blue-500 ml-auto" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0 font-jakarta"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                    captionLayout="dropdown-buttons"
                                                    fromYear={1960}
                                                    toYear={2030}
                                                />
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
                                        <FormLabel>Email*</FormLabel>
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
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="citra123@gmail.com"
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
                                    ? "Creating Account..."
                                    : "Sign Up"}
                            </Button>
                        </form>
                    </Form>

                    <p className="text-center mt-6 text-muted-foreground font-medium">
                        Already have an account?{" "}
                        <Link
                            href="/signin"
                            className="font-bold text-foreground"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
