public class SuggestionReadDTO {
    public Guid Id { get; set; }
    public string BookTitle { get; set; } = null!;
    public string Author { get; set; } = null!;
    public string Genre { get; set; } = null!;
    public string? CoverImageUrl { get; set; }
    public string FromUserEmail { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
    public SuggestionStatus Status { get; set; }
}