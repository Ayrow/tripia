import express from 'express';
const router = express.Router();

import {
  getAllTrips,
  addTrip,
  editTrip,
  deleteTrip,
} from '../controllers/tripsController.js';

router.route('/').post(addTrip).get(getAllTrips);
router.route('/:id').patch(editTrip).delete(deleteTrip);

export default router;
