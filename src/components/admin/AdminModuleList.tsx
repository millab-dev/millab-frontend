"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  sections: ModuleSection[];
  quiz: ModuleQuiz;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ModuleSection {
  id: string;
  title: string;
  content: string;
  duration: string;
  order: number;
  pdfUrl?: string;
  isActive: boolean;
}

interface ModuleQuiz {
  id: string;
  title: string;
  description: string;
  duration: string;
  totalQuestions: number;
  passingScore: number;
  isActive: boolean;
}

export default function AdminModuleList() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/modules/admin/all`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        setModules(data.data);
      } else {
        toast.error(data.error || "Failed to fetch modules");
      }
    } catch (error) {
      console.error("Error fetching modules:", error);
      toast.error("Failed to fetch modules");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteModule = async (id: string) => {
    if (!confirm("Are you sure you want to delete this module?")) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/modules/admin/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Module deleted successfully");
        fetchModules(); // Refresh the list
      } else {
        toast.error(data.error || "Failed to delete module");
      }
    } catch (error) {
      console.error("Error deleting module:", error);
      toast.error("Failed to delete module");
    }
  };

  const toggleModuleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/modules/admin/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            isActive: !currentStatus,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(`Module ${!currentStatus ? "activated" : "deactivated"} successfully`);
        fetchModules(); // Refresh the list
      } else {
        toast.error(data.error || "Failed to update module status");
      }
    } catch (error) {
      console.error("Error updating module status:", error);
      toast.error("Failed to update module status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">Loading modules...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-jakarta">      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push("/admin")}
          className="mb-4"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Dashboard
        </Button>

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Module Management</h1>
            <p className="text-gray-600 mt-2">Create and manage learning modules</p>
          </div>
          <Button
            onClick={() => router.push("/admin/modules/create")}
            className="flex items-center gap-2"
          >
            <Plus size={20} />
            Create Module
          </Button>
        </div>

        {/* Modules List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All Modules</h2>
          </div>

          {modules.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No modules found. Create your first module!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {modules.map((module) => (
                <div key={module.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {module.order}. {module.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            module.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {module.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{module.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>{module.sections.length} sections</span>
                        <span>Quiz: {module.quiz.totalQuestions} questions</span>
                        <span>Passing score: {module.quiz.passingScore}%</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleModuleStatus(module.id, module.isActive)}
                        title={module.isActive ? "Deactivate" : "Activate"}
                      >
                        {module.isActive ? (
                          <EyeOff size={18} className="text-red-600" />
                        ) : (
                          <Eye size={18} className="text-green-600" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push(`/admin/modules/edit/${module.id}`)}
                        title="Edit"
                      >
                        <Edit size={18} className="text-blue-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteModule(module.id)}
                        title="Delete"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
