Ækvivalent med MusicApiSqlServer3, men hvor vi kører code first mod en postgresdatabase frem for en
sql server database.

Prerequisite: Postgrs og pgadmin skal være installeret lokalt

1) Installer de 3 nuget packages:
   - Azure.Storage.Blobs
   - Npgsql.EntityFrameworkCore.PostgresSQL (5.0.10)
   - Npgsql.EntityFrameworkCore.Design (5.0.15)
2) Lav en folder ved navn 'Models' og tilføj de 3 klasser Artist, Album og Song
3) Lav en folder ved navn 'Data' og tilføj klassen ApiDbContext
4) Lav en folder ved navn 'Helpers' og tilføj klassen FileHelper
5) Tilføj en section ved navn "ConnectionStrings" i appSettings.json filen og indsæt connection strengen til
   den lokale postgres-installation
6) Tilføj denne linie nederst i Startup-klassens ConfigureServices-metode
    services.AddDbContext<ApiDbContext>(option => option.UseNpgsql(Configuration.GetConnectionString("DbConnection")));
7) Åbn Package Manager Console og sæt default projekt til MusicApiPostgresSql. Kør derefter følgende 2 kommandoer
   fra command prompten:
   - add-migration InitialMigration
   - update-database
8) Verificer, at databasen er blevet lavet med pgadmin
   
