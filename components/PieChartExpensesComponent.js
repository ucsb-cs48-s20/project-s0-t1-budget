import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import { draw } from "patternomaly";

export default class PieChartExpensesComponent extends Component {
  state = {};
  static getDerivedStateFromProps(props, state) {
    var categories = props.labels.slice(2);
    var posData = props.data.slice(2);
    for (var i = 0; i < posData.length; i++) {
      posData[i] = posData[i] * -1;
    }
    if (props.color == true) {
      return {
        labels: categories,
        datasets: [
          {
            data: posData,
            backgroundColor: [
              draw("cross", "#c93fde"),
              draw("circle", "#1e52f1"),
              draw("line", "#489c07"),
              draw("box", "#e5c10b"),
              draw("triangle", "#ed8421"),
              draw("diagonal", "#d60a0a"),
            ],
            hoverBackgroundColor: [
              draw("cross", "#c93fde"),
              draw("circle", "#1e52f1"),
              draw("line", "#489c07"),
              draw("box", "#e5c10b"),
              draw("triangle", "#ed8421"),
              draw("diagonal", "#d60a0a"),
            ],
          },
        ],
      };
    } else {
      return {
        labels: categories,
        datasets: [
          {
            data: posData,
            backgroundColor: [
              "#c93fde",
              "#1e52f1",
              "#489c07",
              "#e5c10b",
              "#ed8421",
              "#d60a0a",
            ],
            hoverBackgroundColor: [
              "#c93fde",
              "#1e52f1",
              "#489c07",
              "#e5c10b",
              "#ed8421",
              "#d60a0a",
            ],
          },
        ],
      };
    }
  }

  render() {
    return (
      <div>
        <Pie id="pie-chart-expenses" data={this.state} />
      </div>
    );
  }
}
