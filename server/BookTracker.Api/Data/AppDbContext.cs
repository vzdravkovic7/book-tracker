using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Text.Json.Serialization;

public class AppDbContext : DbContext {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Book> Books { get; set; }
    public DbSet<Suggestion> Suggestions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.UseSnakeCaseNaming();

        modelBuilder
            .Entity<Book>()
            .Property(b => b.Status)
            .HasConversion<string>();

        modelBuilder
            .Entity<Suggestion>()
            .Property(s => s.Status)
            .HasConversion<string>();

        base.OnModelCreating(modelBuilder);
    }

    public void SeedFromJsonFiles() {
        var userPath = Path.Combine(Directory.GetCurrentDirectory(), "SeedData", "users.json");
        var bookPath = Path.Combine(Directory.GetCurrentDirectory(), "SeedData", "books.json");
        var suggestionPath = Path.Combine(Directory.GetCurrentDirectory(), "SeedData", "suggestions.json");

        if (Users.Any() || Books.Any() || Suggestions.Any()) return; // Skip if already seeded

        var options = new JsonSerializerOptions {
            PropertyNameCaseInsensitive = true,
            Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase, allowIntegerValues: false) }
        };

        var userData = File.ReadAllText(userPath);
        var bookData = File.ReadAllText(bookPath);
        var suggestionData = File.ReadAllText(suggestionPath);

        var users = JsonSerializer.Deserialize<List<User>>(userData, options);
        var books = JsonSerializer.Deserialize<List<Book>>(bookData, options);
        var suggestions = JsonSerializer.Deserialize<List<Suggestion>>(suggestionData, options);

        if (users != null) {
            Users.AddRange(users);
            SaveChanges();
        }

        if (books != null) {
            foreach (var book in books) {
                var user = Users.Find(book.UserId);
                if (user != null) {
                    book.User = user;
                }
            }

            Books.AddRange(books);
            SaveChanges();
        }

        if (suggestions != null) {
            Suggestions.AddRange(suggestions);
            SaveChanges();
        }
    }
}
