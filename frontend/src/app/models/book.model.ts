export interface Book {
  id: number;
  title: string;
  author: string;
  publication_year: number;
  description: string;
  cover_image: Blob;
  liked?: boolean;
}
