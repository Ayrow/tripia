const addTrip = async (req, res) => {
  res.status(200).json({ msg: 'add Trip' });
};

const getAllTrips = async (req, res) => {
  res.status(200).json({ msg: 'get all trips' });
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
  getAllTrips,
  saveTrip,
  getAllSavedTrips,
  deleteSavedTrip,
};
