1) Open Visual Studio 2022
2) Create a new project using the ASP.NET Core Web API. Make sure to use .Net Core 5.0.
   Notice that in the course, he uses a project template called ASP.NET Core Web Application, so it's a bit different but gives the same result
3) Delete the files: WeatherForecastController.cs and WeatherForecast.cs
4) Add a folder named Models, and add a class named Song to it. Add the 3 properties: Id, Title and Language to the Song class.
5) Right click the 'Controllers' folder and select Add->Controller.. in the context menu. In the dialog that
   appears, click 'API' under 'Common' in the tree view to the left, and then select 'API Controller - Empty'
   select 'MVC Controller - Empty' in the list in the central view, and click the 'Add' button. Assign the name
   'SongsController' (it has to end with 'Controller').
6) Add the method Get, that returns a list of songs. Notice the HttpGet attribute.
7) Click the 'IIS Express' button (with a green trangle) in the (standard) toolbar. This will bring up a web browser with Swagger, 
   demonstrating the features of the API.
8) Copy the root address of the url (such as https://localhost:44344) to a new browser window