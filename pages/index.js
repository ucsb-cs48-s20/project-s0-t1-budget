import Layout from "../components/Layout";
import { optionalAuth } from "../utils/ssr";

export const getServerSideProps = optionalAuth;

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
        <div>You're not logged in!</div>
      )}
    </Layout>
  );
}

export default HomePage;
