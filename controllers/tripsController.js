import Trip from '../models/Trip.js';
import checkPermission from '../utils/checkPermission.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

const addTrip = async (req, res) => {
  const { destination, duration, cost } = req.body;
  if (!destination || !duration || !cost) {
    throw new BadRequestError('Please provide all values');
  }
  req.body.createdBy = req.user.userId;
  const trip = await Trip.create(req.body);
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

const editTrip = async (req, res) => {
  res.status(200).json({ msg: 'edit Trip' });
};

const deleteTrip = async (req, res) => {
  const { id: tripId } = req.params;
  console.log(id);
  const trip = await Trip.findOne({ _id: tripId });
  if (!trip) {
    throw new NotFoundError(`No job with id : ${jobId}`);
  }
  checkPermission(req.user, trip.createdBy);
  await trip.remove();

  res.status(200).json({ msg: 'Successful! The trip has been removed.' });
};

const saveTrip = async (req, res) => {
  res.status(200).json({ msg: 'save Trip' });
};

const getAllSavedTrips = async (req, res) => {
  res.status(200).json({ msg: 'get all saved trips' });
};

const deleteSavedTrip = async (req, res) => {
  res.status(200).json({ msg: 'delete saved trip' });
};

export {
  addTrip,
  editTrip,
  deleteTrip,
  getUserTrips,
  saveTrip,
  getAllSavedTrips,
  deleteSavedTrip,
  getAllTrips,
  getSingleTrip,
};
