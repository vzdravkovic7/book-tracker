public class BookReadDTO {
    public Guid Id { get; set; }
    public string Title { get; set; } = null!;
    public string Author { get; set; } = null!;
    public BookStatus Status { get; set; }
    public int? Rating { get; set; }
    public string? Review { get; set; }
}
