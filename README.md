`react-starter-kit` is starter boilerplate for a universal web app to give the best the development experience to developer. It encourages the developer to use the best development practices and helps to focus on the development of app requirements instead of spending the time on creating the application architecture.

##### What's Being Used?

- [axios](https://www.npmjs.com/package/axios) for making AJAX calls to a server.
- [formik](https://www.npmjs.com/package/formik) for the management of form states & validation
- [react-fontawesome](https://www.npmjs.com/package/@fortawesome/react-fontawesome) to use the fortawesome icon in app
- [history](https://www.npmjs.com/package/history) to use browser's history in react-router-dom
- [lodash](https://www.npmjs.com/package/lodash) to use the utilities of Javascript
- [node-sass](https://www.npmjs.com/package/node-sass) for sass support
- [react](https://www.npmjs.com/package/react) for managing the presentation logic of application.
- [react-bootstrap](https://www.npmjs.com/package/react-bootstrap) for frontend template
- [react-redux](https://www.npmjs.com/package/react-redux) for generating and managing state model.
- [redux](https://www.npmjs.com/package/redux) for store based store management
- [redux-thunk](https://www.npmjs.com/package/redux-thunk) for redux middleware
- [styled-components](https://www.npmjs.com/package/styled-components) for the implementation of js based styling
- [universal-cookie](https://www.npmjs.com/package/universal-cookie) to utilize the browser cookies
- [yup](https://www.npmjs.com/package/yup) to manage the form validations

## Getting Started

In order to get started developing, you'll need to do a few things first.

1. Install all of the `node_modules` required for the package. Depending on the computer's configuration, you may need to prefix this command with a `sudo`.

```
npm install
```

or

```
sudo npm install
```

`yarn` can be used it is already installed

```
yarn install
```

or

```
sudo yarn install
```

2. Create `.env` environment file by making a duplicate of the `.env-example` and remove the `-example`. In the `.env` file and update all the credentials of your application.

3) Lastly, run the start command to get the project off the ground.

```
npm start
```

or

```
yarn start
```

4. Head over to [http://localhost:3000](http://localhost:3000) to see the app live!

## File Structure

### build/

This is where application will be compiled. Assets, like images and fonts, should be placed directly within this folder. Also in this folder is a default `index.html` file for serving up the application.

### src/

The client folder houses the client application for project. This is where client-side Javascript components (and their directly accompanying styles) live.

## Application Structure

### api/

API directory contains the api calls which are triggering through the app. The purpose of api/ directory is to create an abstract layer for api with function with the paramters. The parameters force the developer to use the payload which is required for api call.

### assets/

Assets contains images and css resources of app

### components/

Components contains all the feature of blocks application page. Components should work like feature based widgets and should be rendered through the `pages`.

### config/

Config directory contains all the configurations of the app like app name, api base path, api routes etc.

### elements/

Elements directory contains all the basic UI elements with required styling like form fields, dropdowns, buttons, tables, icons, cards, links, headings etc.

### layouts/

Layouts are the HOCS which contains all the page layouts which are being used in app like layout for admin dashboard, registered users & public site layout. And these layouts wraps the relevant routes though `routes`.

### pages/

Pages contains all the application pages or top level react-router components. Pages should be used to implement the layout/grid of any page.

#### pages/ducks/

Each ducks directory in pages directory contains all the resources/code related to parent page like action-types.js, actions.js, reducer.js. actions.js & reducer.js can be replaced with actions/ & reducers/ directory to break the fat files into small well-defined modules.

### routes/

Routes has the configuration of all the react routes which are being used in app.

### store/

Store directory has the redux store configuration and root reducer of app.

### utils/

Utilities that can be used by any part of application.
