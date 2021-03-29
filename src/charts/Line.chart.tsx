import React, { useEffect } from "react";
import {
  timeParse,
  scaleTime,
  scaleLinear,
  line,
  csv,
  extent,
  max,
  select,
  axisBottom,
  axisLeft,
  axisRight,
} from "d3";
import "./Line.chart.css";

/**
 * @deprecated reading data from CSV file using function provided by d3js
 *             So format of Data is DSVRowArray<Columns>
 */
interface IData<T = Date> {
  close: string | number;
  open: string | number;
  date: T;
}

function LineChart() {
  const margin = { top: 20, right: 40, bottom: 60, left: 50 };
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;
  const parseTime: any = timeParse("%d-%b-%y");

  const x = scaleTime().range([0, width]);
  const y0 = scaleLinear().range([height, 0]); //close
  const y1 = scaleLinear().range([height, 0]); //open

  const line1: any = line()
    .x((d: any) => x(d.date))
    .y((d: any) => y0(d.close));
  const line2: any = line()
    .x((d: any) => x(d.date))
    .y((d: any) => y1(d.open));
  let svg;

  const createChart = (data: Array<IData<string | Date>>) => {
    // set the domains
    data.forEach((e) => {
      e.close = +e.close;
      e.open = +e.open;
      e.date = parseTime(e.date);
    });

    x.domain(extent(data, (d: IData) => d.date));
    y0.domain([0, max(data, (d: any) => d.close)] as any);
    y1.domain([0, max(data, (d: any) => d.open)] as any);

    svg = select(".line-chart-svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("path")
      .data([data])
      .attr("class", "line")
      .attr("id", "blueLine")
      .attr("d", line1);

    // add the valueline2 path.
    svg
      .append("path")
      .data([data])
      .attr("class", "line")
      .attr("id", "redLine")
      .style("stroke", "red")
      .attr("d", line2);

    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(axisBottom(x));

    svg.append("g").attr("class", "axisSteelBlue").call(axisLeft(y0));

    svg
      .append("g")
      .attr("class", "axisRed")
      .attr("transform", "translate( " + width + ", 0 )")
      .call(axisRight(y1));

    renderLegend(data);
  };

  const renderLegend = (data: any) => {
    const legends = [
      {
        color: "red",
        name: "open",
      },
      {
        color: "steelblue",
        name: "close",
      },
    ];
    const legendsElements = svg.selectAll(".legend").data(legends);
    legendsElements
      .enter()
      .append("g")
      .attr("class", "legend")
      .append("text")
      .text((d) => d.name)
      .attr(
        "transform",
        (d, i) => `translate(${width - 100} , ${(i + 1) * 30})`
      )
      .attr("fill", (d) => d.color);
  };

  useEffect(() => {
    const init = async () => {
      const data = await csv("/data/line-chart.csv");
      createChart(data as any);
    };
    init();
    return cleanUp;
  }, []);

  const cleanUp = () => {
    select(".line-chart-svg").selectChild("*").remove();
  };

  return (
    <div>
      <svg className="line-chart-svg"></svg>
    </div>
  );
}

export default LineChart;
