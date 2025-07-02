using System.ComponentModel.DataAnnotations;

public enum BookStatus { Reading, Completed, Wishlist }

public class Book {
    public Guid Id { get; set; }

    [Required]
    public string Title { get; set; } = null!;

    [Required]
    public string Author { get; set; } = null!;

    public string Genre { get; set; } = null!;

    public BookStatus Status { get; set; }

    [Range(1, 5)]
    public int? Rating { get; set; }

    public string? Review { get; set; }

    public string? CoverImageUrl { get; set; }

    public DateTime DateAdded { get; set; } = DateTime.UtcNow;

    public DateTime? DateCompleted { get; set; }

    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
}
