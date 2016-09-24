'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Cuisine Schema
 */
var CuisineSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Cuisine name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  img:{
    type:String
  },
  hide:
  {
    type: Boolean,
    default: false
  }
});

mongoose.model('Cuisine', CuisineSchema);
