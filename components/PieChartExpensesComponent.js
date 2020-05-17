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
    isActive: true,
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
      isActive: props.isActive,
    };
  }

  render() {
    if (this.state.isActive) {
      return (
        <Card body>
          <div>
            <h2>Pie Chart of Expenses</h2>
            <Pie data={this.state} />
          </div>
        </Card>
      );
    } else {
      return <div></div>;
    }
  }
}
