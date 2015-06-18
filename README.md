# OpenCloudBBQ Sample Application

This is a sample application used to demonstrate the possibility of developing Node.js apps using Visual Studio Code on Linux, using Azure services within those apps, and deploying those apps as Azure Web Apps.

Demonstrated on Microsoft's [Open Cloud BBQ](https://msevents.microsoft.com/CUI/EventDetail.aspx?EventID=1032632601&Culture=HR-HR&community=0) event on Jun 18th, 2015 in Zagreb, Croatia.

## Usage

- Download [Visual Studio Code](https://code.visualstudio.com/)
- Install [node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
- `npm install -g express express-generator`
- Clone this Git repository
  - `git clone git@github.com:nikolaplejic/azure-opencloudbbq.git`
- Within the cloned folder, run `npm install` to pull the dependencies
- Open Visual Studio Code with the cloned repo as the working directory
  - `cd azure-opencloudbbq && Code .`
- `cp config.example.js config.js`
- Open & edit DocumentDB connection strings in config.js
- Run / debug / code!

## Azure Services Used

- deployment: [Web Apps](https://azure.microsoft.com/en-us/documentation/articles/web-sites-nodejs-develop-deploy-mac/)
- storage: [DocumentDB](https://azure.microsoft.com/en-us/documentation/articles/documentdb-nodejs-application/)

## Files of Note

- `models/documentDBUtils.js` -- a collection of helper functions for DocumentDB found in the tutorial linked above