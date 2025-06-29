using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UserController : ControllerBase {
    private readonly AppDbContext _context;

    public UserController(AppDbContext context) {
        _context = context;
    }

    private Guid GetUserId() {
        var userIdClaim = User.FindFirst("userId")?.Value;
        if (string.IsNullOrEmpty(userIdClaim))
            throw new UnauthorizedAccessException("User ID claim missing in token.");

        return Guid.Parse(userIdClaim);
    }

    [HttpGet("me")]
    public async Task<ActionResult<UserDTO>> GetCurrentUser() {
        var userId = GetUserId();
        var user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null)
            return NotFound();

        var dto = new UserDTO {
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

        return Ok(dto);
    }

    [HttpPut("deactivate")]
    public async Task<IActionResult> Deactivate() {
        var userId = GetUserId();
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null)
            return NotFound();

        user.IsActive = false;
        await _context.SaveChangesAsync();

        return Ok(new { message = "User account deactivated" });
    }

    [HttpPut("edit")]
    public async Task<IActionResult> EditUser(EditUserDTO dto) {
        var userId = GetUserId();
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null)
            return NotFound();

        user.FirstName = dto.FirstName;
        user.LastName = dto.LastName;
        user.Address = dto.Address;
        user.PhoneNumber = dto.PhoneNumber;
        user.Username = dto.Username;
        user.ProfileImageUrl = dto.ProfileImageUrl;

        if (!string.IsNullOrWhiteSpace(dto.NewPassword)) {
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "User updated successfully" });
    }

    [HttpPost("upload-profile-image")]
    public async Task<IActionResult> UploadProfileImage(IFormFile file) {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded.");

        var userId = GetUserId();
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null)
            return NotFound();

        var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Images", "profile");
        if (!Directory.Exists(uploadsFolder))
            Directory.CreateDirectory(uploadsFolder);

        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
        var filePath = Path.Combine(uploadsFolder, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create)) {
            await file.CopyToAsync(stream);
        }

        // Save relative path in DB
        user.ProfileImageUrl = $"/Images/profile/{fileName}";
        await _context.SaveChangesAsync();

        return Ok(new { imageUrl = user.ProfileImageUrl });
    }

    [AllowAnonymous]
    [HttpPost("upload-temp-profile-image")]
    public async Task<IActionResult> UploadTempProfileImage(IFormFile file) {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded.");

        var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Images", "profile");
        if (!Directory.Exists(uploadsFolder))
            Directory.CreateDirectory(uploadsFolder);

        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
        var filePath = Path.Combine(uploadsFolder, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create)) {
            await file.CopyToAsync(stream);
        }

        return Ok(new { imageUrl = $"/Images/profile/{fileName}" });
    }
}
