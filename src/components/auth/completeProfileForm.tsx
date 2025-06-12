"use client";

import Image from "next/image";
import authLogo from "@/assets/authLogo.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
    username: z.string().min(1, "Username is required"),
    gender: z.enum(["Female", "Male"], {
        required_error: "Please select a gender",
    }),
    birthplace: z.string().min(1, "Birthplace is required"),
    birthdate: z.date({
        required_error: "Birthdate is required",
    }),
    socialization: z.string().min(1, "Socialization location is required"),
    phone: z.string().optional(),
});

export default function CompleteProfileForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    // Static schools data
    const schools = [
        { id: "school1", name: "School 1" },
        { id: "school2", name: "School 2" },
        { id: "school3", name: "School 3" },
        { id: "school4", name: "SMA Negeri 1 Jakarta" },
        { id: "school5", name: "SMA Negeri 3 Solo" },
    ];

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            gender: "Female",
            birthplace: "",
            socialization: "",
            phone: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsSubmitting(true);

            const loadingToast = toast.loading("Completing your profile...");

            // Mapping data form to API format
            const profileData = {
                username: values.username,
                gender: values.gender,
                birthplace: values.birthplace,
                birthdate: values.birthdate.toISOString().split("T")[0], // Format YYYY-MM-DD
                socializationLocation: values.socialization,
                phoneNumber: values.phone || "",
            };

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/auth/complete-profile`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include", // Include cookies for authentication
                    body: JSON.stringify(profileData),
                }
            );

            const data = await response.json();

            toast.dismiss(loadingToast);            if (data.success) {
                toast.success("Profile completed successfully!");
                // Redirect to home page
                router.push("/");
                // Optionally refresh the page to update auth state
                window.location.reload();
            } else {
                toast.error(data.error || "Failed to complete profile");
            }
        } catch (error) {
            console.error("Complete profile error:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center font-jakarta mx-5 sm:mx-0">
            <div className="w-full max-w-md">
                <div className="flex items-center justify-center gap-2 mb-8">
                    <Image
                        src={authLogo}
                        width={64}
                        height={64}
                        alt="MIL Logo"
                        className="object-contain"
                    />
                </div>

                <div className="bg-white rounded-xl shadow-[0_0_10px_0_rgba(0,0,0,0.27)] p-8">
                    <h1 className="text-4xl font-bold text-center mb-4">
                        Complete Your Profile
                    </h1>

                    <p className="text-center mb-8">
                        Please complete your profile information
                        <br />
                        to continue using MilBoard.
                    </p>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your username"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Gender</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex gap-6"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem
                                                        value="Female"
                                                        id="female"
                                                    />
                                                    <label htmlFor="female">
                                                        Female
                                                    </label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem
                                                        value="Male"
                                                        id="male"
                                                    />
                                                    <label htmlFor="male">
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
                                        <FormLabel>Birthplace</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your birthplace"
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
                                        <FormLabel>Birthdate</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className="w-full pl-3 text-left font-normal"
                                                    >                                                        {field.value ? (
                                                            field.value.toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })
                                                        ) : (
                                                            <span className="text-muted-foreground">
                                                                Pick a date
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() ||
                                                        date <
                                                            new Date(
                                                                "1900-01-01"
                                                            )
                                                    }
                                                    initialFocus
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
                                        <FormLabel>School</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select your school" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {schools.map((school) => (
                                                    <SelectItem
                                                        key={school.id}
                                                        value={school.name}
                                                    >
                                                        {school.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number (Optional)</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="+62 XXX XXX XXXX"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full py-5"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Completing Profile..." : "Complete Profile"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
