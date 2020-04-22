# Setting up Auth0 for Heroku (production)

In order for Auth0 to recognize the app running on a production url
running on Heroku, you will need to make a small change to the Auth0
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
https://my-app-name.herokuapp.com
```

For example, for lab00 in CS48, it might be:

```
https://cs48-cgaucho-lab00.herokuapp.com
```

For every field that references `http://localhost:3000`:

- Add a comma-separated entry after the existing entry referencing your new production url.
- It is important you include **both** `localhost` **and** production urls so that both your localhost and production apps will work properly.

For example, if your production url is `https://cs48-cgaucho-lab00.herokuapp.com`,
your fields should now look like this.

Allowed Callback URLs:

```
http://localhost:3000/api/callback, https://cs48-cgaucho-lab00.herokuapp.com/api/callback
```

Allowed Logout URLs:

```
http://localhost:3000, https://cs48-cgaucho-lab00.herokuapp.com
```

Notes:

- Be sure that the `localhost` values use `http`
  but the Heroku values use `https`
- Don't just copy the above values;
  replace `https://cs48-cgaucho-lab00.herokuapp.com` with the link to your own
  deployment of the production app.

If you have deployments in more than two places, you can can list more than two urls in each of these boxes. This may be the case for example if you:

- Have localhost, heroku and now.sh deployments
- Have more than one heroku deployment (e.g. production and qa)

Don't forget to scroll down and click `Save Changes` at the bottom of the page.

# Next step

When configuring for Heroku, it is also necessary to define two
configuration variables: `REDIRECT_URI` and `POST_LOGOUT_REDIRECT_URI`.

Please return to the heroku instructions in [/docs/heroku.md](./heroku.md) to complete those steps.
