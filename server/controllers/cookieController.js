





const cookieController = {};


cookieController.setCookie = function(req, res, next){


  res.cookie('shopster_token', res.locals.token,{ httpOnly: true });
  return next();
};




module.exports = cookieController;