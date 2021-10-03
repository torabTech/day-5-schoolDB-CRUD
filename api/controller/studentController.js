const mongoose = require('mongoose');
const Student = mongoose.model('Student');


getAll = function(req,res){
    let offset = 0;
    let count = 5;

    if(req.query && req.query.offset) offset = parseInt(req.query.offset);
    if(req.query && req.query.count) count = parseInt(req.query.count);

    console.log(`${offset} -- ${count}`)
    
    Student.find()
        .skip(offset)
        .limit(count)
        .exec(function(err,data){
            if(err){
                res.status(500).json(err.message);
                return;
            }

            res.status(200).json(data);
        });
}

getOne = function(req,res){
    const checkID = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!checkID){
        res.status(400).json({message:'invalid ID has been provided'});
        return;
    }

    Student.findById(req.params.id).exec(function(err,data){
        if(err){
            res.status(500).json(err.message);
            return;
        }

        if(!data){
            res.status(404).json({message: 'Document Not Found!..'});
            return;
        }
        res.status(200).json(data);
    });
}


addOne = function(req,res){
    if(Object.keys(req.body).length == 0){
        res.status(400).json({message : 'Please provide body data'});
        return;
    }

    const data = {
        name : req.body.name,
        gpa  : req.body.gpa,
        course : [{
            name: req.body.course[0].name,
            professor : req.body.course[0].professor
        }]
    }

    Student.create(data , function(err,result){
        if(err){
            res.status(500).json(err.message);
            return;
        }

        res.status(200).json(result);
    });


}

deleteOne = function(req,res) {
    const checkSID = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!checkSID){
        res.status(400).json({message : 'Invalid ID...'});
        return;
    }

    Student.findByIdAndDelete(req.params.id).exec(function(err,result){
        if(err){
            res.status(500).json(err.message);
            return;
        }

        if(!result){
            res.status(500).json({message : 'Document not found!'});
            return;
        }
        //result returns the deleted document back
        res.status(200).json({message : 'Document successfully deleted'});
    });
}

updateOne = function(req,res){
    const checkSID = mongoose.Types.ObjectId.isValid(req.params.id);

    if(!checkSID){
        res.status(400).json({message : 'Invalid ID...'});
        return;
    }

    if(Object.keys(req.body).length == 0){
        res.status(400).json({message : 'Body data not found!'});
        return;
    }
    Student.findByIdAndUpdate(req.params.id,{
        $set: {
            name: req.body.name,
            gpa : req.body.gpa
        } 
    
    } , function(err,result){
        if(err){
            res.status(500).json(err.message);
            return;
        }

        res.status(200).json(result);
    });

}


module.exports = {
    getAll : getAll,
    getOne : getOne,
    addOne : addOne,
    deleteOne : deleteOne,
    updateOne : updateOne
}