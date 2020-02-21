## App - Shop of courses

<!-- [![CircleCI](https://img.shields.io/circleci/project/github/contentful/the-example-app.nodejs.svg)](https://circleci.com/gh/contentful/the-example-app.nodejs) -->

The node.js example app teaches the very basics of how to work with Contentful:

- consume content from the Contentful Delivery and Preview APIs
- model content
- edit content through the Contentful web app

The app demonstrates how decoupling content from its presentation enables greater flexibility and facilitates shipping higher quality software more quickly.

You can see a hosted version of `The node.js example app` on <a href="https://the-example-app-nodejs.contentful.com/" target="_blank">Heroku</a>.

## What is Contentful?

[Contentful](https://www.contentful.com) provides a content infrastructure for digital teams to power content in websites, apps, and devices. Unlike a CMS, Contentful was built to integrate with the modern software stack. It offers a central hub for structured content, powerful management and delivery APIs, and a customizable web app that enable developers and content creators to ship digital products faster.

## Requirements

- Node 8
- Git
- SQLite database

## Common setup

Clone the repo and install the dependencies.

```bash
git clone git-url
```

```bash
npm install
```

```bash
npm run setup:db
```

## Steps for read-only access

To start the express server, run the following

```bash
npm run start:dev
```

Open [http://localhost:3000](http://localhost:3000) and take a look around.


## Deploy to Heroku

You can also deploy this app to Heroku:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Use Docker

You can also run this app as a Docker container:

Step 1: Clone the repo

```bash
git clone url-git
```

Step 2: Build the Docker image

```bash
docker build -t the-example-app.nodejs .
```

Step 3: Run the Docker container locally:

```bash
docker run -p 3000:3000 -d the-example-app.nodejs
```

If you created your own Contentful space, you can use it by overriding the following environment variables:

```bash
docker run -p 3000:3000 \
  -e CONTENTFUL_SPACE_ID=<SPACE_ID> \
  -e CONTENTFUL_DELIVERY_TOKEN=<DELIVERY_ACCESS_TOKEN> \
  -e CONTENTFUL_PREVIEW_TOKEN=<PREVIEW_ACCESS_TOKEN> \
  -d the-example-app.nodejs
```
