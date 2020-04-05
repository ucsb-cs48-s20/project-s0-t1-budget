require("dotenv").config();
const crypto = require("crypto");
const { execSync } = require("child_process");
const fs = require("fs");
const inquirer = require("inquirer");

function getAppName(github, app) {
  return `cs48-${github}-${app}`.toLowerCase();
}

function addSecret(appName, key, value) {
  try {
    execSync(`npx now secrets add "${appName}-${key}" "${value}"`, {
      stdio: "inherit",
    });
  } catch {
    console.error(
      `Could not add "${appName}-${key}". If it already exists, that's fine.`
    );
  }
}

inquirer
  .prompt([
    {
      type: "input",
      name: "github",
      message: "What's your github username?",
      validate: (value) => {
        // from https://github.com/shinnn/github-username-regex
        const valid = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(value);

        return valid || "You must enter a valid GitHub username!";
      },
    },
    {
      type: "input",
      name: "app",
      message: "What do you want to name your app?",
      validate: (value, { github }) => {
        const appName = getAppName(github, value);
        const valid =
          appName.length <= 52 &&
          !/[^a-z0-9\-]/.test(value) &&
          !/--/.test(value) &&
          !/-$/.test(value);

        return (
          valid ||
          "Invalid app name. The full app name must be no more than 52 characters and only contain alphanumeric characters and non-consecutive/non-trailing dashes."
        );
      },
    },
  ])
  .then(({ github, app }) => {
    const appName = getAppName(github, app);
    const cookieSecret = crypto.randomBytes(32).toString("hex");

    const secrets = [
      ["AUTH0_DOMAIN", null, process.env.AUTH0_DOMAIN],
      ["AUTH0_CLIENT_ID", null, process.env.AUTH0_CLIENT_ID],
      ["AUTH0_CLIENT_SECRET", "client_secret", process.env.AUTH0_CLIENT_SECRET],
      ["REDIRECT_URI", null, `https://${appName}.now.sh/api/callback`],
      ["POST_LOGOUT_REDIRECT_URI", null, `https://${appName}.now.sh/`],
      ["SESSION_COOKIE_SECRET", "cookie_secret", cookieSecret],
    ];

    const json = {
      name: appName,
      build: {
        env: {},
      },
    };

    for (const [jsonKey, secretKeyName, value] of secrets) {
      if (secretKeyName) {
        json.build.env[jsonKey] = `@${appName}-${secretKeyName}`;
        addSecret(appName, secretKeyName, value);
      } else {
        json.build.env[jsonKey] = value;
      }
    }

    fs.writeFileSync("now.json", JSON.stringify(json, null, "\t"));

    console.log(
      "Created a now.json file, you're now ready to deploy by running:"
    );
    console.log("        npx now --prod --confirm");
  });
