import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import { Card } from "react-bootstrap";

var bkColor, hbkColor;
export default class PieChartIncomeComponent extends Component {
  state = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
    isActive: true,
  };

  static getDerivedStateFromProps(props, state) {
    var expColor = "#FF6384";
    if (props.data[1] > 0) {
      bkColor = "rgba(0,255,0,0.7)";
    } else {
      bkColor = "rgba(255,99,132,0.7)";
    }
    var IncomeData = props.data.slice(0, 2);
    var Expenses = IncomeData[0] - IncomeData[1];
    IncomeData[0] = Expenses;
    return {
      labels: ["Expenses", "Net Income"],
      datasets: [
        {
          data: IncomeData,
          backgroundColor: [expColor, bkColor],
          hoverBackgroundColor: [expColor, bkColor],
        },
      ],
      isActive: props.isActive,
    };
  }

  render() {
    return (
      <div>
        <Pie data={this.state} />
      </div>
    );
  }
}
