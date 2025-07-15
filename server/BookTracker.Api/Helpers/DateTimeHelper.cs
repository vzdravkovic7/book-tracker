namespace BookTracker.Api.Helpers {
    public class DateTimeHelper {
        public static DateTime? ToUtcDate(DateTime? date, bool isEndOfDay = false) {
            if (!date.HasValue)
                return null;

            var d = date.Value;

            var dateOnly = d.Date;

            if (isEndOfDay) {
                dateOnly = dateOnly.AddDays(1).AddTicks(-1);
            }

            var utcDate = DateTime.SpecifyKind(dateOnly, DateTimeKind.Utc);

            return utcDate;
        }

    }
}
