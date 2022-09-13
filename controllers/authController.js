import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/index.js';

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if ((!username, !email, !password)) {
    throw new BadRequestError('please provide all values');
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError('email already in use');
  }

  const usernameTaken = await User.findOne({ username });
  if (usernameTaken) {
    throw new BadRequestError('this username is taken');
  }

  const user = await User.create({ username, email, password });

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      username: user.username,
      email: user.email,
      password: user.password,
    },
    token,
  });
};

const login = (req, res) => {
  res.status(200).send('login');
};

const updateUser = (req, res) => {
  res.status(200).send('updateUser');
};

export { register, login, updateUser };
