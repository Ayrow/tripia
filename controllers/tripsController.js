const addTrip = (req, res) => {
  res.status(200).json({ msg: 'add Trip' });
};

const getAllTrips = (req, res) => {
  res.status(200).json({ msg: 'get all trips' });
};

const editTrip = (req, res) => {
  res.status(200).json({ msg: 'edit Trip' });
};

const deleteTrip = (req, res) => {
  res.status(200).json({ msg: 'delete Trip' });
};

export { addTrip, editTrip, deleteTrip, getAllTrips };
