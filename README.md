# Zack's Hapi Stack Demo w/ AngularJs 1.x
This is a basic demo stack with node.js, hapi.js, angularjs 1.x, and postgreSQL.  Similar demo with ReactJs coming soon!

REQUIREMENTS:
Node.js - https://nodejs.org/en/download/package-manager/
postgreSQL - https://www.npmjs.com/package/pg


TO INSTALL: (sudo) npm install

TO COMPILE: (sudo) npm run build
(App JS and CSS is compiled into dist folder)


This app demonstrates building a functional from end UI/UX with Angular 1.x in a modular design pattern.  Using CommonJs allows for organizing the code with an easy to navigate structure.  The included build tool is similar to using webpack.  It simply compiles several .js files into one cross-browser compatible .js file.  It then compiles .scss files into one compatible .css file.

The API is built with Hapi.js and uses sequelize.js as an ORM between the server and PostgreSQL database.  Hapi.js outperforms Express.js and is great for team building organization of concerns.  Hopefully this models a good starting point and architecture for any relational data-centric application.

I will soon be building something similar with a ReactJs frontend as opposed to AngularJs.


