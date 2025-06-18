"use client";

import Image from "next/image";
import authLogo from "@/assets/authLogo.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
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

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
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
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            username: "",
            gender: "Female",
            birthplace: "",
            socialization: "",
            phone: "",
        },
    });    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        
        // Create a unique toast ID for the loading notification
        const loadingToastId = "complete-profile-loading-" + Date.now();
        
        // Show initial loading toast
        toast.loading("Completing your profile...", { id: loadingToastId });
        
        try {
            // Mapping data form to API format
            const profileData = {
                name: values.name,
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

            // Always dismiss the loading toast first
            toast.dismiss(loadingToastId);            if (data.success) {
                // Profile completion successful - use a new unique ID for success toast
                const successToastId = "complete-profile-success-" + Date.now();
                toast.success("Profile completed successfully!", {
                    id: successToastId,
                    description: "Redirecting to home page...",
                    duration: 3000,
                });

                // Set redirecting state
                setIsRedirecting(true);

                // Redirect to home page after 1.5 seconds
                setTimeout(() => {
                    router.push("/app");
                }, 1500);
            } else {
                // Profile completion failed - use a new unique ID for error toast
                const errorToastId = "complete-profile-error-" + Date.now();
                toast.error("Profile completion failed", {
                    id: errorToastId,
                    description: data.error || "Something went wrong. Please try again.",
                    duration: 5000, // Keep error message visible for 5 seconds
                });
            }
        } catch (error) {
            // Make sure to dismiss the loading toast before showing error
            toast.dismiss(loadingToastId);
            
            // Show error toast with a new unique ID
            const catchErrorToastId = "complete-profile-catch-error-" + Date.now();
            toast.error("Error completing profile", {
                id: catchErrorToastId,
                description: error instanceof Error ? error.message : "Unknown error occurred",
                duration: 5000, // Keep error message visible for 5 seconds
            });
        } finally {
            setIsSubmitting(false);
        }
    }    return (
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
                            className="space-y-4"
                        >                            <FormField
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

                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username*</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="citrabelajarliterasi"
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
                                                            <span>Pick a date</span>
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
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="08123456789"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />                            <Button
                                type="submit"
                                className="w-full py-5 mt-4"
                                disabled={isSubmitting || isRedirecting}
                            >
                                {isRedirecting
                                    ? "Redirecting..."
                                    : isSubmitting
                                    ? "Completing Profile..."
                                    : "Complete Profile"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
