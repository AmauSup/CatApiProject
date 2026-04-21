const express = require('express');
const router = express.Router();
const { vote } = require('../controllers/voteController');
// const auth = require('../middlewares/auth'); // à activer après l'auth
router.post('/', /*auth,*/ vote);
module.exports = router;
