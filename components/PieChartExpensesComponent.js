import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import { Card } from "react-bootstrap";

export default class PieChartExpensesComponent extends Component {
  state = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  static getDerivedStateFromProps(props, state) {
    return {
      labels: props.labels.slice(2),
      datasets: [
        {
          data: props.data.slice(2),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <Pie id="pie-chart-expenses" data={this.state} />
      </div>
    );
  }
}
