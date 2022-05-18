const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token || token === '')
      return res.json({ error: 'Unauthorised request' });

    const verified = jwt.verify(token, process.env.SESSION_SECRET);

    req.username = verified.username;
    next();
  } catch (error) {
    res.json({ error: 'Unauthorised request' });
  }
}

module.exports = auth;
