import mongoose from 'mongoose';

const TripSchema = new mongoose.Schema(
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
      type: String,
      enum: [
        'History and Cultural',
        'Romance and Honeymoon',
        'Safari, Natural parks',
        'Adventure and Trekking',
        'Sea and Beaches',
        'Mountains',
        'Safari and Natural Parks',
        'Religious and Spiritual Places',
        'Unusual trips',
        'Luxury and Charme',
        'Family',
        'Wellness',
      ],
      default: 'Wellness',
    },
    cost: {
      type: Number,
      required: [true, 'Please provide cost'],
    },
    activities: { type: String },
    advices: { type: String },
    mainImage: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'You need an account to add a Trip'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Trip', TripSchema);
