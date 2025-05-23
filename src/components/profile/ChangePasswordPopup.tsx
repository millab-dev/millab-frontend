"use client"

import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, Eye, EyeOff, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { changePassword } from "@/actions/auth.change-password"
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

interface ChangePasswordPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const ChangePasswordPopup: React.FC<ChangePasswordPopupProps> = ({
  open,
  onOpenChange,
}) => {
  const router = useRouter()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // Password strength indicators
  const hasMinLength = newPassword.length >= 8
  const hasUppercase = /[A-Z]/.test(newPassword)
  const hasNumber = /[0-9]/.test(newPassword)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
  const passwordsMatch = newPassword === confirmPassword && confirmPassword !== ''

  const passwordStrength = [
    hasMinLength,
    hasUppercase,
    hasNumber,
    hasSpecialChar,
  ].filter(Boolean).length

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }
    
    if (passwordStrength < 3) {
      setError('Password not strong enough')
      return
    }
    
    setError('')
    setIsSubmitting(true)
    
    try {
      // Call the change password API
      const result = await changePassword({
        currentPassword,
        newPassword
      })
      
      // Always reset submitting state
      setIsSubmitting(false)
      
      if (result.success) {
        // Show success message
        setSuccess(true)
        
        // Close dialog after success
        setTimeout(() => {
          setSuccess(false)
          onOpenChange(false)
          // Reset form
          setCurrentPassword('')
          setNewPassword('')
          setConfirmPassword('')          
          router.refresh() // Refresh to update any session data if needed
        }, 2000)
      } else {
        // Handle error case
        const errorMessage = 'error' in result ? result.error : 'Failed to change password'
        setError(errorMessage)
      }
    } catch (error) {
      console.error('Error changing password:', error)
      setIsSubmitting(false)
      setError('An unexpected error occurred. Please try again.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter your current password and new password to update your credentials.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">
                Current Password
              </Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="pr-10"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="new-password">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pr-10"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              
              {/* Password strength indicator */}
              {newPassword && (
                <div className="mt-1 space-y-2">
                  <div className="flex gap-1">
                    {[...Array(4)].map((_, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "h-1 flex-1 rounded-full",
                          i < passwordStrength ? "bg-primary" : "bg-gray-200"
                        )}
                      />
                    ))}
                  </div>
                  <ul className="text-xs space-y-1 text-gray-500">
                    <li className={cn("flex items-center gap-1", hasMinLength ? "text-green-600" : "")}>
                      {hasMinLength ? <Check size={12} /> : null}
                      At least 8 characters
                    </li>
                    <li className={cn("flex items-center gap-1", hasUppercase ? "text-green-600" : "")}>
                      {hasUppercase ? <Check size={12} /> : null}
                      At least one uppercase letter
                    </li>
                    <li className={cn("flex items-center gap-1", hasNumber ? "text-green-600" : "")}>
                      {hasNumber ? <Check size={12} /> : null}
                      At least one number
                    </li>
                    <li className={cn("flex items-center gap-1", hasSpecialChar ? "text-green-600" : "")}>
                      {hasSpecialChar ? <Check size={12} /> : null}
                      At least one special character
                    </li>
                  </ul>
                </div>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`pr-10 ${confirmPassword && !passwordsMatch ? "border-red-500" : ""}`}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className="text-xs text-red-500">Passwords do not match</p>
              )}
              {confirmPassword && passwordsMatch && (
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <Check size={12} /> Passwords match
                </p>
              )}
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            
            {success && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 text-green-700 p-2 rounded-md text-sm flex items-center gap-2"
              >
                <Check size={16} />
                Password changed successfully!
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
                "Update Password"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ChangePasswordPopup