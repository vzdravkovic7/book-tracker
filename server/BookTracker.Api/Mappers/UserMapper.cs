public static class UserMapper {
    public static UserDTO ToDTO(User user) {
        return new UserDTO {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Address = user.Address,
            PhoneNumber = user.PhoneNumber,
            Username = user.Username,
            Email = user.Email,
            ProfileImageUrl = user.ProfileImageUrl,
            RegistrationDate = user.RegistrationDate
        };
    }

    public static void UpdateEntity(User user, EditUserDTO dto, string? hashedPassword = null, string? newImageUrl = null) {
        user.FirstName = dto.FirstName;
        user.LastName = dto.LastName;
        user.Address = dto.Address;
        user.PhoneNumber = dto.PhoneNumber;
        user.Username = dto.Username;

        if (!string.IsNullOrWhiteSpace(hashedPassword))
            user.PasswordHash = hashedPassword;

        if (!string.IsNullOrWhiteSpace(newImageUrl))
            user.ProfileImageUrl = newImageUrl;
    }

    public static User ToEntity(RegisterDTO dto, string hashedPassword, string? imageUrl) {
        return new User {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Address = dto.Address,
            PhoneNumber = dto.PhoneNumber,
            Username = dto.Username,
            Email = dto.Email,
            ProfileImageUrl = imageUrl,
            PasswordHash = hashedPassword,
            RegistrationDate = DateTime.UtcNow,
            IsActive = true
        };
    }
}
