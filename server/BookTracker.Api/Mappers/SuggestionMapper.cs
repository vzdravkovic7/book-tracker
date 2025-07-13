public static class SuggestionMapper {
    public static SuggestionReadDTO ToReadDTO(Suggestion s) => new() {
        Id = s.Id,
        BookTitle = s.BookTitle,
        Author = s.Author,
        Genre = s.Genre,
        CoverImageUrl = s.CoverImageUrl,
        FromUserEmail = s.FromUserEmail,
        CreatedAt = s.CreatedAt,
        Status = s.Status
    };
}
