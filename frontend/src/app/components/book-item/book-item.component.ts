import { Component, Input } from '@angular/core';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {BookModalComponent} from "../book-modal/book-modal.component";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  standalone: true,
  styleUrls: ['./book-item.component.css'],
  imports: [MatDialogModule]
})
export class BookItemComponent {
  @Input() book: any;

  constructor(private dialog: MatDialog, private bookService: BookService) {}

  toggleLike(): void {
    this.book.liked = !this.book.liked;
    this.bookService.updateLikeStatus(this.book.id, this.book.liked).subscribe();
  }
  openModal() {
    this.dialog.open(BookModalComponent, {
      data: this.book
    });
  }
  getImageUrl(image: Blob): string {
    if (image) {
      return URL.createObjectURL(image);
    }
    return '';
  }

}
