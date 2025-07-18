'use client'
export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthGuard from '@/components/AuthGuard'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Dashboard() {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Welcome to Your Study Dashboard
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                <ul className="space-y-2">
                  <li className="text-gray-600">• Start a new study session</li>
                  <li className="text-gray-600">• Review past materials</li>
                  <li className="text-gray-600">• Take practice exams</li>
                  <li className="text-gray-600">• Chat with AI tutor</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                <p className="text-gray-600">
                  Your recent study sessions and progress will appear here.
                </p>
              </div>
            </div>
            
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                AI Study Assistant Ready
              </h3>
              <p className="text-blue-800">
                Your AI-powered study companion is configured with Claude and OpenAI integration.
                Start your first study session to experience personalized learning for UK law.
              </p>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </AuthGuard>
  )
}