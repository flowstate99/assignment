import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import type { BookUpdateInput } from '@/types/book'

interface RouteParams {
  params: { id: string }
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: parseInt(params.id) },
    })
    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 })
    }
    return NextResponse.json(book)
  } catch (error) {
    console.error('Error fetching book:', error)
    return NextResponse.json({ error: 'Error fetching book' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const body: BookUpdateInput = await request.json()
    const book = await prisma.book.update({
      where: { id: parseInt(params.id) },
      data: body,
    })
    return NextResponse.json(book)
  } catch (error) {
    console.error('Error updating book:', error)
    return NextResponse.json({ error: 'Error updating book' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    await prisma.book.delete({
      where: { id: parseInt(params.id) },
    })
    return NextResponse.json({}, { status: 200 })
  } catch (error) {
    console.error('Error deleting book:', error)
    return NextResponse.json({ error: 'Error deleting book' }, { status: 500 })
  }
}