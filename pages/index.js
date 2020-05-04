import Layout from "../components/Layout";
import ChartComponent from "../components/ChartComponent";
import ChartFormComponent from "../components/ChartFormComponent";

import TableComponent from "../components/TableComponent";

import { optionalAuth } from "../utils/ssr";
import { Component } from "react";

export const getServerSideProps = optionalAuth;

class HomePage extends Component {
  state = {
    chartData: {
      labels: ["Net Income"],
      datasets: [
        {
          label: "Income",
          backgroundColor: ["rgba(0,255,0,0.2)", "rgba(255,99,132,0.2)"],
          borderColor: ["rgba(0,255,0,1)", "rgba(255,99,132,1)"],
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [0],
        },
      ],
    },
  };

  handleFormUpdate = (category, value) => {
    if (this.state.chartData.labels.includes(category)) {
      const index = this.state.chartData.labels.indexOf(category);
      var sum =
        parseInt(this.state.chartData.datasets[0].data[index]) +
        parseInt(value);
      var sumIncome =
        parseInt(this.state.chartData.datasets[0].data[0]) + parseInt(value);
      const arr = [...this.state.chartData.datasets[0].data];
      arr.splice(0, 1, sumIncome);
      arr.splice(index, 1, sum);
      var cbkColor = "rgba(238,130,238,0.2)";
      var cboColor = "rgba(238,130,238,1)";
      var chbkColor = "rgba(238,130,238,0.4)";
      var chboColor = "rgba(238,130,238,1)";
      var bkColor, boColor, hbkColor, hboColor;
      if (sumIncome > 0) {
        bkColor = "rgba(0,255,0,0.2)";
        boColor = "rgba(0,255,0,1)";
        hbkColor = "rgba(0,255,0.4)";
        hboColor = "rgba(0,255,0,1)";
      } else {
        bkColor = "rgba(255,99,132,0.2)";
        boColor = "rgba(255,99,132,1)";
        hbkColor = "rgba(255,99,132,0.4)";
        hboColor = "rgba(255,99,132,0,1)";
      }
      this.setState({
        chartData: {
          labels: this.state.chartData.labels,
          datasets: [
            {
              label: "Income",
              backgroundColor: [
                bkColor,
                cbkColor,
                cbkColor,
                cbkColor,
                cbkColor,
                cbkColor,
                cbkColor,
              ],
              borderColor: [
                boColor,
                cboColor,
                cboColor,
                cboColor,
                cboColor,
                cboColor,
                cboColor,
              ],
              borderWidth: 1,
              hoverBackgroundColor: [
                hbkColor,
                chbkColor,
                chbkColor,
                chbkColor,
                chbkColor,
                chbkColor,
              ],
              hoverBorderColor: [
                hboColor,
                chboColor,
                chboColor,
                chboColor,
                chboColor,
                chboColor,
              ],
              data: arr,
            },
          ],
        },
      });
    } else {
      const arr = [...this.state.chartData.datasets[0].data];
      var sumIncome =
        parseInt(this.state.chartData.datasets[0].data[0]) + parseInt(value);
      var cbkColor = "rgba(238,130,238,0.2)";
      var cboColor = "rgba(238,130,238,1)";
      var chbkColor = "rgba(238,130,238,0.4)";
      var chboColor = "rgba(238,130,238,1)";

      arr.push(value);
      arr.splice(0, 1, sumIncome);
      if (sumIncome > 0) {
        bkColor = "rgba(0,255,0,0.2)";
        boColor = "rgba(0,255,0,1)";
        hbkColor = "rgba(0,255,0.4)";
        hboColor = "rgba(0,255,0,1)";
      } else {
        bkColor = "rgba(255,99,132,0.2)";
        boColor = "rgba(255,99,132,1)";
        hbkColor = "rgba(255,99,132,0.4)";
        hboColor = "rgba(255,99,132,0,1)";
      }

      this.setState({
        chartData: {
          labels: this.state.chartData.labels.concat(category),
          datasets: [
            {
              label: "Income",
              backgroundColor: [
                bkColor,
                cbkColor,
                cbkColor,
                cbkColor,
                cbkColor,
                cbkColor,
                cbkColor,
              ],
              borderColor: [
                boColor,
                cboColor,
                cboColor,
                cboColor,
                cboColor,
                cboColor,
                cboColor,
              ],
              borderWidth: 1,
              hoverBackgroundColor: [
                hbkColor,
                chbkColor,
                chbkColor,
                chbkColor,
                chbkColor,
                chbkColor,
              ],
              hoverBorderColor: [
                hboColor,
                chboColor,
                chboColor,
                chboColor,
                chboColor,
                chboColor,
              ],
              data: arr,
            },
          ],
        },
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
