import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Book, BookService } from './book.service';

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Get()
    getAll() {
        return this.bookService.findAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.bookService.findOne(id);
    }

    @Post()
    create(@Body() book: Omit<Book, 'id'>) {
        return this.bookService.create(book);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() book: Partial<Book>) {
        return this.bookService.update(id, book);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return { deleted: this.bookService.remove(id) };
    }
}
