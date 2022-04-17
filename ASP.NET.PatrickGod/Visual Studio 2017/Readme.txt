Udemy course: "Single-Page Application with ASP.NET & jQuery Hands-On"
By: Patrick God 

Summary:
  Et hands on projekt, hvor man 

I denne solution har vi fulgt kurset slavisk, dvs vi har brugt Visual Studio og i �vrigt brugt project templaten "ASP.NET Web Application (.Net Framework)".
I project generation wizarden valgte vi "Empty" (frem for f.eks. Web Forms, MVC, Web API, Single Page Application og Azure API App). I �vrigt tilvalgte vi
Web API i wizarden - s� man kan tilsyneladende fint have selve App og bagvedliggende API i samme projekt.

Bem�rk, at man installerer jQuery som en nuget package (svarende til hvordan man s�dvanligvis g�r) - i den forbindelse valgte jeg i �vrigt version 3.1.1 som
tilsyneladende var den nyeste, da kurset blev optaget.

Bem�rk ogs�, at Patrick demonstrerer, hvordan man kan g�re html-delen af ens applikation bekendt med n�dvendig kode og style ved at tr�kke f�lgende filer
ind fra Solution Explorer og ind i index-html filen:
  * styles.css          (ens egen hjemmelavede style)
  * jquery-3.1.1.min.js ("minimaliseret version" af jQuery - det er ogs� den han f.eks. bruger i Hero-Manager projektet)
  * app.js              (ens egen hjemmelavede java script kode)

Iagttagelser:
* Man kan bruge jQuery, som er et popul�rt javascript library fra javascript kode. Disse konstruktioner er karakteriseret ved at de starter med $ (dollartegn).
* Hvis man tildeler et id til et tag i en html-fil, kan man hive fat i dem fra javascript kode under anvendelse af jQuery, s�dvanligvis for at manipulere dem.
* N�r web applikationen k�rer, kan man i Chrome h�jreklikke p� et element og v�lge Inspect. S� kan man f.eks. se de styles, der g�r pt sig g�ldende, f.eks. 
  hvilke views der er synlige og hvilke der er hidden