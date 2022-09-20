import Trip from '../models/Trip.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/index.js';

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

const getMyTrips = async (req, res) => {
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
  res.status(200).json({ msg: 'delete Trip' });
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
  getMyTrips,
  saveTrip,
  getAllSavedTrips,
  deleteSavedTrip,
  getAllTrips,
  getSingleTrip,
};
