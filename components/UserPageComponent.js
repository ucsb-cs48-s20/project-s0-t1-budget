import React, { Component } from "react";
import ChartComponent from "../components/ChartComponent";
import PieChartExpensesComponent from "../components/PieChartExpensesComponent";
import PieChartIncomeComponent from "../components/PieChartIncomeComponent";
import TableComponent from "../components/TableComponent";
import UserPageFormComponent from "../components/UserPageFormComponent";
import {
  Spinner,
  Jumbotron,
  Form,
  Row,
  Col,
  Container,
  Button,
} from "react-bootstrap";
import LineGraphComponent from "./LineGraphComponent";

export default class UserPageComponent extends Component {
  constructor(props) {
    super(props);

    this.update = this.update.bind(this);
  }

  state = {
    dataLoaded: false,
    selectMonth: 1,
    selectYear: 2020,
  };

  componentDidMount() {
    this.loadData(this.state.selectMonth, this.state.selectYear);
  }

  update(month, year) {
    this.setState({
      dataLoaded: false,
      selectMonth: month,
      selectYear: year,
    });
    this.loadData(this.state.selectMonth, this.state.selectYear);
  }

  handleChange = (e) => {
    this.loadData(e.target.value, this.state.selectYear);
  };

  handleChange2 = (e) => {
    this.loadData(this.state.selectMonth, e.target.value);
  };

  deleteBudget = () => {
    var monthstr;
    if (this.state.data.month.toString().length == 1) {
      monthstr = "0" + this.state.data.month.toString();
    } else {
      monthstr = this.state.data.month.toString();
    }
    fetch(
      "/api/userbudgets/" +
        this.state.data.email +
        monthstr +
        this.state.data.year,
      { method: "DELETE" }
    ).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        this.update(this.state.selectMonth, this.state.selectYear);
      } else {
        Alert("Something Went Wrong Try Again");
      }
    });
  };

  loadData = (month, year) => {
    this.setState({
      dataLoaded: false,
      selectMonth: month,
      selectYear: year,
    });

    fetch("/api/userbudgets", { method: "GET" })
      .then((res) => res.json())
      .then(
        (result) => {
          var out;
          for (var i = 0; i < result.data.length; i++) {
            if (
              result.data[i].email == this.props.user.email &&
              result.data[i].month == month &&
              result.data[i].year == year
            ) {
              out = result.data[i];
            }
          }
          if (out) {
            this.setState({
              dataLoaded: true,
              dataFound: true,
              selectMonth: month,
              selectYear: year,
              data: out,
            });
          } else {
            this.setState({
              dataLoaded: true,
              dataFound: false,
              selectMonth: month,
              selectYear: year,
            });
          }
        },
        (error) => {
          this.setState({
            dataLoaded: false,
            selectMonth: month,
            selectYear: year,
            labels: ["Income", "Net Income"],
            data: [0, 0],
            error,
          });
        }
      );
  };

  render() {
    return (
      <Container>
        {this.state.dataLoaded ? (
          <div>
            {this.state.dataFound ? (
              <div>
                <br />
                <Form.Row>
                  <Form.Group as={Col} md="2" controlId="Month">
                    <Form.Control
                      as="select"
                      name="Month"
                      onChange={this.handleChange}
                      value={this.state.selectMonth}
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
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} md="2" controlId="Year">
                    <Form.Control
                      as="select"
                      name="Year"
                      onChange={this.handleChange2}
                      value={this.state.selectYear}
                    >
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

                <Button onClick={this.deleteBudget}>
                  Delete Month's Finances
                </Button>
                <br />
                <br />

                <TableComponent
                  category={this.state.data.labels}
                  price={this.state.data.data}
                />
                <ChartComponent
                  labels={this.state.data.labels}
                  data={this.state.data.data}
                />
                <PieChartIncomeComponent
                  labels={this.state.data.labels}
                  data={this.state.data.data}
                />
                <PieChartExpensesComponent
                  labels={this.state.data.labels}
                  data={this.state.data.data}
                />
                <LineGraphComponent
                  year={this.state.selectYear}
                  user={this.props.user}
                />
              </div>
            ) : (
              <div>
                <br />
                <Form.Row>
                  <Form.Group as={Col} md="2" controlId="Month">
                    <Form.Control
                      as="select"
                      name="Month"
                      onChange={this.handleChange}
                      value={this.state.selectMonth}
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
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} md="2" controlId="Year">
                    <Form.Control
                      as="select"
                      name="Year"
                      onChange={this.handleChange2}
                      value={this.state.selectYear}
                    >
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

                <h3>No Data for this month :(</h3>
                <br />
                <h4>Would you like to add some?</h4>
                <Jumbotron>
                  <UserPageFormComponent
                    user={this.props.user}
                    month={this.state.selectMonth}
                    year={this.state.selectYear}
                    update={this.update}
                  />
                </Jumbotron>
              </div>
            )}
          </div>
        ) : (
          <Spinner animation="border" variant="primary">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
      </Container>
    );
  }
}
