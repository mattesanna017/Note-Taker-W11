const noteTaker = require('express').Router();
const { readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');



noteTaker.get('/', (req,res) => {
    console.info(`${req.method} request received `);
    
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

noteTaker.post('/', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received`);


    // Destructuring assignment for the items in req.body
    const { title,text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newText = {
        title,
        text,
        text_id: uuid(),
      };
  
      readAndAppend(newText, './db/db.json');
  
  
      const response = {
        status: 'success',
        body: newText,
      
      };
  
      res.json(response);
    } else {
      res.json('Error in posting text');
    }
  });

 
  module.exports = noteTaker;