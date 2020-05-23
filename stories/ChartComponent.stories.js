import React from "react";
import ChartComponent from "../components/ChartComponent";
import { array } from "@storybook/addon-knobs";

export default {
  title: "Chart",
  component: ChartComponent,
};

export const SimpleChart = () => {
  const data = array("Data", [1, 2], ",");
  const labels = array("Labels", ["Income", "Net Income"], ",");
  return <ChartComponent data={data} labels={labels} />;
};
