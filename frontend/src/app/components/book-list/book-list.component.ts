import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model'
import { BookItemComponent } from "../book-item/book-item.component";
import { NgForOf } from "@angular/common";
import {SearchComponent} from "../search/search.component";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  standalone: true,
  imports: [
    BookItemComponent,
    NgForOf,
    SearchComponent
  ],
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
    });
  }

  filteredBooks: Book[] = this.books;

  onSearch(searchTerm: string): void {
    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }

}
