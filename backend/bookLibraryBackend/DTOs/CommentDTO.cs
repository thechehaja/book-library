namespace bookLibraryBackend.DTOs
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}

