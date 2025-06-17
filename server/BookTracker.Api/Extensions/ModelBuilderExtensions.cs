using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

public static class ModelBuilderExtensions {
    public static void UseSnakeCaseNaming(this ModelBuilder modelBuilder) {
        foreach (var entity in modelBuilder.Model.GetEntityTypes()) {
            // Table name
            entity.SetTableName(ToSnakeCase(entity.GetTableName()));

            // Properties/columns
            foreach (var property in entity.GetProperties())
                property.SetColumnName(ToSnakeCase(property.Name));

            // Primary keys
            foreach (var key in entity.GetKeys())
                key.SetName(ToSnakeCase(key.GetName()!));

            // Foreign keys
            foreach (var fk in entity.GetForeignKeys())
                fk.SetConstraintName(ToSnakeCase(fk.GetConstraintName()!));

            // Indexes
            foreach (var index in entity.GetIndexes())
                index.SetDatabaseName(ToSnakeCase(index.GetDatabaseName()!));
        }
    }

    private static string ToSnakeCase(string name) {
        if (string.IsNullOrWhiteSpace(name))
            return name;

        return string.Concat(name.Select((c, i) =>
            i > 0 && char.IsUpper(c)
                ? "_" + char.ToLower(c)
                : char.ToLower(c).ToString()));
    }
}
