"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  gender: string;
  birthplace: string;
  birthdate: string;
  socializationLocation: string;
  phoneNumber: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsProfile, setNeedsProfile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/auth/me`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success && data.data) {
        setUser(data.data);
        
        // Check if profile is incomplete
        const incomplete = !data.data.username || 
                          !data.data.gender || 
                          !data.data.birthplace || 
                          !data.data.birthdate || 
                          !data.data.socializationLocation;
        
        setNeedsProfile(incomplete);
        
        // Redirect to complete profile if needed and not already on that page
        if (incomplete && window.location.pathname !== "/complete-profile") {
          router.push("/complete-profile");
        }
      } else {
        setUser(null);
        setNeedsProfile(false);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null);
      setNeedsProfile(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      
      setUser(null);
      setNeedsProfile(false);
      router.push("/signin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return {
    user,
    loading,
    needsProfile,
    checkAuthStatus,
    logout
  };
}
