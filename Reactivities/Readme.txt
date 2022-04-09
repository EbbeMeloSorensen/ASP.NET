Udemy Course: Complete guide to building an app with .Net Core and React
Url: https://www.udemy.com/course/complete-guide-to-building-an-app-with-net-core-and-react
Instructor: Neil Cummings
Enrolled: April 2022

Summary:
  Et kursus om hvordan man laver og publicerer en (web) applikation med .Net Core React (og node)
  og f.eks. tester den med postman. Man bruger også TypeScript (som er et superset af JavaScript)

Rød tråd:

Section: Introduction 
  Han siger, at .Net Core og React er meget populære værktøjer til at arbejde med web development og
  anbefaler i øvrigt varmt IDE'en VS Code som alternativ til f.eks. Visual Studio. Der er f.eks. en
  dotnet cli, som kan bruges til at administrere solutions og projekter fra command linen (det er
  temmelig cool, da det så kan gøres fra Linux og i øvrigt er ret smidigt i forhold til at gøre det
  samme med Visual Studio). Han præsenterer et antal vs code plugins, hvoraf nogle er nødvendige for
  at køre projektet, mens andre er nice:
    * C# (powered by OmniSharp) (Dev tools for .Net)
    * C# Extensions (JosKreativ)
    * Nuget Gallery
    * Bracket Pair Colorizer (nice - måske)
    * Material Icon Theme (Viser ikoner i 'Explorer' viewet, så det bliver lidt mere lækkert at se på)
    * SQLite (Til at køre noget lokal test med databaser)

Section 2: Walking Skeleton
  Han forklarer, hvad et walking skeleton er. Det minder om MVP (Minimum Viable Product), men er
  endnu mere tyndt, derved at det fokuserer på bare at binde teknologierne sammen end-to-end.
  Han forklarer i øvrigt, at vi vil lave det i henhold til "Clean Architecture"-principperne,
  som minder om onion, derved at domain er det centrale.

  Kør følgende ved en command prompt:

   1) dotnet --info (til lige at sikre, at det overhovedet er installeret)
   2) mkdir Reactivities (bare navnet på vores projekt og specifikt den solution, vi laver umiddelbart efter)
   3) cd .\Reactivities
   4) dotnet new sln (til at lave en ny solution)
   5) dotnet new webapi -n API (lav et nyt .Net Core 6.0 API projekt. -n angiver, at vi vil oprette
      en folder til projektet)
   6) dotnet new classlib -n Application (lav et class library)
   7) dotnet new classlib -n Persistence
   8) dotnet new classlib -n Domain
   9) dotnet sln add API (tilføj pågældende projekt til solutionen)
  10) dotnet sln add Application
  11) dotnet sln add Persistence
  12) dotnet sln add Domain
  13) dotnet sln list (kontrol af at solutionen indeholder de projekter, det skal)
  14) cd .\API
  15) dotnet add reference ..\Application (tilføj en reference fra et projekt til et andet)
  16) cd..
  17) cd .\Application
  18) dotnet add reference ..\Persistence
  19) dotnet add reference ..\Domain