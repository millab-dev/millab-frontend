"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowLeft, Save, Download, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { toast } from "sonner";

const urlValidator = (val: string | undefined) => {
  if (!val || val.trim() === "") return true; // Allow empty
  try {
    const url = new URL(val);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const settingsSchema = z.object({
  downloadAllPdfUrl: z.string().optional().refine(urlValidator, "Must be a valid URL"),
  downloadAllPdfUrlEn: z.string().optional().refine(urlValidator, "Must be a valid URL"),
  // Guidelines URLs - Indonesian
  guidelinesWebsiteUrlId: z.string().optional().refine(urlValidator, "Must be a valid URL"),
  guidelinesOfflineProductUrlId: z.string().optional().refine(urlValidator, "Must be a valid URL"),
  guidelinesVideoTutorialUrlId: z.string().optional().refine(urlValidator, "Must be a valid URL"),
  // Guidelines URLs - English
  guidelinesWebsiteUrlEn: z.string().optional().refine(urlValidator, "Must be a valid URL"),
  guidelinesOfflineProductUrlEn: z.string().optional().refine(urlValidator, "Must be a valid URL"),
  guidelinesVideoTutorialUrlEn: z.string().optional().refine(urlValidator, "Must be a valid URL"),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

interface AppSettings {
  id: string;
  downloadAllPdfUrl?: string;
  downloadAllPdfUrlEn?: string;
  // Guidelines URLs - Indonesian
  guidelinesWebsiteUrlId?: string;
  guidelinesOfflineProductUrlId?: string;
  guidelinesVideoTutorialUrlId?: string;
  // Guidelines URLs - English
  guidelinesWebsiteUrlEn?: string;
  guidelinesOfflineProductUrlEn?: string;
  guidelinesVideoTutorialUrlEn?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminSettings() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      downloadAllPdfUrl: "",
      downloadAllPdfUrlEn: "",
      // Guidelines URLs - Indonesian  
      guidelinesWebsiteUrlId: "",
      guidelinesOfflineProductUrlId: "",
      guidelinesVideoTutorialUrlId: "",
      // Guidelines URLs - English
      guidelinesWebsiteUrlEn: "",
      guidelinesOfflineProductUrlEn: "",
      guidelinesVideoTutorialUrlEn: "",
    },
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch(
        `/api/v1/settings/admin`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success && data.data) {
        form.reset({
          downloadAllPdfUrl: data.data.downloadAllPdfUrl || "",
          downloadAllPdfUrlEn: data.data.downloadAllPdfUrlEn || "",
          // Guidelines URLs - Indonesian
          guidelinesWebsiteUrlId: data.data.guidelinesWebsiteUrlId || "",
          guidelinesOfflineProductUrlId: data.data.guidelinesOfflineProductUrlId || "",
          guidelinesVideoTutorialUrlId: data.data.guidelinesVideoTutorialUrlId || "",
          // Guidelines URLs - English
          guidelinesWebsiteUrlEn: data.data.guidelinesWebsiteUrlEn || "",
          guidelinesOfflineProductUrlEn: data.data.guidelinesOfflineProductUrlEn || "",
          guidelinesVideoTutorialUrlEn: data.data.guidelinesVideoTutorialUrlEn || "",
        });
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: SettingsFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `/api/v1/settings/admin`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Settings updated successfully!");
      } else {
        toast.error(result.error || "Failed to update settings");
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Failed to update settings");
    } finally {
      setIsSubmitting(false);
    }
  };

  const testDownloadUrl = () => {
    const url = form.getValues("downloadAllPdfUrl");
    if (url && url.trim()) {
      window.open(url, "_blank");
    } else {
      toast.info("Please enter a PDF URL first");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 font-jakarta">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading settings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-jakarta">
      <div className="max-w-4xl mx-auto">
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
            <h1 className="text-2xl font-bold text-gray-900">Application Settings</h1>
            <p className="text-gray-600">Configure global application settings</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download size={20} />
                  Download Settings
                </CardTitle>
                <CardDescription>
                  Configure download URLs for students
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="downloadAllPdfUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Download All URL (Indonesian)</FormLabel>
                      <FormDescription>
                        URL for Indonesian users. Can be any link (PDF, zip file, cloud drive, etc.). This will be used for the "Download All" feature.
                      </FormDescription>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input 
                            placeholder="https://example.com/all-modules-id.pdf" 
                            {...field} 
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={testDownloadUrl}
                          title="Test URL"
                        >
                          <Download size={16} />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="downloadAllPdfUrlEn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Download All URL (English)</FormLabel>
                      <FormDescription>
                        URL for English users. Can be any link (PDF, zip file, cloud drive, etc.). If not provided, the Indonesian URL will be used as fallback.
                      </FormDescription>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input 
                            placeholder="https://example.com/all-modules-en.pdf" 
                            {...field} 
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            const url = form.getValues("downloadAllPdfUrlEn");
                            if (url) {
                              window.open(url, "_blank");
                            } else {
                              toast.error("Please enter a URL to test");
                            }
                          }}
                          title="Test URL"
                        >
                          <Download size={16} />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info size={20} />
                  Guidelines Settings
                </CardTitle>
                <CardDescription>
                  Configure guidelines URLs for students. Leave empty to use default values.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Indonesian Guidelines */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-700">Indonesian Guidelines</h4>
                  
                  <FormField
                    control={form.control}
                    name="guidelinesWebsiteUrlId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website Guide URL (Indonesian)</FormLabel>
                        <FormDescription>
                          Default: https://drive.google.com/file/d/17pMw11sbHFbNbcTq0r62T8UHFWIyv39R/view?usp=drive_link
                        </FormDescription>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input 
                              placeholder="https://example.com/website-guide-id.pdf" 
                              {...field} 
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const url = field.value;
                              if (url && url.trim()) {
                                window.open(url, "_blank");
                              } else {
                                toast.info("Please enter a URL first");
                              }
                            }}
                            title="Test URL"
                          >
                            <Download size={16} />
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guidelinesOfflineProductUrlId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Offline Product Guide URL (Indonesian)</FormLabel>
                        <FormDescription>
                          Default: https://drive.google.com/file/d/1A0aDpKVLRZu6GnwtEaMJLSq3rs_Y5_ty/view?usp=drive_link
                        </FormDescription>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input 
                              placeholder="https://example.com/offline-guide-id.pdf" 
                              {...field} 
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const url = field.value;
                              if (url && url.trim()) {
                                window.open(url, "_blank");
                              } else {
                                toast.info("Please enter a URL first");
                              }
                            }}
                            title="Test URL"
                          >
                            <Download size={16} />
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guidelinesVideoTutorialUrlId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Video Tutorial URL (Indonesian)</FormLabel>
                        <FormDescription>
                          Default: https://youtu.be/YahkSAMCGdk?si=CjpLMBRQ_E1fYf3P
                        </FormDescription>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input 
                              placeholder="https://youtu.be/example" 
                              {...field} 
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const url = field.value;
                              if (url && url.trim()) {
                                window.open(url, "_blank");
                              } else {
                                toast.info("Please enter a URL first");
                              }
                            }}
                            title="Test URL"
                          >
                            <Download size={16} />
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* English Guidelines */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-700">English Guidelines</h4>
                  
                  <FormField
                    control={form.control}
                    name="guidelinesWebsiteUrlEn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website Guide URL (English)</FormLabel>
                        <FormDescription>
                          Default: https://drive.google.com/file/d/18_DiyKxtolJS9LQ8ZyWMta6xQNrReuwY/view?usp=sharing
                        </FormDescription>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input 
                              placeholder="https://example.com/website-guide-en.pdf" 
                              {...field} 
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const url = field.value;
                              if (url && url.trim()) {
                                window.open(url, "_blank");
                              } else {
                                toast.info("Please enter a URL first");
                              }
                            }}
                            title="Test URL"
                          >
                            <Download size={16} />
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guidelinesOfflineProductUrlEn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Offline Product Guide URL (English)</FormLabel>
                        <FormDescription>
                          Default: https://drive.google.com/file/d/1OYL-dCW1yrOLgwZNtFy6o2L5LjhldLlx/view?usp=sharing
                        </FormDescription>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input 
                              placeholder="https://example.com/offline-guide-en.pdf" 
                              {...field} 
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const url = field.value;
                              if (url && url.trim()) {
                                window.open(url, "_blank");
                              } else {
                                toast.info("Please enter a URL first");
                              }
                            }}
                            title="Test URL"
                          >
                            <Download size={16} />
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guidelinesVideoTutorialUrlEn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Video Tutorial URL (English)</FormLabel>
                        <FormDescription>
                          Default: https://youtu.be/YahkSAMCGdk?si=CjpLMBRQ_E1fYf3P
                        </FormDescription>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input 
                              placeholder="https://youtu.be/example" 
                              {...field} 
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const url = field.value;
                              if (url && url.trim()) {
                                window.open(url, "_blank");
                              } else {
                                toast.info("Please enter a URL first");
                              }
                            }}
                            title="Test URL"
                          >
                            <Download size={16} />
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />}
                <Save size={16} className="mr-2" />
                Save Settings
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
