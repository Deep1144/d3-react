import React from "react";
import BarChart from "./charts/Bar.chart";
import LineChart from "./charts/Line.chart";
import DynamicLine from "./charts/Dynamic-Line";
import Force from "./charts/Force";
import Joins from "./charts/Joins";
import Updatejoins from "./charts/Updatejoins";

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
  {
    name: "Force Chart",
    route: "force",
    component: Force,
  },
  {
    name: "Joins",
    route: "joins",
    component: Joins,
  },
  {
    name: "Update Joins",
    route: "update-joins",
    component: Updatejoins,
  },
];
