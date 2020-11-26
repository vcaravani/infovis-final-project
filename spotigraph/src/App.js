import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ForceGraphClass from './ForceGraphClass'
import armstrong from './louis_armstrong_dataset.json'
import monk from './thelonious_monk_dataset.json'
import etta from './etta_james_dataset.json'


class App extends React.Component {

  constructor() {
    super()
    this.state = {
      stub_dataset_name: null,
      nodes: null,
      links: null,
      genres: null,
      graphView : false
    }
    this.getNowPlaying = this.getNowPlaying.bind(this)
  }

  getNowPlaying(event) {
    console.log('get now playing', event.target.id)
    let stub_dataset;
    if(event.target.id === 'monk'){
      stub_dataset = monk
    }else if(event.target.id === 'armstrong'){
      stub_dataset = armstrong
    }else if(event.target.id === 'etta'){
      stub_dataset = etta
    }
    setTimeout( () => this.setState({nodes: stub_dataset.nodes,links:stub_dataset.links}),3000)//this.getRelatedArtistsDepth2(), 3000)
    setTimeout( () => this.fillGraph(), 6000)
  }

  getFilteredGenres(genres,topgenreslist){
    let count = 0
    let filterd_genre = []
    topgenreslist.forEach((genre) =>{
      genres.forEach((genre_artist) => {
        if(genre[0] === genre_artist && count < 2){
          count += 1
          filterd_genre.push(genre[0])
        }
      })
    })
    return filterd_genre
  }

  getMostPresentGenres(nodes, links){
    let genres = new Set()
    let genres2count = {}
    nodes.forEach((node) => {
      node.genres.forEach((genre) => {
        if(genres2count[genre] >= 1){
          genres2count[genre] += 1
        }else{
          genres2count[genre] = 1
        }
      })
    })
    let gen2count_list = []
    for (const [key, value] of Object.entries(genres2count)) {
      console.log(key,value)
      gen2count_list.push([key,value]);
    }
    gen2count_list.sort((a,b) => b[1] - a[1])
    nodes.map( (node) => {
      console.log(node.genres)
      node.genres = this.getFilteredGenres(node.genres,gen2count_list)
      console.log('----------',node.genres)
      genres.add(node.genres[0])
      genres.add(node.genres[1])
      return null
    })
    return genres
  }


  fillGraph() {
    console.log('fill graph')
    let genres = this.getMostPresentGenres(this.state.nodes,this.state.links)
    this.setState({
      all_genres: genres,
      graphView : true
    })
  }


  render() {


    let graphsection = null;
    if (this.state.graphView != null) {
      graphsection = <section className="Main">
        <ForceGraphClass linksData={this.state.links} nodesData={this.state.nodes} genres={this.state.all_genres}></ForceGraphClass>
       {/*  <ShowJson graphs={this.state.relatedArtistGraph}></ShowJson> */}
      </section>
    }

    return (
      <div className="App">


        <header style={{ marginTop:'1vh', borderBottom:'4px solid #1DB954', marginBottom:'1vh' }} className="App-header">
          <h1 style={{ color: '#1db954', fontFamily:'Roboto' }}>INFOVIS PROJECT: SPOTIGRAPH - LOCAL VERSION</h1>
        </header>

        <div className="container-fluid" style={{ paddingRight: '1vh', paddingLeft: '1vh', paddingBottom: '2vh', paddingTop:'5vh', backgroundColor: '#212529' }}>

          { this.state.graphView ?
              graphsection
              :
              <>
              <div className="row">
                <div className="col-sm-4">
                  <div className="card" style={{width: "100%", backgroundColor:"#282c34"}}>
                    <img className="card-img-top"/>
                      <div className="card-body">
                        <h5 className="card-title" style={{color:'rgb(29, 185, 84)'}}>Luis Armstrong</h5>
                        <button className="btn btn-outline-success" id='armstrong' onClick={this.getNowPlaying}>Start Navigation</button>
                      </div>
                  </div>

                </div>
                <div className="col-sm-4">
                    <div className="card" style={{width: "100%", backgroundColor:"#282c34"}}>
                      <img className="card-img-top"/>
                      <div className="card-body">
                        <h5 className="card-title" style={{color:'rgb(29, 185, 84)'}}>Thelonious Monk</h5>
                        <button className="btn btn-outline-success" id='monk' onClick={this.getNowPlaying}>Start Navigation</button>
                      </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="card" style={{width: "100%", backgroundColor:"#282c34"}}>
                    <img className="card-img-top"/>
                    <div className="card-body">
                      <h5 className="card-title" style={{color:'rgb(29, 185, 84)'}}>Etta James</h5>
                      <button className="btn btn-outline-success" id='etta' onClick={this.getNowPlaying}>Start Navigation</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-2">
                </div>
                <div className="col-sm-8">
                  <div style={{paddingTop:'2vh'}}>
                    {/*<button className="btn btn-outline-success" onClick={this.getNowPlaying}>Start Navigation</button>*/}
                    <hr></hr>
                    <p style={{color:'#1db954'}}>Please select an artist and navigate his correlated artists and its genres</p>
                  </div>
                </div>
                <div className="col-sm-2">

                </div>
              </div>
              </>
              }
        </div>
      </div>
    )
  }
}

export default App;
