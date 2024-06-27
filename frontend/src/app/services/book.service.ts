import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://localhost:5001/api/books';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((books: any[]) => {
        return books.map(book => ({
          id: book.id,
          title: book.title,
          author: book.author,
          publication_year: book.publicationYear,
          description: book.description,
          cover_image: this.convertToBlob(book.coverImage),  // Convert to Blob
          liked: book.liked
        }));
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
}
