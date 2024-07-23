import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const books = await prisma.book.findMany();
  return NextResponse.json(books);
}

export async function POST(request: Request) {
  const { title, author } = await request.json();
  const newBook = await prisma.book.create({
    data: { title, author },
  });
  return NextResponse.json(newBook);
}

export async function PUT(request: Request) {
  const { id, title, author } = await request.json();
  const updatedBook = await prisma.book.update({
    where: { id: Number(id) },
    data: { title, author },
  });
  return NextResponse.json(updatedBook);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.book.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json({ message: 'Book deleted' });
}
