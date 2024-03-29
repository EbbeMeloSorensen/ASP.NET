﻿This project was originally made as a copy of MusiqApiSqlServer with the purpose of illustrating
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
   
Now, we are switching from using the dbContext.Database.EnsureCreated() construction for creating the database
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

Now we are having fun with letting the api make use of a storage account under Azure for managing an Song Cover property that
we are going to add to the Songs class

13) Install the nuget package Azure.Storage.Blobs in the MusicApiSqlServer2 project
14) Add an IFormFile property namd Image to the Songs class. Mark it with the [NotMapped] property, since we're not going to
    store the image in the database (we're only gonna store the file path)
15) Change the Post method of the SongsController class, so it handles the Image property
16) Add a string property named ImageUrl to the Song class
17) Add a migration and update the database. Notice that we didn't have to do that for the Image property since we're not
    saving that in the database.
18) In postman make a Post query, but rather than using the 'raw' option under the 'Body' tab like before, we're going to 
    switch to the 'form-data' option and add Key/value pairs for Title, Language, Duration. Then add a key for the Image 
    Property where you change the type from text to file. Then you can select a file from the file system.
    Notice that the key/value pairs get added to the url-field after a question mark. It is even possible to write the
    parameters directly in the url rather than using the form. Finally click the Send button in postman, and verify that 
    the record was added to the database, and furthermore that the image was added to the storage account on Azure.
    Well .. not really - apparently this is only when making a Get request, not for Post requests.
19) Refactor the code, so we let the Post method call a general purpose method

Now, we're having fun with Validation

20) Add the [Required] attribute to the properties Title, Language and Duration of the Song class. Optinally
    add a cutom error message. Verify that you cannot violate this with postman.

Now, we're having fun with Routing

21) Add the 'Test' method to the SongsController class. For this method, we use routing to make sure it doesn't collide with the Get
    method that returns a song
22) Verify that the following 3 urls give a valid response when entered in a browser:
      https://localhost:44375/api/songs         (returns all songs)
      https://localhost:44375/api/songs/2       (returns a single song)
      https://localhost:44375/api/songs/test/7  (returns the result of the test method)
      
