const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils');


notes.get('/', (req,res) => {
    console.info(`${req.method} request received `);
    
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.info(`${req.method} request received`);


   
    const { title,text } = req.body;
  
 
    if (title && text) {
      const noteText = {
        title,
        text,
        text_id: uuid(),
      };
  
      readAndAppend(noteText, './db/db.json');
  
  
      const response = {
        status: 'success',
        body: noteText,
      
      };
  
      res.json(response);
    } else {
      res.json('Error in posting text');
    }
  });

 
  module.exports = notes;