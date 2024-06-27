namespace bookLibraryBackend.DTOs
{
    public class BookCreateDto
    {
        public string? Title { get; set; }
        public string? Author { get; set; }
        public int PublicationYear { get; set; }
        public string? Description { get; set; }
        public bool Liked { get; set; }
        public IFormFile? CoverImage { get; set; }  // Use IFormFile for file upload
    }
}

