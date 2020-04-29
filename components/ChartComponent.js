import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

export default class ChartComponent extends Component {
  render() {
    return (
      <div>
        <h2>Bar Graph</h2>
        <Bar
          data={this.props.graph}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: true,
          }}
        />
      </div>
    );
  }
}
