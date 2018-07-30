
# Book Store App

This project is developed as an assignment to try out the newly learnt skills of Javascript, CSS3 and HTML5. This project is a library website application.

## Getting Started

1. Download the project and extract locally
2. To initialize project, run `npm install` in command prompt
3. To build the project, run command `npm run build`
4. To execute project in live Production environment, run command `npm run start:Prod`

### Prerequisites

1. Install Node and NPM

```
http://blog.teamtreehouse.com/install-node-js-npm-windows
```

### Installing

1. Download the code

2. Initialize packages

```
npm install
```

3. Build the project

```
npm run build
```
4. Run the project in Development environment

```
npm run start:Dev
```


## Deployment

This project has implemented Servie-Worker. In some browsers, there are minor errors logged. Run the below command to get rid of the error:
navigator.serviceWorker.getRegistration().then(function(r){r.unregister();});

## Built With

* [Firebase](https://firebase.google.com/) - The databse framework used
* [lscache](https://www.npmjs.com/package/lscache) - Caching mechanism
* [handlebars](https://handlebarsjs.com/) - To build semantic templates effectively


## Authors

* **Chandana Mandal** - *Initial work* 


```
Disclaimer: As discussed in initial meeting with Shailesh, I have selected to create a books website instead of "Food App".
```

