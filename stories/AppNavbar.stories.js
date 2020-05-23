import React from "react";
import { select, text } from "@storybook/addon-knobs";
import AppNavbar from "../components/AppNavbar";

export default {
  title: "AppNavbar",
  component: AppNavbar,
};

export const loggedOut = () => {
  return <AppNavbar />;
};

export const loggedIn = () => {
  const name = text("Name", "Tomas Vera");
  const picture = text(
    "Image URL",
    "https://lh6.googleusercontent.com/--uwV3lVyjdo/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucluEUnOKuLSIx3lXPUeRVThS3oI7w/photo.jpg"
  );
  const user = { name, picture };
  return <AppNavbar user={user} />;
};
