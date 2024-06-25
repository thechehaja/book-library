import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  standalone: true,
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent {
  @Input() book: any;

  toggleLike(): void {
    this.book.liked = !this.book.liked;
  }

  openModal(): void {
    // logic to open modal and pass book data
  }
}
