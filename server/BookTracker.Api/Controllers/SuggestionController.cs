using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class SuggestionsController : ControllerBase {
    private readonly SuggestionService _suggestionService;
    private readonly BookService _bookService;
    private readonly UserService _userService;
    private readonly IWebSocketNotifier _notifier;

    public SuggestionsController(
        SuggestionService suggestionService,
        BookService bookService,
        UserService userService,
        IWebSocketNotifier notifier) {
        _suggestionService = suggestionService;
        _bookService = bookService;
        _userService = userService;
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
            // Existing user: send via WebSocket
            await _notifier.NotifySuggestionAsync(dto.ToUserEmail, SuggestionMapper.ToReadDTO(suggestion));
        } else {
            // TODO: Handle invitation via email + temp user creation
        }

        return Ok(SuggestionMapper.ToReadDTO(suggestion));
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
