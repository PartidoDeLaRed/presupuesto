# Presupuesto

## Requirements
* Node.js + npm
* git

## Getting started
1. clone this repo
2. `npm install`
3. `npm start`
4. Browse to http://localhost:8000

## Loading sample data to DB
`gulp fixtures`

*Note: this will load data to the default database (`presupuesto-dev`). You may tweak this manually or by editing your `config`*

## How to setup deploy to Heroku
You have to set up a new git remote pointing to the Heroku repo:
```
heroku git:remote -a my-heroku-app-name
heroku login
```
and enter your credentials.

## How to deploy to Heroku
Once you have set up your Heroku remote, you can deploy to Heroku by simply
```
git push heroku master
```
*Note*: You need to have proper permissions to do this.