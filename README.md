# infovis-final-project


## Spotigraph

Spotigraph is a web application that allows an interactive visualization of the correlates of an artist currently listening on Spotify. 
Spotigraph allows you to better understand the galaxy of artists related to the current listening artist, in the visualization it is possible to browse the artists by genre and select artists to queue in the listening. For full funcionality it requires a Spotify Premium Account.
Spotigraph is my final project for the Information Visualization class by Prof. Maurizio Patrignani.

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

In spotigraph/src/d3 there is ForceGraphClass.js React class which manages the state and the rendering of the div containing the graph created with d3 in ForceGraphGenerator.js by runForceGraph function. ForceGraphClass.js call runForceGraph function on component mount, updating the graph is the task of d3 and not of React. 
 

### Visulization

The main objective of the project is the visualization of the graph of the related artists. Based on the current listening, access requests are made to the Spotify Web API to get the artists related to the artist of the current track and then for each related artist the same request is repeated.

The requests to the Spotify Web Api lead to the creation of a graph in a data structure like {'nodes': [...],' links: [...]}, where there is a node for each artist and a link between nodes for each correlation relationship.

Name, genres, image, popularity index are stored for each artists. Each node is a circle and displays the artist's name as a label, it is colored according to the artist's genres and its radius represent the popularity index of the artist.

##### genres limitation

For each artist, the Spotify Web Api returns information on his genres, we have chosen to limit the number of genres per artist to two. These two genres are chosen from the artist's list of genres are selected for each node among his genres the two most present among the neighbors.


The graph is displayed using a force-directed algorithm, this graph drawing technique leads to a good visualization of the artists' cloud and also a good clustering of the artists based on the degree of correlation. In D3 section there are more specifications about force-directed simulation.




 #### User Task
 
 The user can have this type of interaction with the graph:
 - pan
 - zoom
 - click on a node to highlights links to neighbors
 - filter node by genres's legends
 
The user zooming out gets a blurry view of the nodes in order to better appreciate the color shades of the clusters.


#### D3.js

The D3.js library was used to render the graph D3 allows you to bind arbitrary data to a Document Object Model (DOM), and then apply data-driven transformations to the document.
Drawing the graph of related artists and creating genre legends are done using d3.js

The d3 code is in 'src/d3/ForceGraphGenerator.js'


Here's the code of simulation:

```
  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(..)))
    .force("charge", d3.forceManyBody().strength(...))
    .force("center", d3.forceCenter(width / ..., height / ...))
```

reference: https://github.com/d3/d3-force








 



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



### How to run local version

You’ll need to have Node >= 8.10 and npm >= 5.6 on your machine. To create a project, run:

```
git clone https://github.com/vcaravani/infovis-final-project.git
cd infovis-final-project/spotigraph
yarn install (or npm install)
yarn start (or npm start)
```


### Online Version

cooming soon, now enjoy a demo-gif!

![alt text](https://github.com/vcaravani/infovis-final-project/blob/main/demo_cut.gif?raw=true)


















