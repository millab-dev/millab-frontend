'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RootPage() {
  const router = useRouter()
  
  useEffect(() => {
    console.log('Root page loaded')
    router.push('/about-us')
  }, [router])
  
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-lg">Redirecting to About Us page...</p>
    </div>
  )
}
