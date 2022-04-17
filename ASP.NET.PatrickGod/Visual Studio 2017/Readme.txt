Udemy course: "Single-Page Application with ASP.NET & jQuery Hands-On"
By: Patrick God 

Summary:
  Et hands on projekt, hvor man 

I denne solution har vi fulgt kurset slavisk, dvs vi har brugt Visual Studio og i øvrigt brugt project templaten "ASP.NET Web Application (.Net Framework)".
I project generation wizarden valgte vi "Empty" (frem for f.eks. Web Forms, MVC, Web API, Single Page Application og Azure API App). I øvrigt tilvalgte vi
Web API i wizarden - så man kan tilsyneladende fint have selve App og bagvedliggende API i samme projekt.

Bemærk, at man installerer jQuery som en nuget package (svarende til hvordan man sædvanligvis gør) - i den forbindelse valgte jeg i øvrigt version 3.1.1 som
tilsyneladende var den nyeste, da kurset blev optaget.

Bemærk også, at Patrick demonstrerer, hvordan man kan gøre html-delen af ens applikation bekendt med nødvendig kode og style ved at trække følgende filer
ind fra Solution Explorer og ind i index-html filen:
  * styles.css          (ens egen hjemmelavede style)
  * jquery-3.1.1.min.js ("minimaliseret version" af jQuery - det er også den han f.eks. bruger i Hero-Manager projektet)
  * app.js              (ens egen hjemmelavede java script kode)

Iagttagelser:
* Man kan bruge jQuery, som er et populært javascript library fra javascript kode. Disse konstruktioner er karakteriseret ved at de starter med $ (dollartegn).
* Hvis man tildeler et id til et tag i en html-fil, kan man hive fat i dem fra javascript kode under anvendelse af jQuery, sædvanligvis for at manipulere dem.
* Når web applikationen kører, kan man i Chrome højreklikke på et element og vælge Inspect. Så kan man f.eks. se de styles, der gør pt sig gældende, f.eks. 
  hvilke views der er synlige og hvilke der er hidden