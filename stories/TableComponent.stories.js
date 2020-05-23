import React from "react";
import TableComponent from "../components/TableComponent";
import { array } from "@storybook/addon-knobs";

export default {
  title: "Table",
  component: TableComponent,
};

export const SimpleTable = () => {
  const data = array("Data", [300, 200], ",");
  const labels = array("Labels", ["Income", "Transportation"], ",");
  return <TableComponent price={data} category={labels} />;
};
