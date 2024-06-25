import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  standalone: true,
  styleUrls: ['./book-modal.component.css']
})
export class BookModalComponent {
  @Input() book: any;
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  toggleLike(): void {
    this.book.liked = !this.book.liked;
  }

  closeModal(): void {
    this.close.emit();
  }
}
