## Udemy Course: Complete guide to building an app with .Net Core and React

## https://www.udemy.com/course/complete-guide-to-building-an-app-with-net-core-and-react

### Instructor: Neil Cummings

### Enrolled: April 2022

## Summary
  Et kursus om hvordan man laver og publicerer en (web) applikation med .Net Core React (og node)
  og f.eks. tester den med postman. Man bruger også TypeScript (som er et superset af JavaScript)

## Rød tråd

### Section 1: Introduction

Han siger, at .Net Core og React er meget populære værktøjer til at arbejde med web development og anbefaler i øvrigt varmt IDE'en VS Code som alternativ til f.eks. Visual Studio. Der er f.eks. en dotnet cli, som kan bruges til at administrere solutions og projekter fra command linen (det er temmelig cool, da det så kan gøres fra Linux og i øvrigt er ret smidigt i forhold til at gøre det samme med Visual Studio). Han præsenterer et antal vs code plugins, hvoraf nogle er nødvendige for at køre projektet, mens andre er nice:

* C# (powered by OmniSharp) (Dev tools for .Net)
* C# Extensions (JosKreativ)
* Nuget Gallery
* Bracket Pair Colorizer (nice - måske)
* Material Icon Theme (viser ikoner i 'Explorer' viewet, så det bliver lidt mere lækkert at se på)
* SQLite (Til at køre noget lokal test med databaser)

### Section 2: Walking Skeleton Part 1 - API

Han forklarer, hvad et walking skeleton er. Det minder om MVP (Minimum Viable Product), men er endnu mere tyndt, derved at det fokuserer på bare at binde teknologierne sammen end-to-end. Han forklarer i øvrigt, at vi vil lave det i henhold til "Clean Architecture"-principperne, som minder om onion, derved at domain er det centrale.

Kør følgende ved en command prompt:

1. dotnet --info (til lige at sikre, at det overhovedet er installeret)

2. mkdir Reactivities (bare navnet på vores projekt og specifikt den solution, vi laver umiddelbart efter)

3. cd .\Reactivities

4. dotnet new sln (til at lave en ny solution)

5) dotnet new webapi -n API (lav et nyt .Net Core 6.0 API projekt. -n angiver, at vi vil oprette
      en folder til projektet)
      
6. dotnet new classlib -n Application (lav et class library)

7. dotnet new classlib -n Persistence

8. dotnet new classlib -n Domain

9) dotnet sln add API (tilføj pågældende projekt til solutionen)

      10. dotnet sln add Application
      
      11. dotnet sln add Persistence
      
      12. dotnet sln add Domain
      
      13. dotnet sln list (kontrol af at solutionen indeholder de projekter, det skal)
      
      14. cd .\API
      
      15. dotnet add reference ..\Application (tilføj en reference fra et projekt til et andet)
      
      16. cd..
      
      17. cd .\Application
      
      18. dotnet add reference ..\Persistence
      
      19. dotnet add reference ..\Domain
      
      20. cd..
      
      21. cd .\Persistence
      
      22. dotnet add reference ..\Domain
      
          Han anbefaler i øvrigt at tilføje de 2 patterns \*\*/bin og \*\*/obj til File->Preferences->Settings for at undgå, at de vises i Explorer viewet.
      
      23. Launch VS Code og åbn den folder, som solutionen ligger i (Reactivities)
      
      24. Vis terminalvinduet i VS Code ved at trykke CTRL+æ (hint i main vinduet)
      
      25. Ekserkver følgende i terminalvinduet: dotnet watch run (man kan også bare skrive dotnet run, 
                men han anbefaler det første). Test det i swagger og også i postman ved at skrive:
                  http://localhost:5000/weatherforecast og sende det som en Get query

Han nævner i øvrigt, at det er smart at bruge såkaldte postman collections til at teste sine api'er og demonstrerer, hvordan man kan importere sådan en collecion (fra en resourcefil fra kurset).

