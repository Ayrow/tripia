import Trip from '../models/Trip.js';
import User from '../models/User.js';
import checkPermission from '../utils/checkPermission.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

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
  let result = Trip.find({});
  const everyTrips = await result;

  res.status(StatusCodes.OK).json({ everyTrips });
};

const getUserTrips = async (req, res) => {
  let result = Trip.find({ createdBy: req.user.userId });
  const trips = await result;

  res.status(StatusCodes.OK).json({ trips });
};

const getSingleTrip = async (req, res) => {
  const { id: tripId } = req.params;
  let trip = await Trip.findOne({ _id: tripId });
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

  // const trip = await Trip.findOne({ _id: id });
  const userExists = await User.findOne({ _id: req.user.userId });
  if (!userExists) {
    throw new UnAuthenticatedError('You need an account to save a trip');
  }

  await User.updateOne({ _id: req.user.userId }, { $addToSet: { saved: id } });

  res.status(StatusCodes.OK).json({ msg: 'The trip has been saved' });
};

const getAllSavedTrips = async (req, res) => {
  res.status(200).json({ msg: 'get all saved trips' });
};

const deleteSavedTrip = async (req, res) => {
  res.status(200).json({ msg: 'delete saved trip' });
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
