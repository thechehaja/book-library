using bookLibraryBackend.Data;
using bookLibraryBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using bookLibraryBackend.DTOs;

namespace bookLibraryBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookContext _context;

        public BooksController(BookContext context)
        {
            _context = context;
        }

        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            return await _context.Book.ToListAsync();
        }

        // GET: api/Books/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _context.Book.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        // POST: api/Books
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook([FromForm] BookCreateDto bookDto)
        {
            var book = new Book
            {
                Title = bookDto.Title,
                Author = bookDto.Author,
                PublicationYear = bookDto.PublicationYear,
                Description = bookDto.Description,
                Liked = bookDto.Liked,
                CoverImage = await ConvertFileToByteArray(bookDto.CoverImage)
            };

            _context.Book.Add(book);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBook", new { id = book.Id }, book);
        }

        private async Task<byte[]> ConvertFileToByteArray(IFormFile file)
        {
            if (file == null)
                return null;

            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);
            return memoryStream.ToArray();
        }

        // PUT: api/Books/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, Book book)
        {
            if (id != book.Id)
            {
                return BadRequest();
            }

            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        
        // PUT: api/Books/5/like
        [HttpPut("{id}/like")]
        public async Task<IActionResult> UpdateLikeStatus(int id, [FromBody] bool liked)
        {
            var book = await _context.Book.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            book.Liked = liked;
            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        // DELETE: api/Books/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Book.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            _context.Book.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        // GET: api/Books/5/Comments
        [HttpGet("{id}/comments")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments(int id)
        {
            var comments = await _context.Comment.Where(c => c.BookId == id).ToListAsync();
            return comments;
        }
        
        [HttpPost("{id}/comments")]
        public async Task<ActionResult<Comment>> AddComment(int id, CommentDTO commentDTO)
        {
            var comment = new Comment
            {
                BookId = id,
                Content = commentDTO.Content,
                CreatedAt = DateTime.UtcNow
            };

            _context.Comment.Add(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetComments), new { id = comment.Id }, comment);
        }

        private bool BookExists(int id)
        {
            return _context.Book.Any(e => e.Id == id);
        }
    }
}
