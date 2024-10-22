import React, { useState } from 'react'
import type { Book, BookCreateInput } from '@/types/book'
import { toast } from '@/hooks/use-toast'

interface BookFormProps {
  book?: Book
  onSubmit: (data: BookCreateInput) => Promise<void>
}

export default function BookForm({ book, onSubmit }: BookFormProps) {
  const [formData, setFormData] = useState<BookCreateInput>({
    title: book?.title || '',
    author: book?.author || '',
    isbn: book?.isbn || '',
    publicationYear: book?.publicationYear || new Date().getFullYear(),
    description: book?.description || '',
  })

  const resetForm = () => {
    setFormData({
      title: '',
      author: '',
      isbn: '',
      publicationYear: new Date().getFullYear(),
      description: '',
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    resetForm()
    toast({
      variant: 'default',
      description: book ? 'Book updated successfully' : 'Book added successfully',
    })
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-sans font-medium text-gray-700">Title</label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-sans font-medium text-gray-700">Author</label>
        <input
          type="text"
          required
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-sans font-medium text-gray-700">ISBN</label>
        <input
          type="number"
          required
          value={formData.isbn}
          onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-sans font-medium text-gray-700">Publication Year</label>
        <input
          type="number"
          required
          value={formData.publicationYear}
          onChange={(e) => setFormData({ ...formData, publicationYear: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-sans font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-sans font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {book ? 'Update Book' : 'Add Book'}
      </button>
    </form>
  )
}