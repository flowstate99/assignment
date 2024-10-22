import { useState, useEffect } from 'react'
import type { Book } from '@/types/book'
import BookCard from './BookCard'
import BookForm from './BookForm'
import { toast } from '@/hooks/use-toast'

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingBook, setEditingBook] = useState<Book | null>(null)

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books')
      if (!response.ok) throw new Error('Failed to fetch books')
      const data = await response.json()
      setBooks(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const handleCreateBook = async (bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData),
      })
      if (!response.ok) throw new Error('Failed to create book')
      await fetchBooks()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  const handleUpdateBook = async (id: number, bookData: Partial<Book>) => {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData),
      })
      if (!response.ok) throw new Error('Failed to update book')
      setEditingBook(null)
      await fetchBooks()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  const handleDeleteBook = async (id: number) => {
    if (!confirm('Are you sure you want to delete this book?')) return
    try {
      const response = await fetch(`/api/books/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete book')
      setBooks(books.filter((book) => book.id !== id))
      toast({
        title: 'Success',
        description: 'Book deleted successfully',
      })
      console.log('Book deleted successfully')
      await fetchBooks()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete book',
      })
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
        <BookForm onSubmit={handleCreateBook} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onEdit={() => setEditingBook(book)}
            onDelete={() => handleDeleteBook(book.id)}
          />
        ))}
      </div>

      {editingBook && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
            <BookForm
              book={editingBook}
              onSubmit={(data) => handleUpdateBook(editingBook.id, data)}
            />
            <button
              onClick={() => setEditingBook(null)}
              className="mt-4 text-gray-600 font-sans hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}