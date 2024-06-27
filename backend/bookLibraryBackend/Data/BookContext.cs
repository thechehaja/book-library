using bookLibraryBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace bookLibraryBackend.Data
{
    public class BookContext : DbContext
    {
        public BookContext(DbContextOptions<BookContext> options) : base(options) { }
        public DbSet<Book> Book { get; set; }
        public DbSet<Comment> Comment { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>()
                .Property(b => b.CoverImage)
                .HasColumnType("varbinary(max)");
        }
    }
}