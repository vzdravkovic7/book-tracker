using System.Security.Claims;

public static class UserHelper {
    public static Guid GetUserId(ClaimsPrincipal user) {
        var userIdClaim = user.FindFirst("userId")?.Value;
        if (string.IsNullOrEmpty(userIdClaim))
            throw new UnauthorizedAccessException("User ID claim missing in token.");

        return Guid.Parse(userIdClaim);
    }
}
