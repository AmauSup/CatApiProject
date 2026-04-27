const express = require('express');
const router = express.Router();
const tournoiController = require('../controllers/tournoiController');


router.post('/start', tournoiController.startTournoi);
router.get('/', tournoiController.getTournoi);
router.post('/vote', tournoiController.voteMatch);
router.get('/bracket', tournoiController.getBracket);
router.delete('/', tournoiController.deleteTournoi);

module.exports = router;
