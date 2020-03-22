# Setting up Authentication

This project uses Auth0 and Google OAuth for authentication.

## Setting up Auth0

First, [sign up for an account with Auth0](https://auth0.com/signup). You will be asked to create a tenant.

Next, register a new application. You do this by navigating to the "Applications" page in the sidebar and clicking the
"Create Application" button. Give it a name and ensure you set it up as a "Single Page Application".

In the configuration for the application you just created, click on the "Settings" tab and fill in the following values
 in the appropriate fields:

| Field | Value |
| --- | --- |
| Allowed Callback URLs | http://localhost:3000/auth0_callback |
| Allowed Logout URLs | http://localhost:3000 |
| Allowed Web Origins | http://localhost:3000 |

On the same page you should see a "Domain" and "Client ID". Copy those values into your `.env` file.

In the "Connections" tab of **your app** (not from the sidebar), uncheck Username-Password-Authentication.
Ensure google-oauth2 is checked (it should be by default).

## Setting up Google OAuth

Create a Google OAuth application [here](https://developers.google.com/identity/sign-in/web/sign-in).
When prompted with "Where are you calling from", select "Web server". Set the Authorized redirect URI to
`https://<Auth0 Domain>/login/callback`, replacing `<Auth0 Domain>` with the Auth0 Domain you copied in the previous
step. Take note of the "Client ID" and "Client Secret", you will need to copy these values in the next step.

Navigate back to the Auth0 dashboard. Navigate to the "Connections -> Social" page in the sidebar. Click on "Google"
and fill in the "Client ID" and "Client Secret" you just generated. Make sure to click "Save" at the bottom of the
dialog to save your changes.
