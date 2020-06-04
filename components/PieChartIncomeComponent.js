import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import { draw } from "patternomaly";

var expColor = "#d60a0a";
var incColor = "#489c07";
export default class PieChartIncomeComponent extends Component {
  state = {};
  static getDerivedStateFromProps(props, state) {
    var IncomeData = props.data.slice(0, 2);
    var Expenses = IncomeData[0] - IncomeData[1];
    IncomeData[1] = Expenses;
    if (props.color == true) {
      return {
        labels: ["Income", "Expenses"],
        datasets: [
          {
            data: IncomeData,
            backgroundColor: [
              draw("cross", incColor),
              draw("circle", expColor),
            ],
            hoverBackgroundColor: [incColor, expColor],
          },
        ],
      };
    } else {
      return {
        labels: ["Income", "Expenses"],
        datasets: [
          {
            data: IncomeData,
            backgroundColor: [incColor, expColor],
            hoverBackgroundColor: [incColor, expColor],
          },
        ],
      };
    }
  }

  render() {
    return (
      <div>
        <Pie id="pie-chart-income" data={this.state} />
      </div>
    );
  }
}
