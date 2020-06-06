import React, { Component } from "react";
import ChartComponent from "../components/ChartComponent";
import PieChartExpensesComponent from "../components/PieChartExpensesComponent";
import PieChartIncomeComponent from "../components/PieChartIncomeComponent";
import TableComponent from "../components/TableComponent";
import UserPageFormComponent from "../components/UserPageFormComponent";

import ChartCardComponent from "../components/ChartCardComponent";

import UserPageUpdateComponent from "../components/UserPageUpdateComponent";

import {
  Spinner,
  Jumbotron,
  Form,
  Row,
  Col,
  Card,
  Container,
  DropdownButton,
  Dropdown,
  CardColumns,
  ButtonToolbar,
  ButtonGroup,
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
    dataModify: false,
    selectMonth: 1,
    selectYear: 2020,
    barActive: true,
    incomePieActive: true,
    expensePieActive: true,
    codeMode: false,
  };

  componentDidMount() {
    this.loadData(this.state.selectMonth, this.state.selectYear);
  }

  update(month, year) {
    this.setState({
      dataLoaded: false,
      dataModify: false,
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

  handleBar = () => {
    if (this.state.barActive) {
      this.setState({
        barActive: false,
      });
    } else {
      this.setState({
        barActive: true,
      });
    }
  };

  handlePieIncome = () => {
    if (this.state.incomePieActive) {
      this.setState({
        incomePieActive: false,
      });
    } else {
      this.setState({
        incomePieActive: true,
      });
    }
  };

  handlePieExpense = () => {
    if (this.state.expensePieActive) {
      this.setState({
        expensePieActive: false,
      });
    } else {
      this.setState({
        expensePieActive: true,
      });
    }
  };

  modifyBudget = () => {
    this.setState((prevState) => ({
      dataModify: true,
    }));
  };

  cancelModifyBudget = () => {
    this.setState((prevState) => ({
      dataModify: false,
      colorMode: !this.state.colorMode,
    }));
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
        console.log("Something Went Wrong Try Again");
      }
    });
  };

  loadData = (month, year) => {
    this.setState({
      dataLoaded: false,
      dataModify: false,
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
              dataModify: false,
              dataFound: true,
              selectMonth: month,
              selectYear: year,
              data: out,
            });
          } else {
            this.setState({
              dataLoaded: true,
              dataModify: false,
              dataFound: false,
              selectMonth: month,
              selectYear: year,
            });
          }
        },
        (error) => {
          this.setState({
            dataLoaded: false,
            dataModify: false,
            selectMonth: month,
            selectYear: year,
            labels: ["Income", "Net Income"],
            data: [0, 0],
            error,
          });
        }
      );
  };

  handleSwitchChange = () => {
    this.setState({
      colorMode: !this.state.colorMode,
    });
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
                {this.state.dataModify ? (
                  <div>
                    <Row>
                      <Col md="6">
                        <Jumbotron>
                          <UserPageUpdateComponent
                            user={this.props.user}
                            month={this.state.selectMonth}
                            year={this.state.selectYear}
                            update={this.update}
                            currData={this.state.data}
                          />
                          <br />
                          <Button onClick={this.cancelModifyBudget}>
                            Cancel
                          </Button>
                        </Jumbotron>
                      </Col>
                      <Col md="6">
                        <TableComponent
                          category={this.state.data.labels}
                          price={this.state.data.data}
                        />
                      </Col>
                    </Row>
                  </div>
                ) : (
                  <div>
                    <ButtonToolbar>
                      <ButtonGroup className="mr-2">
                        <Button onClick={this.modifyBudget}>
                          Modify Month's Finances
                        </Button>
                      </ButtonGroup>
                      <ButtonGroup className="mr-2">
                        <DropdownButton
                          id="dropdown-item-button"
                          title="Graphs"
                        >
                          <Dropdown.Item as="button" onClick={this.handleBar}>
                            Bar Graph
                          </Dropdown.Item>
                          <Dropdown.Item
                            as="button"
                            onClick={this.handlePieIncome}
                          >
                            Income Pie Chart
                          </Dropdown.Item>
                          <Dropdown.Item
                            as="button"
                            onClick={this.handlePieExpense}
                          >
                            Expenses Pie Chart
                          </Dropdown.Item>
                        </DropdownButton>
                      </ButtonGroup>
                    </ButtonToolbar>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="Colorblind Mode"
                      onChange={this.handleSwitchChange}
                    />

                    <br />
                    <TableComponent
                      category={this.state.data.labels}
                      price={this.state.data.data}
                    />
                  </div>
                )}

                <CardColumns>
                  <Card
                    border="none"
                    style={
                      this.state.barActive
                        ? { border: "none" }
                        : { display: "none" }
                    }
                  >
                    <ChartCardComponent
                      handleBar={this.handleBar}
                      labels={this.state.data.labels}
                      data={this.state.data.data}
                      Component={"BarChart"}
                    />
                  </Card>

                  <Card
                    border="none"
                    style={
                      this.state.incomePieActive
                        ? { border: "none" }
                        : { display: "none" }
                    }
                  >
                    <ChartCardComponent
                      handlePieIncome={this.handlePieIncome}
                      labels={this.state.data.labels}
                      data={this.state.data.data}
                      color={this.state.colorMode}
                      Component={"IncomePie"}
                    />
                  </Card>

                  <Card
                    border="none"
                    style={
                      this.state.expensePieActive
                        ? { border: "none" }
                        : { display: "none" }
                    }
                  >
                    <ChartCardComponent
                      handlePieExpense={this.handlePieExpense}
                      labels={this.state.data.labels}
                      data={this.state.data.data}
                      color={this.state.colorMode}
                      Component={"ExpensePie"}
                    />
                  </Card>
                </CardColumns>
              </div>
            ) : (
              <div>
                <br />
                <Form.Row>
                  <Form.Group as={Col} md="2" controlId="Month2">
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
                  <Form.Group as={Col} md="2" controlId="Year2">
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
            <LineGraphComponent
              year={this.state.selectYear}
              user={this.props.user}
            />
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
