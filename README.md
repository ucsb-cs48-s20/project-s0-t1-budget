# Demo Next.js App

## Getting Started

### Prerequisites

- Node.js v10 or higher

### Installing dependencies

The first time you clone this repo, as well as any time you pull/switch branches, you should update the project's
dependencies by running `npm install`

Copy the .env.SAMPLE file to a file called .env by running `cp .env.SAMPLE .env`. You will populate this file in the
next few steps.

Set up authentication by following the instructions in [docs/auth0.md](./docs/auth0.md).

### Running on localhost

To run on localhost, run `npm run dev`. The app will run on http://localhost:3000. While the app is running in
development mode, any changes you make to the codebase will automatically be reflected in the browser.

### Deploying

To deploy this app, you will need a [zeit.co account](https://zeit.co/signup). Run `npx now login` (in this directory)
to login to your account.

To set up your project, you will need to generate a now.json by running `npm run setup`. Follow the instructions in your
terminal to set up a new project and it will generate a now.json file for you.

Once you've set up your now.json, run `npx now --prod --confirm`. The first time you deploy your app, you will be asked a few
questions about the app. For most of the questions, you can hit enter to go with the suggested value, though you may
want to choose your own app name.

If your deployment was successful, the link to the production app should be copied to your clipboard. The first time
you do this, you will have to make a small modification to your Auth0 configuration. Follow the instructions under
"After your first deploy" in [docs/auth0.md](./docs/auth0.md).

## Commands

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run test`         | Runs entire test suite                   |
| `npm run test:format`  | Checks the project for formatting issues |
| `npm run test:cypress` | Runs Cypress integration tests           |
| `npm run fix:format`   | Reformats all project files              |
