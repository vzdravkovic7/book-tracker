﻿public class EditUserDTO {
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Address { get; set; } = null!;
    public string PhoneNumber { get; set; } = null!;
    public string Username { get; set; } = null!;
    public string? ProfileImageUrl { get; set; }
    public string? NewPassword { get; set; }
}
