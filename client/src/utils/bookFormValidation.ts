import type { Book } from "../types";

export function validateBookForm(form: Omit<Book, "id">): string | null {
  if (form.status === "Completed" && !form.dateCompleted) {
    return "Please set the completion date if the status is Completed.";
  }

  if (form.rating !== undefined && form.rating !== null && (form.rating < 1 || form.rating > 5)) {
    return "Rating must be a number between 1 and 5.";
  }

  if (form.dateCompleted) {
    const selectedDate = new Date(form.dateCompleted);
    selectedDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      return "Date Completed cannot be in the future.";
    }
  }

  return null;
}
