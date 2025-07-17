"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

const sectionSchema = z.object({
  title: z.string().min(1, "Section title is required"),
  titleEn: z.string().optional(),
  content: z.string().min(1, "Section content is required"),
  contentEn: z.string().optional(),
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute"),
  order: z.coerce.number().min(0, "Order must be positive"),
  isActive: z.boolean(),
});

const questionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  questionEn: z.string().optional(),
  type: z.enum(['multiple-choice', 'true-false']),
  options: z.array(z.string().min(1, "Option cannot be empty")).min(2, "Must have at least 2 options"),
  optionsEn: z.array(z.string()).optional(),
  correctAnswer: z.coerce.number().min(0, "Must select correct answer"),
  explanation: z.string().optional(),
  explanationEn: z.string().optional(),
  order: z.coerce.number().min(1, "Question order must be at least 1"),
});

const quizSchema = z.object({
  title: z.string().min(1, "Quiz title is required"),
  titleEn: z.string().optional(),
  description: z.string().min(1, "Quiz description is required"),
  descriptionEn: z.string().optional(),
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute"),
  totalQuestions: z.coerce.number().min(1, "Must have at least 1 question"),
  questions: z.array(questionSchema).min(1, "Must have at least 1 question"),
  isActive: z.boolean(),
});

const moduleSchema = z.object({
  title: z.string().min(1, "Module title is required"),
  titleEn: z.string().optional(),
  description: z.string().min(1, "Module description is required"),
  descriptionEn: z.string().optional(),
  difficulty: z.enum(['Easy', 'Intermediate', 'Advanced'], {
    errorMap: () => ({ message: "Please select a difficulty level" })
  }),
  order: z.coerce.number().min(1, "Order must be positive"),
  pdfUrl: z.string().optional(),
  pdfUrlEn: z.string().optional(),
  sections: z.array(sectionSchema).min(1, "Must have at least one section"),
  quiz: quizSchema,
  isActive: z.boolean(),
});

type ModuleFormData = z.infer<typeof moduleSchema>;

