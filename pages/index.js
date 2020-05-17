import Layout from "../components/Layout";
import ChartComponent from "../components/ChartComponent";
import ChartFormComponent from "../components/ChartFormComponent";
import TableComponent from "../components/TableComponent";
import LineGraphComponent from "../components/LineGraphComponent";
import PieChartExpensesComponent from "../components/PieChartExpensesComponent";
import PieChartIncomeComponent from "../components/PieChartIncomeComponent";

import { optionalAuth } from "../utils/ssr";
import { Component } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Jumbotron,
  Card,
  CardGroup,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

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
                </Jumbotron>
              </Col>
              <Col md="7">
                <TableComponent
                  category={this.state.labels}
                  price={this.state.data}
                />
              </Col>
            </Row>
            <CardGroup>
              <ChartComponent
                isActive={this.state.barActive}
                labels={this.state.labels}
                data={this.state.data}
              />
              <PieChartIncomeComponent
                isActive={this.state.incomePieActive}
                labels={this.state.labels}
                data={this.state.data}
              />

              <PieChartExpensesComponent
                isActive={this.state.expensePieActive}
                labels={this.state.labels}
                data={this.state.data}
              />
            </CardGroup>
          </Container>
        )}
      </Layout>
    );
  }
}

export default HomePage;
