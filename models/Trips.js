import mongoose from 'mongoose';

const TripsSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
      required: [true, 'Please provide destination'],
    },
    nbtravelers: {
      adults: {
        type: Number,
        default: 1,
      },
      children: {
        type: Number,
        default: 0,
      },
    },
    duration: {
      type: Number,
      required: [true, 'Please provide duration'],
    },
    likes: { type: Number, default: 0 },
    theme: {
      enum: [
        'art, history, cultural',
        'romance / honeymoon',
        'safari, natural parks',
        'adventure and trekking',
        'sea and beaches',
        'moutain, lakes and rivers',
        'religious and spiritual places',
        'unusual trips',
        'luxury and charme',
        'family',
        'wellness',
      ],
      default: 'family',
    },
    cost: {
      type: Number,
      required: [true, 'Please provide cost'],
    },
    activities: { type: String },
    advices: { type: String },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'You need an account to add a Trip'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Trips', TripsSchema);
