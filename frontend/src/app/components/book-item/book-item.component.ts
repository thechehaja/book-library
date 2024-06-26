import { Component, Input } from '@angular/core';
import {Book} from "../../models/book.model";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {BookModalComponent} from "../book-modal/book-modal.component";

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  standalone: true,
  styleUrls: ['./book-item.component.css'],
  imports: [MatDialogModule]
})
export class BookItemComponent {
  @Input() book: any;

  constructor(private dialog: MatDialog) {}

  toggleLike(): void {
    this.book.liked = !this.book.liked;
  }
  openModal() {
    this.dialog.open(BookModalComponent, {
      data: this.book
    });
  }
}
