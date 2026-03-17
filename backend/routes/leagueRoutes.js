const express = require('express');
const router = express.Router();
const { 
  getLeagues, 
  getLeague, 
  createLeague, 
  updateLeague, 
  deleteLeague 
} = require('../controllers/leagueController');

router.route('/')
  .get(getLeagues)
  .post(createLeague);

router.route('/:id')
  .get(getLeague)
  .put(updateLeague)
  .delete(deleteLeague);

module.exports = router;
