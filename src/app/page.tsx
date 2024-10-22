'use client'

import BookList from '@/components/BookList'

export default function Home() {
  return (
    <div className="space-y-6">
      <header className="bg-slate-300 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-mono font-bold text-gray-900 text-center">
        Book Management System
          </h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookList />
      </div>
    </div>
  )
}