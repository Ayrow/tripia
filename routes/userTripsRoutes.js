import express from 'express';
const router = express.Router();

import {
  getMyTrips,
  addTrip,
  editTrip,
  deleteTrip,
  saveTrip,
  getAllSavedTrips,
  deleteSavedTrip,
} from '../controllers/tripsController.js';

router.route('/myTrips').post(addTrip).get(getMyTrips);
router.route('/myTrips/:id').patch(editTrip).delete(deleteTrip);
router.route('/saved').post(saveTrip).get(getAllSavedTrips);
router.route('/saved/:id').delete(deleteSavedTrip);

export default router;
