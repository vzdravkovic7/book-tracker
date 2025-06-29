using System.ComponentModel.DataAnnotations;

public class User {
    public Guid Id { get; set; }

    [Required]
    public string FirstName { get; set; } = null!;

    [Required]
    public string LastName { get; set; } = null!;

    [Required]
    public string Address { get; set; } = null!;

    [Required]
    public string PhoneNumber { get; set; } = null!;

    [Required]
    public string Username { get; set; } = null!;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;

    [Required]
    public string PasswordHash { get; set; } = null!;

    public string? ProfileImageUrl { get; set; }

    public DateTime RegistrationDate { get; set; } = DateTime.UtcNow;

    public bool IsActive { get; set; } = true;

    public List<Book> Books { get; set; } = new();
}
