public class PasswordService {
    public string Hash(string plainPassword) {
        return BCrypt.Net.BCrypt.HashPassword(plainPassword);
    }

    public bool Verify(string plainPassword, string hashedPassword) {
        return BCrypt.Net.BCrypt.Verify(plainPassword, hashedPassword);
    }
}
