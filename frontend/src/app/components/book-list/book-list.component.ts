import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { BookItemComponent } from "../book-item/book-item.component";
import { NgForOf } from "@angular/common";
import { SearchComponent } from "../search/search.component";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  standalone: true,
  imports: [
    BookItemComponent,
    CommonModule,
    NgForOf,
    SearchComponent
  ],
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  currentPage: number = 1;
  booksPerPage: number = 9;
  totalBooks: number = 0;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks(this.currentPage, this.booksPerPage).subscribe((data) => {
      this.books = data.books;
      this.totalBooks = data.totalBooks;
      console.log('TOTAL', data.totalBooks);
    });
  }

  onSearch(searchTerm: string): void {
    this.currentPage = 1; // Reset to the first page after search
    this.bookService.getBooks(this.currentPage, this.booksPerPage).subscribe((data) => {
      this.books = data.books.filter((book: { title: string; }) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.totalBooks = this.books.length;
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadBooks();
  }

  hasNextPage(): boolean {
    const startIndex = (this.currentPage - 1) * this.booksPerPage;
    return startIndex + this.books.length < this.totalBooks;
  }

  hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }
}
