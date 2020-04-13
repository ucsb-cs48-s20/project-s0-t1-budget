# Demo Next.js App

## Prerequisites

- Node.js v10 or higher

- For installation advice, see: <https://ucsb-cs48.github.io/jstopics/node/>

## Installing dependencies

The first time you clone this repo, as well as any time you pull/switch branches, you should update the project's
dependencies by running `npm install`

## Obtaining Secrets

To work properly, this application must be configured to use Google OAuth
using the Auth0 service.

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

## Deploying to now.sh for the first time

To deploy this app, you will need a [zeit.co account](https://zeit.co/signup).

Run `npx now login` (in this directory) to login to your account.

To set up your project, you will need to generate a `now.json` by
running `npm run setup`. Follow the instructions in your terminal to
set up a new project and it will generate a now.json file for you.

Once you've set up your now.json, run `npx now --prod --confirm`.

- The first time you deploy your app, you will be asked a few
  questions about the app.
- For most of the questions, you can hit enter to go with the suggested value,
  though you may want to choose your own app name.

If your deployment was successful, the link to the production app
should be copied to your clipboard.

The first time you do this, you will have to make a small modification
to your Auth0 configuration. Follow the instructions in
[docs/auth0-production.md](./docs/auth0-production.md) to configure your
app for OAuth.

Then, test whether your application works on the production URL.

# The value of `SESSION_COOKIE_SECRET`

You will note that in addition to the three secrets defined for Auth0,
there is another value defined in the file `next.config.js` and in the
file `setup_now.js` called `SESSION_COOKIE_SECRET`.

The value of `SESSION_COOKIE_SECRET` can be set to any arbitrary long
unguessable string. It is used to provide extra cryptographic security
to make it more difficult for hackers to hijack sessions on a web server.

When running on `localhost`, or on CI, a default value can be used.
This default value is defined in the file `next.config.js`

When running in production, it is important to define a good
unguessable value, and not use a default value that can be found
in source code. In this app, the script `setup_now.js` does
this with the line of code:

```
 const cookieSecret = crypto.randomBytes(32).toString("hex");
```
