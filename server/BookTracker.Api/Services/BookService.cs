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
}
