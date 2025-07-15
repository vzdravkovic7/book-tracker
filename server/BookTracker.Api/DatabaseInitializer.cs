using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Npgsql;
using System;
using System.Threading;

public static class DatabaseInitializer {
    public static void WaitForDatabaseAndMigrate(this IServiceProvider serviceProvider, int maxRetries = 10, int delaySeconds = 3) {
        var retries = 0;
        var delay = TimeSpan.FromSeconds(delaySeconds);

        while (retries < maxRetries) {
            try {
                using var scope = serviceProvider.CreateScope();
                var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                var logger = scope.ServiceProvider.GetService<ILoggerFactory>()?.CreateLogger("DatabaseInitializer");

                db.Database.Migrate();
                db.SeedFromJsonFiles();

                logger?.LogInformation("Database migration and seeding successful.");
                break;
            } catch (NpgsqlException ex) {
                retries++;
                Console.WriteLine($"[Retry {retries}/{maxRetries}] PostgreSQL not ready: {ex.Message}");

                if (retries == maxRetries) {
                    Console.WriteLine("Could not connect to the database after max retries. Exiting.");
                    throw;
                }

                Thread.Sleep(delay);
            }
        }
    }
}
