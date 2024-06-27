namespace bookLibraryBackend.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public string? Content { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Book Book { get; set; } // Navigation property
    }
}