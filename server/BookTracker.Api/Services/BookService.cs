using Microsoft.EntityFrameworkCore;

public class BookService {
    private readonly AppDbContext _context;

    public BookService(AppDbContext context) {
        _context = context;
    }

    public async Task<List<Book>> GetAllByUserAsync(Guid userId) {
        return await _context.Books
            .Where(b => b.UserId == userId)
            .ToListAsync();
    }

    public async Task<Book?> GetByIdAsync(Guid bookId, Guid userId) {
        return await _context.Books
            .FirstOrDefaultAsync(b => b.Id == bookId && b.UserId == userId);
    }

    public async Task AddAsync(Book book) {
        _context.Books.Add(book);
        await _context.SaveChangesAsync();
    }

    public async Task SaveChangesAsync() {
        await _context.SaveChangesAsync();
    }

    public void Remove(Book book) {
        _context.Books.Remove(book);
    }

    public async Task<List<Book>> GetFavouriteBooksAsync(Guid userId) {
        return await _context.Books
            .Where(b => b.UserId == userId && b.IsFavourite)
            .ToListAsync();
    }

    public async Task<PaginatedResult<Book>> GetPaginatedBooksAsync(
    Guid userId,
    string? searchTerm,
    string? review,
    string? sortBy,
    string? sortDirection,
    string? genre,
    string? author,
    BookStatus? status,
    int? rating,
    DateTime? dateAddedFrom,
    DateTime? dateAddedTo,
    DateTime? dateCompletedFrom,
    DateTime? dateCompletedTo,
    int page,
    int pageSize) {
        var query = _context.Books
            .Where(b => b.UserId == userId)
            .AsQueryable();

        query = ApplySearch(query, searchTerm, review);
        query = ApplyFilters(query, genre, author, status, rating, dateAddedFrom, dateAddedTo, dateCompletedFrom, dateCompletedTo);
        query = ApplySorting(query, sortBy, sortDirection);

        var totalItems = await query.CountAsync();
        var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new PaginatedResult<Book> {
            Items = items,
            TotalItems = totalItems,
            CurrentPage = page,
            TotalPages = totalPages
        };
    }

    private IQueryable<Book> ApplySearch(IQueryable<Book> query, string? searchTerm, string? review) {
        if (!string.IsNullOrWhiteSpace(searchTerm)) {
            var lowered = searchTerm.ToLower();
            query = query.Where(b =>
                b.Title.ToLower().Contains(lowered) ||
                b.Author.ToLower().Contains(lowered) ||
                b.Genre.ToLower().Contains(lowered));
        }

        if (!string.IsNullOrWhiteSpace(review)) {
            var lowered = review.ToLower();
            query = query.Where(b => b.Review != null && b.Review.ToLower().Contains(lowered));
        }

        return query;
    }

    private IQueryable<Book> ApplyFilters(
        IQueryable<Book> query,
        string? genre,
        string? author,
        BookStatus? status,
        int? rating,
        DateTime? dateAddedFrom,
        DateTime? dateAddedTo,
        DateTime? dateCompletedFrom,
        DateTime? dateCompletedTo) {
        if (!string.IsNullOrWhiteSpace(genre))
            query = query.Where(b => b.Genre == genre);

        if (!string.IsNullOrWhiteSpace(author))
            query = query.Where(b => b.Author == author);

        if (status != null)
            query = query.Where(b => b.Status == status);

        if (rating != null)
            query = query.Where(b => b.Rating == rating);

        if (dateAddedFrom != null)
            query = query.Where(b => b.DateAdded >= dateAddedFrom);

        if (dateAddedTo != null)
            query = query.Where(b => b.DateAdded <= dateAddedTo);

        if (dateCompletedFrom != null)
            query = query.Where(b => b.DateCompleted != null && b.DateCompleted >= dateCompletedFrom);

        if (dateCompletedTo != null)
            query = query.Where(b => b.DateCompleted != null && b.DateCompleted <= dateCompletedTo);

        return query;
    }

    private IQueryable<Book> ApplySorting(IQueryable<Book> query, string? sortBy, string? sortDirection) {
        var direction = sortDirection?.ToLower() == "desc";

        return (sortBy?.ToLower()) switch {
            "title" => direction ? query.OrderByDescending(b => b.Title) : query.OrderBy(b => b.Title),
            "author" => direction ? query.OrderByDescending(b => b.Author) : query.OrderBy(b => b.Author),
            "createdat" => direction ? query.OrderByDescending(b => b.DateAdded) : query.OrderBy(b => b.DateAdded),
            "rating" => direction ? query.OrderByDescending(b => b.Rating) : query.OrderBy(b => b.Rating),
            _ => query.OrderBy(b => b.Title)
        };
    }

    public async Task<List<string>> GetDistinctGenresAsync(Guid userId) {
        return await _context.Books
            .Where(b => b.UserId == userId && !string.IsNullOrEmpty(b.Genre))
            .Select(b => b.Genre!)
            .Distinct()
            .OrderBy(g => g)
            .ToListAsync();
    }

    public async Task<List<string>> GetDistinctAuthorsAsync(Guid userId) {
        return await _context.Books
            .Where(b => b.UserId == userId && !string.IsNullOrEmpty(b.Author))
            .Select(b => b.Author!)
            .Distinct()
            .OrderBy(a => a)
            .ToListAsync();
    }
}
