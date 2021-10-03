const mongoose = require('mongoose');
require('../model/schoolSchema');


mongoose.connect('mongodb://localhost/pr_12')
    .then(()=>console.log('Database connection established...'))
    .catch(err=> console.log(err));

