import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

export interface Book {
    id: string;
    title: string;
    author: string;
}

@Injectable()
export class BookService {
    private books: Book[] = [];

    findAll(): Book[] {
      return this.books;
    }

    findOne(id: string): Book | undefined {
        return this.books.find(book => book.id === id);
    }

    create(book: Omit<Book, 'id'>): Book {
        const newBook: Book = { id: randomUUID(), ...book };
        this.books.push(newBook);
        return newBook;
    }

    update(id: string, updateData: Partial<Book>): Book | undefined {
        const book = this.findOne(id);
        if (book) Object.assign(book, updateData)
        return book;
    }

    remove(id: string): Boolean {
        const index = this.books.findIndex(book => book.id === id);
        if (index >= 0) {
            this.books.splice(index, 1);
            return true;
        }
        return false
    }
}
