using Microsoft.AspNetCore.SignalR;

public class SuggestionHub : Hub {
    // Called when client connects (optional logging/debug)
    public override Task OnConnectedAsync() {
        Console.WriteLine($"Client connected: {Context.ConnectionId}");
        return base.OnConnectedAsync();
    }

    // Custom method for joining a "room"/group based on email
    public async Task SubscribeToSuggestions(string userEmail) {
        await Groups.AddToGroupAsync(Context.ConnectionId, $"suggestions:{userEmail}");
    }
}
