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
  const { username, email, about, password } = req.body;
  const user = await User.findOne({ _id: req.user.userId });
  const usernameTaken = await User.findOne({ username });
  const emailTaken = await User.findOne({ email });

  if (usernameTaken && usernameTaken?._id.toString() !== user._id.toString()) {
    throw new BadRequestError('This username is already taken');
  }

  if (
    !username ||
    !usernameTaken ||
    usernameTaken?._id.toString() === user._id.toString()
  ) {
    user.username = username;
  }

  if (emailTaken && emailTaken?._id.toString() !== user._id.toString()) {
    throw new BadRequestError('This username is already taken');
  }
  if (
    !email ||
    !emailTaken ||
    emailTaken?._id.toString() === user._id.toString()
  ) {
    user.email = email;
  }

  user.about = about;

  if (password) {
    Object.assign(user, req.body);
  }

  await user.save();

  const token = await user.createJWT();

  res.status(StatusCodes.CREATED).json({ user, token });
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
