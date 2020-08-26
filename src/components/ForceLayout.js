import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {createContextMenu} from "./utils";
// import  "./ForecLayout.css";
import styles from "./forceGraph.module.css";
import { style } from 'd3';
// import { style } from 'd3';
function ForceLayout({data, nodeHoverTooltip}){
    const ref = useRef();
    
    useEffect(() => {
        
    }, []);
    useEffect(()=>{
        draw();
    },[data]);
    const draw = ()=>{
        d3.selectAll('svg').remove();
        console.log("DRAW METHOD", data)
        const containerRect = ref.current.getBoundingClientRect();
        const height = containerRect.height;
        const width = containerRect.width;
        const links = data.links.map((d) => Object.assign({}, d));
        const nodes = data.nodes.map((d) => Object.assign({}, d));
        
        console.log("DRAW METHOD LINKS", links)
        console.log("DRAW METHOD NODES", nodes)
        const menuItems = [
            {
              title: 'First action',
              action: (d) => {
                // TODO: add any action you want to perform
                console.log(d);
              }
            },
            {
              title: 'Second action',
              action: (d) => {
                // TODO: add any action you want to perform
                console.log(d);
              }
            }
          ];
        

        console.log("height - ",height)

        const color = (d) => {
            switch(d.type){
                case 'product':
                    return "#00AE7D";
                case 'parameter':
                    return "#ED8A3F";
                case 'rule':
                    return "#2ab7ca";
                default:
                    return "#00C1D4";
            } 
            return "#00C1D4"; 
        };

        const icon = (d) => {
            switch (d.type){
                case 'product':
                    return "\uf187";
                case 'parameter':
                    return "\uf013";
                case 'rule':
                    return "\uf121";
                default:
                    return "\uf515";
            }
            
        }

        const getClass = (d) => {
            return d.type === "product" ? styles.product : styles.properties;
        };
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

          const tooltip = document.querySelector("#graph-tooltip");
          if (!tooltip) {
              const tooltipDiv = document.createElement("div");
              tooltipDiv.classList.add(styles.tooltip);
              tooltipDiv.style.opacity = "0";
              tooltipDiv.id = "graph-tooltip";
              document.body.appendChild(tooltipDiv);
          }
        const div = d3.select("#graph-tooltip");

        const addTooltip = (hoverTooltip, d, x, y) => {
            console.log("X",x);
            console.log("Y",y);
            div
            .transition()
            .duration(200)
            .style("opacity", 0.9);
            div
            .html(hoverTooltip(d))
            .style("left", `${x}px`)
            .style("top", `${y - 28}px`);
        };

        const removeTooltip = () => {
            div
            .transition()
            .duration(200)
            .style("opacity", 0);
        };

        const simulation = d3
            .forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id))
            .force("charge", d3.forceManyBody().strength(-150))
            .force("x", d3.forceX())
            .force("y", d3.forceY());
  
        const svg = d3
            .select(ref.current)
            .append("svg")
            .attr("id", "graphSvg")
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            // .call(d3.zoom().on("zoom", function () {
            //   svg.attr("transform", d3.event.transform);
            // }));

        const link = svg
            .append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value));

        const node = svg
            .append("g")
            .attr("stroke", "#cccccc")
            .attr("stroke-width", 2)
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .on('contextmenu', (d) => {
            createContextMenu(d, menuItems, width, height, '#graphSvg');
            })
            .attr("r", 15)
            .attr("fill", color)
            .call(drag(simulation));

        const label = svg.append("g")
            .attr("class", "labels")
            .selectAll("text")
            .data(nodes)
            .enter()
            .append("text")
            .on('contextmenu', (d) => {
            createContextMenu(d, menuItems, width, height, '#graphSvg');
            })
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'central')
            .attr("class", d => `fa ${getClass(d)}`)
            .text(d => {return icon(d);})
            .call(drag(simulation));

    label.on("mouseover", (d) => {
        console.log("pageX",d3.event.pageX);
        console.log("pageY",d3.event.pageY);
        addTooltip(nodeHoverTooltip, d, d3.event.pageX, d3.event.pageY);
    })
    .on("mouseout", () => {
      removeTooltip();
    });

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
      .attr("cy", d => d.y);

    // update label positions
    label
      .attr("x", d => { return d.x; })
      .attr("y", d => { return d.y; })
  });
}    // end of draw method
    return(
        <div className="chart">
            <div ref={ref} className={styles.container} >
            </div>
        </div>
    )
}
export default ForceLayout;