Nu begynder vi så at bygge vores egen domænemodel i stedet for det der WeatherForecast eksempel, der følger med project templaten. Derudover bygger vi persisteringsdelen under anvendelse af Entity Framework Core, specifikt med support for Sqlite i dette eksempel.

   26) Tilføj klassen Activity under Domain-projektet
   27) Tryk Ctrl+Shift+P for at åbne command palette, og vælg Open Nuget Gallery
   28) Installer nuget pakken Microsoft.EntityFrameworkCore.Sqlite for Persistence-projektet
   29) Tilføj klassen DataContext under Persistence-projektet
   30) Ændr IConfiguration propertyen i Startup-klassen til en data member og initialiser den i constructoren
       (det re vist bare instruktørens stil)
   31) Tilføj følgende linie nederst i Startup-klassens ConfigureServices-metode:
         services.AddDbContext<DataContext>(opt => opt.UseSqlite(_config.GetConnectionString("DefaultConnection")));
   32) Tilføj denne sektion nederst i filen appsettings.Development.json:
          "ConnectionStrings": {
            "DefaultConnection": "Data source=reactivities.db"
          }
   33) Åbn terminal-vinduet i VS Code og eksekver følgende for at checke, om vi har installeret toolet
       til at foretage code first migrations:
         dotnet tool list --global
       (toolet hedder dotnet-ef. Hvis ikke det er der, så gå ind på nuget.org, find pakken dotnet-ef og
       kopier den linie, der skal eksekveres i vs codes terminal vindue or at installere toolet, alla:
       dotnet tool install --global dotnet-ef --version 6.0.1. Kør bagefter igen dotnet tool list --global
       for at sikre, at pakken nu er blevet installeret. Man kan også køre dotnet ef -h for at se, hvordan 
       man kan bruge toolet)
   34) Eksekver nu følgende i terminalvinduet for at lave en migrering:
         dotnet ef migrations add InitialCreate -p Persistence -s API
   35. Lav ændringer i Program-klassens Main metode, så den ser således ud:

           public static void Main(string[] args)
           {
             // Original from project template
             //CreateHostBuilder(args).Build().Run();
                
             // Changes made by instructor (for creating the database from the migration)
             var host = CreateHostBuilder(args).Build();
             using var scope = host.Services.CreateScope();
             var services = scope.ServiceProvider;
           
             try
             {
               var context = services.GetRequiredService<DataContext>();
               context.Database.Migrate();
             } 
             catch(Exception ex)
             {
               var logger = services.GetRequiredService<ILogger<Program>>();
               logger.LogError(ex, "An error occured during migration");
             }
           
             host.Run();
           }
       

   36) Naviger til API-folderen i terminal-vinduet, og eksekver: **dotnet watch run**
       Bemærk, at den så laver filen reactivities.db, som er en Sqlite database.
   37) Åbn Command palette i VS Code ved at trykke Ctrl+Shift+P og skrive sqlite: open database
       og så vælge reactivities-databasen. Så popper der en 'SQLITE EXPLORER' tab op i Explorer
       viewet, hvor man kan højreklikke på tabellen og f.eks. vælge 'Show database' (den er tom
       indtil videre)
   38) Tilføj klassen Seed til Persistence-projektet og ændr Program-klassens Main method,
       så den seeder databasen. Brug 'SQLITE EXPLORER' til at verificere, at databasen er blevet
       populeret.

  Nu skal vi til at lave en API Controller (i stil med den, der allerede er blevet lavet af project 
  templaten), så vi kan retrieve data fra databasen.

   39) Tilføj en klasse ved navn BaseApiController til Controllers folderen i API-projektet.
   40) Tilføj en klasse ved navn ActivitiesController, som nedarver fra BaseApiController og implementer
       en constructor samt de 2 methods GetActivities og GetActivity
   41) Test det fra postman ved at lave følgende get request:
         http://localhost:5000/api/activities

Han nævner, at man kan lave en gitignore fil ved at køre følgende i terminalen: dotnet new gitignore
  ..det er noget lettere end at gøre det sådan som du plejer
Han nævner til sidst, at man bør tilføje linien appsettings.json til gitignore filen

### Section 3: Walking Skeleton Part 2 - Client

Nu hvor vi er færdige med backenden, skal vi til at arbejde med front enden. I den forbindelse laver vi en React applikation. Han nævner, at vi kommer til at bruge et værktøj, der hedder **Axios**, til at sende Http Requests til backenden.

1. Åbn en command prompt og naviger hen til samme sted, som Reactivities-solutionen ligger i.

2. Eksekver følgende: npx create-react-app client-app --use-npm --template typescript

3. Run the app by typing this at the prompt:

   ​	cd client-app

   ​	**npm start**

   (nu skulle den så gerne åbne den sædvanlige browser-side med React-logoet)

4. Muligvis: Fjern det der React.StrictMode fra filen index.tsx. Han siger, at det kan give problemer, men muligvis ikke i nyere versioner af React.

   Han nævner, at en af årsagerne til at React er populært er, at den er hurtig. Dette skyldes i vidt omfang, at den gør brug af et koncept med at bruge en "**virtual DOM** that contains a representation of the actual DOM that the browser uses". Det er hurtigere end værktøjer som f.eks. jQuery, der opdaterer DOM'en direkte. Det indebærer vist nok også, at den kun ændrer de dele af DOM'en, der faktisk skal ændres. Han siger, at React gør brug af "one-way binding" mod DOM'en, i modsætning til f.eks. Angular, der bruger two-way binding. Han nævner i øvrigt, at React "bare er et javascript library" - det er ikke er framework! Han introducerer **React components**, som er en self-contained konstruktion, der indeholder både js, HTML og css. En React component kan have en **state**, som kan sendes "som properties til child components". Han introducerer begrebet **React Hook**, som er "a function that lets us hook into the React states and life cycle features from function components". Han nævner også, at det kan være gavnligt at tilføje **React Dev Tools** pluginet til Chrome.

   Nu skal vi så til at populere brugregrænsefladen med data, som vi henter fra API'et. I den forbindelse anbefaler han at bruge pakken **Axios**.

