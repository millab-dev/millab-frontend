"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { Plus, Trash2, ArrowLeft, Loader2 } from "lucide-react";

// Form validation schemas
const sectionSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Section title is required"),
  content: z.string().min(1, "Section content is required"),
  duration: z.string().min(1, "Section duration is required"),
  order: z.number().min(1, "Section order must be at least 1"),
  pdfUrl: z.string().optional(),
  isActive: z.boolean(),
});

const questionSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(1, "Question is required"),
  type: z.enum(['multiple-choice', 'true-false']),
  options: z.array(z.string().min(1, "Option cannot be empty")).min(2, "Must have at least 2 options"),
  correctAnswer: z.number().min(0, "Must select correct answer"),
  explanation: z.string().optional(),
  order: z.number().min(1),
});

const quizSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Quiz title is required"),
  description: z.string().min(1, "Quiz description is required"),
  duration: z.string().min(1, "Quiz duration is required"),
  totalQuestions: z.number().min(1, "Must have at least 1 question"),
  passingScore: z.number().min(0).max(100, "Passing score must be between 0 and 100"),
  questions: z.array(questionSchema).min(1, "Must have at least 1 question"),
  isActive: z.boolean(),
});

const moduleSchema = z.object({
  title: z.string().min(1, "Module title is required"),
  description: z.string().min(1, "Module description is required"),
  order: z.number().min(1, "Module order must be at least 1"),
  sections: z.array(sectionSchema).min(1, "Must have at least one section"),
  quiz: quizSchema,
  isActive: z.boolean(),
});

type ModuleFormData = z.infer<typeof moduleSchema>;

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
  questions: QuizQuestion[];
  isActive: boolean;
}

interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false';
  options: string[];
  correctAnswer: number;
  explanation?: string;
  order: number;
}

