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

function authMobile(req, res, next) {
  try {
    const token = req.body.token;

    if (!token || token === '') return res.status(401);

    const verified = jwt.verify(token, process.env.SESSION_SECRET);

    req.username = verified.username;
    next();
  } catch (error) {
    res.status(401).send();
  }
}

module.exports = { auth: auth, authMobile: authMobile };
