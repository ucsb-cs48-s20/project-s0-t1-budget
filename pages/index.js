import Layout from "../components/Layout";
import ChartComponent from "../components/ChartComponent";
import ChartFormComponent from "../components/ChartFormComponent";
import TableComponent from "../components/TableComponent";
import LineGraphComponent from "../components/LineGraphComponent";
import PieChartExpensesComponent from "../components/PieChartExpensesComponent";
import PieChartIncomeComponent from "../components/PieChartIncomeComponent";
import { optionalAuth } from "../utils/ssr";
import { Component } from "react";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { flexbox } from "@material-ui/system";
import Box from "@material-ui/core/Box";
import React from "react";

import { ArrowsFullscreen, X } from "react-bootstrap-icons";

import {
  Button,
  Col,
  Container,
  Row,
  Jumbotron,
  Card,
  CardDeck,
  DropdownButton,
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

const style = {
  zIndex: 1,
  color: "#fff",
  display: "flex",
};

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
    openBar: false,
    openPieInc: false,
    openPieExp: false,
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

  handleToggleBar = () => {
    this.setState({
      openBar: !this.state.openBar,
    });
  };

  handleTogglePieInc = () => {
    this.setState({
      openPieInc: !this.state.openPieInc,
    });
  };

  handleTogglePieExp = () => {
    this.setState({
      openPieExp: !this.state.openPieExp,
    });
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

  render() {
    return (
      <Layout user={this.props.user}>
        {this.props.user ? (
          <div>
            You're logged in! Here's what the server knows about you:
            <pre>{JSON.stringify(this.props.user, null, "\t")}</pre>
          </div>
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
                  <Button variant="secondary" onClick={this.handleResetUpdate}>
                    Reset
                  </Button>
                  <br />
                  <br />
                  <DropdownButton id="dropdown-item-button" title="Graphs">
                    <Dropdown.Item as="button" onClick={this.handleBar}>
                      Bar Graph
                    </Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.handlePieIncome}>
                      Income Pie Chart
                    </Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.handlePieExpense}>
                      Expenses Pie Chart
                    </Dropdown.Item>
                  </DropdownButton>
                  <br />
                  <div>
                    <Backdrop
                      style={style}
                      open={this.state.openBar}
                      onClick={this.handleToggleBar}
                    >
                      <Box width="75%">
                        <h2>Bar Graph</h2>
                        <ChartComponent
                          isActive={this.state.barActive}
                          labels={this.state.labels}
                          data={this.state.data}
                        />
                      </Box>
                    </Backdrop>
                  </div>
                  <div>
                    <Backdrop
                      style={style}
                      open={this.state.openPieInc}
                      onClick={this.handleTogglePieInc}
                    >
                      <Box width="75%">
                        <h2>Pie Chart of Income</h2>
                        <PieChartIncomeComponent
                          isActive={this.state.incomePieActive}
                          labels={this.state.labels}
                          data={this.state.data}
                        />
                      </Box>
                    </Backdrop>
                  </div>
                  <div>
                    <Backdrop
                      style={style}
                      open={this.state.openPieExp}
                      onClick={this.handleTogglePieExp}
                    >
                      <Box width="75%">
                        <h2>Pie Chart of Expense</h2>
                        <PieChartExpensesComponent
                          isActive={this.state.expensePieActive}
                          labels={this.state.labels}
                          data={this.state.data}
                        />
                      </Box>
                    </Backdrop>
                  </div>
                </Jumbotron>
              </Col>
              <Col md="7">
                <TableComponent
                  category={this.state.labels}
                  price={this.state.data}
                />
              </Col>
            </Row>
            <CardDeck>
              <Card style={this.state.barActive ? {} : { display: "none" }}>
                <Card.Header>
                  <h3>Bar Chart</h3>
                </Card.Header>
                <Card.Body>
                  <ChartComponent
                    isActive={this.state.barActive}
                    labels={this.state.labels}
                    data={this.state.data}
                  />
                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="primary"
                    style={{
                      height: 50,
                      width: 50,
                      margin: 5,
                      borderRadius: 25,
                      align: "center",
                    }}
                    onClick={this.handleToggleBar}
                  >
                    <ArrowsFullscreen size={25} />
                  </Button>
                  <Button
                    variant="danger"
                    style={{
                      height: 50,
                      width: 50,
                      margin: 5,
                      borderRadius: 25,
                      align: "center",
                    }}
                    onClick={this.handleBar}
                  >
                    <X size={25} />
                  </Button>
                </Card.Footer>
              </Card>
              <Card
                style={this.state.incomePieActive ? {} : { display: "none" }}
              >
                <Card.Header>
                  <h3>Pie Income Chart</h3>
                </Card.Header>
                <Card.Body>
                  <PieChartIncomeComponent
                    isActive={this.state.incomePieActive}
                    labels={this.state.labels}
                    data={this.state.data}
                  />
                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="primary"
                    style={{
                      height: 50,
                      width: 50,
                      margin: 5,
                      borderRadius: 25,
                      align: "center",
                    }}
                    onClick={this.handleTogglePieInc}
                  >
                    <ArrowsFullscreen size={25} />
                  </Button>
                  <Button
                    variant="danger"
                    style={{
                      height: 50,
                      width: 50,
                      margin: 5,
                      borderRadius: 25,
                      align: "center",
                    }}
                    onClick={this.handlePieIncome}
                  >
                    <X size={25} />
                  </Button>
                </Card.Footer>
              </Card>
              <Card
                style={this.state.expensePieActive ? {} : { display: "none" }}
              >
                <Card.Header>
                  <h3>Pie Chart of Expenses</h3>
                </Card.Header>
                <Card.Body>
                  <PieChartExpensesComponent
                    isActive={this.state.expensePieActive}
                    labels={this.state.labels}
                    data={this.state.data}
                  />
                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="primary"
                    style={{
                      height: 50,
                      width: 50,
                      margin: 5,
                      borderRadius: 25,
                      align: "center",
                    }}
                    onClick={this.handleTogglePieExp}
                  >
                    <ArrowsFullscreen size={25} />
                  </Button>
                  <Button
                    variant="danger"
                    style={{
                      height: 50,
                      width: 50,
                      margin: 5,
                      borderRadius: 25,
                      align: "center",
                    }}
                    onClick={this.handlePieExpense}
                  >
                    <X size={25} />
                  </Button>
                </Card.Footer>
              </Card>
            </CardDeck>
          </Container>
        )}
      </Layout>
    );
  }
}

export default HomePage;
