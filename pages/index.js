import Layout from "../components/Layout";
import ChartComponent from "../components/ChartComponent";
import ChartFormComponent from "../components/ChartFormComponent";

import TableComponent from "../components/TableComponent";

import { optionalAuth } from "../utils/ssr";
import { Component } from "react";

export const getServerSideProps = optionalAuth;

class HomePage extends Component {
  state = {
    labels: ["Net Income"],
    data: [0],
  };

  handleFormUpdate = (category, value) => {
    if (this.state.labels.includes(category)) {
      const index = this.state.labels.indexOf(category);
      var sum = parseInt(this.state.data[index]) + parseInt(value);
      var sumIncome = parseInt(this.state.data[0]) + parseInt(value);
      const arr = [...this.state.data];
      arr.splice(0, 1, sumIncome);
      arr.splice(index, 1, sum);
      this.setState({
        labels: this.state.labels,
        data: arr,
      });
    } else {
      const arr = [...this.state.data];
      var sumIncome = parseInt(this.state.data[0]) + parseInt(value);
      arr.push(value);
      arr.splice(0, 1, sumIncome);
      this.setState({
        labels: this.state.labels.concat(category),
        data: arr,
      });
    }
  };

  render() {
    return (
      <Layout>
        <div>
          <ChartFormComponent
            handleFormUpdate={this.handleFormUpdate.bind(this)}
          ></ChartFormComponent>
          <ChartComponent chartData={this.state.chartData} />
          <TableComponent></TableComponent>
        </div>
      </Layout>
    );
  }
}

export default HomePage;
