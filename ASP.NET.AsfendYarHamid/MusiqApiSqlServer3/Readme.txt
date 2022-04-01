This project was originally made as a copy of MusiqApiSqlServer2 with the purpose of illustrating
how it can be changed into an api that operates with a more complex data model

1) Change the Songs class and add the Album class and the Artist class
2) Add a DbSet<Artist> property and a DbSet<Album> property to the ApiDbContext class and delete
   the OnModelCreating method
3) Delete the SongsController (later, we will make a new one from scratch)
4) Delete the Migrations folder (later we will create a new database)
5) Delete the database, e.g. with Sql Server Management Studio, if it exists
6) Exeute the following in the Package Manager console:
     add-migration InitialMigration
     update-database
7) Use Sql Server Management Studio for verifying that the database was created. Make a database
   diagram to verify that the relations were made correctly

Now we will implement the controllers

8) Add an 'API Controller - Empty' named ArtistsController to the Controllers folder and add the 
   ApiDbContext data member, the constructor, and the Post method to it.
9) Use postman for creating an artist with a Post request. Remember to select the body tab and 
   select 'form-data'. Verify that the artist was added to the database and to the Azure storage
   account.
10) Add an 'API Controller - Empty' named AlbumsController to the Controllers folder and add the 
   ApiDbContext data member, the constructor, and the Post method to it.
11) Use postman for creating an album with a Post request. Remember to add the ArtistId Key