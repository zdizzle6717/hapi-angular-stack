# Zack's Demo Hapi Stack
This is a demo stack with node.js, hapi.js, angularjs 1.x, and postgreSQL.

REQUIREMENTS:
Node.js - https://nodejs.org/en/download/package-manager/
Ruby - https://www.ruby-lang.org/en/documentation/installation/
postgreSQL - https://www.npmjs.com/package/pg


TO INSTALL: sudo npm install
(May require installing a few node packages globally)

TO COMPILE: npm run build
(App is compiled into dist folder)


This app demonstrates building a functional from end UI/UX with Angular 1.x in a modular design pattern.  Using CommonJs allows for organizing the code with an easy to navigate structure.  

The builder (build.js) will start at the root index.js file of the /app folder, transpile the code from modern ES6 to cross-browser compatible ES5 javascript.  Running npm build also compiles SCSS files starting at the declared root file.  Scss will import all branches of the stylesheet and output a single CSS file in the /dist directory.


