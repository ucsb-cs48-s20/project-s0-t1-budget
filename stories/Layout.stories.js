import React from "react";
import Layout from "../components/Layout";
import Container from "react-bootstrap/Container";
import { text } from "@storybook/addon-knobs";

export default {
  title: "Layout",
  component: Layout,
};

export const loggedOutEmpty = () => {
  return <Layout />;
};

export const loggedInWithContentInContainer = () => {
  const content = text("Sample Content", "This is sample content");
  const name = text("Name", "Tomas Vera");
  const picture = text(
    "Image URL",
    "https://lh6.googleusercontent.com/--uwV3lVyjdo/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucluEUnOKuLSIx3lXPUeRVThS3oI7w/photo.jpg"
  );
  const user = { name, picture };
  return (
    <Layout user={user}>
      <Container className="py-3">{content}</Container>
    </Layout>
  );
};
