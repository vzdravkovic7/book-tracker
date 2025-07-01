using Microsoft.EntityFrameworkCore;

public class UserService {
    private readonly AppDbContext _context;

    public UserService(AppDbContext context) {
        _context = context;
    }

    public async Task<bool> EmailExistsAsync(string email) {
        return await _context.Users.AnyAsync(u => u.Email == email);
    }

    public async Task<User?> GetByIdAsync(Guid id) {
        return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task AddAsync(User user) {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
    }

    public async Task SaveChangesAsync() {
        await _context.SaveChangesAsync();
    }
}
