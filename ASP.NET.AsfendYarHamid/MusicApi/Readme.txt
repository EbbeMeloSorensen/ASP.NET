1) Open Visual Studio 2022
2) Create a new project using the ASP.NET Core Web API. Make sure to use .Net Core 5.0.
   Notice that in the course, he uses a project template called ASP.NET Core Web Application, so it's a bit different but gives the same result
3) Delete the files: WeatherForecastController.cs and WeatherForecast.cs
4) Add a folder named Models, and add a class named Song to it. Add the 3 properties: Id, Title and Language to the Song class.
5) Right click the 'Controllers' folder and select Add->Controller.. in the context menu. In the dialog that
   appears, click 'API' under 'Common' in the tree view to the left, and then select 'API Controller - Empty'
   select 'MVC Controller - Empty' in the list in the central view, and click the 'Add' button. Assign the name
   'SongsController' (it has to end with 'Controller').
6) Add the method 'Get' to the SongsController class. It returns a list of songs. Notice the HttpGet attribute.
7) Click the 'IIS Express' button (with a green trangle) in the (standard) toolbar. This will bring up a web browser with Swagger, 
   demonstrating the features of the API. You need to keep it running while using postman in the next steps.
8) Launch the postman application, and click the 'Create New ->' link, and then click 'HTTP Request'
9) Copy the root address of the url, postfixed with 'songs' (such as https://localhost:44344/api/songs), into the gray textbox that says 'Get' to the left in postman,
   and click the blue 'Send' button. At first, you will receive the message: "Could not get response". This is because SSL verification is enabled by default in
   postman, so you need to disable it.
10) Navigate to the Settings view in postman by clicking the button with the nut button in the upper right of the postman gui. In the Settings view, disable
    SSL certificate verification. Now, when you click the blue 'Send' button, you will see the songs from the web api.
11) Copy the url (such as 'https://localhost:44344/api/songs') to a web browser, and here, you will see the songs as well in json format.
    Notice that you can only test 'Get' directly in a browser - not Post, Put, or Delete. Det kræver et tool alla Swagger
12) Add the method 'Post' to the SongsController class. It lets you create a new song.
13) Test the Post method in postman like when testing the Get method, using the same url (such as 'https://localhost:44344/api/songs') 
    but switch from Get to Post in the dropdown list. Also navigate to the 'Body' tab, and select 'Raw' and 'JSON', 
    and write the following in the large textbox in the middle of the gui:
      {
        "Id":2,
        "Title":"Life Goes On",
        "Language":"English"
      }
    Then click the Blue Send button, and afterwards, send a get Request to verify that the new song was added. Notice that you can intercept program 
    execution by setting a breakpoint in the Post method in Visual Studio. Also notice that you can maintain a whole set of different http requests
    in postman by clicking the '+' tab to create new ones, and then you can reuse the existing ones.
14) Add the method 'Put' to the SongsController class. It lets you update an existing song.
15) Test the Put method in postman like when testing the Post method, but switch to PUT, and also append '/1' to the url, such as
    'https://localhost:44344/api/songs/1'. Like before, you need to provide a body, and make sure to use an existing id such as 0 or 1
16) Add the method 'Delete' to the SongsController class. It lets you delete an existing song.
17) Test the Put method in postman like when testing the Put method. Remember to append the url with '/1'. Obviously you don't need a body in this case
