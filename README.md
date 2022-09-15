# Lap 2 futureproof project - Habit Tracker API

This API is part of the project set out by futureproof for Lap 2 of the 13-week bootcamp. The task was to design and develop a Habit tracking app using full-stack development. This repository deals with the back-end of the project.

We have used **NodeJS** and **Express** to build this API. The code has been laid out using an **MVC architecture**. This API has several endpoints which respond with getting and posting stories and their replies. For the database we have utilised **PSQL** and have also used containerisation with **Docker** for the database

## Pre-requisites

A minimum of [Node v16.11.0](https://nodejs.org/en/) needs to be installed

## Installing

After git cloning this repository, CD into the directory `lap-2-portfolio-week-project-backend` and run the following command to install all the dependencies:

```
$ npm i
```

After the dependencies are installed, the API is ready to be ran

## Launching the API

To start the API, run the following script:

```
$ bash _scripts/startDest.sh
```

From here a GET and POST requests can be made by using the local host with base URL: http://localhost:3000/ in [insomnia](https://docs.insomnia.rest/) or in a web browser.

## Testing

For testing, [Jest](https://jestjs.io/) has been implemented. To run the test, execute the following command:

```
$ bash _scripts/startTest.sh
```

## Hosting

The API is hosted on [Heroku](https://lap-2-project-backend.herokuapp.com/). This URL can be used as the base URL. Previews of the what requests and responses look like are available here.

## Authors

- [Hanibal](https://github.com/brhanuh)
- [Summira](https://github.com/sumshuss)
- [Stuart](https://github.com/SuperBrava)
- [Syed](https://github.com/syedmjavaid)
