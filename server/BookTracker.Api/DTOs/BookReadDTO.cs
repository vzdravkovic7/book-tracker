public class BookReadDTO {
    public Guid Id { get; set; }

    public string Title { get; set; } = null!;

    public string Author { get; set; } = null!;

    public string Genre { get; set; } = null!;

    public BookStatus Status { get; set; }

    public int? Rating { get; set; }

    public string? Review { get; set; }

    public string? CoverImageUrl { get; set; }

    public DateTime DateAdded { get; set; }

    public DateTime? DateCompleted { get; set; }

    public bool IsFavourite { get; set; }
}
