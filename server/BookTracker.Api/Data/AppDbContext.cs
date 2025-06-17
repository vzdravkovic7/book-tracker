using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Book> Books => Set<Book>();

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.UseSnakeCaseNaming();

        modelBuilder.Entity<User>()
            .HasMany(u => u.Books)
            .WithOne(b => b.User)
            .HasForeignKey(b => b.UserId);
    }
}
