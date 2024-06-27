import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { Comment } from '../../models/comment.model';
import {DatePipe, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";  // Import the Comment model

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./book-modal.component.css']
})
export class BookModalComponent implements OnInit {
  comments: Comment[] = [];  // Declare comments as Comment[]

  newComment: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public book: Book,
    private dialogRef: MatDialogRef<BookModalComponent>,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.loadComments();
  }

  toggleLike(): void {
    this.book.liked = !this.book.liked;
    this.bookService.updateLikeStatus(this.book.id, this.book.liked).subscribe();
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  loadComments(): void {
    this.bookService.getComments(this.book.id).subscribe((comments) => {
      this.comments = comments;  // Assign the comments received from the service
    });
  }

  addComment(): void {
    if (this.newComment.trim()) {
      this.bookService.addComment(this.book.id, this.newComment).subscribe((comment) => {
        this.comments.push(comment);
        this.newComment = '';
      });
    }
  }
}
