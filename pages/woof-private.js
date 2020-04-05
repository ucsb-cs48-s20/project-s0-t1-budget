import useSWR from "swr";
import Spinner from "react-bootstrap/Spinner";
import Image from "react-bootstrap/Image";
import { fetch } from "../utils/fetch";
import Layout from "../components/Layout";
import { requiredAuth } from "../utils/ssr";

function RandomDog() {
  const { data } = useSWR("/api/dog-private", fetch, {
    // By default, useSWR will call the endpoint we specified (in this case, /api/dog) every time we click away from
    // the page. This can be really useful if we want to make sure the web app is always showing the latest data,
    // but in this case, we don't need that behavior. See what happens if you set these options to true or remove them!
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  if (!data) {
    return <Spinner animation="border" />;
  }

  return (
    <div>
      <p>Enjoy this doggo!</p>
      <Image data-cy="doggo" src={data.image} />
    </div>
  );
}

export const getServerSideProps = requiredAuth;

function DogPage(props) {
  const user = props.user;

  return (
    <Layout user={user}>
      <RandomDog />
    </Layout>
  );
}

export default DogPage;
