import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const genres = await prisma.genre.findMany();
  return NextResponse.json(genres);
}

export async function POST(request: Request) {
  const { name } = await request.json();
  const newGenre = await prisma.genre.create({
    data: { name },
  });
  return NextResponse.json(newGenre);
}

export async function PUT(request: Request) {
  const { id, name } = await request.json();
  const updatedGenre = await prisma.genre.update({
    where: { id: Number(id) },
    data: { name },
  });
  return NextResponse.json(updatedGenre);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.genre.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json({ message: 'Genre deleted' });
}
