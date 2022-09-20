import express from 'express';
const router = express.Router();

import {
  getAllTrips,
  getSingleTrip,
  getUserTrips,
  addTrip,
  editTrip,
  deleteTrip,
  saveTrip,
  getAllSavedTrips,
  deleteSavedTrip,
} from '../controllers/tripsController.js';

import authenticateUser from '../middleware/auth.js';

router.route('/').get(getAllTrips);
router
  .route('/usertrips')
  .post(authenticateUser, addTrip)
  .get(authenticateUser, getUserTrips);
router
  .route('/usertrips/saved')
  .post(authenticateUser, saveTrip)
  .get(authenticateUser, getAllSavedTrips);

router.route('/usertrips/saved/:id').delete(authenticateUser, deleteSavedTrip);
router
  .route('/usertrips/:id')
  .patch(authenticateUser, editTrip)
  .delete(authenticateUser, deleteTrip);
router.route('/:id').get(getSingleTrip);

export default router;
