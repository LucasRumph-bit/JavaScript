const express = require('express');

const router = express.router();
const User = require('../src/view/view');

router.get('/', Usercontroller.getAll);
router.get('/:id', Usercontroller.getById);
router.post('/', Usercontroller.create);
router.put('/:id', Usercontroller.update);
router.delete('/:id', Usercontroller.delete);

module.exports = router;
