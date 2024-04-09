import * as jwt from 'jsonwebtoken';
import { Settings } from './../environment/config';

function verifyToken(req, res, next) {
  const token = req.header('auth-token');
  if (!token) res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, Settings.secret_Token);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
}

export { verifyToken };

