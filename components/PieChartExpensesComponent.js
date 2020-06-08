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
              draw("dash", "#5463b0"),
              draw("plus", "#54b0aa"),
              draw("dot", "#27ddd1"),
              draw("zigzag", "#9add27"),
              draw("diamond", "#a48060"),
              draw("square", "#000000"),
              draw("weave", "#3d3d3d"),
              draw("line-vertical", "#e797db"),
              draw("diamond-box", "#db340a"),
              draw("ring", "#a16608"),
              draw("diagonal-right-left", "#1bb2c5"),
              draw("zigzag-vertical", "#b87bc1"),
              draw("triangle-inverted", "#58e4aa"),
            ],
            hoverBackgroundColor: [
              draw("cross", "#c93fde"),
              draw("circle", "#1e52f1"),
              draw("line", "#489c07"),
              draw("box", "#e5c10b"),
              draw("triangle", "#ed8421"),
              draw("diagonal", "#d60a0a"),
              draw("dash", "#5463b0"),
              draw("plus", "#54b0aa"),
              draw("dot", "#27ddd1"),
              draw("zigzag", "#9add27"),
              draw("diamond", "#a48060"),
              draw("square", "#000000"),
              draw("weave", "#3d3d3d"),
              draw("line-vertical", "#e797db"),
              draw("diamond-box", "#db340a"),
              draw("ring", "#a16608"),
              draw("diagonal-right-left", "#1bb2c5"),
              draw("zigzag-vertical", "#b87bc1"),
              draw("triangle-inverted", "#58e4aa"),
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
              "#5463b0",
              "#54b0aa",
              "#27ddd1",
              "#9add27",
              "#a48060",
              "#000000",
              "#3d3d3d",
              "#3d3d3d",
              "#e797db",
              "#db340a",
              "#a16608",
              "#1bb2c5",
              "#b87bc1",
              "#58e4aa",
            ],
            hoverBackgroundColor: [
              "#c93fde",
              "#1e52f1",
              "#489c07",
              "#e5c10b",
              "#ed8421",
              "#d60a0a",
              "#5463b0",
              "#54b0aa",
              "#27ddd1",
              "#9add27",
              "#a48060",
              "#000000",
              "#3d3d3d",
              "#3d3d3d",
              "#e797db",
              "#db340a",
              "#a16608",
              "#1bb2c5",
              "#b87bc1",
              "#58e4aa",
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
