import React, { Component } from "react";
import ChartComponent from "../components/ChartComponent";
import PieChartExpensesComponent from "../components/PieChartExpensesComponent";
import PieChartIncomeComponent from "../components/PieChartIncomeComponent";
import TableComponent from "../components/TableComponent";
import { Spinner } from "react-bootstrap";

export default class UserPageComponent extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    dataLoaded: false,
  };

  componentDidMount() {
    this.loadData(1);
  }

  handleChange = (e) => {
    this.loadData(e.target.value);
  };

  loadData = (val) => {
    this.setState({
      dataLoaded: false,
    });

    fetch("http://localhost:3000/api/userbudgets")
      .then((res) => res.json())
      .then(
        (result) => {
          var out;
          for (var i = 0; i < result.data.length; i++) {
            if (
              result.data[i].email == this.props.user.email &&
              result.data[i].month == val
            ) {
              out = result.data[i];
            }
          }
          if (out) {
            this.setState({
              dataLoaded: true,
              dataFound: true,
              selectValue: val,
              labels: out.labels,
              data: out.data,
            });
          } else {
            this.setState({
              dataLoaded: true,
              dataFound: false,
              selectValue: val,
            });
          }
        },
        (error) => {
          this.setState({
            dataLoaded: false,
            selectValue: val,
            labels: ["Income", "Net Income"],
            data: [0, 0],
            error,
          });
        }
      );
  };

  render() {
    return (
      <div>
        {this.state.dataLoaded ? (
          <div>
            {this.state.dataFound ? (
              <div>
                <select
                  value={this.state.selectValue}
                  onChange={this.handleChange}
                >
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <TableComponent
                  category={this.state.labels}
                  price={this.state.data}
                />
                <ChartComponent
                  labels={this.state.labels}
                  data={this.state.data}
                />
                <PieChartIncomeComponent
                  labels={this.state.labels}
                  data={this.state.data}
                />
                <PieChartExpensesComponent
                  labels={this.state.labels}
                  data={this.state.data}
                />
              </div>
            ) : (
              <div>
                <select
                  value={this.state.selectValue}
                  onChange={this.handleChange}
                >
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <h3>No Data for this month</h3>
              </div>
            )}
          </div>
        ) : (
          <Spinner animation="border" variant="primary">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
      </div>
    );
  }
}
