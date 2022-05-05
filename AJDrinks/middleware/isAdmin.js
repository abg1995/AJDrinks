module.exports = (req, res, next) => {
    // checks if the user is logged in when trying to access a specific page
    if (!req.session.admin) {
      return res.send("You Dont Have Permission");
      
    }
    req.admin = req.session.admin;
    next();
  };