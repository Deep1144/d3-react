import React from "react";
import BarChart from "./charts/Bar.chart";
import LineChart from "./charts/Line.chart";

interface IRoute {
  name: string;
  route: string;
  component: () => JSX.Element;
}

export const Routes: IRoute[] = [
  {
    name: "Bar Chart",
    route: "bar-chart",
    component: BarChart,
  },
  {
    name: "Line Chart",
    route: "line-chart",
    component: LineChart,
  },
];
