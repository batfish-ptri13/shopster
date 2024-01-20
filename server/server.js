const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');


const mazeRouter = require('./routes/mazeRouter.js');
const listRouter = require('./routes/listRouter.js');

const authRouter = require('./routes/auth.js');
const app = express();
const PORT = 3000;

app.use(express.json());
//Added to parse cookies and Encode Url


app.use('/stylesheets', express.static(path.join(__dirname, '../client/stylesheets')));

// all routes and fetch requests MUST start from '/api/' for webpack generic proxy to pick them up 
app.use('/api/maze', mazeRouter);
app.use('/api/list', listRouter);



//create route for sign up using router
app.use('/auth', authRouter);





if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });
}



app.use((req, res) => res.sendStatus(404));

// global error handler should be here:
// app.use((err, req, res, next) => {
//   const defaultErr = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 500,
//     message: { err: 'An error occurred' },
//   };
//   const errorObj = Object.assign(defaultErr, err);
//   console.log(errorObj.log);
//   res.status(errorObj.status).json(errorObj.message);
// });



app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));