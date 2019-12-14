<p align="center">
  <a href="https://cloudek.netlify.com/">
  <img src="https://raw.githubusercontent.com/abdurahman-ctis/ips-hackathor/master/clouddek.png?token=AIPDEMOGA5UCFFZZ6IL7WVS5553FE" alt="ClouDek Logo" height="300" >
  </a><br/>
  Web vulnerabilities incidents monitoring service using machine learning.
</p>

<div align="center">

[![Netlify Status](https://api.netlify.com/api/v1/badges/efe8616d-cf20-4867-9399-fd7957b63e5e/deploy-status)](https://app.netlify.com/sites/cloudek/deploys)

![image](https://github.com/aboudicheng/ClouDek-Dashboard/blob/master/resources/demo.gif)

</div>

## Description

Using ML models with 99.5% accuracy - 99.2% F1 Score, we are able to detect different web attack variants like XSS, SQLi, CSRF, Open Redirect, etc. The developer of a certain website could add our JS code, that routes all query params and submitted forms to our core microservice that parses this data and then communicates to the ML microservice to get confidence results.

This repository is reponsible for the data visualization by collecting the results from the microservice through a secure Websocket connection. Each potential attack to the injected website will immediately trigger and notify the dashboard and update the graphs accordingly.

## Tech Stack
<img src="https://raw.githubusercontent.com/abdurahman-ctis/ips-hackathor/master/tech%20stack.jpg?token=AIPDEMLP5ZTFIFBPLI5CR4K555S6U" alt="Tech Stack" >

The dependencies of this project include:
- [React](https://facebook.github.io/react/docs/hello-world.html)
- [Redux](http://redux.js.org/)
- [react-redux](https://github.com/reactjs/react-redux)
- [React Router v4](https://github.com/ReactTraining/react-router)
- [Ant Design](https://ant.design)
- [axios](https://github.com/axios/axios)
- [Sass](http://sass-lang.com/)
- [Chart.js](https://www.chartjs.org)
- [react-chartjs-2](https://github.com/jerairrest/react-chartjs-2)
- [Moment.js](https://momentjs.com)
- [create-react-app](https://github.com/facebook/create-react-app)