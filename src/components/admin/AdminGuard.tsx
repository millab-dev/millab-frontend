"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      // Make a request to check if user is admin
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/auth/me`,
        {
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        
        // TEMPORARY BYPASS: Admin checker disabled for debugging
        // TODO: Re-enable admin checking after production issue is resolved
        if (data.success && data.data?.isAdmin) {
        // if (true) {
          setIsAuthorized(true);
        } else {
          // User is not admin, redirect to home
          router.replace("/");
        }
      } else {
        // User is not authenticated, redirect to login
        router.replace("/login");
      }
    } catch (error) {
      console.error("Error checking admin access:", error);
      router.replace("/login");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Checking admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Will redirect, so don't render anything
  }

  return <>{children}</>;
}
