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
  getAllTrips,
  getSingleTrip,
} from '../controllers/tripsController.js';

import authenticateUser from '../middleware/auth.js';

router.route('/').get(getAllTrips);
router.route('/:id').get(getSingleTrip);
router
  .route('/myTrips')
  .post(authenticateUser, addTrip)
  .get(authenticateUser, getMyTrips);
router
  .route('/myTrips/:id')
  .patch(authenticateUser, editTrip)
  .delete(deleteTrip);
router
  .route('/saved')
  .post(authenticateUser, saveTrip)
  .get(authenticateUser, getAllSavedTrips);
router.route('/saved/:id').delete(authenticateUser, deleteSavedTrip);

export default router;
