import type { Book } from '@/types/book'

interface BookCardProps {
  book: Book
  onEdit: () => void
  onDelete: () => void
}

export default function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-mono font-semibold text-gray-900">{book.title}</h3>
      <p className="text-gray-600">By {book.author}</p>
      <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>
      <p className="text-sm text-gray-500">Published: {book.publicationYear}</p>
      {book.description && (
        <p className="mt-2 text-gray-700">{book.description}</p>
      )}
      <div className="mt-4 flex space-x-2">
        <button
          onClick={onEdit}
          className="bg-blue-500 font-sans text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 font-sans text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  )
}