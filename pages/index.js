import Layout from "../components/Layout";
import ChartComponent from "../components/ChartComponent";
import ChartFormComponent from "../components/ChartFormComponent";
import TableComponent from "../components/TableComponent";
import LineGraphComponent from "../components/LineGraphComponent";
import PieChartExpensesComponent from "../components/PieChartExpensesComponent";
import PieChartIncomeComponent from "../components/PieChartIncomeComponent";
import ChartCardComponent from "../components/ChartCardComponent";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { flexbox } from "@material-ui/system";
import Box from "@material-ui/core/Box";
import React from "react";

import Form from "react-bootstrap/Form";
import { ArrowsFullscreen, X } from "react-bootstrap-icons";

import UserPageComponent from "../components/UserPageComponent";
import { optionalAuth } from "../utils/ssr";
import { Component } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Jumbotron,
  Card,
  CardColumns,
  DropdownButton,
  ButtonGroup,
  ButtonToolbar,
  Dropdown,
} from "react-bootstrap";

import fetch from "isomorphic-unfetch";

//tb-integrating user mongoDB field to show up
/* Work in Progress
const budgets = ({data}) => { }
>>>>>>> 35a1c3cfb2dc7ac075818fc383ca440e056b412e

budgets.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/userbudgets/index')
  const json = await res.json()
  return {data: json}
}
*/

export const getServerSideProps = optionalAuth;

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    labels: ["Income", "Net Income"],
    data: [0, 0],
    barActive: true,
    incomePieActive: true,
    expensePieActive: true,
    colorMode: false,
  };

  handleFormUpdate = (income, category, value) => {
    const arr = [...this.state.data];
    arr.splice(0, 1, parseInt(income));
    if (this.state.labels.includes(category)) {
      const index = this.state.labels.indexOf(category);
      var expense = -parseInt(value);
      arr.splice(index, 1, expense);
      this.setState({
        labels: this.state.labels,
        data: arr,
      });
    } else {
      var intValue = -parseInt(value);
      arr.push(intValue);
      this.setState({
        labels: this.state.labels.concat(category),
        data: arr,
      });
    }
    var totalExpenses = (arr.reduce((a, b) => a + b, 0) - arr[0] - arr[1]) * -1;
    var netIncome = arr[0] - totalExpenses;
    arr.splice(1, 1, parseInt(netIncome));
  };

  handleResetUpdate = () => {
    this.setState({
      labels: ["Income", "Net Income"],
      data: [0, 0],
      barActive: true,
      incomePieActive: true,
      expensePieActive: true,
    });
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

  handleSwitchChange = () => {
    this.setState({
      colorMode: !this.state.colorMode,
    });
  };

  render() {
    return (
      <Layout user={this.props.user}>
        {this.props.user ? (
          <UserPageComponent user={this.props.user} />
        ) : (
          <Container>
            <br />
            <Row>
              <Col md="5">
                <Jumbotron>
                  <ChartFormComponent
                    handleFormUpdate={this.handleFormUpdate.bind(this)}
                  />
                  <br />
                  <ButtonToolbar>
                    <ButtonGroup className="mr-2">
                      <Button
                        variant="secondary"
                        onClick={this.handleResetUpdate}
                      >
                        Reset
                      </Button>
                    </ButtonGroup>

                    <ButtonGroup className="mr-2">
                      <DropdownButton id="dropdown-item-button" title="Graphs">
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
                  <br />
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Colorblind Mode"
                    onChange={this.handleSwitchChange}
                  />
                </Jumbotron>
              </Col>
              <Col md="7">
                <TableComponent
                  category={this.state.labels}
                  price={this.state.data}
                />
              </Col>
            </Row>

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
                  labels={this.state.labels}
                  data={this.state.data}
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
                  labels={this.state.labels}
                  data={this.state.data}
                  color={this.state.colorMode}
                  Component={"IncomePie"}
                />
              </Card>
              <Card
                style={
                  this.state.expensePieActive
                    ? { border: "none" }
                    : { display: "none" }
                }
              >
                <ChartCardComponent
                  handlePieExpense={this.handlePieExpense}
                  labels={this.state.labels}
                  data={this.state.data}
                  color={this.state.colorMode}
                  Component={"ExpensePie"}
                />
              </Card>
            </CardColumns>
          </Container>
        )}
      </Layout>
    );
  }
}

export default HomePage;
