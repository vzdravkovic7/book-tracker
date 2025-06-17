using System.ComponentModel.DataAnnotations;

public class User {
    public Guid Id { get; set; }

    [Required]
    public string Username { get; set; } = null!;

    [Required]
    public string Email { get; set; } = null!;

    [Required]
    public string PasswordHash { get; set; } = null!;

    public List<Book> Books { get; set; } = new();
}
