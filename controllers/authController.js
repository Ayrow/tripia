import User from '../models/User.js';
import Trip from '../models/Trip.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if ((!username, !email, !password)) {
    throw new BadRequestError('please provide all values');
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use');
  }

  const usernameTaken = await User.findOne({ username });
  if (usernameTaken) {
    throw new BadRequestError('This username is already taken');
  }

  const user = await User.create({ username, email, password });

  const token = await user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      username: user.username,
      email: user.email,
      password: user.password,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide all values');
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new UnAuthenticatedError('Invalid credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid credentials');
  }

  const token = await user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token });
};

const updateUser = async (req, res) => {
  res.status(200).send('updateUser');
};

const deleteUser = async (req, res) => {
  const id = req.user.userId;
  await User.findOneAndDelete({ _id: id });
  await Trip.findOneAndDelete({ createdBy: id });

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Success! Account and trips have been deleted' });
};

export { register, login, updateUser, deleteUser };
