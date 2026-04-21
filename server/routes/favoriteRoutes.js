const express = require('express');
const router = express.Router();
const favCtrl = require('../controllers/favoriteController');
// const auth = require('../middlewares/auth'); // à activer après l'auth
router.post('/', /*auth,*/ favCtrl.add);
router.delete('/', /*auth,*/ favCtrl.remove);
router.get('/', /*auth,*/ favCtrl.list);
module.exports = router;
