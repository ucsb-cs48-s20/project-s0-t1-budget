import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

var bkColor, expColor;
export default class PieChartIncomeComponent extends Component {
  state = {};

  static getDerivedStateFromProps(props, state) {
    expColor = "#FF6384";
    bkColor = "rgba(0,255,0,0.7)";
    var IncomeData = props.data.slice(0, 2);
    var Expenses = IncomeData[0] - IncomeData[1];
    IncomeData[1] = Expenses;
    return {
      labels: ["Income", "Expenses"],
      datasets: [
        {
          data: IncomeData,
          backgroundColor: [bkColor, expColor],
          hoverBackgroundColor: [bkColor, expColor],
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <h2>Pie Chart of Income</h2>
        <Pie data={this.state} />
      </div>
    );
  }
}
