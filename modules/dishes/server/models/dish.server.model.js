'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Dish Schema
 */
var DishSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Dish name',
    trim: true
  },
  likes:{
    type:Number,
    default:0
  },
  rating:{

     type:Number,
    default:0
  },
  description:{
    type:String,
    default:'',
    trim:true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  ingredients:[{
    name:{type:Schema.ObjectId,
          ref:'Ingredient'
         },
    quantity:{
          type:Number
         }
   }],
   flavours:
   {
    type:String,
    enum : ['Normal','Mild','Hot']
   },
   additional_price:{
    type:Number
   },
   price:{
    type:Number,
    required: 'Please set a Price'
   },
   comments:[
 
          {type:String
        
}

   ],
 totalPrice:{

  type:Number,
    required: 'Please set a Price'}
    ,
   img:{
    type:String
   },
   cuisine:{
   type:Schema.ObjectId,
   ref:'Cuisine'

   }
});

mongoose.model('Dish', DishSchema);
