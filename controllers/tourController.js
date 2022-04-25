const fs = require('fs')
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))
const Tour = require('./../models/tour_model')
const APIFeatures= require('./../utils/apiFeatures.js')



exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage, price';
    req.query.fields = 'name,price, ratingsAverage, summary, difficulty';
    next();

}
exports.getAllTours = async(req, res) => {
    try {

        //EXECUTE QUERY
        const features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().paginate()
        const tours = await features.query;
        
        // const tours = await Tour.find().where('duration').equals(5).where("difficulty").equals('easy')
        // console.log(req.query)

    res.status(200).json({
        "status": "success",
        results: tours.length,
        "data":{
            tours: tours
        }
    })
    } catch(err) {
        res.status(404).json({
            status: "fail",
            message: err
            
        })
  }
    }

exports.getTour =async (req,res)=>{
    try {
        const tour = await Tour.findById(req.params.id)
        res.status(200).json({
        status: "success",
        data:{
            tour:tour
        }
        }
     )

    } catch (err){
        res.status(404).json({
            status: "fail",
            message: err
        })
    }
   
    }



exports.createNewTour = async (req, res) => {
    try {
        const newTour=await Tour.create(req.body)
   
    res.status(201).json({
    
        status: 'success',
        data:{
            tour: newTour
        }
    })
    } catch(err) {
        res.status(400).json(
            {
                status: "fail",
                message: err
            }
        )
    }
   
}

exports.updateTour =async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
          })
        res.status(200).json({
        status: 'success',
        data:{
        tour: tour
         }
        })
    } catch (err){
         res.status(400).json(
        {
        status: "fail",
        message: err
        }
        )
        }
    
       
    }
exports.deleteTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(400).json(
            {
                status: "fail",
                message: err
            }
        )
    }
}

exports.getTourStats = async (req, res) => {
    try {
        const stats = await  Tour.aggregate(
            [{
                $match: { rating: { $gte: 2.5 } }
            }, {
                $group: {
                    _id: '$difficulty',
                    num: {$sum: 1},
                    numRatings: { $sum: '$ratingsQuantity'},
                    avgRating: { $avg: '$rating' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }
                }
                },
                {
                    $sort:{ avgPrice: -1}
                 } 
                
                //     $match: {_id:{$ne: 'EASY'}}
                // }
               
            ]
        );
        res.status(200).json({
            status: 'success',
            data: { stats }
        })
        
        
        
    }catch (err) {
        res.status(400).json(
            {
                status: "fail",
                message: err
            }
        )
    }
}
