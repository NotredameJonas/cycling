DOCUMENTATIE CYCLINGAPI DOC

OVERZICHT:
Mijn API gaat over wielrennen. Het bevat informatie over renners, wedstrijden en teams. Het doel is om gebruikers in staat te stellen informatie op te vragen over welk team en welke wedstrijden een renner rijdt. Daarnaast kunnen gebruikers ook de beschikbare teams en wedstrijden bekijken.

Om bepaalde functionaliteiten van de API te kunnen gebruiken, moet je een gebruiker aanmaken en inloggen. Om gegevens te kunnen verwijderen, moet een gebruiker de juiste toestemming hebben.

INSTALLATIE:
Als je de applicatie lokaal wilt laten draaien, zorg er dan voor dat de endpoints zijn aangepast naar 'http://localhost:' + poortnummer / de betreffende endpoint. Daarnaast moet de API online beschikbaar zijn, zodat de GET-verzoeken kunnen worden uitgevoerd.

GEBRUIK:
Om de API te gebruiken, zijn er 18 endpoints beschikbaar.

auth:
1 - http://localhost:3000/api/auth -> Inloggen van een gebruiker. Het resultaat is een token.

users:
2 - http://localhost:3000/api/users/me -> Op basis van een meegegeven token wordt informatie opgehaald over de ingelogde gebruiker.
3 - http://localhost:3000/api/users -> Een POST-verzoek om een nieuwe gebruiker aan te maken (velden: naam, e-mail en wachtwoord).

team:
4 - http://localhost:3000/api/team -> GET: Geeft een lijst van alle teams terug.
5 - http://localhost:3000/api/team/:id -> GET: Geeft informatie over een specifiek team op basis van het meegegeven ID.
6 - http://localhost:3000/api/team -> POST: Maakt een nieuw team aan (velden: naam, teamleider, overwinningen).
7 - http://localhost:3000/api/team/:id -> PUT: Werkt informatie van een team bij (velden: naam, teamleider, overwinningen kunnen worden aangepast).
8 - http://localhost:3000/api/team/:id -> DELETE: Verwijdert een team op basis van het meegegeven ID.

race:
9 - http://localhost:3000/api/race -> GET: Geeft een lijst van alle wedstrijden terug.
10 - http://localhost:3000/api/race/:id -> GET: Geeft informatie over een specifieke wedstrijd op basis van het meegegeven ID.
11 - http://localhost:3000/api/race -> POST: Maakt een nieuwe wedstrijd aan (velden: naam, teamleider, overwinningen).
12 - http://localhost:3000/api/race/:id -> PUT: Werkt informatie van een wedstrijd bij (velden: naam, type wedstrijd kunnen worden aangepast).
13 - http://localhost:3000/api/race/:id -> DELETE: Verwijdert een wedstrijd op basis van het meegegeven ID.

rider:
14 - http://localhost:3000/api/rider -> GET: Geeft een lijst van alle renners terug.
15 - http://localhost:3000/api/rider/:id -> GET: Geeft informatie over een specifieke renner op basis van het meegegeven ID.
16 - http://localhost:3000/api/rider -> POST: Maakt een nieuwe renner aan (velden: naam, teamleider, overwinningen).
17 - http://localhost:3000/api/rider/:id -> PUT: Werkt informatie van een renner bij (velden: naam, overwinningen, team- en race-ID's kunnen worden aangepast).
18 - http://localhost:3000/api/rider/:id -> DELETE: Verwijdert een renner op basis van het meegegeven ID.

Let op: Om POST-, PUT- en DELETE-verzoeken te testen, moet je naar de map 'tests' of de map 'api-calls' gaan.

ONLINE DEPLOYMENT:
De get functionalities of my api are deployed on render.com.
1. https://cyclingapiservice.onrender.com/api/rider -> gives a list of all the riders
2. https://cyclingapiservice.onrender.com/api/rider/:id -> gives the rider with the given ID.
3. https://cyclingapiservice.onrender.com/api/team -> gives a list of all the teams.
4. https://cyclingapiservice.onrender.com/api/team/:id -> gives the team with the given ID.
5. https://cyclingapiservice.onrender.com/api/race -> gives a list of all the races.
6. https://cyclingapiservice.onrender.com/api/race/:id -> gives the race with the given ID.

ofcourse make sure to change the ':id' with an actual id.

UITGEWERKTE DEPLOYMENT STAPPENPLAN:
stap1: ga naar render.com
stap2: maak een account
stap3: maak een nieuwe web service aan
stap4: link git repository met de gewenste code aan service
stap5: zorg dat instellingen kloppen: wat? Node(nmp install| node server.js)
stap6: deploy en druk op de link die gecrieerd is.

TESTEN EN FOUTAFHANDELING:
Alle endpoints zijn getest en de testen zijn te vinden in de map 'tests' (96% coverage). Er is ook veel aandacht besteed aan foutafhandeling. Fouten worden afgehandeld met behulp van try-catch-blokken, zodat in geval van een fout de juiste foutmelding wordt weergegeven. Joi wordt gebruikt voor validatie van gegevens.

PROBLEMEN:
De meest voor de hand liggende manier van deploying leek me azure. Ik heb vele mogelijke oplossingen geprobeerd maar geen enkele leek te werken.
De code staat op azure maar op een of andere manier komt de code tevoorschijn in plaats van uitgevoerde code die tot de api endpoints moet leiden.

https://apicycling.azurewebsites.net/index.js, wanneer ik bijvoorbeeld dit doe dan krijg ik de code van de index.js file.
https://apicycling.azurewebsites.net/api/team, wanneer ik dit probeer dan krijg ik dat hij de file niet kan vinden.(404)

gelukkig heb ik de perfecte video tegen gekomen waarin dus render gebruikt is. Life saviour!