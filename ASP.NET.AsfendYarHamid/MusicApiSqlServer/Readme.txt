The first 4 steps are identical to what we did for the MusicApi project, where we had a dummy in-memory repository
1) Open Visual Studio 2022
2) Create a new project using the ASP.NET Core Web API. Make sure to use .Net Core 5.0.
   Notice that in the course, he uses a project template called ASP.NET Core Web Application, so it's a bit different but gives the same result
3) Delete the files: WeatherForecastController.cs and WeatherForecast.cs
4) Add a folder named Models, and add a class named Song to it. Add the 3 properties: Id, Title and Language to the Song class.
Now we set up a Sql Server repository using EntityFrameworkCore with a code first approach
5) Install the 2 nuget packages:
   * Microsoft.EntityFrameworkCore (5.0.15)
   * Microsoft.EntityFrameworkCore.SqlServer (5.0.15)
6) Add a folder named 'Data' to the project
7) Add a class named 'ApiDbContext' to the 'Data' folder. Let the class derive from DbContext
8) Add a constructor and a DbSet property named Songs to the ApiDbContext class
9) Add this line at the end of the body of the ConfigureServices method in the Startup class:
     services.AddDbContext<ApiDbContext>(option => option.UseSqlServer("Data Source=MELO-HOME\\SQLEXPRESS;User=sa;Password=L1on8Zebra;Initial Catalog=MusicDb"));
   Notice that the instructor does it in a slightly different way, where he uses the Sql Server Object Explorer in Visual Studio to 
   determine the name of the server, and he doesn't provide a password, so I guess he uses Windows Authentication
10) Add a parameter of type ApiDbContext and name dbContext to the Configure method of the Startup class,
    and add the following line to the body:
      dbContext.Database.EnsureCreated();
11) Right click the Controllers folder and select 'Add Controller..'. Then, in the API section,
    select 'API Controller with read/write actions', and name it 'SongsController.cs'
12) Add a private member of type ApiDbContext and name _dbContext to the SongsController class
13) Add a constructor to the SongsController class that initializes the _dbContext member
14) Modify the Get method og the SongsController class, so it returns a list of Song instances
    from the database
15) Launch the API by clicking the 'IIS Express' button at the top in Visual Studio. Afterwards, use SQL Server Management
    Studio or Sql Server Object Explorer in Visual Studio to verify that the MusicDb database was created
16) Use SQL Server Management Studio to add some data to the Songs table.
    Notice that the instructor uses Sql Server Object Explorer in Visual Studio
17) Enter a url like the following in a browser, to verify that the Get method works for the API:
      https://localhost:44350/api/songs
18) Modify the other Get method og the SongsController class, so it returns a single Song instance
    with a given id from the database
19) Write the following in a browser to verify that the Get method works:
      https://localhost:44350/api/songs/1
20) Modify the Post method og the SongsController class, so it creates a new Song and writes it to the database
21) Test the Post method using Postman. Don't provide an id, since the database will do that, so write
    something like the following in the body in Postman:
      {
        "Title":"Luna",
        "Language":"Danish"
      }
22) Modify the Put method og the SongsController class, so it modifies an existing Song in the database
23) Test the Post method using Postman. Don't provide an id in the body in postman, but postfix the url
    like this: https://localhost:44350/api/songs/3
24) Modify the Delete method og the SongsController class, so it deletes an existing Song in the database
25) Test the Delete method using Postman. Remember to postfix the url like this: https://localhost:44350/api/songs/3
