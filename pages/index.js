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
    labels: ["Net Income"],
    data: [0],
  };

  handleFormUpdate = (income, category, value) => {
    if (this.state.labels.includes(category)) {
      const index = this.state.labels.indexOf(category);
      var sum = parseInt(this.state.data[index]) - parseInt(value);
      var sumIncome = parseInt(this.state.data[0]) - parseInt(value);
      const arr = [...this.state.data];
      arr.splice(0, 1, sumIncome);
      arr.splice(index, 1, sum);
      this.setState({
        labels: this.state.labels,
        data: arr,
      });
    } else {
      const arr = [...this.state.data];
      if (this.state.data[0] == "") {
        var sumIncome = parseInt(income) - parseInt(value);
      } else {
        var sumIncome = parseInt(this.state.data[0]) - parseInt(value);
      }

      var intValue = -parseInt(value);
      arr.push(intValue);
      arr.splice(0, 1, sumIncome);
      this.setState({
        labels: this.state.labels.concat(category),
        data: arr,
      });
    }
  };

  handleResetUpdate = () => {
    this.setState({
      labels: ["Net Income"],
      data: [0],
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
