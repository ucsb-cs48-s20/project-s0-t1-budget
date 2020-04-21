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
in source code.

For deploying to now.sh, the script `setup_now.js` does
this with the line of code:

```
 const cookieSecret = crypto.randomBytes(32).toString("hex");
```

Return to [README.md](../README.md)
