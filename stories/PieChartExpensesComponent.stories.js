import React from "react";
import PieChartExpensesComponent from "../components/PieChartExpensesComponent";
import { array } from "@storybook/addon-knobs";

export default {
  title: "Pie Chart Expenses",
  component: PieChartExpensesComponent,
};

export const SimplePieChartExpenses = () => {
  const labelsArr = ["Income", "Net Income"];
  const dataArr = [400, 500];
  const dataEnter = array("Data", [400, 300], ",");
  const labelsEnter = array("Labels", ["Shopping", "Other"], ",");
  const data = dataArr.concat(dataEnter);
  const labels = labelsArr.concat(labelsEnter);
  return <PieChartExpensesComponent data={data} labels={labels} />;
};
