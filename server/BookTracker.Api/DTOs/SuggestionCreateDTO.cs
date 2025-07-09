public class SuggestionCreateDTO {
    public Guid BookId { get; set; }
    public string ToUserEmail { get; set; } = null!;
}