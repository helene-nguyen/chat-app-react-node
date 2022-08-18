# React Chat application

## Introduction

Simple realtime chat app in React JS using ReactJS and NodeJS

If you want to test it the chat app :

```
git clone --ssh link
```

And just 

```
npm run init
```

Then 

```
npm run watch
```

And ...

Join a room :)

## Some advices to use both server at the same time

In the same file, create :

- app for server
- client for React application

## For server

Use package concurrently to launch 2 servers 

```
npm i concurrently
```

Use

```
--prefix
```

To look for a specific file


package.json

```js
{

  "type": "module",
  "name": "server",
  "version": "1.0.0",
  "description": "react chat app",
  "main": "index.js",

  "scripts": {
    "start": "node index.js",
    "dev": "nodemon --inspect index.js",
    "client": "npm start --prefix ../client",
    "watch": "concurrently \"npm run dev\" \"npm run client\""
  },

  "author": "yumicode",
  "license": "MIT",
  "dependencies": {
    "concurrently": "^7.3.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.1",
    "express": "^4.18.1",
    "socket.io": "^4.5.1"
  }

}
```

## For client

Don't forget to add "proxy"

```js
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.3.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "react-scroll-to-bottom": "^4.2.0",
    "socket.io-client": "^4.5.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  
  "proxy": "http://localhost:4101", //--------------- HERE
  
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```


___ 

Sources : 

https://www.youtube.com/watch?v=NU-HfZY3ATQ