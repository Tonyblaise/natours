const fs = require('fs')
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

const Tour = require('./../models/tour_model')


class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filter() {
        
        //FILTERING
        const queryObj = {...this.queryString}
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        
        excludedFields.forEach(element => {
            delete queryObj[element]
        });

        //ADVANCED FILTERING
       let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        console.log(JSON.parse(queryStr))

        queryStr = JSON.parse(queryStr)
        this.query.find(queryStr)
        //let query = Tour.find(queryStr)

        return this;
    }

    sort() {
          if (this.queryString.sort) {
            const sortBy = req.query.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
            //sort("price ratingsAverage")
            
        } else {
            this.query=this.query.sort('-createdAt')
        }
        return this;
    }

    limitFields() {
          if (this.queryString.fields) {
            const fields = req.query.fields.split(',').join(' ')
            this.query = this.query.select(fields)
            
        } else {
            this.query.select('-__v')
        }
        return this;
    }
    paginate() {
         const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        
        
        return this;


    }
}

module.exports= APIFeatures