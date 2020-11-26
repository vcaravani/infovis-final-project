import React from "react";
import { runForceGraph } from "./ForceGraphGenerator";
import styles from "./ForceGraph.module.css";
import * as d3 from "d3"
import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css';


class ForceGraphClass extends React.Component {

    constructor(props) {
        super()
        this.legRefLeft = React.createRef();
        this.legRefRight = React.createRef();
        this.myRef = React.createRef();
        this.state = {
        }
    }


    static getDerivedStateFromProps(props, state) {
        if (props.linksData !== state.links || props.nodesData !== state.nodes) {
            return {
                related_artists: props.artists,
                links: props.linksData,
                nodes: props.nodesData,
                genres : props.genres
            };
        }
        // Return null if the state hasn't changed
        return null;
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.props.linksData !== prevProps.linksData) {
            d3.selectAll("svg")
                .remove()
                .exit()
            runForceGraph(this.myRef.current, this.state.links, this.state.nodes, this.state.genres, this.legRefLeft.current, this.legRefRight.current)
        }
    }



    componentDidMount() {
        runForceGraph(this.myRef.current, this.state.links, this.state.nodes, this.state.genres, this.legRefLeft.current, this.legRefRight.current)
    }


    render() {


        return (
        <div className="row">
            <div className="col-sm-2">
                <div ref={this.legRefLeft} style={{height:'100%', paddingRight:'0px'}}></div>
            </div>
            <div className="col-sm-8">
                <div ref={this.myRef} className={styles.container}></div>
            </div>
            <div className="col-sm-2">
                <div ref={this.legRefRight}></div>
            </div>
        </div>
        )
    }
}

export default ForceGraphClass;