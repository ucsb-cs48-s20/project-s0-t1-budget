# Setting up Authentication for now.sh

# Setting up Auth0 for now.sh

In order for Auth0 to recognize the app running on a production url
running on now.sh, you will need to make a small change to the app you
created in the first step.

Your production url is something of the form

```
https://my-app-name.now.sh
```

For example, for lab00 in CS48, it might be:

```
https://cs48-s20-cgaucho-lab00.now.sh
```

Navigate back to the settings page of the app you created in the Auth0
dashboard.

For every field that references `http://localhost:3000`:

- Add a comma-separated entry after the existing entry referencing your new production url.
- It is important you include **both** `localhost` **and** production urls so that both your localhost and production apps will work properly.

For example, if your production url is `https://ucsb-demo-nextjs-app.now.sh`,
your fields should now look like this.  

Allowed Callback URLs:
```
http://localhost:3000/auth0_callback, https://ucsb-demo-nextjs-app.now.sh/api/callback
```

Allowed Logout URLs:
```
http://localhost:3000, https://ucsb-demo-nextjs-app.now.sh
```

Notes:
* Be sure that the `localhost` values use `http` but the `now.sh` values use `https`
* Don't just copy the above values; replace `https://ucsb-demo-nextjs-app.now.sh` with the link to your own
  deployment of the production app.

Don't forget to click `Save Changes` at the bottom of the page.

# Next step

Return to [README.md](../README.md) 
