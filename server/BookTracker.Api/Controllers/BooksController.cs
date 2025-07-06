using BookTracker.Api.Helpers;
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
    public async Task<ActionResult<PaginatedResult<BookReadDTO>>> GetBooks(
        [FromQuery] string? searchTerm,
        [FromQuery] string? review,
        [FromQuery] string? sortBy,
        [FromQuery] string? sortDirection,
        [FromQuery] string? genre,
        [FromQuery] string? author,
        [FromQuery] BookStatus? status,
        [FromQuery] int? rating,
        [FromQuery] DateTime? dateAddedFrom,
        [FromQuery] DateTime? dateAddedTo,
        [FromQuery] DateTime? dateCompletedFrom,
        [FromQuery] DateTime? dateCompletedTo,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 6) {
        var userId = UserHelper.GetUserId(User);

        dateAddedFrom = DateTimeHelper.ToUtcDate(dateAddedFrom, false);
        dateAddedTo = DateTimeHelper.ToUtcDate(dateAddedTo, true);
        dateCompletedFrom = DateTimeHelper.ToUtcDate(dateCompletedFrom, false);
        dateCompletedTo = DateTimeHelper.ToUtcDate(dateCompletedTo, true);

        var result = await _bookService.GetPaginatedBooksAsync(
            userId,
            searchTerm,
            review,
            sortBy,
            sortDirection,
            genre,
            author,
            status,
            rating,
            dateAddedFrom,
            dateAddedTo,
            dateCompletedFrom,
            dateCompletedTo,
            page,
            pageSize
        );

        var dtoResult = new PaginatedResult<BookReadDTO> {
            Items = result.Items.Select(BookMapper.ToReadDTO).ToList(),
            TotalItems = result.TotalItems,
            CurrentPage = result.CurrentPage,
            TotalPages = result.TotalPages
        };

        return Ok(dtoResult);
    }

    [HttpGet("genres")]
    public async Task<ActionResult<List<string>>> GetGenres() {
        var userId = UserHelper.GetUserId(User);
        var genres = await _bookService.GetDistinctGenresAsync(userId);
        return Ok(genres);
    }

    [HttpGet("authors")]
    public async Task<ActionResult<List<string>>> GetAuthors() {
        var userId = UserHelper.GetUserId(User);
        var authors = await _bookService.GetDistinctAuthorsAsync(userId);
        return Ok(authors);
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

    [HttpPut("{id}/favorite")]
    public async Task<IActionResult> ToggleFavorite(Guid id, [FromQuery] bool isFavourite) {
        var userId = UserHelper.GetUserId(User);
        var book = await _bookService.GetByIdAsync(id, userId);

        if (book == null)
            return NotFound();

        book.IsFavourite = isFavourite;
        await _bookService.SaveChangesAsync();

        return NoContent();
    }

    [HttpGet("favourites")]
    public async Task<ActionResult<List<BookReadDTO>>> GetFavouriteBooks() {
        var userId = UserHelper.GetUserId(User);
        var books = await _bookService.GetFavouriteBooksAsync(userId);

        var dtoList = books.Select(BookMapper.ToReadDTO).ToList();
        return Ok(dtoList);
    }
}
