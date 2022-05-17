
const mongoose = require("mongoose")
const slugify = require('slugify')
const validator = require('validator')
const User =require('./usermodel')

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
        trim: true,
        maxlength: [40, 'A tour name must have less or equal than 40 characters'],
        minlength: [10, 'A tour name must have more or equal than 10 characters'],
        // validate: [validator.isAlpha,'Tour name must only contain characters']

    },
    slug: String,
    rating: {
        type: Number,
        default: 4.5,
        min: [1, "Rating must be above 1.0"],
        max: [5, "Rating must be below 5.0"]
      
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    },
    
    duration: {
        type: Number, 
        required: [true, "A tour must have a duration"]
    },
    maxGroupSize: {
        type: Number,
        required: [true, "A tour must have a group size"]
    

    },
    difficulty: {
        type: String,
        required: [true, "A tour must have a difficulty"],
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message:'Difficulty is either: easy, medium, difficult'
        }
    },
    rating: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, "A tour must have a price"]
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function (val) {
            //This only points to current doc on NEW document creation - wont work for update
            return val < this.price; 

            },
            message:"Discount price ({VALUE}) should be below the regular price"
        
        }
        
    },
    summary: {
        type: String,
        trim: true,
        required: [true, "A tour must have a description"]
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, " A tour must have a cover image"]

    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now()

    },
    startLocation: {
        //Geo JSON
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']

        },
        coordinates: [Number],
        address: String,
        description: String
    },
    locations: [
        {
            type: {
                type: String,
                default: 'Point',
                enum:['Point']
            },
            coordinates: [Number],
            address: String,
            description: String,
            day: Number
        }
    
    ],
    guides: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'

    }
    ],
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default:false
    }

},
//     {
//         toJSON: {
//         virtuals: true
//         },
        
//         toObject: {
//                 virtuals: true
//             }
        
    // }
);

// tourSchema.virtual('durationWeeks').get(function () {
//     return this.duration / 7;
// })


// //DOCUMENT MIDDLEWARE : runs before .save() and .create()
tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next();
})
tourSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'guides',
        select: '-__v -passwordChangedAt'
    })
    next()
})
// tourSchema.pre('save',  async function (next) {
//     const guidesPromises = this.guides.map(async id => await User.findById(id))
//     this.guides = await Promise.all(guidesPromises)
//     next()
// })
// tourSchema.pre('save', function (next) {
//     console.log('Will save document...')
//     next()
// })
 
// //Executed after all the pre middleware functions have completed
// tourSchema.post('save', function (doc, next) {
//     console.log(doc);
//     next()
     
// })
// //QUERY MIDDLEWARE
// tourSchema.pre('find', function(next){
//     this.find({
//         secretTour: { $ne: true }
        
//     })
//     next()
// })



//AGGREGATION MIDDLEWARE

// tourSchema.pre('aggregate', function (next) {

//     this.pipeline().unshift({
//         $match: {
//             secretTour:{$ne:true}
//         }
//     })
//     console.log(this.pipeline())
//     next()
// })
const Tour = mongoose.model('Tour', tourSchema)

module.exports= Tour
