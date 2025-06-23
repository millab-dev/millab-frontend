export interface User {
    id: string
    name: string
    username: string
    gender: 'Male' | 'Female'
    birthplace: string
    birthdate: string
    socializationLocation: string
    email: string
    phoneNumber?: string // Make phone number optional
    createdAt: string
    updatedAt: string
  }