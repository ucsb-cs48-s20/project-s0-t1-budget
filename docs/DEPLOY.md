# Deployment Instructions

## Steps to have an instance of the app running on Heroku given only read access to the repo

1. Fork the project repo to your own personal GitHub account by clicking on the "Fork" button at the upper right hand of the repo's page on GitHub. This creates a personal copy of the repo under your own GitHub account.

2. Create a new Heroku app, and link it to you forked copy, so that you are ready to deploy the master branch.

3. Create a new file called ".env" at the root of the forked repository and copy the contents of the file ".env.Sample" to the ".env" file

4. Install Node (Steps can be found [here](https://github.com/ucsb-cs48-s20/project-s0-t1-budget/blob/master/docs/INSTALL_NODE_INSTRUCTIONS.md))

5. Create auth0 credentials following the instructions from [this link](https://github.com/ucsb-cs48-s20/demo-nextjs-app/blob/master/docs/auth0-localhost.md). After following these steps the following keys in the .env file should be filled: AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_DOMAIN

6. Complete the MongoDB Cloud Atlas setup following the instructions from [this link](https://ucsb-cs48.github.io/topics/mongodb_cloud_atlas_setup/). You should create two separate clusters for production and staging and each of them would have an unique MONGODB keys to it which you can get from creating the clusters. After following these steps the following keys in the .env file should be filled: MONGODB_URI, MONGODB_URI_PRODUCTION, MONGODB_URI_STAGING

7. Generate a random 32 bit hex string and put this value in the SESSION_COOKIE_SECRET section of the .env file. A good website to generate this string is at [this link](https://www.browserling.com/tools/random-hex).After following this steps the following keys in the .env file should be filled: SESSION_COOKIE_SECRET

8. Once these steps are completed, on the page for your heroku app under settings, click "reveal config vars". Copy all the keys of your ".env" file with the appropriate keys: AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_DOMAIN, MONGODB_URI, MONGODB_URI_PRODUCTION, MONGODB_URI_STAGING, and SESSION_COOKIE_SECRET

9. Navigate to the deploy tab in heroku and select whether you would like to deploy the master branch manually or automatically.

10. When all of the previous steps are completed, you should be able to click the "Open app" button on heroku. Congratulations you have now deployed the app!

# Deployment Testing

Our team: s0-t1-budget

Other Teams:

| Team             | Who is reviewing | Issue Number |
| ---------------- | ---------------- | ------------ |
| s0-t2-env        | Trung,Edward     | 44           |
| s0-t3-iv-housing | Tomas,Tristan    | 43           |
| s0-t4-new-city   | Conner, Preetham | 42           |
