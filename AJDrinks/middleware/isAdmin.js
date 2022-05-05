module.exports = (req, res, next) => {
    // checks if the user is logged in when trying to access a specific page
    if (req.session.isAdmin == false) {
      return res.send("You Dont Have Permission");
    }
    
    next();
  };