import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from '../../models/book.model';
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  standalone: true,
  styleUrls: ['./book-modal.component.css']
})
export class BookModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public book: Book,
    private dialogRef: MatDialogRef<BookModalComponent>,
    private bookService: BookService
  ) {}

  toggleLike(): void {
    this.book.liked = !this.book.liked;
    this.bookService.updateLikeStatus(this.book.id, this.book.liked).subscribe();
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
