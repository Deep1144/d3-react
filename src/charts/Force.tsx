import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import "./Force.chart.css";

// https://bl.ocks.org/steveharoz/8c3e2524079a8c440df60c1ab72b5d03

function Force() {
  const width = 600;
  const height = 400;

  const nodes: any = [
    { name: "A", radius: Math.random() * 100 },
    { name: "B", radius: Math.random() * 100 },
    { name: "C", radius: Math.random() * 100 },
    { name: "D", radius: Math.random() * 100 },
    { name: "E", radius: Math.random() * 100 },
    { name: "F", radius: Math.random() * 100 },
    { name: "G", radius: Math.random() * 100 },
    { name: "H", radius: Math.random() * 100 },
  ];

  const links: any = [
    { source: 0, target: 1 },
    { source: 0, target: 2 },
    { source: 0, target: 3 },
    { source: 1, target: 6 },
    { source: 3, target: 4 },
    { source: 3, target: 7 },
    { source: 4, target: 5 },
    { source: 4, target: 7 },
  ];

  useEffect(() => {
    d3.forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("link", d3.forceLink().links(links))
      .force(
        "collision",
        d3.forceCollide().radius(function (d: any) {
          return d.radius;
        })
      )
      .on("tick", ticked);

    function updateLinks() {
      d3.select(".links")
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("x1", function (d: any) {
          // console.log(d);
          return d.source.x;
        })
        .attr("y1", function (d: any) {
          return d.source.y;
        })
        .attr("x2", function (d: any) {
          return d.target.x;
        })
        .attr("y2", function (d: any) {
          return d.target.y;
        });
    }

    function updateNodes() {
      d3.select(".nodes")
        .selectAll("text")
        .data(nodes)
        .join("text")
        .text(function (d: any) {
          return d.name;
        })
        .attr("x", function (d: any) {
          return d.x;
        })
        .attr("y", function (d: any) {
          return d.y;
        })
        .attr("dy", function (d: any) {
          return 5;
        });
    }

    function ticked() {
      updateLinks();
      updateNodes();
    }
  }, []);

  return (
    <div>
      <div className="mt-3">
        <svg width="600" height="400">
          <g className="links"></g>
          <g className="nodes"></g>
        </svg>
      </div>
    </div>
  );
}

export default Force;
