using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase {
    private readonly AppDbContext _context;
    private readonly TokenService _tokenService;

    public AuthController(AppDbContext context, TokenService tokenService) {
        _context = context;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDTO dto) {
        if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            return BadRequest("Email already exists.");

        var user = new User {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Address = dto.Address,
            PhoneNumber = dto.PhoneNumber,
            Username = dto.Username,
            Email = dto.Email,
            ProfileImageUrl = dto.ProfileImageUrl,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            RegistrationDate = DateTime.UtcNow,
            IsActive = true
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Registered successfully" });
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login(LoginDTO dto) {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return Unauthorized("Invalid credentials");

        if (!user.IsActive)
            return Unauthorized("User account is deactivated");

        var token = _tokenService.CreateToken(user);
        return Ok(new { token });
    }
}
