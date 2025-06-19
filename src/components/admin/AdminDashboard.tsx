"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BookOpen, Users, Award, Plus, Eye, Settings } from "lucide-react";

interface DashboardStats {
  totalModules: number;
  activeModules: number;
  totalUsers: number;
  totalSections: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalModules: 0,
    activeModules: 0,
    totalUsers: 0,
    totalSections: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch modules data to calculate stats
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/modules/admin/all`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        const modules = data.data;
        const totalSections = modules.reduce((acc: number, module: any) => acc + module.sections.length, 0);
        
        setStats({
          totalModules: modules.length,
          activeModules: modules.filter((m: any) => m.isActive).length,
          totalUsers: 0, // TODO: Implement user count if needed
          totalSections: totalSections,
        });
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: "Create Module",
      description: "Add a new learning module",
      icon: Plus,
      action: () => router.push("/admin/modules/create"),
      color: "bg-blue-500",
    },
    {
      title: "Manage Modules",
      description: "View and edit existing modules",
      icon: Settings,
      action: () => router.push("/admin/modules"),
      color: "bg-green-500",
    },
    {
      title: "View Public Site",
      description: "See how students view the site",
      icon: Eye,
      action: () => router.push("/app"),
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-jakarta">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to the MILLAB administration panel</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Modules</CardTitle>
              <BookOpen className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? "-" : stats.totalModules}</div>
              <p className="text-xs text-muted-foreground">Learning modules created</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Modules</CardTitle>
              <Award className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? "-" : stats.activeModules}</div>
              <p className="text-xs text-muted-foreground">Currently visible to students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sections</CardTitle>
              <BookOpen className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? "-" : stats.totalSections}</div>
              <p className="text-xs text-muted-foreground">Learning sections available</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Online</div>
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" onClick={action.action}>
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>Important information about the MILLAB system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <h3 className="font-medium text-blue-900">Module Management</h3>
                <p className="text-sm text-blue-700">Create, edit, and manage learning modules for students</p>
              </div>
              <Button variant="outline" onClick={() => router.push("/admin/modules")}>
                Manage
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <h3 className="font-medium text-green-900">Student View</h3>
                <p className="text-sm text-green-700">Preview how students see the learning platform</p>
              </div>
              <Button variant="outline" onClick={() => router.push("/")}>
                Preview
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
