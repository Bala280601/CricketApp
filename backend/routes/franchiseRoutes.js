const express = require('express');
const router = express.Router();
const { 
  getFranchises, 
  getFranchise, 
  createFranchise, 
  updateFranchise, 
  deleteFranchise 
} = require('../controllers/franchiseController');

router.route('/')
  .get(getFranchises)
  .post(createFranchise);

router.route('/:id')
  .get(getFranchise)
  .put(updateFranchise)
  .delete(deleteFranchise);

module.exports = router;
