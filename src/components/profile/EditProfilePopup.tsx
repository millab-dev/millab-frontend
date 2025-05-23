"use client"

import * as React from "react"
import { useState } from "react"
import { Check, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from 'framer-motion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { User } from "@/types/user"
import { updateProfileData } from "@/actions/profile.update-profile-data"

interface EditProfilePopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userData: Partial<User>
}

const EditProfilePopup: React.FC<EditProfilePopupProps> = ({
  open,
  onOpenChange,
  userData
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: userData.name,
    birthplace: userData.birthplace,
    birthdate: userData.birthdate || new Date().toISOString().split('T')[0],
    phone: userData.phoneNumber || "",
    gender: userData.gender || "Male",
    school: userData.socializationLocation || ""
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    // Validate phone number - only allow numbers or + followed by numbers
    if (name === "phone") {
      const phoneRegex = /^\+?[0-9]*$/
      if (!phoneRegex.test(value)) return
    }
    
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  // Date is now handled directly by the input field onChange

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Prepare the data for API call
      const profileData = {
        name: formData.name,
        birthplace: formData.birthplace,
        birthdate: formData.birthdate,
        phoneNumber: formData.phone,
        gender: formData.gender as "Male" | "Female", // Already in correct format
        socializationLocation: formData.school
      };
      
      // Call the update profile API
      const result = await updateProfileData(profileData);
      
      // Always reset submitting state first
      setIsSubmitting(false);
      
      if (result.success) {
        // Reset any previous error
        setError(null);
        // Show success message
        setSuccess(true);
        
        // Refresh the page after successful update
        setTimeout(() => {
          setSuccess(false);
          onOpenChange(false);
          router.refresh(); // Refresh the page to show updated data
        }, 2000);
      } else {
        // Handle error case
        const errorMessage = 'error' in result ? result.error : 'Unknown error';
        console.error('Failed to update profile:', errorMessage);
        setError('Failed to update profile. Please try again.');
        
        // Auto-clear error after 5 seconds
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setIsSubmitting(false);
      setError('An unexpected error occurred. Please try again.');
      
      // Auto-clear error after 5 seconds
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Name field */}
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>
            
            {/* Birthplace field */}
            <div className="grid gap-2">
              <Label htmlFor="birthplace">Birthplace</Label>
              <Input
                id="birthplace"
                name="birthplace"
                value={formData.birthplace}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>
            
            {/* Birthdate field */}
            <div className="grid gap-2">
              <Label htmlFor="birthdate">Date of Birth</Label>
              <Input
                id="birthdate"
                name="birthdate"
                type="date"
                value={formData.birthdate}
                onChange={handleChange}
                className="w-full"
                max={new Date().toISOString().split('T')[0]} // Cannot select future dates
                required
              />
            </div>

            {/* Phone field */}
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>
            
            {/* Gender field */}
            <div className="grid gap-2">
              <Label htmlFor="gender">Gender</Label>
              <Select 
                value={formData.gender} 
                onValueChange={(value) => handleSelectChange("gender", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* School field */}
            <div className="grid gap-2">
              <Label htmlFor="school">School</Label>
              <Input
                id="school"
                name="school"
                value={formData.school}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>
            
            {/* Email field removed as requested */}
            
            {success && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 text-green-700 p-2 rounded-md text-sm flex items-center gap-2"
              >
                <Check size={16} />
                Profile updated successfully!
              </motion.div>
            )}
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 text-red-700 p-2 rounded-md text-sm flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                {error}
              </motion.div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || success}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfilePopup