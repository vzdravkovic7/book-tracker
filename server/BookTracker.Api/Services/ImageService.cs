public class ImageService {
    private readonly IWebHostEnvironment _env;

    public ImageService(IWebHostEnvironment env) {
        _env = env;
    }

    public async Task<string?> SaveProfileImageAsync(IFormFile? image) {
        return await SaveImageAsync(image, "profile");
    }

    public async Task<string?> SaveBookCoverImageAsync(IFormFile? image) {
        return await SaveImageAsync(image, "books");
    }

    private async Task<string?> SaveImageAsync(IFormFile? image, string subFolder) {
        if (image == null) return null;

        var uploadsFolder = Path.Combine(_env.ContentRootPath, "Images", subFolder);
        if (!Directory.Exists(uploadsFolder))
            Directory.CreateDirectory(uploadsFolder);

        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(image.FileName)}";
        var filePath = Path.Combine(uploadsFolder, fileName);

        using var stream = new FileStream(filePath, FileMode.Create);
        await image.CopyToAsync(stream);

        return $"/Images/{subFolder}/{fileName}";
    }
}
