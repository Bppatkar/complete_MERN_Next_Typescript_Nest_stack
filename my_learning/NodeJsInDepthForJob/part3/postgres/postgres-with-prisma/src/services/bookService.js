import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function addBook(title, publishedDate, authorId) {
  try {
    const newlyCreatedBook = await prisma.book.create({
      data: {
        title,
        publishedDate,
        author: { connect: { id: authorId } },
      },
      include: { author: true },
    });
    return newlyCreatedBook;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllBooks() {
  try {
    const books = await prisma.book.findMany({
      include: { author: true },
    });
    return books;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getBookById(id) {
  try {
    const book = await prisma.book.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!book) {
      throw new Error(`Book with id ${id} not found`);
    }
    return book;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateBook(id, newTitle) {
  try {
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteBook(id) {
  try {
    const deletedBook = await prisma.book.delete({
      where: { id },
      include: { author: true },
    });
    return deletedBook;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { addBook, getAllBooks, getBookById, updateBook, deleteBook };
