'use client'

import React from 'react';
import { useRouter } from 'next/navigation'
import { signOut } from '@/utils/auth'
import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabaseClient'

export default function Header() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
if (user?.email) {
  setUserEmail(user.email);
}
    }
    
    if (mounted) {
      getUser()
    }
  }, [mounted])

  const handleLogout = async () => {
    const { error } = await signOut()
    if (!error) {
      router.push('/login')
    }
  }

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return null
  }

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">DurhamLaw AI Study App</h1>
        <div className="flex items-center gap-4">
          {userEmail && (
            <span className="text-sm text-gray-300">{userEmail}</span>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}