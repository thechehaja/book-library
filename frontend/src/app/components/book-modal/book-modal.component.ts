import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  standalone: true,
  styleUrls: ['./book-modal.component.css']
})
export class BookModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public book: Book,
    private dialogRef: MatDialogRef<BookModalComponent>
  ) {}

  toggleLike(): void {
    this.book.liked = !this.book.liked;
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
