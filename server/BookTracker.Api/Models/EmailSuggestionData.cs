public class EmailSuggestionData {
    public string RecipientEmail { get; set; } = null!;
    public string FromUserEmail { get; set; } = null!;
    public string BookTitle { get; set; } = null!;
    public string Author { get; set; } = null!;
    public string Genre { get; set; } = null!;
    public string? CoverImageUrl { get; set; }
    public string TempPassword { get; set; } = null!;
    public string SuggestionId { get; set; } = null!;
}
