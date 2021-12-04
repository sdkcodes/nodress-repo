# NODRESS

### Requirements

- Nodejs: If you don't already have Node.js on your machine install it from [http://nodejs.org](http://nodejs.org/).
- MongoDB: You can create a free instance at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register?v=1)
- Typescript
- Yarn: Nodejs package manager

### Setting up

The app needs some environment variables to run properly. Start by running `cp .env.example .env` to create the .env file from the sample .env.

Then proceed to fill in your app url as well database details.

Run `yarn install` to install all dependencies

### Development

Run `yarn dev` to start the development server

### Production

Run `yarn build` to compile the typescript source code into javascript. The built files will be in the `build` folder

### Available HTTP endpoints

GET /address - Returns all available addresses


POST /address - Creates new address


GET /address/{id} - Returns specific address


PATCH /address/{id} - Modifies specific address


DELETE /address/{id} - Permanently removes specific address
