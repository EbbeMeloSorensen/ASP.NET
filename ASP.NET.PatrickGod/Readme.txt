Bemærk:
* Han bruger Visual Studio 2017
* Han laver en ASP.Net Web Application (.Net Framework)

DEN RØDE TRÅD:

Section 1: The WCF Service
  Han viser, hvordan man laver en ASP.Net web applikation og indlejrer en (ajax-enabled) wcf service. Det at den er ajax enabled indebærer, 
  at den vil være en RESTFUL WCF service. Bemærk, at han kører den ved at højreklikke på filen Service1.svc og vælger 'View in Browser'. Så
  vises et vindue med en blå bjælke øverst, hvor der står Service og derudover en masse tekst. I url-feltet for browseren skal man nu tilføje
  /DoWork for at se teksten fra applikationen. Så laver han nogle småjusteringer, der gør, at teksten skrives i et ordentligt format i browseren.

  Så laver han en ny web applikation på samme måde, og kalder den SuperHeroDB. Rent faktisk har han bare lavet den up front og vedhæftet den
  som en zip-fil, men det er tilsyneladende relativt let at lave den fra bunden. Man skal tilføje 3 java script files, en css (cascading style sheet)
  fil samt en html fil.

Section 2: CRUD Implementations
  Han fortæller om CRUD og sammenholder det med GET, PUT, POST og DELETE, som er de tilsvarende termer, der bruges, når man har med såkaldte
  HTTP Request Methods at gøre.
    GET: Requests a representation of the specified resource (svarer til Read)
    POST: Used to submit an entity to the specified resource, often causing a change in state or side effects on the server (svarer til Create)
    PUT: Replaces all current representations of the target resource with the request payload (svarer til Update)
    DELETE: Deletes the specified resource
  Han bygger så lidt videre på web SuperHeroDB applikationen, så man kan hive data om superheltene op i et tabelview i browseren. 
  Bemærk, at han refererer til javascript filerne som "FrontEnd" eller "Client side". Han bemærker, at vi bruger jQuery.
  
