using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase {
    private readonly AppDbContext _context;
    private readonly TokenService _tokenService;
    private readonly UserService _userService;
    private readonly ImageService _imageService;
    private readonly PasswordService _passwordService;

    public AuthController(AppDbContext context, TokenService tokenService, UserService userService, ImageService imageService, PasswordService passwordService) {
        _context = context;
        _tokenService = tokenService;
        _userService = userService;
        _imageService = imageService;
        _passwordService = passwordService;
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<ActionResult> Register([FromForm] RegisterDTO dto, IFormFile? profileImage) {
        if (await _userService.EmailExistsAsync(dto.Email))
            return BadRequest("Email already exists.");

        var imageUrl = await _imageService.SaveProfileImageAsync(profileImage);
        var hashedPassword = _passwordService.Hash(dto.Password);

        var user = UserMapper.ToEntity(dto, hashedPassword, imageUrl);

        await _userService.AddAsync(user);

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
