import Layout from "../components/Layout";
import ChartComponent from "../components/ChartComponent";
import ChartFormComponent from "../components/ChartFormComponent";
import TableComponent from "../components/TableComponent";
import LineGraphComponent from "../components/LineGraphComponent";
import PieChartComponent from "../components/PieChartComponent";

import { optionalAuth } from "../utils/ssr";
import { Component } from "react";
import { Button, Col, Container, Row, Jumbotron } from "react-bootstrap";

export const getServerSideProps = optionalAuth;

class HomePage extends Component {
  state = {
    labels: ["Income", "Net Income"],
    data: [0, 0],
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
    });
  };

  render() {
    return (
      <Layout>
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
              </Jumbotron>
            </Col>
            <Col md="7">
              <TableComponent
                category={this.state.labels}
                price={this.state.data}
              />
            </Col>
          </Row>
          <ChartComponent labels={this.state.labels} data={this.state.data} />
          <PieChartComponent />
          <LineGraphComponent />
        </Container>
      </Layout>
    );
  }
}

export default HomePage;
