'use client'
export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabaseClient'
import { signOut } from '@/utils/auth'
import ChatInterface from '@/components/ChatInterface'
import { MessageSquare, BookOpen, FileText, Brain } from 'lucide-react'

export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('chat')

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
      } else {
        setUserEmail(session.user.email)
        setLoading(false)
      }
    }
    checkUser()
  }, [router])

  const handleLogout = async () => {
    const { error } = await signOut()
    if (!error) {
      router.push('/login')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
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
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-gray-200 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
                activeTab === 'chat' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MessageSquare size={20} />
              AI Tutor
            </button>
            <button
              onClick={() => setActiveTab('study')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
                activeTab === 'study' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BookOpen size={20} />
              Study Sessions
            </button>
            <button
              onClick={() => setActiveTab('exams')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
                activeTab === 'exams' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText size={20} />
              Practice Exams
            </button>
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
                activeTab === 'flashcards' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Brain size={20} />
              Flashcards
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {activeTab === 'chat' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">AI Law Tutor</h2>
                <ChatInterface />
              </div>
            )}
            
            {activeTab === 'study' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Study Sessions</h2>
                <div className="text-center py-12 text-gray-500">
                  <BookOpen size={48} className="mx-auto mb-4 text-gray-400" />
                  <p>Study session tracking coming soon!</p>
                  <p className="text-sm mt-2">Track your study time and progress</p>
                </div>
              </div>
            )}
            
            {activeTab === 'exams' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Practice Exams</h2>
                <div className="text-center py-12 text-gray-500">
                  <FileText size={48} className="mx-auto mb-4 text-gray-400" />
                  <p>Practice exams coming soon!</p>
                  <p className="text-sm mt-2">Test your knowledge with AI-generated questions</p>
                </div>
              </div>
            )}
            
            {activeTab === 'flashcards' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Legal Flashcards</h2>
                <div className="text-center py-12 text-gray-500">
                  <Brain size={48} className="mx-auto mb-4 text-gray-400" />
                  <p>Flashcards coming soon!</p>
                  <p className="text-sm mt-2">Memorize key legal terms and concepts</p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700">Study Streak</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">0 days</p>
              <p className="text-sm text-gray-500 mt-1">Keep it up!</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700">Topics Mastered</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">0</p>
              <p className="text-sm text-gray-500 mt-1">Start learning</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700">Practice Score</h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">--%</p>
              <p className="text-sm text-gray-500 mt-1">Take your first test</p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 DurhamLaw AI Study App. All rights reserved.</p>
          <p className="text-sm text-gray-400 mt-2">
            Built for UK Law Students at Durham University
          </p>
        </div>
      </footer>
    </div>
  )
}