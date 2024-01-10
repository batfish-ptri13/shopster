const express = require('express');
const path = require('path');

// const userController = require('./controllers/userController.js');
const questionnaireRouter = require('./routes/questionnaireRouter.js');

const app = express();
const PORT = 3000;
process.env.TZ = 'UTC';

app.use(express.json());

app.use('/stylesheets', express.static(path.join(__dirname, '../client/stylesheets')));

// all routes and fetch requests MUST start from '/api/' for generic proxy to pick them up 
app.use('/api/questionnaire', questionnaireRouter);

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  })
}

// app.post('/login', userController.verifyUser, (req, res) => {
//   if (res.locals.user === null) res.send('Sorry! Unsuccessfull login.');
//   else res.json(res.locals.user);
// });

app.use((req, res) => res.sendStatus(404));

// global error handler

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));