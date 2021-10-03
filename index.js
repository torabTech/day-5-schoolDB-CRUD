const express = require('express');
const app = express();

require('./api/db/dbconnection');


const studentRoutes = require('./api/routes/studentRoute');
const courseRoutes = require('./api/routes/courseRoute'); 

app.use(express.json());

app.use('/api/students',studentRoutes);
app.use('/api/students/:id/course',courseRoutes);

const port = process.env.port || 3000;

app.listen(port,function(){
    console.log(`Server is running at port: ${port}`);
});