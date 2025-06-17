import axiosServer from "@/lib/axios.server";

export async function checkAuthStatus() {
  try {
    // Use the same refresh endpoint as middleware for consistency
    const response = await axiosServer.get('/api/v1/auth/refresh');
    return response.data?.success === true;
  } catch (error) {
    // If there's an error (401 unauthorized or other), user is not authenticated
    console.error('Auth check error:', error);
    return false;
  }
}