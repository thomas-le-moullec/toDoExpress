const express = require('express')
const app = express();

app.get('/', (req, res) => {
  res.send('To Do List App Homepage!')
});

app.listen(8000, () => {
  console.log('To Do List App listening on port 8000!')
});