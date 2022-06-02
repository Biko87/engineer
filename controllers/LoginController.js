function login(req, res) {
    res.render('/login');
  }

  
function registro(req, res) {
    res.render('/registro');
  }

  module.exports = {
    login: login,
    registro: registro,
  }