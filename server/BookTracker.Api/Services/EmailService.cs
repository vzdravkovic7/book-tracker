using System.Net;
using System.Net.Mail;
using System.Net.Mime;

public class EmailService {
    private readonly IConfiguration _config;
    private readonly IWebHostEnvironment _env;

    public EmailService(IConfiguration config, IWebHostEnvironment env) {
        _config = config;
        _env = env;
    }

    public async Task SendSuggestionInvitationEmailAsync(string toEmail, string password, User fromUser, Book book, Guid suggestionId) {
        var subject = $"You've been invited to Book Tracker!";
        var clientBaseUrl = _config["ClientBaseUrl"]?.TrimEnd('/') ?? "http://localhost:5173";
        var acceptLink = $"{clientBaseUrl}/?suggestionId={suggestionId}";
        const string imageCid = "bookcover";

        // Book image path resolution
        var imagesFolder = Path.Combine(Directory.GetCurrentDirectory(), "Images", "books");
        var defaultImagePath = Path.Combine(imagesFolder, "default.jpg");

        string? relativeImagePath = book.CoverImageUrl?.TrimStart('/');
        string bookImagePath = string.IsNullOrWhiteSpace(relativeImagePath)
            ? defaultImagePath
            : Path.Combine(Directory.GetCurrentDirectory(), relativeImagePath.Replace('/', Path.DirectorySeparatorChar));

        // Ensure fallback if the provided path doesn't exist
        if (!File.Exists(bookImagePath)) {
            bookImagePath = defaultImagePath;
        }

        var bodyHtml = $@"
            <p><strong>{fromUser.FirstName} {fromUser.LastName} ({fromUser.Email})</strong> suggested this book to you!</p>
            <h2>📚 {book.Title} by {book.Author}</h2>
            <img src='cid:{imageCid}' alt='Book Cover' style='width:200px;height:auto;border-radius:8px;' />
            <p>You’ve been invited to Book Tracker! Create your own personal collection, starting with this suggestion.</p>
            <p><strong>Your temporary password:</strong> <code>{password}</code></p>
            <p>
              <a href='{acceptLink}' style='
                  display:inline-block;
                  background-color:#4CAF50;
                  color:white;
                  padding:10px 20px;
                  text-decoration:none;
                  border-radius:5px;
              '>
                Accept Suggestion
              </a>
            </p>
            <p>Happy reading,<br/>Book Tracker Team</p>
        ";

        var mail = new MailMessage {
            From = new MailAddress(_config["Email:From"]),
            Subject = subject,
            IsBodyHtml = true
        };
        mail.To.Add(toEmail);

        var htmlView = AlternateView.CreateAlternateViewFromString(bodyHtml, null, MediaTypeNames.Text.Html);

        if (File.Exists(bookImagePath)) {
            string mimeType = GetMimeTypeFromExtension(Path.GetExtension(bookImagePath));

            var imageResource = new LinkedResource(bookImagePath, mimeType) {
                ContentId = imageCid,
                TransferEncoding = TransferEncoding.Base64
            };
            htmlView.LinkedResources.Add(imageResource);
        }

        mail.AlternateViews.Add(htmlView);

        var smtpClient = new SmtpClient(_config["Email:SmtpHost"], int.Parse(_config["Email:SmtpPort"])) {
            Credentials = new NetworkCredential(_config["Email:Username"], _config["Email:Password"]),
            EnableSsl = true
        };

        await smtpClient.SendMailAsync(mail);
    }

    private string GetMimeTypeFromExtension(string ext) => ext.ToLower() switch {
        ".jpg" or ".jpeg" => MediaTypeNames.Image.Jpeg,
        ".png" => "image/png",
        ".webp" => "image/webp",
        _ => MediaTypeNames.Image.Jpeg
    };
}
