This project was originally made as a copy of MusiqApiSqlServer with the purpose of illustrating
how it can be improved by sending status code and handling errors like trying to get a non-existing record.
The project has also been improved by turning the http request methods into asynchronous methods.
Besides, the api has been improved by adding support for getting responses in xml (content negotiation),
as described below:

1) add the following line to the ConfigureServices method of the Startup class:
     services.AddMvc().AddXmlSerializerFormatters();
2) Build and run the api. Test it with postman by sending a GET request with an url like this one: https://localhost:44375/api/songs
   (the api will return a response in the json format as usual).
   Then navigate to the 'Headers' tab in postman and enter 'Accept' in the key field, and 'application/xml', and resend the GET request
   (now the api will return a response in the xml format)
   
Finally, we have switched from using the dbContext.Database.EnsureCreated() construction for creating the database
to using migration. This is the recommended approach, when modifying the database

3) Add a string property called Duration to the Song class
4) Try building the project, run it and send a Get request to it. Notice how you receive an error message saying that Duration is an invalid column nane
5) Delete the dbContext.Database.EnsureCreated(); line from the Configure method of the Startup class
6) Also delete the MusicDb database itself with Sql Server Management Studio
7) Install the nuget package Microsoft.EntityFramework.Core.Tools (5.0.15)
8) Open the Package Manager Console window in Visual Studio, select MusiqApiSqlServer2 as the default project in the Package Manager
   Console window, and execute the following at the command prompt:
     add-migration InitialMigration
   followed by:
     update-database
   Then use Sql Server Management Studio for verifying that the MusicDb database has been created
9) override the base class method OnModelCreating of the ApiDbContext class in order to "seed" the database with
   data, when the database is created
10) Execute the following at the command prompt in the package manager console:
      add-migration SeedSongsTable
    and then:
      update-database
    Then use Sql Server Management Studio for verifying that the Songs table of the MusicDb database has been populated
11) Build and run the api and use postman for sending a Get request to the api
12) Correct the Put method of the SongsController class, so it takes the new Duration property of the Song class into account
