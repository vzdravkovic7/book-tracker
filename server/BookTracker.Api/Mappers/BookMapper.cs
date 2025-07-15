public static class BookMapper {
    public static BookReadDTO ToReadDTO(Book book) {
        return new BookReadDTO {
            Id = book.Id,
            Title = book.Title,
            Author = book.Author,
            Genre = book.Genre,
            Status = book.Status,
            Rating = book.Rating,
            Review = book.Review,
            CoverImageUrl = book.CoverImageUrl,
            DateAdded = book.DateAdded,
            DateCompleted = book.DateCompleted,
            IsFavourite = book.IsFavourite
        };
    }

    public static Book ToEntity(BookCreateDTO dto, Guid userId, string? imageUrl) {
        return new Book {
            Title = dto.Title,
            Author = dto.Author,
            Genre = dto.Genre,
            Status = dto.Status,
            Rating = dto.Rating,
            Review = dto.Review,
            CoverImageUrl = imageUrl,
            DateCompleted = dto.DateCompleted,
            DateAdded = DateTime.UtcNow,
            UserId = userId
        };
    }

    public static void UpdateEntity(Book book, BookUpdateDTO dto, string? imageUrl) {
        book.Title = dto.Title;
        book.Author = dto.Author;
        book.Genre = dto.Genre;
        book.Status = dto.Status;
        book.Rating = dto.Rating;
        book.Review = dto.Review;
        book.CoverImageUrl = imageUrl ?? book.CoverImageUrl;
        book.DateCompleted = dto.DateCompleted;
    }
}
