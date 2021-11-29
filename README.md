<h1>AquaBot</h1>

Bot for discord automations

---

<h2>Table of Contents</h2>

- [Requirements](#requirements)
- [Installing](#installing)
- [Configuration](#configuration)
  - [Authorizing application (slash) commands:](#authorizing-application-slash-commands)
  - [Making the bot online:](#making-the-bot-online)

---

## Requirements

- TypeScript

---

## Installing

```shell
$ npm install -g typescript ts-node ts-node-dev
$ npm install
```

---

## Configuration

### Authorizing application (slash) commands:

1. Go to https://discord.com/developers/applications
2. Select your application
3. In "OAuth2" section select "URL Generator"
4. Mark "applications.commands"
5. Copy the generated URL and paste it into a new tab
6. Authorize your application to use slash commands

### Making the bot online:

```shell
$ npm start
```

---
