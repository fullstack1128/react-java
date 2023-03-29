# Front-End App
## Installation

#### Install Node Modules
```
npm install
```

#### Create env.js File
You will find a example.env.js file in the home directory. Paste the contents of that into a file named env.js in the app directory.
Fill in the variables to fit your application

#### Run server dev
```
npm start
```

## Build

Provide **GA_TRACKING_ID** in `app/env.js` to enable Google Analytics.

Run one of the bellow commands to bump a new package version before build:

| Command                | Example                                      |
| ---------------------- | -------------------------------------------- |
| npm version major      | v0.0.0 -> v1.0.0                             |
| npm version minor      | v0.0.0 -> v0.1.0                             |
| npm version patch      | v0.0.0 -> v0.0.1                             |
| npm version prerelease | v0.0.0 -> v0.0.1-0 <br> v0.0.1-0 -> v0.0.1-1 |

Run `npm run build` to build the app.
  
## Run local

Type windows+R or open "Run"

Execute the following command:

chrome.exe --user-data-dir="D://log" --disable-web-security
  
  
## COLOR
background-image: linear-gradient(100deg, #618fb6, #1b385f); 
background-image: linear-gradient(100deg, #465bb6, #16335f);
  
  bg-info: #17a2b8
  