export default function EditModuleForm() {
  const router = useRouter();
  const params = useParams();
  const moduleId = params.id as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const form = useForm<ModuleFormData>({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      title: "",
      description: "",
      order: 1,
      sections: [],
      quiz: {
        title: "",
        description: "",
        duration: "",
        totalQuestions: 1,
        passingScore: 70,
        questions: [
          {
            question: "",
            type: 'multiple-choice' as const,
            options: ["", "", "", ""],
            correctAnswer: 0,
            explanation: "",
            order: 1,
          },
        ],
        isActive: true,
      },
      isActive: true,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sections",
  });

  const { fields: questionFields, append: appendQuestion, remove: removeQuestion } = useFieldArray({
    control: form.control,
    name: "quiz.questions",
  });

  useEffect(() => {
    if (moduleId) {
      fetchModule();
    }
  }, [moduleId]);

  const fetchModule = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/modules/admin/all`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        const module = data.data.find((m: Module) => m.id === moduleId);
        if (module) {
          // Reset form with module data
          form.reset({
            title: module.title,
            description: module.description,
            order: module.order,
            sections: module.sections.map((section: ModuleSection) => ({
              id: section.id,
              title: section.title,
              content: section.content,
              duration: section.duration,
              order: section.order,
              pdfUrl: section.pdfUrl || "",
              isActive: section.isActive,
            })),
            quiz: {
              id: module.quiz.id,
              title: module.quiz.title,
              description: module.quiz.description,
              duration: module.quiz.duration,
              totalQuestions: module.quiz.totalQuestions,
              passingScore: module.quiz.passingScore,
              isActive: module.quiz.isActive,
            },
            isActive: module.isActive,
          });
        } else {
          toast.error("Module not found");
          router.push("/admin/modules");
        }
      } else {
        toast.error(data.error || "Failed to fetch module");
        router.push("/admin/modules");
      }
    } catch (error) {
      console.error("Error fetching module:", error);
      toast.error("Failed to fetch module");
      router.push("/admin/modules");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ModuleFormData) => {
    setIsSubmitting(true);

    // Generate loading toast
    const loadingToastId = "update-module-loading-" + Date.now();
    toast.loading("Updating module...", {
      id: loadingToastId,
      duration: Infinity,
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/modules/admin/${moduleId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      // Dismiss loading toast
      toast.dismiss(loadingToastId);

      if (result.success) {
        const successToastId = "update-module-success-" + Date.now();
        toast.success("Module updated successfully!", {
          id: successToastId,
          description: `${data.title} has been updated.`,
          duration: 3000,
        });

        setTimeout(() => {
          router.push("/admin/modules");
        }, 1500);
      } else {
        const errorToastId = "update-module-error-" + Date.now();
        toast.error("Failed to update module", {
          id: errorToastId,
          description: result.error || "Something went wrong",
          duration: 5000,
        });
      }
    } catch (error) {
      toast.dismiss(loadingToastId);
      const catchErrorToastId = "update-module-catch-error-" + Date.now();
      toast.error("Error updating module", {
        id: catchErrorToastId,
        description: error instanceof Error ? error.message : "Unknown error occurred",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addSection = () => {
    append({
      title: "",
      content: "",
      duration: "",
      order: fields.length + 1,
      pdfUrl: "",
      isActive: true,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 font-jakarta">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-gray-600">Loading module...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-jakarta">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/admin/modules")}
            className="mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Modules
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Module</h1>
          <p className="text-gray-600 mt-2">Update module content and settings</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Module Information</CardTitle>
            <CardDescription>
              Update the basic information and structure of your module.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Module Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Module Title*</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Introduction to Media Literacy" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />                  <FormField
                    control={form.control}
                    name="order"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Module Order*</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            value={field.value?.toString() || ""}
                            onChange={(e) => field.onChange(Number(e.target.value) || 1)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Module Description*</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          content={field.value}
                          onChange={field.onChange}
                          placeholder="Describe what students will learn in this module..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Active Module</FormLabel>
                        <div className="text-sm text-gray-600">
                          Make this module visible to students
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Sections */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">Module Sections</h2>
                    <Button type="button" onClick={addSection} variant="outline" size="sm">
                      <Plus size={16} className="mr-2" />
                      Add Section
                    </Button>
                  </div>

                  {fields.map((field, index) => (
                    <div key={field.id} className="border rounded-lg p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Section {index + 1}</h3>
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                          >
                            <Trash2 size={16} className="text-red-600" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`sections.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Section Title*</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Understanding Media Literacy" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`sections.${index}.duration`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Duration*</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 15 minutes" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name={`sections.${index}.content`}                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Section Content*</FormLabel>
                            <FormControl>
                              <RichTextEditor
                                content={field.value}
                                onChange={field.onChange}
                                placeholder="Write the section content here... Use the toolbar for formatting."
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`sections.${index}.pdfUrl`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>PDF URL (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="https://example.com/document.pdf" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`sections.${index}.isActive`}
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-sm">Active Section</FormLabel>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />                        <FormField
                          control={form.control}
                          name={`sections.${index}.order`}                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>Section Order*</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="1"
                                  value={field.value?.toString() || ""}
                                  onChange={(e) => field.onChange(Number(e.target.value) || 1)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quiz Section */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Module Quiz</h2>
                  
                  <div className="border rounded-lg p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="quiz.title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quiz Title*</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Media Literacy Assessment" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="quiz.duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quiz Duration*</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 30 minutes" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>                    <FormField
                      control={form.control}
                      name="quiz.description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quiz Description*</FormLabel>
                          <FormControl>
                            <RichTextEditor
                              content={field.value}
                              onChange={field.onChange}
                              placeholder="Describe what the quiz covers..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">                      <FormField
                        control={form.control}
                        name="quiz.totalQuestions"                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Questions*</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                value={field.value?.toString() || ""}
                                onChange={(e) => field.onChange(Number(e.target.value) || 1)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />                      <FormField
                        control={form.control}
                        name="quiz.passingScore"                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Passing Score (%)*</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                value={field.value?.toString() || ""}
                                onChange={(e) => field.onChange(Number(e.target.value) || 70)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="quiz.isActive"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-sm">Active Quiz</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}                      />
                    </div>

                    {/* Quiz Questions */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900">Quiz Questions</h3>
                        <Button
                          type="button"
                          onClick={() => appendQuestion({
                            question: "",
                            type: 'multiple-choice' as const,
                            options: ["", "", "", ""],
                            correctAnswer: 0,
                            explanation: "",
                            order: questionFields.length + 1,
                          })}
                          variant="outline"
                          size="sm"
                        >
                          <Plus size={16} className="mr-2" />
                          Add Question
                        </Button>
                      </div>

                      {questionFields.map((field, questionIndex) => (
                        <div key={field.id} className="border-2 border-dashed border-gray-200 rounded-lg p-4 space-y-4">
                          <div className="flex justify-between items-center">
                            <h4 className="text-md font-medium">Question {questionIndex + 1}</h4>
                            {questionFields.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeQuestion(questionIndex)}
                              >
                                <Trash2 size={16} className="text-red-600" />
                              </Button>
                            )}
                          </div>

                          <FormField
                            control={form.control}
                            name={`quiz.questions.${questionIndex}.question`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Question Text*</FormLabel>
                                <FormControl>
                                  <RichTextEditor
                                    content={field.value}
                                    onChange={field.onChange}
                                    placeholder="Enter your question here..."
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`quiz.questions.${questionIndex}.type`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Question Type*</FormLabel>
                                  <FormControl>
                                    <select
                                      {...field}
                                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                      <option value="multiple-choice">Multiple Choice</option>
                                      <option value="true-false">True/False</option>
                                    </select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />                              <FormField
                              control={form.control}
                              name={`quiz.questions.${questionIndex}.correctAnswer`}
                              render={({ field }) => (                                <FormItem>
                                  <FormLabel>Correct Answer (Option Index)*</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min="0"
                                      placeholder="0"
                                      value={field.value?.toString() || ""}
                                      onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="space-y-2">
                            <FormLabel>Answer Options*</FormLabel>
                            {[0, 1, 2, 3].map((optionIndex) => (
                              <FormField
                                key={optionIndex}
                                control={form.control}
                                name={`quiz.questions.${questionIndex}.options.${optionIndex}`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        placeholder={`Option ${optionIndex + 1}`}
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>

                          <FormField
                            control={form.control}
                            name={`quiz.questions.${questionIndex}.explanation`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Explanation (Optional)</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Explain why this is the correct answer..."
                                    className="min-h-[80px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/modules")}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Module"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
