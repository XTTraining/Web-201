============================================================================================
# Indian Masala Restaurant App- Web 201 Assignemnt
============================================================================================
============================================================================================

## Featurs
- Load products from JSON server.
- User can search and filter the products
- Item can be added, removed and updated int the cart.
- User can pay through CASH, PayTM and PayPal.





To setup the project:
--------------------------------------------------------------------------------------------

1. node prompt  => npm install



Configurations:
--------------------------------------------------------------------------------------------
- In order to modify the product json server url. Please open src/js/common.js and modify it. 

Product JSON Server API : https://api.myjson.com/bins/6jyje


Build:
--------------------------------------------------------------------------------------------
node prompt -> npm run webpack-dev-build
               npm run webpack-prod-build 


Jasmine UNIT Test Suite:
--------------------------------------------------------------------------------------------
node prompt -> cd src 
               Jasmine

spec file path = src/spec/support/spec.js

ISSUE WITH importing our lib to jasime test suite.
------------
While import is indeed part of ES6, it is unfortunately not yet supported in NodeJS by default,
and has only very recently landed support in browsers.

Source: https://stackoverflow.com/questions/39436322/node-js-syntaxerror-unexpected-token-import