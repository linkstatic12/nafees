'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Order Schema
 */
var OrderSchema = new Schema({
 
  created: {
    type: Date,
    default: Date.now
  },
  table:{
    type:Number
  },
  Dishes:[{
    dish:{
     type: Schema.ObjectId,
     ref: 'Dish'
    },
    noOfPlates:{
      type:Number
    },
    flavour:{
     type:String,
    enum : ['Normal','Mild','Hot']

    }
  }],
  totalPrice: {
    type:Number
  },
  discount:{
    type:Number,
    default:0

  },
  completed:
  {
    type:Boolean,
    default:false
  }

  
});

mongoose.model('Order', OrderSchema);
