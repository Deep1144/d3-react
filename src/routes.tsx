import React from "react";
import BarChart from "./charts/Bar.chart";
import LineChart from "./charts/Line.chart";
import DynamicLine from "./charts/Dynamic-Line";

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
  {
    name: "Dynmic Line",
    route: "dynamic-line",
    component: DynamicLine,
  },
];
