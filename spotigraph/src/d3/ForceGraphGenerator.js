import * as d3 from "d3";


/**
 * The force graph generator will be a function that will be responsible 
 * to generate the graph. Here is the declaration of the function which gets 
 * the containing divs for graph and legends, the data for links and nodes.
 */


export function runForceGraph(
  container,
  links,
  nodes,
  allgenres,
  legendLeft,
  legendRight,
) {




  //  genres color map

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  let genres = []
  allgenres.forEach((genre) => {
    if(genre === undefined){
    }else{
      genres.push(genre)
    }
  })

  let colors = []
  let genresColorMap = {}
  genres.forEach((genre) => {
    let color = 'rgba(' + getRndInteger(90,256) + ',' + getRndInteger(90,256) + ',' + getRndInteger(90,256) + ',0.75)'
    if(colors.indexOf(color) > -1){
      color = 'rgba(' + getRndInteger(90,256) + ',' + 0 + ',' + getRndInteger(90,256) + ',0.75)'
    }
    colors.push(color)
    genresColorMap[genre] = color
  })




  // get the container’s width and height
  const containerRect = container.getBoundingClientRect();
  const height = containerRect.height //* dimensionFactor
  const width = containerRect.width //* dimensionFactor




  // add the option to drag the force graph nodes as part of its simulation.
  const drag = (simulation) => {
    const dragstarted = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };

    const dragged = (d) => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    };

    const dragended = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    };

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  };


  // simulation
  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(30))//*dimensionFactor))
    .force("charge", d3.forceManyBody().strength(-1000))
    .force("center", d3.forceCenter(width / 5, height / 3))


  // genres2nodes map
  let genres_nodes = {}
  genres.map((genre) => genres_nodes[genre] = [])
  nodes.forEach((node) => {
    node.genres.map((genre) => genres_nodes[genre].push(node.id))
  })

  function checkNodeGenre(d, n) {
    return genres_nodes[d].indexOf(n.id) > -1
  }


  // Split genres data for left and right legend panel

  const data_left = genres.slice(0,Math.floor(genres.length/2))
  const data_right =  genres.slice(Math.floor(genres.length/2),)




  // --------------------- legend left panel ------------------------ //

  // get the legend  width and height LEFT
  const legendRect_LEFT = legendLeft.getBoundingClientRect()
  const height_l_LEFT = legendRect_LEFT.height


  // create svg element
  const legendsvg_LEFT = d3.select(legendLeft).append("svg").attr("width", '100%').attr("height", '80vh').append("g")
  let wr_LEFT = height_l_LEFT / data_left.length



  legendsvg_LEFT
      .selectAll("#legend-row").data(data_left)
      .enter()
      .append("rect")
      .attr("label", (d) => d)
      .attr("x",0)
      .attr("y",  function (d, i) { return (i*wr_LEFT)})// })
      .attr("width", '100%')
      .attr("height", wr_LEFT)
      .attr("fill", (d) => {return genresColorMap[d]})
      //.on("click", () => legendClick(node, link))
      .on("click", function (d) {
      if (toggleFilter === 0) {

        d3.selectAll('rect')
        .transition()
        .duration(800)
          .attr("opacity",0.1)

        d3.select(this)
        .transition()
        .duration(800)
          .attr("opacity",1)

        link
        .transition()
        .duration(800)
          .style('stroke-opacity', function (l) { return 0; })
        node
          .transition()
          .duration(800)
            .attr("r", (n) => {return checkNodeGenre(d,n) === true ? n.radius: n.radius*0.5})
            .style('opacity', function (n) { return checkNodeGenre(d, n) === true ? 1 : 0.1; })

          toggleFilter = 1
      }else{

        d3.selectAll('rect')
        .transition()
        .duration(800)
          .attr("opacity",0.75)

        link
        .transition()
        .duration(800)
        .style('stroke-opacity', function (l) { return 0.1; })

        node
        .transition()
        .duration(800)
          .attr("r", (n) => {return n.radius*0.5})
          .style('opacity', function (n) { return 1 })

        toggleFilter = 0
      }

    })

    legendsvg_LEFT.append("g")
        .selectAll("text")
        .data(data_left)
        .enter()
        .append("text")
        .attr("x",wr_LEFT/4)
        .attr("y",  function (d, i) { return (i*wr_LEFT+wr_LEFT/2)})// })
        .text(function(d) { return d; })
        .attr("fill", (d) => genresColorMap[d].replace('0.75','1'))
        .style("font-size", "20px")


  // --------------------- legend right panel ------------------------ //

        // create svg element
      const legendsvg_RIGHT = d3.select(legendRight).append("svg").attr("width", '100%').attr("height", '80vh').append("g")


      legendsvg_RIGHT
          .selectAll("#legend-row")
        .data(data_right)
        .enter()
        .append("rect")
        .attr("label", (d) => d)
        .attr("x",0)
        .attr("y",  function (d, i) { return (i*wr_LEFT)})// })
        .attr("width", '100%')
        .attr("height", wr_LEFT)
        .attr("fill", (d) => {return genresColorMap[d]})
        //.on("click", () => legendClick(node, link))
        .on("click", function (d) {
          if (toggleFilter === 0) {

            d3.selectAll('rect')
            .transition()
            .duration(800)
              .attr("opacity",0.1)

            d3.select(this)
            .transition()
            .duration(800)
              .attr("opacity",1)

            link
            .transition()
            .duration(800)
              .style('stroke-opacity', function (l) { return 0; })

            node
              .transition()
              .duration(800)
                .attr("r", (n) => {return checkNodeGenre(d,n) === true ? n.radius: n.radius*0.5})
                .style('opacity', function (n) { return checkNodeGenre(d, n) === true ? 1 : 0.1; })

              toggleFilter = 1

          }else{

            d3.selectAll('rect')
            .transition()
            .duration(800)
              .attr("opacity",0.75)

            link
            .transition()
            .duration(800)
            .style('stroke-opacity', function (l) { return 0.1; })

            node
            .transition()
            .duration(800)
              .attr("r", (n) => {return n.radius*0.5})
              .style('opacity', function (n) { return 1 })

            toggleFilter = 0
          }

        })

      legendsvg_RIGHT
          .append("g")
        .selectAll("text")
        .data(data_right)
        .enter()

          .append("text")
        .attr("x",wr_LEFT/4)
        .attr("y",  function (d, i) { return (i*wr_LEFT+wr_LEFT/2)})// })
        .text(function(d) { return d; })
          .attr("fill", (d) => genresColorMap[d].replace('0.75','1'))
          .style("font-size", "20px")



      // ------------- graph ---------------- //
      const svg = d3
        .select(container)
        .append("svg")
        .attr("viewBox", [-width / 2, -height / 2, width * 1.5, height * 1.5])
        .call(d3.zoom().on("zoom", function () {
          svg.attr("transform", d3.event.transform)

          if(d3.event.transform.k<=1 ){
            node
            .transition()
            .duration(800)
            .attr('r', (d) => d.radius/(d3.event.transform.k*1.5))
            .attr("opacity", (d) => d.isNowPlaying ? 1 : 0.2)

            label
            .transition()
            .duration(800)
              .attr("font-size", (d) => d.isNowPlaying ? 13*2/d3.event.transform.k : 0)

            link
            .transition()
            .duration(800)
            .attr("opacity",0)

          }else{
            node
            .transition()
            .duration(800)
            .attr('r', (d) => d.radius*0.6)
            .attr('opacity',1)

            label
            .transition()
            .duration(800)
            .attr("font-size", 13)

            link
            .transition()
            .duration(800)
            .attr("opacity",1)
          }

        }))
        .append("g")


      const link = svg
        .append("g")
        .attr("stroke", "#666")
        .attr("stroke-opacity", 0.1)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", 1);

      let toggle = 0


      // Make object of all neighboring nodes.
      let linkedByIndex = {};
      links.forEach(function (d) {
        linkedByIndex[d.source.id + d.target.id] = 1;
        linkedByIndex[d.target.id + d.source.id] = 1;
      });

      // A function to test if two nodes are neighboring.
      function neighboring(a, b) {
        return linkedByIndex[a.id + b.id];
      }


      const node = svg
        .append("g")
        //.attr("stroke", "rgba(29, 185, 84,0.6)")
        .selectAll("circle")
        .data(nodes)
        .join("circle")

    /*     .attr("class", (d) => {return d.isNowPlaying ? 'pulse-ring' : ''})
     */    .attr("stroke", (d) => { return (genresColorMap[d.genres[1]]) })
    .attr("stroke-width", 10)
    .attr("r", d => d.radius * 0.5)
    //.attr("fill", color)
    .attr("fill", (d) => { return (genresColorMap[d.genres[0]]) })
    .attr("label", d => d.name)
    .on('click', function (d, i) {
      if (toggle === 0) {
        // Ternary operator restyles links and nodes if they are adjacent.

        //legendClick(d.id)

        link
        .transition()
        .duration(800)
          .style('stroke-opacity', function (l) { return l.target === d || l.source === d ? 1 : 0.1; })
          .style('stroke', function (l) { return l.target === d || l.source === d ? 'rgba(29, 185, 84,0.6)' : '#666'; })
          .style('stroke-width', function (l) { return l.target === d || l.source === d ? 2.5 : 1; })

        node
        /* .transition()
        .duration(800) */
          .style('opacity', function (n) { return neighboring(d, n) === 1 ? 1 : 0.1; })
          //.style('stroke-width', function (n) { return neighboring(d, n) === 1 ? 2.5 : 1; });

        label
          .style('opacity', function (n) { return neighboring(d, n) === 1 || d3.select(this) === n ? 1 : 0.1; })


        d3.select(this).style('opacity', 1);
        d3.select(this).style('stroke-width', 5);

        toggle = 1;
      }
      else {
        // Restore nodes and links to normal opacity and stroke-width.
        link
        .transition()
        .duration(800)
          .style('stroke-opacity', 0.1);
        node
          .style('opacity', '1')
          //.style('stroke-width', 2.5);

        label

          .style('opacity', '1')

        toggle = 0;
      }
    })
    .on("mouseover",mouseover)
    .call(drag(simulation))

    function mouseover() {
      d3.select(this).select("circle").transition()
          .duration(750)
          .attr("r", 16);
    }

  node
    .append('g')
    .append("circle")
    .attr("r", (d) => d.radius * 10.5)
    .attr("cx", 0)
    .attr("cx", 0)
    .attr("label", (d) => { return d.genres[0] })
    .attr("fill", (d) => { return genresColorMap[d.genres[0]] });


  const label = svg.append("g")
    .attr("class", "labels")
    .selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    .attr('fill', '#1DB954')
    .attr('font-size',18)
      //.attr('font-weight',6)
    .text(d => d.name)
    .call(drag(simulation))

  let toggleFilter = 0

  simulation.on("tick", () => {
    //update link positions
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    // update node positions
    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)

    // update label positions
    label
      .attr("x", d => { return d.x; })
      .attr("y", d => { return d.y; })
  });

  return {
    destroy: () => {
      simulation.stop();
    },
    nodes: () => {
      return svg.node();
    }
  };
}