5. Kør api'en fra VS Code ved at åbne et konsolvindue, navigere til API-folderen og skrive: dotnet watch run. Det bringer det sædvanlige swagger vindue op.

6. Start et *ekstra* konsolvindue i VS Code, naviger til client-app folderen, og eksekver: npm install axios

7. Ændr filen App.tsx ved at importere axios og tilføje 2 React hooks: **useState** og **useEffect** , som beskrevet i kurset. Han siger, at den selv laver det nødvendige import statement, men det lader ikke til at være tilfældet.

   Nu kan man så eksekvere applikationen, men API-kaldet fejler pga noget **CORS policy**, som vi så fixer i næste trin

8. Lav ændringer i filen Startup.cs under API-projektet, som anvist i kurset.

   Nu skal vi så til at bruge **Semantic UI React** til at style vores applikation, så den ser pænere ud.

9. Naviger client-app-folderen i et konsolvindue i VS Code, og eksekver følgende: npm install semantic-ui-react semantic-ui-css

   Så får vi så en masse forbandede fejl, der går på at der er rod med afhængighederne, lidt ligesom nuget-helvede. Han siger godt nok at det er let at gå til og hvad fanden ved jeg, men så må det jo være fordi jeg er snotdum. Jeg har i hvert fald ikke kunnet få det til at virke. Jeg har googlet lidt, og det lader til at have noget at gøre med, at Semantic.UI ikke er kompatibelt med React 18. Jeg har indtil videre ladet det ligge - også fordi det mest drejer sig om at få det til at se nogenlunde pænt ud. Se i øvrigt appendixet.

### Section 4: Creating a CRUD application using the CQRS + Mediator pattern

I denne sektion går vi videre fra bare at kunne se vores items i React-applikationen til også at kunne køre Create/Read/Update/Delete på dem. Han indleder med, at vi gerne vil gøre det i henhold til "Clean Architecture"-principperne, som minder meget om onion-architecture-principperne. Interessant nok nævner han, at vi ville kunne gøre det med Repository patternet, men han siger, at vi hellere vil gøre det med de 2 patterns: Mediator og CQRS, som står for  Command Query Responsibility Segregation.

1. Åbn nuget gallery i VS code, find MediatR.Extensions.Microsoft.DependencyInjection og installer pakken for Application-projektet.

2. Lav en ny subfolder ved navn Activities for Application-projektet og lav en ny klasse ved navn List i folderen. Lav i det hele taget de refaktoreringer af API-projektet, som anvises i kurset. Slut af med at teste, at det stadig virker at hente alle activity items fra postman.

3. Lav den refaktorering, han viser i kurset, hvor der skubbes noget fra ActivitiesControlleren til dens basisklasse BaseApiController. Check at man stadig kan hente alle activities med postman

4. Lav en handler for at hente et individuelt item, som anvist i kurset, og verificer at det virker med postman

5. Lav en handler for at lave et nyt item, som anvist i kurset, og verificer at det virker med postman. Bemærk, at han bruger nogle interessante features fra postman.

6. Lav en handler for at ændre et eksisterende item, som anvist i kurset, og verificer, at det virker med postman.

7. Refaktorer edit-handleren, så den bruger auto-mapping med nuget pakken AutoMapper.Extensions.Microsoft.DependencyInjection, som anvist i kurset. Verificer, at det virker med postman.

8. Lav en handler for at slette et eksisterende item, som anvist i kurset, og verificer, at det virker med postman.

   Han demonstrerer, hvordan man kan gøre brug af cancellation tokens, så man fra klienten kan cancellere en long running operation. Han sletter det imidlertid umiddelbart efter demonstrationen.

9. Til sidst i sektion 4 demonstrerer han, hvordan man anvender debuggeren i VS Code.

### Section 5: Creating a CRUD application in React

Indtil videre kan React apien kun vise activities, som hvis den var en viewer. Nu går vi videre med at lave den til en manager med support for create/read/update/delete.

1) Foretag refaktoreringer for at lave en hensigtsmæssig folderstruktur for React-projektet client-app, som vist i kurset.

### Annex: Procedure for setting up a React project and adding Semantic UI for styling

1) Open a command prompt and exectute the following:

   node --version	(must be 8.10 or bigger. Neil Cummings uses version 15.5.1)

   npm --version	(must be 5.6 or bigger. Neil Cummings uses version 7.3.0)

2) Execute the following at the command prompt at a path where you want to create the React project

   npx create-react-app client-app --use-npm --template typescript

3) Launch the web application by executing the following at the command prompt:

   npm start

   Now you should see the usual React application with the spinning logo

4) Stop the web application? not sure..

5) Execute the following at the command prompt:

   npm install semantic-ui-react semantic-ui-css

   Nu siger han så, at vi får nogle warnings, men vi får faktisk et bunch af errors, som vist nedenfor:

   ![image-20220506061905690](C:\Git\GitHub\ASP.NET\Reactivities\Assets\semantic_ui_errors.png)

   .
