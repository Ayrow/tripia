import mongoose from 'mongoose';

const TripsSchema = new mongoose.Schema({
  destination: {},
  nbtravelers: {},
  duration: {},
  likes: {},
  theme: {},
  cost: {},
  activities: {},
  Advices: {},
});

export default mongoose.model('Trips', TripsSchema);
