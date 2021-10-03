const express = require('express');
const router = express.Router({mergeParams:true});


const controller = require('../controller/courseController');

router.route('/')
    .get(controller.getAll)
    .post(controller.addOne);

router.route('/:cid')
    .get(controller.getOne)
    .put(controller.updateOne)
    .delete(controller.deleteOne);


module.exports = router;