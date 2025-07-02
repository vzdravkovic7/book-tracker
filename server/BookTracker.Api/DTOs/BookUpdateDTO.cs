using System.ComponentModel.DataAnnotations;

public class BookUpdateDTO {
    [Required]
    public string Title { get; set; } = null!;

    [Required]
    public string Author { get; set; } = null!;

    [Required]
    public string Genre { get; set; } = null!;

    [Required]
    public BookStatus Status { get; set; }

    [Range(1, 5)]
    public int? Rating { get; set; }

    public string? Review { get; set; }

    public string? CoverImageUrl { get; set; }

    public DateTime? DateCompleted { get; set; }
}
