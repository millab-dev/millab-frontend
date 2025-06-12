import axiosServer from "@/lib/axios.server";

export async function checkAuthStatus() {
  try {
    // Use the GET /me endpoint which checks if the user is authenticated
    const response = await axiosServer.get('/api/v1/auth/me');
    return response.data?.success === true;
  } catch (error) {
    // If there's an error (401 unauthorized or other), user is not authenticated
    console.error('Auth check error:', error);
    return false;
  }
}