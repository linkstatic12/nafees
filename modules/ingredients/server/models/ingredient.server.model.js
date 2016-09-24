'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Ingredient Schema
 */
var IngredientSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Ingredient name',
     unique: 'Ingredient already exists',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  calories:{
    type:Number,
    default:0,
    required: 'Please fill calories',

  },
  measurement:{
 type: String, enum: ['Kilogram', 'Gram', 'Litre','Milliliter','Ounce']
  },
  price:{
   type:Number,
   default:0


  },
  type:{
     type: String, enum: ['Vegatable', 'Fruit', 'Meat','Derived','Spice','Flower','Herb','Plant','Oil']

  },
  updatedBy:
  {
type: Schema.ObjectId,
    ref: 'User'

  },
  updatedOn:
  {type:Date,
    default:Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  img:{
    type:String
  }
});

mongoose.model('Ingredient', IngredientSchema);
