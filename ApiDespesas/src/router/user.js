const express = require('express');
const authMiddleware = require('../middleware/auth')

const router = express.router();
const User = require('../view/view');

router.get('/', authMiddleware, Express.g);
router.get('/:id', Usercontroller.getById);
router.post('/', Usercontroller.create);
router.put('/:id', Usercontroller.update);
router.delete('/:id', Usercontroller.delete);

module.exports = router;
