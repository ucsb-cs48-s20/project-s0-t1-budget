# Demo Next.js App

## Prerequisites

- Node.js v10 or higher

- For installation advice, see: <https://ucsb-cs48.github.io/jstopics/node/>

## Installing dependencies

Run the command:

```
npm install
```

Do this:

- The first time you clone this repo
- Any time you switch branches
- Any time you pull new changes from GitHub

## Obtaining Secrets

To work properly, this application must be configured to use Google
OAuth using the Auth0 service.

This involves:

- Setting up an Auth0 account (if you do not already have one)
- Configuring an application
- Copying the value of three "secrets" into a file called `.env`

All of these instructions can be found in this file:
[docs/auth0-localhost.md](docs/auth0-localhost.md)

Follow _all_ of the instructions in that file _before_ trying to
run the application on localhost.

## Running on localhost

To run on localhost, run:

```
npm run dev
```

The app will run on <http://localhost:3000>.

While the app is running in development mode, any changes you make to
the codebase will automatically be reflected in the browser.

## Commands

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run test`         | Runs entire test suite                   |
| `npm run test:format`  | Checks the project for formatting issues |
| `npm run test:cypress` | Runs Cypress integration tests           |
| `npm run fix:format`   | Reformats all project files              |

## Configuring secrets for GitHub Actions

If the test cases were passing on the starter code repo, but are now
failing, it is likely because you need to configure the secrets
for Github Actions. That process is explained here: [docs/auth0-github-actions.md](./docs/auth0-github-actions.md).

## Deployment to Production

At some point, you'll want to deploy your application to the public internet
so that real users can access it: we call this a _production_ deployment
of your app.

There are a variety of cloud-based platforms where we can deploy our
applications. The file [docs/platforms.md](./docs/platforms.md) describes
the pros/cons of Heroku vs. now.sh and Amazon Web Services. The summary
is that we've chosen Heroku for it's easy of user for beginners
and the ability for a team to collaborate on managing a deployment.

Instructions for configuring your app for Heroku are listed in the file
[docs/heroku.md](./docs/heroku.md)

## The value of `SESSION_COOKIE_SECRET`

For deployments to localhost and now.sh, the value of `SESSION_COOKIE_SECRET` is automatically determined by the files `next.config.js` and `setup_now.js`, respectively.

For Heroku deployments, this value needs to be set by hand in the .env file.

The purpose of this value is described in the file [docs/session-cookie-secret.md](./docs/session-cookie-secret.md)
