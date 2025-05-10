"use server";

// Interface untuk parameter registrasi
interface RegisterParams {
    name: string;
    username: string;
    email: string;
    password: string;
    gender: "Male" | "Female";
    birthplace: string;
    birthdate: Date;
    socializationLocation: string;
    phoneNumber?: string;
}

// Interface untuk respons registrasi
interface RegisterResponse {
    success: boolean;
    message: string;
    data?: unknown;
    error?: string;
}

// Fungsi untuk registrasi pengguna
export async function registerUser(
    params: RegisterParams
): Promise<RegisterResponse> {
    try {
        // Format tanggal menjadi ISO string untuk API
        const formattedData = {
            ...params,
            birthdate: params.birthdate.toISOString().split("T")[0], // Format YYYY-MM-DD
        };

        // Kirim request ke API
        const response = await fetch(
            `${
                process.env.NEXT_PUBLIC_API_URL || "localhost:8080"
            }/api/v1/auth/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedData),
                cache: "no-store",
            }
        );

        // Parse response
        const data = await response.json();

        // Jika respons tidak sukses
        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Registration failed",
                error: data.error || "Unknown error occurred",
            };
        }


        // Jika respons sukses
        return {
            success: true,
            message: data.message || "Registration successful",
            data: data.data,
        };
    } catch (error) {
        // Error lainnya
        console.error("Registration error:", error);
        return {
            success: false,
            message: "Failed to register user",
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
}

// Interface untuk parameter login
interface LoginParams {
    email: string;
    password: string;
}

// Interface untuk respons login
interface LoginResponse {
    success: boolean;
    message: string;
    data?: {
        token: string;
        user: {
            id: string;
            name: string;
            email: string;
            username: string;
        };
    };
    error?: string;
}

// Fungsi untuk login pengguna
export async function loginUser(
    params: LoginParams
): Promise<LoginResponse> {
    try {
        // Kirim request ke API
        const response = await fetch(
            `${
                process.env.NEXT_PUBLIC_API_URL || "localhost:8080"
            }/api/v1/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(params),
                cache: "no-store",
            }
        );

        // Parse response
        const data = await response.json();

        // Jika respons tidak sukses
        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Login failed",
                error: data.error || "Unknown error occurred",
            };
        }

        // Jika respons sukses
        return {
            success: true,
            message: data.message || "Login successful",
            data: data.data,
        };
    } catch (error) {
        // Error lainnya
        console.error("Login error:", error);
        return {
            success: false,
            message: "Failed to login user",
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
}
