using System.ComponentModel.DataAnnotations;

public enum SuggestionStatus {
    Pending,
    Accepted
}

public class Suggestion {
    public Guid Id { get; set; }

    [Required]
    public string BookTitle { get; set; } = null!;

    [Required]
    public string Author { get; set; } = null!;

    [Required]
    public string Genre { get; set; } = null!;

    public string? CoverImageUrl { get; set; }

    [Required]
    public string FromUserEmail { get; set; } = null!;

    [Required]
    public string ToUserEmail { get; set; } = null!;

    public string? TempPasswordHash { get; set; }

    public SuggestionStatus Status { get; set; } = SuggestionStatus.Pending;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
