"use client";

import Image from "next/image";
import authLogo from "@/assets/authLogo.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Eye, EyeOff, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
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
import Link from "next/link";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
    gender: z.enum(["female", "male"], {
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

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            username: "",
            password: "",
            gender: "female",
            birthplace: "",
            socialization: "",
            email: "",
            phone: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <div className="flex min-h-screen items-center justify-center font-jakarta my-8">
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
                                                        value="female"
                                                        id="female"
                                                    />
                                                    <label htmlFor="female">
                                                        Female
                                                    </label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem
                                                        value="male"
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
                                            Socialization Location*
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Choose School" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="school1">
                                                    School 1
                                                </SelectItem>
                                                <SelectItem value="school2">
                                                    School 2
                                                </SelectItem>
                                                <SelectItem value="school3">
                                                    School 3
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
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

                            <Button type="submit" className="w-full py-5 mt-4">
                                Sign Up
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
