# Deployment to Production

At some point, you'll want to deploy your application to the public internet
so that real users can access it: we call this a _production_ deployment
of your app.

There are a variety of cloud-based platforms where we can deploy our
applications, including now.sh, Amazon Web Services and Heroku.

For CS48 project, we recommend Heroku for these reasons:

- ease of user for beginners
- free tier with no need to manage "credits"
- the ability for a team to collaborate on managing a deployment
- related: the ability to give TAs/instructors visibility to logs
  to help in debugging problems

However, each of these platforms has its advantages, so in this file
we describes the tradeoffs among the three.

# Vercel.com (previously now.sh from Zeit.co)

[Vercel.com](https://vercel.com) (previously known as [Zeit](https://vercel.com/blog/zeit-is-now-vercel)) offers hosting for next.js apps where the URL
for the deployed app ends in `now.sh`.

Hosting on Vercel's `now.sh` platform offers a _serverless architecture_ where rather than keeping your entire app persistently deployed on a server, it
spins up a server for each function call that you perform.
(Read more about Vercel's serverless architecture here: <https://vercel.com/docs/v2/serverless-functions/introduction>)

What this means for you as a user is fast response times; unlike Heroku
where, if your app has not be used for a while, it is put to sleep and has
to be started up again from scratch on first use, now.sh deployments
tend to respond quickly, even on the free tier. If you are showing your
web app to a potential user, this faster performance might result
in higher [conversion rates](https://www.nngroup.com/articles/conversion-rates/) than if you showed them a Heroku version where they had to wait 10-15 seconds
for the home/login page to load.

The main issue has to do with deployments shared by a _team_. While
Vercel does offer this feature, it is part of paid plans only. What
can be confusing is that there is a 14-day "free trial" during which
many of the feature of the paid plans are made available, but that's
not enough to get us through a 10-week quarter for CS48. (Though it
might be fine for a weekend hackathon.)

However, now.sh remains a good choice for some individual use cases,
so there are instructions for deploying to now.sh in the file
[docs/now_sh.md](./now_sh.md)

# Amazon Web Services

Amazon Web Services (AWS) offers a variety of ways to deploy a
next.js application. The main advantage of AWS is a great deal of
fine-grained control over your platform, and few restrictions. For
real-world applications that go beyond the free-tier,
[AWS can be more cost-effective](https://railsware.com/blog/heroku-vs-aws-which-paas-hosting-to-choose/)

The main disadvantage is that there is a great deal of complexity
involved in learning how to deploy on AWS, and some overhead in obtaining
"free AWS credits", and these credits eventually run out.

# What Heroku provides

Heroku offers easy setup on a free tier that:

- requires only a verified email address
- has no "credits" that you have to keep track of
- does not require a credit card

_It is our intention to limit the use
of Heroku to features that do not require a credit card._
That tier should be sufficient for most CS48 projects.

There are additional "free tier" products that do
require a credit card. If you are careful with these, you can
avoid having any charges incurred to your card; _however, we
do not advocate or encourage you to do this for a CS48 project_,
especially if you are sharing access with a team.

For team-based projects, Heroku's free tier
offers the ability to add collaborators to a deployment so that any team
member can:

- deploy a new branch
- review logs to investigate bugs

In addition, Heroku offers the ability to use a Postgres SQL database
(provided free with Heroku, up to 10,000 rows) as an alternative to
MongoDB.

Instructions for configuring your app for Heroku are listed in the file
[docs/heroku.md](./heroku.md)
