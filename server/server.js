const express = require('express');
const path = require('path');

const mazeRouter = require('./routes/mazeRouter.js');
const listRouter = require('./routes/listRouter.js');

const authRouter = require('./routes/auth.js');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/stylesheets', express.static(path.join(__dirname, '../client/stylesheets')));

// all routes and fetch requests MUST start from '/api/' for webpack generic proxy to pick them up 
app.use('/api/maze', mazeRouter);
app.use('/api/list', listRouter);



//create route for sign up using router

app.use('/auth', authRouter, (req, res, next)=>{
res.status(200).send("From auth Route")
})





if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  })
}




app.use((req, res) => res.sendStatus(404));

// global error handler should be here:




app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));