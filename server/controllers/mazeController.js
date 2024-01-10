const db = require('../models/shopsterModels.js');

// define function generating an error obj for global error handling here:


const mazeController = {};

// add controller middleware here:
mazeController.xxx = (req, res, next) => {
  next();
};

module.exports = mazeController;