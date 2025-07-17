"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Trash2, Plus, Edit, Target, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface LevelConfig {
  id: string;
  level: number;
  minPoints: number;
  title: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PointsConfig {
  id: string;
  sectionPoints: {
    easy: number;
    intermediate: number;
    advanced: number;
  };
  quizPoints: {
    easy: number;
    intermediate: number;
    advanced: number;
  };
  finalQuizPoints: {
    easy: number;
    intermediate: number;
    advanced: number;
  };
  createdAt: string;
  updatedAt: string;
}

export default function LevelConfigManagement() {
  const router = useRouter();
  const [levels, setLevels] = useState<LevelConfig[]>([]);
  const [pointsConfig, setPointsConfig] = useState<PointsConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingLevel, setEditingLevel] = useState<LevelConfig | null>(null);
  const [editingPoints, setEditingPoints] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch levels
      const levelsResponse = await fetch(
        `/api/v1/level-config/levels`,
        { credentials: "include" }
      );

      // Fetch points config
      const pointsResponse = await fetch(
        `/api/v1/level-config/points`,
        { credentials: "include" }
      );

      if (levelsResponse.ok) {
        const levelsData = await levelsResponse.json();
        if (levelsData.success) {
          setLevels(levelsData.data);
        }
      }

      if (pointsResponse.ok) {
        const pointsData = await pointsResponse.json();
        if (pointsData.success) {
          setPointsConfig(pointsData.data);
        }
      }
    } catch (error) {
      console.error("Error fetching configuration data:", error);
      toast.error("Failed to load configuration data");
    } finally {
      setLoading(false);
    }
  };

  const initializeDefaults = async () => {
    try {
      const response = await fetch(
        `/api/v1/level-config/init`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success("Default configurations initialized!");
        fetchData();
      } else {
        toast.error(data.error || "Failed to initialize defaults");
      }
    } catch (error) {
      console.error("Error initializing defaults:", error);
      toast.error("Failed to initialize defaults");
    }
  };

  const updateLevel = async (level: LevelConfig) => {
    try {
      const response = await fetch(
        `/api/v1/level-config/levels/${level.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            level: level.level,
            minPoints: level.minPoints,
            title: level.title,
            description: level.description,
            isActive: level.isActive,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success("Level updated successfully!");
        setEditingLevel(null);
        fetchData();
      } else {
        toast.error(data.error || "Failed to update level");
      }
    } catch (error) {
      console.error("Error updating level:", error);
      toast.error("Failed to update level");
    }
  };

  const updatePointsConfig = async (config: PointsConfig) => {
    try {
      const response = await fetch(
        `/api/v1/level-config/points/${config.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sectionPoints: config.sectionPoints,
            quizPoints: config.quizPoints,
            finalQuizPoints: config.finalQuizPoints,

          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success("Points configuration updated successfully!");
        setEditingPoints(false);
        fetchData();
      } else {
        toast.error(data.error || "Failed to update points configuration");
      }
    } catch (error) {
      console.error("Error updating points configuration:", error);
      toast.error("Failed to update points configuration");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 font-jakarta">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading configuration...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-jakarta">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/admin")}
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Level & Points Configuration</h1>
            <p className="text-gray-600">Manage progression system settings</p>
          </div>
        </div>

        {/* Initialize Button */}
        {levels.length === 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Initialize Default Configuration</CardTitle>
              <CardDescription>
                Set up default level and points configuration for the first time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={initializeDefaults}>
                <Plus size={16} className="mr-2" />
                Initialize Defaults
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Points Configuration */}
        {pointsConfig && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp size={20} />
                Points Configuration
              </CardTitle>
              <CardDescription>
                Configure how points are awarded throughout the system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {editingPoints ? (
                <div className="space-y-6">
                  {/* Section Points */}
                  <div>
                    <Label className="text-base font-medium">Section Reading Points</Label>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <div>
                        <Label>Easy</Label>
                        <Input
                          type="number"
                          value={pointsConfig.sectionPoints.easy}
                          onChange={(e) =>
                            setPointsConfig({
                              ...pointsConfig,
                              sectionPoints: {
                                ...pointsConfig.sectionPoints,
                                easy: parseInt(e.target.value) || 0,
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Intermediate</Label>
                        <Input
                          type="number"
                          value={pointsConfig.sectionPoints.intermediate}
                          onChange={(e) =>
                            setPointsConfig({
                              ...pointsConfig,
                              sectionPoints: {
                                ...pointsConfig.sectionPoints,
                                intermediate: parseInt(e.target.value) || 0,
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Advanced</Label>
                        <Input
                          type="number"
                          value={pointsConfig.sectionPoints.advanced}
                          onChange={(e) =>
                            setPointsConfig({
                              ...pointsConfig,
                              sectionPoints: {
                                ...pointsConfig.sectionPoints,
                                advanced: parseInt(e.target.value) || 0,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quiz Points */}
                  <div>
                    <Label className="text-base font-medium">Quiz Points (per correct answer)</Label>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <div>
                        <Label>Easy</Label>
                        <Input
                          type="number"
                          value={pointsConfig.quizPoints.easy}
                          onChange={(e) =>
                            setPointsConfig({
                              ...pointsConfig,
                              quizPoints: {
                                ...pointsConfig.quizPoints,
                                easy: parseInt(e.target.value) || 0,
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Intermediate</Label>
                        <Input
                          type="number"
                          value={pointsConfig.quizPoints.intermediate}
                          onChange={(e) =>
                            setPointsConfig({
                              ...pointsConfig,
                              quizPoints: {
                                ...pointsConfig.quizPoints,
                                intermediate: parseInt(e.target.value) || 0,
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Advanced</Label>
                        <Input
                          type="number"
                          value={pointsConfig.quizPoints.advanced}
                          onChange={(e) =>
                            setPointsConfig({
                              ...pointsConfig,
                              quizPoints: {
                                ...pointsConfig.quizPoints,
                                advanced: parseInt(e.target.value) || 0,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>                  {/* Final Quiz Points */}
                  <div>
                    <Label className="text-base font-medium">Final Quiz Points (per correct answer)</Label>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <div>
                        <Label>Easy</Label>
                        <Input
                          type="number"
                          value={pointsConfig.finalQuizPoints.easy}
                          onChange={(e) =>
                            setPointsConfig({
                              ...pointsConfig,
                              finalQuizPoints: {
                                ...pointsConfig.finalQuizPoints,
                                easy: parseInt(e.target.value) || 0,
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Intermediate</Label>
                        <Input
                          type="number"
                          value={pointsConfig.finalQuizPoints.intermediate}
                          onChange={(e) =>
                            setPointsConfig({
                              ...pointsConfig,
                              finalQuizPoints: {
                                ...pointsConfig.finalQuizPoints,
                                intermediate: parseInt(e.target.value) || 0,
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Advanced</Label>
                        <Input
                          type="number"
                          value={pointsConfig.finalQuizPoints.advanced}
                          onChange={(e) =>
                            setPointsConfig({
                              ...pointsConfig,
                              finalQuizPoints: {
                                ...pointsConfig.finalQuizPoints,
                                advanced: parseInt(e.target.value) || 0,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={() => updatePointsConfig(pointsConfig)}>
                      <Save size={16} className="mr-2" />
                      Save Points Config
                    </Button>
                    <Button variant="outline" onClick={() => setEditingPoints(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Section Points</h4>
                      <p className="text-sm text-gray-600">
                        Easy: {pointsConfig.sectionPoints.easy}, 
                        Intermediate: {pointsConfig.sectionPoints.intermediate}, 
                        Advanced: {pointsConfig.sectionPoints.advanced}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Quiz Points (per correct)</h4>
                      <p className="text-sm text-gray-600">
                        Easy: {pointsConfig.quizPoints.easy}, 
                        Intermediate: {pointsConfig.quizPoints.intermediate}, 
                        Advanced: {pointsConfig.quizPoints.advanced}
                      </p>
                    </div>                    <div>
                      <h4 className="font-medium mb-2">Final Quiz Points</h4>
                      <p className="text-sm text-gray-600">
                        Easy: {pointsConfig.finalQuizPoints.easy}, 
                        Intermediate: {pointsConfig.finalQuizPoints.intermediate}, 
                        Advanced: {pointsConfig.finalQuizPoints.advanced} per correct answer
                      </p>
                    </div>
                  </div>
                  <Button onClick={() => setEditingPoints(true)}>
                    <Edit size={16} className="mr-2" />
                    Edit Points Configuration
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Level Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target size={20} />
              Level Configuration
            </CardTitle>
            <CardDescription>
              Configure level requirements and titles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {levels
                .sort((a, b) => a.level - b.level)
                .map((level) => (
                  <div
                    key={level.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      {editingLevel?.id === level.id ? (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <Label>Level</Label>
                            <Input
                              type="number"
                              value={editingLevel.level}
                              onChange={(e) =>
                                setEditingLevel({
                                  ...editingLevel,
                                  level: parseInt(e.target.value) || 1,
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label>Min Points</Label>
                            <Input
                              type="number"
                              value={editingLevel.minPoints}
                              onChange={(e) =>
                                setEditingLevel({
                                  ...editingLevel,
                                  minPoints: parseInt(e.target.value) || 0,
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label>Title</Label>
                            <Input
                              value={editingLevel.title}
                              onChange={(e) =>
                                setEditingLevel({
                                  ...editingLevel,
                                  title: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={editingLevel.isActive}
                              onCheckedChange={(checked) =>
                                setEditingLevel({
                                  ...editingLevel,
                                  isActive: checked,
                                })
                              }
                            />
                            <Label>Active</Label>
                          </div>
                          <div className="md:col-span-4">
                            <Label>Description</Label>
                            <Textarea
                              value={editingLevel.description || ""}
                              onChange={(e) =>
                                setEditingLevel({
                                  ...editingLevel,
                                  description: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="md:col-span-4 flex gap-2">
                            <Button onClick={() => updateLevel(editingLevel)}>
                              <Save size={16} className="mr-2" />
                              Save
                            </Button>
                            <Button variant="outline" onClick={() => setEditingLevel(null)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center gap-4">
                            <span className="font-bold text-lg">Level {level.level}</span>
                            <span className="font-medium">{level.title}</span>
                            <span className="text-sm text-gray-600">
                              {level.minPoints} points required
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                level.isActive
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {level.isActive ? "Active" : "Inactive"}
                            </span>
                          </div>
                          {level.description && (
                            <p className="text-sm text-gray-600 mt-1">{level.description}</p>
                          )}
                        </div>
                      )}
                    </div>
                    {editingLevel?.id !== level.id && (
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingLevel(level)}
                        >
                          <Edit size={16} />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
