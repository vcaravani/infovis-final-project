# infovis-final-project


## Spotigraph

Spotigraph is a web application that allows the interactive visualization of the correlates of an artist currently listening on Spotify. 
Spotigraph allows you to better understand the galaxy of artists related to the current listening artist, in the visualization it is possible to browse the artists by genre and select artists to queue in the listening. For full funcionality it requires a Spotify Premium Account.
Spotigraph is my final project for the Information Visualization class by Prof. Maurizio Patrignani and my last exam at Roma Tre University :)

![alt text](https://github.com/vcaravani/infovis-final-project/blob/main/spotigraph.jpg?raw=true)


## Motivation
Spotify is the best application on the market for listening to music, however there is no possibility to graphically browse the artists. The page of an artist presents related artists through a list, without any informative content on the genres and popularity of the artist and its related.

## Project
Spotigraph aims to expand the capabilities of Spotify using the information present in the Spotify Data Catalog, allowing a visual navigation of related artists and providing information on the most relevant genres present in related artists.

The following libraries were used in developing the application:
- React (https://it.reactjs.org/) for UI creation
- D3.js (https://d3js.org/) to render the graph of related artists
- spotify-web-api-js (https://github.com/JMPerez/spotify-web-api-js) to interact with the endpoints of the spotify web api

### React

React is a JavaScript library for building user interfaces. Build encapsulated components that manage their own state, then compose them to make complex UIs.
React is to use to build the structure of the application, and to render traditional HTML elements, and then when it comes to the data visualization section, they pass a DOM container over to D3 and use D3 to create and destroy and update elements.

#### ForceGraphClass and ForceGraphGenerator

In src/components there is ForceGraphClass.js class which manages the state and the rendering of the <div> containing the graph created with d3 in ForceGraphGenerator.js by runForceGraph function. ForceGraphClass.js call runForceGraph function on component mount, updating the graph is the task of d3 and not of React. 
 
In a nutshell ForceGraphClass is a wrapper that allows the passage of the data relating to the current track to the d3 code in ForceGraphGenerator.js module.


### Visulization

The main goal of the project is the visualization of the graph of related artists. Based on the current listening, requests are made to the Spotify Web Api to access depth-2-related (relatd of related).

The requests to the Spotify Web Api lead to the creation of a graph through a data structure {'nodes': [...],' links: [...]}, where there is a node for each artist and a link between nodes for each correlation relationship.

#### D3.js

The D3.js library was used to render the graph D3 allows you to bind arbitrary data to a Document Object Model (DOM), and then apply data-driven transformations to the document.

The graph is displayed using a force-directed algorithm (https://github.com/d3/d3-force), this graph drawing technique leads to a good visualization of the artists' cloud and also a good clustering of the artists based on the degree of correlation

Il contenuto informativo che si è scelto di visualizzare tramite i nodi rigurda:
- il nome dell'artista
- due generi tra i generi dell'artista
- la popolarity dell'artista

Queste informazioni sono graficamento visualizzate a livello di nodo del grafo:
 - popolarità, determinerà la dimensione del raggio dei circle che rappresentano i nodi
 - il genere dell'artista che è risultato il più presente nei vicini, determinerà il colore del nodo
 - il genere dell'artista che è risultato il secondo più presente nei vicini, determinerà il colore del bordo del nodo

##### genres limitation
Le Spotify Web API per ogni artista riportano i suoi generi, per semplicità  si è scelto di limitare a due il numero di generi per artista. Questi due generi sono scelti dalla lista dei generi dell'artista tramite un algoritmo che seleziona i due generi più presenti tra i correlati dell'artista correntemente in ascolto


 
 #### User Task
 
 L'utente può avere queste interazioni con la visualizzazione:
 - interazione con il grafo
    -l'utente può fare panning and zooming
    -l'utente cliccando su un nodo può vedere evidenziati i vicini di quel nodo
    -l'utente può filtrare



### Spotify Web Api
Based on simple REST principles, the Spotify Web API endpoints return JSON metadata about music artists, albums, and tracks, directly from the Spotify Data Catalogue.
Web API also provides access to user related data, like playlists and music that the user saves in the Your Music library. Such access is enabled through selective authorization, by the user.

Spotigraph uses these Spotify endpoints:
- https://api.spotify.com/v1/artists/{id}
- https://api.spotify.com/v1/artists/{id}/top-tracks
- https://api.spotify.com/v1/artists/{id}/related-artists
- https://api.spotify.com/v1/me/player/queue
- https://api.spotify.com/v1/me/player/currently-playing

#### Authorization
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
















