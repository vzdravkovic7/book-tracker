using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class SuggestionsController : ControllerBase {
    private readonly SuggestionService _suggestionService;
    private readonly BookService _bookService;
    private readonly UserService _userService;
    private readonly PasswordService _passwordService;
    private readonly EmailService _emailService;
    private readonly IWebSocketNotifier _notifier;

    public SuggestionsController(
        SuggestionService suggestionService,
        BookService bookService,
        UserService userService,
        PasswordService passwordService,
        EmailService emailService,
        IWebSocketNotifier notifier) {
        _suggestionService = suggestionService;
        _bookService = bookService;
        _userService = userService;
        _passwordService = passwordService;
        _emailService = emailService;
        _notifier = notifier;
    }

    [HttpPost]
    public async Task<IActionResult> SuggestBook([FromBody] SuggestionCreateDTO dto) {
        var userId = UserHelper.GetUserId(User);
        var fromUser = await _userService.GetByIdAsync(userId);
        if (fromUser == null) return Unauthorized();

        var book = await _bookService.GetByIdAsync(dto.BookId, userId);
        if (book == null) return NotFound("Book not found.");

        var suggestion = await _suggestionService.CreateAsync(book, fromUser.Email!, dto.ToUserEmail);

        var recipient = await _userService.GetByEmailAsync(dto.ToUserEmail);
        if (recipient != null) {
            await _notifier.NotifySuggestionAsync(dto.ToUserEmail, SuggestionMapper.ToReadDTO(suggestion));
        } else {
            var password = PasswordGenerator.Generate(10);
            suggestion.TempPasswordHash = _passwordService.Hash(password);
            await _suggestionService.SaveChangesAsync();

            await _emailService.SendSuggestionInvitationEmailAsync(
                dto.ToUserEmail, password, fromUser, book, suggestion.Id);
        }

        return Ok(SuggestionMapper.ToReadDTO(suggestion));
    }

    [HttpPost("{id}/accept-anonymous")]
    [AllowAnonymous]
    public async Task<IActionResult> AcceptAndRegister(Guid id) {
        var suggestion = await _suggestionService.GetByIdAsync(id);
        if (suggestion == null || suggestion.Status != SuggestionStatus.Pending || string.IsNullOrEmpty(suggestion.TempPasswordHash))
            return NotFound("Invalid or expired suggestion.");

        var existingUser = await _userService.GetByEmailAsync(suggestion.ToUserEmail);
        if (existingUser != null)
            return BadRequest("User already exists. Please log in instead.");

        var newUser = new User {
            Email = suggestion.ToUserEmail,
            Username = "New User",
            PasswordHash = suggestion.TempPasswordHash,
            FirstName = "Friend",
            LastName = "Invited",
            Address = "N/A",
            PhoneNumber = "000-000",
            ProfileImageUrl = null
        };

        try {
            await _userService.AddAsync(newUser);
        } catch (DbUpdateException ex) when (ex.InnerException?.Message.Contains("duplicate") == true) {
            return Conflict("A user with this email already exists.");
        }

        await _suggestionService.AcceptAsync(id, newUser.Email);
        suggestion.TempPasswordHash = null;
        await _suggestionService.SaveChangesAsync();

        return Ok(new { message = "Account created and suggestion accepted." });
    }

    [HttpGet]
    public async Task<ActionResult<List<SuggestionReadDTO>>> GetSuggestions() {
        var userId = UserHelper.GetUserId(User);
        var user = await _userService.GetByIdAsync(userId);
        if (user == null || user.Email == null) return Unauthorized();

        var suggestions = await _suggestionService.GetSuggestionsForUserAsync(user.Email);
        return Ok(suggestions.Select(SuggestionMapper.ToReadDTO).ToList());
    }

    [HttpPut("{id}/accept")]
    public async Task<IActionResult> AcceptSuggestion(Guid id) {
        var userId = UserHelper.GetUserId(User);
        var user = await _userService.GetByIdAsync(userId);
        if (user == null || user.Email == null) return Unauthorized();

        var result = await _suggestionService.AcceptAsync(id, user.Email);
        if (!result) return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}/decline")]
    public async Task<IActionResult> DeclineSuggestion(Guid id) {
        var userId = UserHelper.GetUserId(User);
        var user = await _userService.GetByIdAsync(userId);
        if (user == null || user.Email == null) return Unauthorized();

        var result = await _suggestionService.DeclineAsync(id, user.Email);
        if (!result) return NotFound();

        return NoContent();
    }
}
