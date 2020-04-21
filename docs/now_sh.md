# Deploying to now.sh (optional)

Deploying on now.sh offers an alternative to Heroku. Here are few examples
of reasons you may want to deploy your app to now.sh:

- You are dissatisfied with the slow startup times required when a free-tier
  Heroku deployment "goes to sleep" and has to be cold restarted on
  first access.
- You are debugging a problem with a deployment to Heroku, and you want to
  see whether it's an application issue, or a Heroku specific issue.

The main disadvantage of now.sh is for team-based projects: it does not
offer a way to set up "collaborators" on a deployment; i.e. a deployment
can only be manipulated by the account holder that set it up.

There may be a temptation to work around this with shared
accounts/passwords; however, [sharing passwords is not aligned with
"security best practices"](https://security.stackexchange.com/questions/204249/why-avoid-shared-user-accounts).

Therefore we recommend using now.sh only when control by a single user
is appropriate, e.g.

- a private deployment used by a single developer for exploratory testing
  during coding
- a production deployment for an app being produced by a single developer.

# How to deploy to now.sh

To deploy this app to now.sh, you will need a [zeit.co account](https://zeit.co/signup).

- Signup for an account before proceeding. We recommend using your GitHub credentials to login

Run `npx now login` (in this directory) to login to your account.

- When asked for an email, if you used GitHub to sign in to zeit.co,
  you should use the same email that is the primary email on your
  GitHub account.
- When signing in for the first time, you'll be asked to confirm your
  email. Be sure that you can get access to read an email sent to the
  email address that you typed it.

To deploy your project, run `npx now --prod`. The first time you run
this command, you will be prompted with a series of questions.

For most of these questions, you can hit enter to use the suggested
value. **When asked "What's your project's name", enter in a project
name in the form _`cs48-githubid-lab00`_, replacing _`githubid`_ with
your github id**

If the deployment was successful, you should see the line `✅ Production: <production url> [copied to clipboard]`.
`<production url>` is the link to your running production app. If you
are working locally, this value should be copied to your clipboard.

If you visit your production app, you may notice that your app is
responding with a 500 Internal Server Error. This is because the
server has not been configured with your Auth0 configuration.

To set this up, run `npm run setup`. You will be prompted to paste the
url of your production app, which you should have from when you first
deployed the app. The setup script will automatically upload your
credentials and redeploy your app.

You will also have to make a small modification to your Auth0
configuration. Follow the instructions in
[docs/auth0-production.md](./docs/auth0-production.md) to configure
your app for OAuth.

Then, test whether your application works on the production URL.

# Setting up Auth0 for now.sh (production)

In order for Auth0 to recognize the app running on a production url
running on now.sh, you will need to make a small change to the Auth0
configuration you did to get set up on `localhost`.

Navigate back to the settings page of the app you created in the Auth0
dashboard.

To do this:

- return to the web interface of <https://auth0.com/> and login
- click on `Applications` in the side menu
- select your application
- go to the second tab for `Settings`

Your production url is something of the form

```
https://my-app-name.now.sh
```

For example, for lab00 in CS48, it might be:

```
https://cs48-cgaucho-lab00.now.sh
```

For every field that references `http://localhost:3000`:

- Add a comma-separated entry after the existing entry referencing your new production url.
- It is important you include **both** `localhost` **and** production urls so that both your localhost and production apps will work properly.

For example, if your production url is `https://cs48-cgaucho-lab00.now.sh`,
your fields should now look like this.

Allowed Callback URLs:

```
http://localhost:3000/api/callback, https://cs48-cgaucho-lab00.now.sh/api/callback
```

Allowed Logout URLs:

```
http://localhost:3000, https://cs48-cgaucho-lab00.now.sh
```

Notes:

- Be sure that the `localhost` values use `http` but the `now.sh` values use `https`
- Don't just copy the above values; replace `https://cs48-cgaucho-lab00.now.sh` with the link to your own
  deployment of the production app.

Don't forget to scroll down and click `Save Changes` at the bottom of the page.

# Next step

Return to [README.md](../README.md)
