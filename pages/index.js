import Layout from "../components/Layout";
import ChartComponent from "../components/ChartComponent";
import ChartFormComponent from "../components/ChartFormComponent";
import { optionalAuth } from "../utils/ssr";

export const getServerSideProps = optionalAuth;

var inputA = [];

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
      data: [10, 59, -20, 81, 56, 55, 40],
    },
  ],
};

function handleClick() {
  inputA.push("Added");
  console.log(inputA);
}

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
          <ChartFormComponent></ChartFormComponent>
          <button onClick={handleClick}>addData</button>
          <ChartComponent graph={data} />
        </div>
      )}
    </Layout>
  );
}

export default HomePage;
