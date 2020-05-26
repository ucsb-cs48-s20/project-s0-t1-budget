import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

export default class LineGraphComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch("/api/userbudgets/user/" + this.props.user.email, { method: "GET" })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            budget: result,
          });
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  }

  render() {
    return (
      <div>
        <h4>This is a LineGraphComponent</h4>
        <p>State data is:</p>
        <p>{JSON.stringify(this.state)}</p>
      </div>
    );
  }
}
