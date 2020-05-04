import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

export default class ChartComponent extends Component {
  render() {
    const { chartData } = this.props;
    return (
      <div>
        <h2>Bar Graph</h2>
        <Bar
          data={chartData}
          width={100}
          height={50}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      </div>
    );
  }
}
