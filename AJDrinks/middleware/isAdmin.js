module.exports = (req, res, next) => {
    // checks if the user is logged in when trying to access a specific page
    if (!req.session.user.admin) {
      return res.send("You Dont Have Permission");
      
    }
    req.user = req.session.user;
    next();
  };