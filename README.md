# Setup
## Welcome to financial manager API

This system use mongoDB as NoSQL and Redis to cache data

## Requiriment

- NodeJs 14.x
- (optional) VsCode
- (recomended) Windows 10 OS to test on develop mode
- Yarn
- Git bash

## Installation
To develop use "develop branch". To production use "prod branch"

Install the dependencies and devDependencies and start the server.

```sh
git checkout develop
npm install yarn -g
npm install typescript -g
npm install nodemon -g
yarn install
```

For development environments you need to copy .env.example to .env and setting it
For production environments you need to copy dist/.env to application-root/.env and setting it
For setting db env you can use .env

## Start developer mode API
Execute:
```sh
git checkout develop
yarn build
```

If use are using VsCode, you can use debug mode
The application use Typescript so when you run ```yarn build``` it was generate dist folder, folder app is a mirror of dist folder so you can debug it

On develop branch you will works in "app" folder
Each code that you change on app folder you need to run ```yarn build```

To start using nodemon you can run:
```sh
yarn watch
```

## Extra
- You can use insomnia collection to test request on debug mode

## Deploy build to production branch

After run ```yarn build``` on ```develop branch``` and push all changes to ```develop branch``` you need to run ```yarn prod```.
It will to ```prod branch``` get all new files and changed files and update repository. Finally it will go back to ```develop branch```.

## Start production mode API
copy .env file in dist folder to application-root/.env
Run ```node dist/server.js```.
Done!

## Congratulations

If you made it this far, you should have been able to run all environments without problems.