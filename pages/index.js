import Layout from "../components/Layout";
import ChartComponent from "../components/ChartComponent";
import ChartFormComponent from "../components/ChartFormComponent";
import { optionalAuth } from "../utils/ssr";
import { Component } from "react";

export const getServerSideProps = optionalAuth;

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      chartData: {},
    };
  }

  componentWillMount() {
    this.getChartData();
  }

  getChartData() {
    this.setState({
      chartData: {
        labels: ["Groceries", "Utility", "Decor", "Other"],
        datasets: [
          {
            label: "Categories",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [10, 59, -20, 81, 56, 55, 40],
          },
        ],
      },
    });
  }

  render() {
    return (
      <Layout>
        <div>
          <ChartFormComponent></ChartFormComponent>
          <ChartComponent chartData={this.state.chartData} />
        </div>
      </Layout>
    );
  }
}

export default HomePage;
