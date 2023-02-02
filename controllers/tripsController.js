import Trip from '../models/Trip.js';
import User from '../models/User.js';
import checkPermission from '../utils/checkPermission.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import { query } from 'express';

const addTrip = async (req, res) => {
  const { singleTrip } = req.body;
  const { destination, duration, cost } = singleTrip;
  if (!destination || !duration || !cost) {
    throw new BadRequestError('Please provide all required values');
  }
  req.body.singleTrip.createdBy = req.user.userId;

  const trip = await Trip.create(req.body.singleTrip);

  res.status(StatusCodes.CREATED).json({ trip });
};

const getAllTrips = async (req, res) => {
  const { search, sort, theme, maxPrice } = req.query;

  const queryObject = {};

  if (theme && theme !== 'any') {
    queryObject.theme = theme;
  }

  if (maxPrice && maxPrice !== 0) {
    queryObject.cost = { $lte: maxPrice };
  }

  if (search) {
    queryObject.destination = { $regex: search, $options: 'i' };
  }

  let result = Trip.find(queryObject);

  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }

  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }

  if (sort === 'a-z') {
    result = result.sort('destination');
  }

  if (sort === 'most saved') {
    result = result.sort('-likes');
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const everyTrips = await result;

  const totalTrips = await Trip.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalTrips / limit);

  res.status(StatusCodes.OK).json({ everyTrips, totalTrips, numOfPages });
};

const getUserTrips = async (req, res) => {
  let result = Trip.find({ createdBy: req.user.userId });
  const trips = await result;

  res.status(StatusCodes.OK).json({ trips });
};

const getSingleTrip = async (req, res) => {
  const { id: tripId } = req.params;
  const trip = await Trip.findOne({ _id: tripId });

  res.status(StatusCodes.OK).json({ trip });
};

const updateTrip = async (req, res) => {
  const { id: tripId } = req.params;

  const trip = await Trip.findOne({ _id: tripId });
  if (!trip) {
    throw new NotFoundError(`No trip with id : ${tripId}`);
  }

  checkPermission(req.user, trip.createdBy);

  const updatedTrip = await Trip.findOneAndUpdate({ _id: tripId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedTrip });
};

const deleteTrip = async (req, res) => {
  const { id: tripId } = req.params;
  const trip = await Trip.findOne({ _id: tripId });
  if (!trip) {
    throw new NotFoundError(`No trip with id : ${tripId}`);
  }
  checkPermission(req.user, trip.createdBy);
  await trip.remove();

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Successful! The trip has been removed.' });
};

const saveTrip = async (req, res) => {
  const { id } = req.body;

  const user = await User.findOne({ _id: req.user.userId });
  const trip = await Trip.findOne({ _id: id });

  if (!user) {
    throw new UnAuthenticatedError('You need an account to save a trip');
  }

  const updatedLikes = trip.likes + 1;

  await User.updateOne({ _id: req.user.userId }, { $addToSet: { saved: id } });

  await Trip.findOneAndUpdate({ _id: id }, { likes: updatedLikes });

  res.status(StatusCodes.OK).json({ user });
};

const getAllSavedTrips = async (req, res) => {
  const id = req.user.userId;

  const user = await User.findOne({ _id: id });
  const savedTrips = user.saved;

  const trips = await Trip.find({ _id: savedTrips });

  res.status(200).json({ trips, user });
};

const deleteSavedTrip = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: req.user.userId });
  const trip = await Trip.findOne({ _id: id });

  if (user) {
    await User.updateOne({ _id: req.user.userId }, { $pull: { saved: id } });
  }

  const updatedLikes = trip.likes - 1;
  await Trip.findOneAndUpdate({ _id: id }, { likes: updatedLikes });

  res.status(200).json({ user });
};

export {
  addTrip,
  updateTrip,
  deleteTrip,
  getUserTrips,
  saveTrip,
  getAllSavedTrips,
  deleteSavedTrip,
  getAllTrips,
  getSingleTrip,
};
