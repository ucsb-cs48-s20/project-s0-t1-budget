import Layout from "../components/Layout";
import ChartComponent from "../components/ChartComponent";
import ChartFormComponent from "../components/ChartFormComponent";

import TableComponent from "../components/ChartComponent";

import { optionalAuth } from "../utils/ssr";
import { Bar } from "react-chartjs-2";
import React, { Component } from "react";
import ReactDOM from "react-dom";

export const getServerSideProps = optionalAuth;

var inputA = ["Hello0", "hell0"];
var inputD = [0];
var i = 0;

var data = {
  labels: inputA,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: inputD,
    },
  ],
};

function handleClick() {
  inputD.push(++i * 10);
  inputA.push("Hello" + i);
  ReactDOM.unmountComponentAtNode(document.getElementById("chart"));
  ReactDOM.render(
    <ChartComponent graph={data} />,
    document.getElementById("chart")

    //<TableComponent table={data} />,
    //document.getElementById("chart")
  );
}

// class ChartComponentS extends Component
// {
//   constructor(props)
//   {
//     super(props);
//     this.chartReference=React.createRef();
//   }

//   componentDidMount()
//   {
//     console.log(this.chartReference);
//   }
//   render()
//   {
//     return (
//     <Bar ref={this.chartReference} data={data} options={
//       {maintainAspectRatio: true},
//       {responsive: true},
//       {title: {
//         display: true,
//         text: "Front Page Graph"
//       }}
//     }/>)
//   }
// }

function HomePage(props) {
  const user = props.user;

  return (
    <Layout user={user}>
      {user ? (
        <div>
          You're logged in! Here's what the server knows about you:
          <pre>{JSON.stringify(user, null, "\t")}</pre>
        </div>
      ) : (
        <div>
          <TableComponent></TableComponent>
          <ChartFormComponent></ChartFormComponent>
          <button onClick={handleClick}>addData</button>
          <div id="chart"></div>
        </div>
      )}
    </Layout>
  );
}

export default HomePage;
