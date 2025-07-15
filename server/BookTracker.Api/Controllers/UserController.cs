using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UserController : ControllerBase {
    private readonly UserService _userService;
    private readonly ImageService _imageService;
    private readonly PasswordService _passwordService;

    public UserController(UserService userService, ImageService imageService, PasswordService passwordService) {
        _userService = userService;
        _imageService = imageService;
        _passwordService = passwordService;
    }

    [HttpGet("me")]
    public async Task<ActionResult<UserDTO>> GetCurrentUser() {
        var userId = UserHelper.GetUserId(User);
        var user = await _userService.GetByIdAsync(userId);
        if (user == null)
            return NotFound();

        return Ok(UserMapper.ToDTO(user));
    }

    [HttpPut("deactivate")]
    public async Task<IActionResult> Deactivate() {
        var userId = UserHelper.GetUserId(User);
        var user = await _userService.GetByIdAsync(userId);
        if (user == null)
            return NotFound();

        user.IsActive = false;
        await _userService.SaveChangesAsync();

        return Ok(new { message = "User account deactivated" });
    }

    [HttpPut("edit")]
    public async Task<IActionResult> EditUser([FromForm] EditUserDTO dto, IFormFile? profileImage) {
        var userId = UserHelper.GetUserId(User);
        var user = await _userService.GetByIdAsync(userId);
        if (user == null)
            return NotFound();

        var newImageUrl = await _imageService.SaveProfileImageAsync(profileImage);
        string? newHashedPassword = string.IsNullOrWhiteSpace(dto.NewPassword)
            ? null
            : _passwordService.Hash(dto.NewPassword);

        UserMapper.UpdateEntity(user, dto, newHashedPassword, newImageUrl);

        await _userService.SaveChangesAsync();

        return Ok(new { message = "User updated successfully" });
    }
}
