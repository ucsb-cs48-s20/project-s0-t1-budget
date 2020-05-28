import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { Card, Button } from "react-bootstrap";

var cbkColor = "rgba(238,130,238,0.2)";
var cboColor = "rgba(238,130,238,1)";
var chbkColor = "rgba(238,130,238,0.4)";
var chboColor = "rgba(238,130,238,1)";
var bkColor,
  boColor,
  hbkColor,
  hboColor,
  ibkColor,
  iboColor,
  ihbkColor,
  ihboColor;

export default class ChartComponent extends Component {
  state = {
    labels: ["Income", "Net Income"],
    datasets: [
      {
        label: "Amount ($)",
        backgroundColor: ["rgba(0,255,0,0.2)", "rgba(255,99,132,0.2)"],
        borderColor: ["rgba(0,255,0,1)", "rgba(255,99,132,1)"],
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [0, 0],
      },
    ],
  };

  static getDerivedStateFromProps(props, state) {
    ibkColor = "rgba(0,0,255,0.2)";
    iboColor = "rgba(0,0,255,1)";
    ihbkColor = "rgba(0,0,255,0.4)";
    ihboColor = "rgba(0,0,255,1)";
    if (props.data[1] > 0) {
      bkColor = "rgba(0,255,0,0.2)";
      boColor = "rgba(0,255,0,1)";
      hbkColor = "rgba(0,255,0,0.4)";
      hboColor = "rgba(0,255,0,1)";
    } else {
      bkColor = "rgba(255,99,132,0.2)";
      boColor = "rgba(255,99,132,1)";
      hbkColor = "rgba(255,99,132,0.4)";
      hboColor = "rgba(255,99,132,0,1)";
    }
    return {
      labels: props.labels,
      datasets: [
        {
          label: "Amount ($)",
          backgroundColor: [
            ibkColor,
            bkColor,
            cbkColor,
            cbkColor,
            cbkColor,
            cbkColor,
            cbkColor,
          ],
          borderColor: [
            iboColor,
            boColor,
            cboColor,
            cboColor,
            cboColor,
            cboColor,
            cboColor,
          ],
          borderWidth: 1,
          hoverBackgroundColor: [
            ihbkColor,
            hbkColor,
            chbkColor,
            chbkColor,
            chbkColor,
            chbkColor,
          ],
          hoverBorderColor: [
            ihboColor,
            hboColor,
            chboColor,
            chboColor,
            chboColor,
            chboColor,
          ],
          data: props.data,
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <Bar
          id="bar-graph"
          data={this.state}
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
