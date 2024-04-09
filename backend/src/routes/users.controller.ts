import * as bcrypt from 'bcryptjs';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import validator from '../helpers/validator';
import { UserModel } from '../model/User';
import { Settings } from './../environment/config';
import schema from './schema';

const userRoutes = express.Router();

userRoutes.post('/register', validator(schema.signup), async (req, res) => {
  //checking user email in DB
  const emailExit = await UserModel.findOne({
    email: req.body.email,
  });
  if (emailExit) return res.status(400).send('Email already exits.');
  // hash Password
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

// User Login

userRoutes.post('/login', validator(schema.userCredential), async (req, res) => {
  // checking email
  const user = await UserModel.findOne({
    email: req.body.email,
  });
  if (!user) return res.status(400).send('Email address not found!');
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid Password!');
  const token = jwt.sign({ _id: user._id }, Settings.secret_Token);
  res.header('auth-token', token).send({ token: token, user: { id: user.id, name: user.name, email: user.email } });
});

export { userRoutes };

