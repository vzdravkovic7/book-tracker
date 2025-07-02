using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BooksController : ControllerBase {
    private readonly BookService _bookService;
    private readonly ImageService _imageService;

    public BooksController(BookService bookService, ImageService imageService) {
        _bookService = bookService;
        _imageService = imageService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BookReadDTO>>> GetBooks() {
        var userId = UserHelper.GetUserId(User);
        var books = await _bookService.GetAllByUserAsync(userId);

        var dtos = books.Select(BookMapper.ToReadDTO);
        return Ok(dtos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BookReadDTO>> GetBookById(Guid id) {
        var userId = UserHelper.GetUserId(User);
        var book = await _bookService.GetByIdAsync(id, userId);

        if (book == null)
            return NotFound();

        return Ok(BookMapper.ToReadDTO(book));
    }

    [HttpPost]
    public async Task<ActionResult<BookReadDTO>> CreateBook([FromForm] BookCreateDTO dto, IFormFile? coverImage) {
        var userId = UserHelper.GetUserId(User);

        if (dto.Status != BookStatus.Completed && dto.DateCompleted != null)
            return BadRequest("DateCompleted can only be set if the book status is 'Completed'.");

        var imageUrl = await _imageService.SaveBookCoverImageAsync(coverImage);
        var book = BookMapper.ToEntity(dto, userId, imageUrl);

        await _bookService.AddAsync(book);

        var result = BookMapper.ToReadDTO(book);
        return CreatedAtAction(nameof(GetBookById), new { id = book.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBook(Guid id, [FromForm] BookUpdateDTO dto, IFormFile? coverImage) {
        var userId = UserHelper.GetUserId(User);
        var book = await _bookService.GetByIdAsync(id, userId);

        if (book == null)
            return NotFound();

        if (dto.Status != BookStatus.Completed && dto.DateCompleted != null)
            return BadRequest("DateCompleted can only be set if the book status is 'Completed'.");

        var imageUrl = await _imageService.SaveBookCoverImageAsync(coverImage);
        BookMapper.UpdateEntity(book, dto, imageUrl);

        await _bookService.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(Guid id) {
        var userId = UserHelper.GetUserId(User);
        var book = await _bookService.GetByIdAsync(id, userId);

        if (book == null)
            return NotFound();

        _bookService.Remove(book);
        await _bookService.SaveChangesAsync();

        return NoContent();
    }
}
