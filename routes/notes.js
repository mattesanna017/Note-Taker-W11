const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend} = require('../helpers/fsUtils');


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

  notes.delete('/:text_id', (req, res) => {
    const textId = req.params.text_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        
        const result = json.filter((notes) => notes.text_id !== textId);
  
        writeToFile('./db/db.json', result);
  
        res.json(`Item ${textId} has been deleted 🗑️`);
      });
  });


 
  module.exports = notes;