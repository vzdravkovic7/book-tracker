using Microsoft.AspNetCore.SignalR;

public interface IWebSocketNotifier {
    Task NotifySuggestionAsync(string userEmail, SuggestionReadDTO suggestion);
}

public class SignalRNotifier : IWebSocketNotifier {
    private readonly IHubContext<SuggestionHub> _hubContext;

    public SignalRNotifier(IHubContext<SuggestionHub> hubContext) {
        _hubContext = hubContext;
    }

    public Task NotifySuggestionAsync(string userEmail, SuggestionReadDTO suggestion) {
        return _hubContext
            .Clients
            .Group($"suggestions:{userEmail}")
            .SendAsync("ReceiveSuggestion", suggestion);
    }
}
