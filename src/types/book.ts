export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publicationYear: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type BookCreateInput = Omit<Book, 'id' | 'createdAt' | 'updatedAt'>;
export type BookUpdateInput = Partial<BookCreateInput>;