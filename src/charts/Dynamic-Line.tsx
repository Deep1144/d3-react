import React, { useEffect, useState } from "react";
import * as d3 from "d3";

function DynamicLine() {
  const allGroup = ["valueA", "valueB", "valueC"];
  const [group, setGroup] = useState(allGroup[0]);
  const margins = {
    top: 20,
    right: 20,
    bottom: 70,
    left: 40,
  };
  const width = 800 - margins.left - margins.right;
  const height = 400 - margins.top - margins.bottom;

  const x = d3.scaleLinear().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);
  const color = d3.scaleOrdinal().domain(allGroup).range(d3.schemeAccent);
  const [svg, setSvg] = useState(null);
  const [xAxis, setXAxis] = useState(null);
  const [yAxis, setYAxis] = useState(null);
  const [pathG, setPathG] = useState(null);

  function init() {
    d3.csv("/data/dynamic-line.csv").then((rawData) => {
      const data = rawData.map((e) => {
        return {
          time: +e.time,
          value: +e[group],
        };
      });

      x.domain([0, d3.max(data, (d) => +d.time)]).nice();
      y.domain([0, d3.max(data, (d) => d.value + 1)]).nice();

      xAxis.call(d3.axisBottom(x));
      yAxis.call(d3.axisLeft(y));

      const updateData = pathG.selectAll("path").data([data]);
      updateData.exit().remove();
      const line = updateData
        .enter()
        .append("path")
        .merge(updateData)
        .attr(
          "d",
          d3
            .line()
            .x((d: any) => {
              return x(d.time);
            })
            .y((d: any) => {
              return y(d.value);
            })
        )
        .attr("stroke", function (d) {
          return color(group);
        })
        .style("stroke-width", 4)
        .style("fill", "none");
    });
  }

  const onDropDownSelect = (event) => {
    setGroup(event.target.value);
  };

  useEffect(() => {
    const svg = d3
      .select(".dynamic-line")
      .attr("height", height + margins.top + margins.bottom)
      .attr("width", width + margins.left + margins.right)
      .append("g")
      .attr("transform", `translate(${(margins.left, margins.top)})`);
    setSvg(svg);
    const g = svg.append("g");
    const xAxis = svg.append("g").attr("transform", `translate(0 , ${height})`);
    const yAxis = svg.append("g");
    setXAxis(xAxis);
    setYAxis(yAxis);
    setPathG(g);
  }, []);

  useEffect(() => {
    if (svg) {
      init();
    }
  }, [svg, group]);

  return (
    <div>
      <select id="selectButton" value={group} onChange={onDropDownSelect}>
        {allGroup.map((e) => {
          return (
            <option key={e} value={e}>
              {e}
            </option>
          );
        })}
      </select>
      <div className="mt-3">
        <svg className="dynamic-line"></svg>
      </div>
    </div>
  );
}

export default DynamicLine;
