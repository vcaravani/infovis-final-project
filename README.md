# infovis-final-project


## Spotigraph

Spotigraph is a web application that allows the interactive visualization of the correlates of an artist currently listening on Spotify. 
Spotigraph allows you to better understand the galaxy of artists related to the current listening artist, in the visualization it is possible to browse the artists by genre and select artists to queue in the listening. For full funcionality it requires a Spotify Premium Account.
Spotigraph is my final project for the Information Visualization class by Prof. Maurizio Patrignani and my last exam at Roma Tre University :)

## Motivation
Spotify is the best application on the market for listening to music, however there is no possibility to graphically browse the artists. The page of an artist presents related artists through a list, without any informative content on the genres and popularity of the artist and its related.

### Project
Spotigraph tenta di espandere le funzionalità di Spotify, sfruttando le informazioni presenti nello Spotify Data Catalogue, permettendo una navigazione visuale degli artisti correlati, fornendo soprattutto informazioni sui generi più rilevanti presenti negli artisti correlati.

L'oggetto principale del progetto è la visualizzazione del grafo degli artisti correlati. In base all'ascolto corrente, vengono fatte richieste alla Spotify Web Api per accedere ai correlati a distanza 2 (i correlati dei correlati). Le richieste portano alla creazione di un grafo tramite una struttura dati del tipo { 'nodes':[...], 'links: [...] }. 
Il grafo è visualizzato mediante un algoritmo force-directed, questa tecnica di disegno del grafo permette una buona visualizzazione della nuvola degli artisti ed inoltre una buona clusterizzazione degli artisti in base al grado di correlazione (per grado di correlazione si intende il numero di archi incidenti nel nodo, artisti molto correlati tra loro saranno centrali e vicini tra loro, artisti poco correlati si troveranno ai margini della visualizzazione).

Gli artisti sono rappresentati dai nodi del grafo e la correlazione è rappresentata dalla presenza o meno di un arco tra due artisti(nodi).

Il contenuto informativo che si è scelto di visualizzare tramite i nodi rigurda:
- il nome dell'artista
- due generi tra i generi dell'artista
- la popolarity dell'artista

Le Spotify Web API per ogni artista riportano i suoi generi, per semplicità  si è scelto di limitare a due il numero di generi per artista. Questi due generi sono scelti dalla lista dei generi dell'artista tramite un algoritmo che seleziona i due generi più presenti tra i correlati dell'artista correntemente in ascolto

Queste informazioni sono graficamento visualizzate a livello di nodo del grafo:
 - popolarità, determinerà la dimensione del raggio dei circle che rappresentano i nodi
 - il genere dell'artista che è risultato il più presente nei vicini, determinerà il colore del nodo
 - il genere dell'artista che è risultato il secondo più presente nei vicini, determinerà il colore del bordo del nodo
 
 #### Task Utente
 
 L'utente può avere queste interazioni con la visualizzazione:
 - interazione con il grafo
    -l'utente può fare panning and zooming
    -l'utente può cliccando su un nodo vedere evidenziati i vicini di quel nodo, 
 
 



Partendo da una traccia in ascolto sull'applicazione (desktop o mobile)
The project mainly uses these three libraries:
- React (https://it.reactjs.org/) for UI creation
- D3 (https://d3js.org/) for rendering the graph of related artists
- spotify-web-api-js (https://github.com/JMPerez/spotify-web-api-js) to simply interact with the endpoints of the spotify web api





# Offline Version
For exam evaluation reasons, the current version is an offline version which does not require a Spotify account and which has a limited choice between the artists to browse.



## Spotify Web Api
Based on simple REST principles, the Spotify Web API endpoints return JSON metadata about music artists, albums, and tracks, directly from the Spotify Data Catalogue.
Web API also provides access to user related data, like playlists and music that the user saves in the Your Music library. Such access is enabled through selective authorization, by the user.

Spotigraph uses these Spotify endpoints:
- https://api.spotify.com/v1/artists/{id}
- https://api.spotify.com/v1/artists/{id}/top-tracks
- https://api.spotify.com/v1/artists/{id}/related-artists
- https://api.spotify.com/v1/me/player/queue
- https://api.spotify.com/v1/me/player/currently-playing

### Authorization
Making authorized requests to the Spotify platform requires that you are granted permission to access data. Spotigraph among the methods proposed for developers, uses Authorization Code Flow.
(https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow)


#### Set up authentication server
Follow this instruction to 

```
git clone https://github.com/spotify/web-api-auth-examples.git 
cd auth-server
npm install
```
To set up the authentication server you need 
```
/* auth-server/authorization_code/app.js */

var client_id = ‘CLIENT_ID’;
var client_secret = ‘CLIENT_SECRET’; 
var redirect_uri = ‘REDIRECT_URI’; // redirect uri to Spotigraph (in offline vesion localhost:3000)
```

to get CLIENT_ID and CLIENT_SECRET follow https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app guidelines.
















