using Microsoft.EntityFrameworkCore;

public class SuggestionService {
    private readonly AppDbContext _context;

    public SuggestionService(AppDbContext context) {
        _context = context;
    }

    public async Task<List<Suggestion>> GetSuggestionsForUserAsync(string userEmail) {
        return await _context.Suggestions
            .Where(s => s.ToUserEmail == userEmail)
            .OrderByDescending(s => s.CreatedAt)
            .ToListAsync();
    }

    public async Task<Suggestion> CreateAsync(Book book, string fromEmail, string toEmail) {
        var suggestion = new Suggestion {
            BookTitle = book.Title,
            Author = book.Author,
            Genre = book.Genre,
            CoverImageUrl = book.CoverImageUrl,
            FromUserEmail = fromEmail,
            ToUserEmail = toEmail
        };

        _context.Suggestions.Add(suggestion);
        await _context.SaveChangesAsync();
        return suggestion;
    }

    public async Task<Suggestion?> GetByIdAsync(Guid id) {
        return await _context.Suggestions.FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task SaveChangesAsync() {
        await _context.SaveChangesAsync();
    }

    public async Task<bool> AcceptAsync(Guid id, string currentUserEmail) {
        var suggestion = await _context.Suggestions.FirstOrDefaultAsync(s =>
            s.Id == id && s.ToUserEmail == currentUserEmail);

        if (suggestion == null) return false;

        suggestion.Status = SuggestionStatus.Accepted;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeclineAsync(Guid id, string currentUserEmail) {
        var suggestion = await _context.Suggestions.FirstOrDefaultAsync(s =>
            s.Id == id && s.ToUserEmail == currentUserEmail);

        if (suggestion == null) return false;

        _context.Suggestions.Remove(suggestion);
        await _context.SaveChangesAsync();
        return true;
    }
}
