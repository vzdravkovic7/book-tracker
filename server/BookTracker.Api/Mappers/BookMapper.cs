public static class BookMapper {
    public static BookReadDTO ToReadDTO(Book book) {
        return new BookReadDTO {
            Id = book.Id,
            Title = book.Title,
            Author = book.Author,
            Status = book.Status,
            Rating = book.Rating,
            Review = book.Review
        };
    }

    public static Book ToEntity(BookCreateDTO dto, Guid userId) {
        return new Book {
            Title = dto.Title,
            Author = dto.Author,
            Status = dto.Status,
            Rating = dto.Rating,
            Review = dto.Review,
            UserId = userId
        };
    }

    public static void UpdateEntity(Book book, BookUpdateDTO dto) {
        book.Title = dto.Title;
        book.Author = dto.Author;
        book.Status = dto.Status;
        book.Rating = dto.Rating;
        book.Review = dto.Review;
    }
}
