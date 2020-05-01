import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

export default class ChartComponent extends Component {
  constructor(props) {
    super(props);
    this.chartReference = React.createRef();
  }

  componentDidMount() {
    console.log(this.chartReference);
  }

  // componentWillMount() {
  //  setInterval(() => {
  //    this.setState(getState());
  //  }, 500);
  // }

  render() {
    return (
      <div>
        <Bar
          ref={this.chartReference}
          data={this.props.graph}
          width={100}
          height={50}
          options={
            ({ maintainAspectRatio: true },
            { responsive: true },
            {
              title: {
                display: true,
                text: "Front Page Graph",
              },
            })
          }
        />
      </div>
    );
  }
}
