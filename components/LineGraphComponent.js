import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { Form, Col, Button } from "react-bootstrap";
import LineGraphFormComponent from "../components/LineGraphFormComponent";

export default class LineGraphComponent extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    selectedYear: "",
  };

  handleChange = (e) => {
    this.loadData(e.target.value);
  };

  loadData = (selectYear) => {
    this.setState({
      selectedYear: selectYear,
    });
    fetch("/api/userbudgets/user/" + this.props.user.email, { method: "GET" })
      .then((res) => res.json())
      .then(
        (result) => {
          var selectedData = []; //this array will contain all the objects from he database based off the selected year, this array will not be altered any other way.
          for (var i = 0; i < result.data.length; i++) {
            //iterating through database to push objects of selectedYear into selectedData array
            if (result.data[i].year == this.state.selectedYear) {
              selectedData.push(result.data[i]);
            }
          }
          var incomeDataSet = [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ]; //created array of 12 nulls each index indicates a date, 0 being Jan, 11 being Dec
          for (var j = 0; j < selectedData.length; j++) {
            incomeDataSet[parseInt(selectedData[j].month) - 1] = parseInt(
              selectedData[j].data[0]
            ); //iterates through selectedData and replaces incomeDataSet with income value based off of month
          }
          //income is selectedData[j].data[0]
          //net income is selectedData[j].data[1]
          //expenses are the rest of the array of selectedData[j].data
          this.setState({
            incomeData: incomeDataSet, //creates a state label of incomeData that stores the new array containing the income data
          });
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  };

  render() {
    const data = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Net Income",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(0,255,0,0.2)",
          borderColor: "rgba(0,255,0,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(0,255,0,0.2)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(0,255,0,0.2)",
          pointHoverBorderColor: "rgba(0,255,0,0.2)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40], //this is sample data for Net Income for now, replace with new array containing the data from database
        },
        {
          label: "Income",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(0,0,255,0.2)",
          borderColor: "rgba(0,0,255,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(0,0,255,0.2)",
          pointHoverBorderColor: "rgba(0,0,255,0.2)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.incomeData, //replaces the data of income with the new dataset of income from the state
        },
        {
          label: "Expenses",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(238,130,238,0.2)",
          borderColor: "rgba(238,130,238,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(238,130,238,0.2)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(238,130,238,0.2)",
          pointHoverBorderColor: "rgba(238,130,238,0.2)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [20, 20, 30, 60, 40, 55, 10], //this is sample data for Expenses for now, replace with new array containing the data from database
        },
      ],
    };
    return (
      <div>
        <h4>This is a LineGraphComponent</h4>
        <div>
          <h4>Year</h4>
          <Form.Row>
            <Form.Group as={Col} md="2" controlId="Year">
              <Form.Control
                as="select"
                name="Year"
                onChange={this.handleChange}
                value={this.state.selectedYear}
              >
                <option value=""></option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
        </div>
        <Line data={data} />
      </div>
    );
  }
}
