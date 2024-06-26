import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://localhost:5001/api/books';

  constructor(private http: HttpClient) { }

  getBooks(page: number = 1, pageSize: number = 9): Observable<{ books: Book[]; totalBooks: number }> {
    let params = new HttpParams().set('page', page.toString()).set('pageSize', pageSize.toString());
    return this.http.get<any[]>(this.apiUrl, { params, observe: 'response' }).pipe(
      map(response => {
        const books = response.body ?? [];
        const totalBooks = +(response.headers.get('X-Total-Count') ?? 0);
        return {
          books: books.map(book => ({
            id: book.id,
            title: book.title,
            author: book.author,
            publication_year: book.publicationYear,
            description: book.description,
            cover_image: this.convertToBlob(book.coverImage),
            liked: book.liked
          })),
          totalBooks: totalBooks
        };
      })
    );
  }

  private convertToBlob(base64String: string): Blob {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'image/jpeg' });
  }

  updateLikeStatus(id: number, liked: boolean): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/like`, liked);
  }

  getComments(bookId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${bookId}/comments`);
  }

  addComment(bookId: number, content: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/${bookId}/comments`, { content });
  }
}
