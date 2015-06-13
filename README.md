# Presupuesto

## Requirements
* Node.js + npm
* git

## Getting started
1. `git clone git@github.com:jfresco/spa-boilerplate.git`
2. `npm install`
3. `npm start`
4. Browse to http://localhost:8000

## How to setup deploy to Heroku
You have to set up a new git remote pointing to the Heroku repo:
```
heroku git:remote -a presupuesto-pdr
heroku login
```
and enter your credentials.

## How to deploy to Heroku
Once you have set up your Heroku remote, you can deploy to Heroku by simply
```
git push heroku master
```
*Note*: You need to have proper permissions to do this.