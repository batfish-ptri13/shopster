const fs = require('fs');
const path = require('path');

const userController = {};

// checks if username and password exist in users json file and saves result in res.locals
userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  
  const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8'));
  for (let user of users) {
    if (user.username === username && user.password === password) {
      const { name, email, age, height, weight, menopause } = user;
      res.locals.user = {
        name,
        email,
        age,
        height,
        weight,
        menopause
      };
      return next();
    }
  }
  res.locals.user = null;
  next();
}

module.exports = userController;