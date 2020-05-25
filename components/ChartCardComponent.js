import React, { Component } from "react";
//import ChartComponent from "../components/ChartComponent";

export default class ChartCardComponent extends Component {
  state = {
    labels: ["Income", "Net Income"],
    data: [0, 0],
    isActive: true,
  };

  static getDerivedStateFromProps(props, state) {
    return {
      labels: props.labels,
      data: props.data,
      isActive: props.isActive,
    };
  }

  render() {
    return (
      <div>
        <h4>This is a ChartCard</h4>
        <h1>{this.props.labels}</h1>
      </div>
    );
  }
}
