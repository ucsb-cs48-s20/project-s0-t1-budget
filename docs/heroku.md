# Deployment on Heroku (optional)

1. If you do not already have one, create a Heroku account by
   logging in at <https://heroku.com>

   Click the “Sign up for Free” link.

   You’ll be asked for:

   - First Name, Last Name
   - Email (we suggest using your `@ucsb.edu` email, but that's up to you)
   - Company (you may leave this blank).
   - Preferred Development Language: choose JavaScript or Java

     Don’t worry; your choice doesn’t prevent you from using the
     account with other languages later such as Ruby or Python

2. If needed, install the Heroku CLI on your system
   (it's already installed on CSIL).

   Instructions are here: <https://devcenter.heroku.com/articles/heroku-cli>

3) Create a new app on Heroku, either via the Heroku Dashboard, or the
   Heroku command line. For purposes of the instructions, let us
   suppose this is called `cs48-s20-cgaucho-lab00`

4) Add a value for `SESSION_COOKIE_SECRET` to to your `.env` file.

   The value can be any arbitrary string of upper and lower case
   letters and digits. It is just a value used to encrypt your
   session cookies so that it's more difficult for hackers to hijack
   your session. There is more detail in the file
   [docs/session-cookie-secret.md](./docs/session-cookie-secret.md)

   Example:

   ```
   SESSION_COOKIE_SECRET=7xd6fvweSFHSS238778sf87sdfS8F8sf9ds8fDZ7sd8fdDV8ASC12
   ```

5) Be sure you are logged into the Heroku command line via `heroku login -i`

6) Run `npm install`

7) Run this command to copy the `.env` values into Heroku Config Vars.
   Substitute your app name in place of `cs48-s20-cgaucho-lab00`

   ```
   npx heroku-dotenv push --app cs48-s20-cgaucho-lab00
   ```

8) Go to the Deploy screen of the Heroku Dashboard, connect your GitHub repo
   to the Heroku App, and then click to deploy the master branch.

9) You should be up and running on Heroku.

   However, you still still need to modify your
   Auth0 setup to include the new production urls.

   The steps to do this are in the file:

   [/docs/auth0-production.md](./auth0-production.md)

10. Go to the Setting page in the Heroku Dashboard and add two config vars:

    | Key                        | Value                                             | Example                                                     |
    | -------------------------- | ------------------------------------------------- | ----------------------------------------------------------- |
    | `REDIRECT_URI`             | Your production URL with `/api/callback` appended | `https://cs48-s20-cgaucho-lab00.herokuapp.com/api/callback` |
    | `POST_LOGOUT_REDIRECT_URI` | Your production URL                               | `https://cs48-s20-cgaucho-lab00.herokuapp.com/api/callback` |

Once you've defined these, redeploy your app, and it should work on
Heroku. Be sure that you don't only test loading the home page, but
also test whether you can authenticate (login/logout with Google).

Return to [README.md](../README.md)
