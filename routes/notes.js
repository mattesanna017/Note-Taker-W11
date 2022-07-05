const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils');


notes.get('/', (req,res) => {
    console.info(`${req.method} has been request received `);
    
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.info(`${req.method} has been request received`);


   
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

  notes.delete('/api/notes/:text_id', (req, res) => {
    const noTextId = req.params.text_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        
        const result = json.filter((notes) => notes.text_id !== noTextId);
  
        writeToFile('./db/db.json', result);
  
        res.json(`Item ${noTextId} has been deleted `);
      });
  });


 
  module.exports = notes;