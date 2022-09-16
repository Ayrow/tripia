import express from 'express';
const router = express.Router();

import {
  register,
  login,
  updateUser,
  deleteUser,
} from '../controllers/authController.js';

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updateUser').patch(updateUser);
router.route('/deleteUser').delete(deleteUser);

export default router;
