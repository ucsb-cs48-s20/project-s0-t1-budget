import React, { Component } from "react";
import { Radar } from "react-chartjs-2";

var expColor = "#d60a0a";
export default class RadarChartComponent extends Component {
  state = {};

  static getDerivedStateFromProps(props, state) {
    var categories = props.labels.slice(2);
    var posData = props.data.slice(2);
    for (var i = 0; i < posData.length; i++) {
      posData[i] = posData[i] * -1;
    }
    return {
      labels: categories,
      datasets: [
        {
          label: "Expenses",
          backgroundColor: "rgba(255,99,132,0.5)",
          borderColor: expColor,
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255,99,132,1)",
          data: posData,
        },
      ],
    };
  }
  render() {
    return (
      <div>
        <Radar data={this.state} />
      </div>
    );
  }
}