export default function CreateModuleForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
    const form = useForm<ModuleFormData>({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      title: "",
      titleEn: "",
      description: "",
      descriptionEn: "",
      difficulty: "Easy" as const,
      order: 1,
      pdfUrl: "",
      pdfUrlEn: "",
      sections: [
        {
          title: "",
          titleEn: "",
          content: "",
          contentEn: "",
          duration: 5,
          order: 1,
          isActive: true,
        },
      ],
      quiz: {
        title: "",
        titleEn: "",
        description: "",
        descriptionEn: "",
        duration: 10,
        totalQuestions: 1,
        questions: [
          {
            question: "",
            questionEn: "",
            type: 'multiple-choice' as const,
            options: ["", "", "", ""],
            optionsEn: ["", "", "", ""],
            correctAnswer: 0,
            explanation: "",
            explanationEn: "",
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

  const onSubmit = async (data: ModuleFormData) => {
    setIsSubmitting(true);
    const loadingToastId = "create-module-loading-" + Date.now();
    
    toast.loading("Creating module...", { id: loadingToastId });

    try {
      // Transform data to add " min" suffix to duration fields
      const transformedData = {
        ...data,
        sections: data.sections.map(section => ({
          ...section,
          duration: `${section.duration} min`
        })),
        quiz: {
          ...data.quiz,
          duration: `${data.quiz.duration} min`
        }
      };

      const response = await fetch(
        `/api/v1/modules/admin/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(transformedData),
        }
      );

      const result = await response.json();
      toast.dismiss(loadingToastId);

      if (result.success) {
        const successToastId = "create-module-success-" + Date.now();
        toast.success("Module created successfully!", {
          id: successToastId,
          description: "Redirecting to modules list...",
          duration: 3000,
        });

        setTimeout(() => {
          router.push("/admin/modules");
        }, 1500);
      } else {
        const errorToastId = "create-module-error-" + Date.now();
        toast.error("Failed to create module", {
          id: errorToastId,
          description: result.error || "Something went wrong",
          duration: 5000,
        });
      }
    } catch (error) {
      toast.dismiss(loadingToastId);
      const catchErrorToastId = "create-module-catch-error-" + Date.now();
      toast.error("Error creating module", {
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
      duration: 5,
      order: fields.length + 1,
      isActive: true,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-jakarta">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/admin/modules")}
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Module</h1>
            <p className="text-gray-600 mt-2">Add a new learning module to the system</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
                
                <div className="grid grid-cols-1 md:grid-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Module Title (Indonesian)*</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Pengantar Literasi Media" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="titleEn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Module Title (English)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Introduction to Media Literacy" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <FormField
                    control={form.control}
                    name="order"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Module Order*</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="1" 
                            value={field.value?.toString() || ""}
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(value === "" ? "" : Number(value) || 1);
                            }}
                            onFocus={(e) => e.target.select()}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficulty Level*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Easy">Easy</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="pdfUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PDF URL (Indonesian)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/module-id.pdf" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pdfUrlEn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PDF URL (English)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/module-en.pdf" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Module Description (Indonesian)*</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          content={field.value}
                          onChange={field.onChange}
                          placeholder="Jelaskan apa yang akan dipelajari siswa dalam modul ini..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="descriptionEn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Module Description (English)</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          content={field.value || ""}
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
              </div>

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
                            <FormLabel>Section Title (Indonesian)*</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Memahami Literasi Media" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`sections.${index}.titleEn`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Section Title (English)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Understanding Media Literacy" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                      <FormField
                        control={form.control}
                        name={`sections.${index}.duration`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration (minutes)*</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="5" 
                                min="1"
                                value={field.value?.toString() || ""}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  field.onChange(value === "" ? "" : Number(value) || 1);
                                }}
                                onFocus={(e) => e.target.select()}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name={`sections.${index}.content`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Section Content (Indonesian)*</FormLabel>
                          <FormControl>
                            <RichTextEditor
                              content={field.value}
                              onChange={field.onChange}
                              placeholder="Tulis konten bagian di sini... Gunakan toolbar untuk formatting."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`sections.${index}.contentEn`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Section Content (English)</FormLabel>
                          <FormControl>
                            <RichTextEditor
                              content={field.value || ""}
                              onChange={field.onChange}
                              placeholder="Write the section content here... Use the toolbar for formatting."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
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
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Quiz */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Module Quiz</h2>
                
                <div className="border rounded-lg p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="quiz.title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quiz Title (Indonesian)*</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Kuis Literasi Media" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="quiz.titleEn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quiz Title (English)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Media Literacy Quiz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="quiz.duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quiz Duration (minutes)*</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="10" 
                              min="1"
                              value={field.value?.toString() || ""}
                              onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(value === "" ? "" : Number(value));
                              }}
                              onFocus={(e) => e.target.select()}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="quiz.description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quiz Description (Indonesian)*</FormLabel>
                        <FormControl>
                          <RichTextEditor
                            content={field.value}
                            onChange={field.onChange}
                            placeholder="Jelaskan apa yang dicakup oleh kuis ini..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="quiz.descriptionEn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quiz Description (English)</FormLabel>
                        <FormControl>
                          <RichTextEditor
                            content={field.value || ""}
                            onChange={field.onChange}
                            placeholder="Describe what the quiz covers..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="quiz.totalQuestions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Questions*</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="5" 
                              min="1"
                              value={field.value?.toString() || ""}
                              onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(value === "" ? "" : Number(value));
                              }}
                              onFocus={(e) => e.target.select()}
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
                      )}
                    />
                  </div>

                  {/* Quiz Questions */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-gray-900">Quiz Questions</h3>
                      <Button 
                        type="button" 
                        onClick={() => appendQuestion({
                          question: "",
                          questionEn: "",
                          type: 'multiple-choice' as const,
                          options: ["", "", "", ""],
                          optionsEn: ["", "", "", ""],
                          correctAnswer: 0,
                          explanation: "",
                          explanationEn: "",
                          order: questionFields.length + 1,
                        })}
                        variant="outline" 
                        size="sm"
                      >
                        <Plus size={16} className="mr-2" />
                        Add Question
                      </Button>
                    </div>

                    {questionFields.map((question, questionIndex) => (
                      <div key={question.id} className="border-2 border-gray-200 rounded-lg p-6 space-y-4">
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
                              <FormLabel>Question Text (Indonesian)*</FormLabel>
                              <FormControl>
                                <RichTextEditor
                                  content={field.value}
                                  onChange={field.onChange}
                                  placeholder="Enter your question here (Indonesian)..."
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`quiz.questions.${questionIndex}.questionEn`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Question Text (English)</FormLabel>
                              <FormControl>
                                <RichTextEditor
                                  content={field.value || ""}
                                  onChange={field.onChange}
                                  placeholder="Enter your question here (English)..."
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`quiz.questions.${questionIndex}.type`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Question Type*</FormLabel>
                              <FormControl>
                                <select 
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e.target.value);
                                    // Reset options when changing type
                                    if (e.target.value === 'true-false') {
                                      form.setValue(`quiz.questions.${questionIndex}.options`, ["True", "False"]);
                                      form.setValue(`quiz.questions.${questionIndex}.optionsEn`, ["True", "False"]);
                                      form.setValue(`quiz.questions.${questionIndex}.correctAnswer`, 0);
                                    } else {
                                      form.setValue(`quiz.questions.${questionIndex}.options`, ["", "", "", ""]);
                                      form.setValue(`quiz.questions.${questionIndex}.optionsEn`, ["", "", "", ""]);
                                      form.setValue(`quiz.questions.${questionIndex}.correctAnswer`, 0);
                                    }
                                  }}
                                >
                                  <option value="multiple-choice">Multiple Choice</option>
                                  <option value="true-false">True/False</option>
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="space-y-2">
                          <FormLabel>Answer Options*</FormLabel>
                          {form.watch(`quiz.questions.${questionIndex}.type`) === 'true-false' ? (
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  name={`correct-${questionIndex}`}
                                  checked={form.watch(`quiz.questions.${questionIndex}.correctAnswer`) === 0}
                                  onChange={() => form.setValue(`quiz.questions.${questionIndex}.correctAnswer`, 0)}
                                />
                                <span>True</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  name={`correct-${questionIndex}`}
                                  checked={form.watch(`quiz.questions.${questionIndex}.correctAnswer`) === 1}
                                  onChange={() => form.setValue(`quiz.questions.${questionIndex}.correctAnswer`, 1)}
                                />
                                <span>False</span>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {form.watch(`quiz.questions.${questionIndex}.options`).map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    name={`correct-${questionIndex}`}
                                    checked={form.watch(`quiz.questions.${questionIndex}.correctAnswer`) === optionIndex}
                                    onChange={() => form.setValue(`quiz.questions.${questionIndex}.correctAnswer`, optionIndex)}
                                  />
                                  <FormField
                                    control={form.control}
                                    name={`quiz.questions.${questionIndex}.options.${optionIndex}`}
                                    render={({ field }) => (
                                      <FormItem className="flex-1">
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
                                </div>
                              ))}
                            </div>
                          )}
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
                                  className="min-h-[60px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`quiz.questions.${questionIndex}.explanationEn`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Explanation (English)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Explain why this is the correct answer (English)..."
                                  className="min-h-[60px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="space-y-2">
                          <FormLabel>Answer Options (English)</FormLabel>
                          {form.watch(`quiz.questions.${questionIndex}.type`) === 'true-false' ? (
                            <div className="text-sm text-gray-500">
                              True/False questions use the same options in both languages
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {form.watch(`quiz.questions.${questionIndex}.optionsEn`)?.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-center space-x-2">
                                  <div className="w-4 text-center text-sm text-gray-500">
                                    {String.fromCharCode(65 + optionIndex)}
                                  </div>
                                  <FormField
                                    control={form.control}
                                    name={`quiz.questions.${questionIndex}.optionsEn.${optionIndex}`}
                                    render={({ field }) => (
                                      <FormItem className="flex-1">
                                        <FormControl>
                                          <Input 
                                            placeholder={`Option ${optionIndex + 1} (English)`}
                                            {...field} 
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              )) || []}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/modules")}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating Module..." : "Create Module"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
