import React from "react";
import PieChartIncomeComponent from "../components/PieChartIncomeComponent";
import { array } from "@storybook/addon-knobs";

export default {
  title: "Pie Chart Income",
  component: PieChartIncomeComponent,
};

export const SimplePieChartIncome = () => {
  const data = array("Data", [1, 2], ",");
  const labels = ["Income", "Net Income"];
  return <PieChartIncomeComponent data={data} labels={labels} />;
};
