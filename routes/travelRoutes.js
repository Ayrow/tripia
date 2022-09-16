import express from 'express';
const router = express.Router();

import {
  getAllTrips,
  addTrip,
  editTrip,
  deleteTrip,
  saveTrip,
  getAllSavedTrips,
  deleteSavedTrip,
} from '../controllers/tripsController.js';

router.route('/').post(addTrip).get(getAllTrips);
router.route('/myTrips/:id').patch(editTrip).delete(deleteTrip);
router.route('/saved').post(saveTrip).get(getAllSavedTrips);
router.route('/saved/:id').delete(deleteSavedTrip);

export default router;
