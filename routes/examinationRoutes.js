const express = require('express');
const controller = require('../controllers/examinationController');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.get('/assessment/:parentId', controller.getByParent);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
