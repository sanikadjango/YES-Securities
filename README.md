# YES-Securities Assignment

Tasks covered:
Created APIs to perform various CRUD operations on Linked List.
Created Nodes as MongoDB objects and wrote APIs to save and retrieve them.


Pre-requisites:
Node v13.1.0, Mongodb v4.2.3


Installation:
Install the dependencies:
npm install

Just make sure mongodb is running:
mongod --dbpath /data/db port --27017 (Replace dbpath and port)
  
npm start

To make requests,run the following files:
Create linkedlist : input.js,
Add node : add.js,
Delete node : delete.js,
Print : print.js,
Search node: search.js

Make requests from browser for  the following:
Get size : localhost:3000/size,
Save nodes in Mongodb : localhost:3000/save,
Get Nodes from db : localhost:3000/getNodes
  



