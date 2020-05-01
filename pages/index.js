import Layout from "../components/Layout";
import ChartComponent from "../components/ChartComponent";
import ChartFormComponent from "../components/ChartFormComponent";
import { optionalAuth } from "../utils/ssr";
import { Component } from "react";

export const getServerSideProps = optionalAuth;

class HomePage extends Component {
  state = {
    chartData: {
      labels: ["Net Income"],
      datasets: [
        {
          label: "Categories",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [0],
        },
      ],
    },
  };

  handleFormUpdate = (category, value) => {
    this.setState({
      chartData: {
        labels: this.state.chartData.labels.concat(category),
        datasets: [
          {
            label: "Categories",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: this.state.chartData.datasets[0].data.concat(value),
          },
        ],
      },
    });
  };

  render() {
    return (
      <Layout>
        <div>
          <ChartFormComponent
            handleFormUpdate={this.handleFormUpdate.bind(this)}
          ></ChartFormComponent>
          <button onClick={this.handleClick}>change chart</button>
          <ChartComponent chartData={this.state.chartData} />
        </div>
      </Layout>
    );
  }
}

export default HomePage;
