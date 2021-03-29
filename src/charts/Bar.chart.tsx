import React, { useEffect, useCallback } from "react";
import {
  select,
  csv,
  scaleLinear,
  max,
  scaleBand,
  axisBottom,
  axisLeft,
  selectAll,
} from "d3";
import "./Bar.chart.css";

function BarChart() {
  async function init() {
    const margins = {
      top: 20,
      right: 20,
      bottom: 70,
      left: 40,
    };
    const width = 800 - margins.left - margins.right;
    const height = 400 - margins.top - margins.bottom;

    const xScale = scaleBand().range([0, width]).padding(0.1);
    const yScale = scaleLinear().range([height, 0]);

    selectAll(".tooltip").remove();

    const toolTip = select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    const svgElement: any = select(".bar-chart")
      .attr("width", width + margins.left + margins.right)
      .attr("height", height + margins.top + margins.bottom);

    const svg: any = svgElement
      .append("g")
      .attr("transform", `translate(${margins.left},${margins.top})`);

    const data = await csv("/data/bar-chart.csv");
    data.forEach((d: any) => {
      d.sales = +d.sales;
    });

    xScale.domain(data.map((e: { salesperson: any }) => e.salesperson));
    yScale.domain([0, max(data, (d: any) => d.sales)]);

    const rects: any = svg.selectAll("rect").data(data);

    rects
      .enter()
      .append("rect")
      // .attr("class", "bar")
      .classed("bar", true)
      .merge(rects)
      .attr("x", (d: { salesperson: any }) => xScale(d.salesperson))
      .attr("width", xScale.bandwidth())
      .attr("y", (d: { sales: any }) => yScale(d.sales))
      .attr("height", (d: { sales: any }) => height - yScale(d.sales));

    rects.exit().remove();
    svg
      .selectAll(".bar")
      .on(
        "mouseover",
        function (
          event: { pageX: string; pageY: number },
          d: { salesperson: string; sales: string }
        ) {
          toolTip.transition().duration(200).style("opacity", 0.9);
          toolTip
            .html(d.salesperson + " : " + d.sales)
            .style("left", event.pageX + "px")
            .style("top", event.pageY - 28 + "px");
        }
      )
      .on("mouseout", () => {
        toolTip.style("opacity", 0);
      });

    const axis = select(".axis");
    axis.exit().remove();

    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${height})`)
      .call(axisBottom(xScale));

    svg.append("g").attr("class", "axis").call(axisLeft(yScale));
  }

  useEffect(() => {
    init();
    return () => {
      select(".bar-chart").selectChild("*").remove();
      selectAll(".tooltip").remove();
    };
  }, []);
  return (
    <div>
      <svg className="bar-chart"></svg>
    </div>
  );
}

export default BarChart;
