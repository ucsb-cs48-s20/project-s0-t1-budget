# Deployment Instructions

## Steps to have an instance of the app running on Heroku given only read access to the repo

1. Fork the project repo to your own personal GitHub account by clicking on the "Fork" button at the upper right hand of the repo's page on GitHub.  This creates a personal copy of the repo under your own GitHub account.

2. Create a new Heroku app, and link it to you forked copy, so that you are ready to deploy the master branch.

3. Install Node (Steps can be found [here](https://github.com/ucsb-cs48-s20/project-s0-t1-budget/blob/master/docs/INSTALL_NODE_INSTRUCTIONS.md))

4. Create auth0 credentials following the instructions from [this link](https://github.com/ucsb-cs48-s20/demo-nextjs-app/blob/master/docs/auth0-localhost.md)

5. Enter the command **source .env** into the terminal

6. Complete the MongoDB Cloud Atlas setup following the instructions from [this link](https://ucsb-cs48.github.io/topics/mongodb_cloud_atlas_setup/)

7. Once these steps are completed, on the page for your heroku app under settings, click "reveal config vars". You should have key value pairs for the following variables: AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_DOMAIN, MONGODB_URI, MONGODB_URI_PRODUCTION, MONGODB_URI_STAGING, and SESSION_COOKIE_SECRET

8. When all of the previous steps are completed, you should be able to click the "Open app" button on heroku.
