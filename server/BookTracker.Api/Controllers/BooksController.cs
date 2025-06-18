using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BooksController : ControllerBase {
    private readonly AppDbContext _context;

    public BooksController(AppDbContext context) {
        _context = context;
    }

    private Guid GetUserId() =>
        Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BookReadDTO>>> GetBooks() {
        var userId = GetUserId();
        var books = await _context.Books
            .Where(b => b.UserId == userId)
            .ToListAsync();

        var dtos = books.Select(BookMapper.ToReadDTO);
        return Ok(dtos);
    }

    [HttpPost]
    public async Task<ActionResult<BookReadDTO>> CreateBook([FromBody] BookCreateDTO dto) {
        var userId = GetUserId();
        var book = BookMapper.ToEntity(dto, userId);

        _context.Books.Add(book);
        await _context.SaveChangesAsync();

        var result = BookMapper.ToReadDTO(book);
        return CreatedAtAction(nameof(GetBooks), new { id = book.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBook(Guid id, BookUpdateDTO dto) {
        var userId = GetUserId();
        var book = await _context.Books.FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId);

        if (book == null)
            return NotFound();

        BookMapper.UpdateEntity(book, dto);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(Guid id) {
        var userId = GetUserId();
        var book = await _context.Books.FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId);

        if (book == null)
            return NotFound();

        _context.Books.Remove(book);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
