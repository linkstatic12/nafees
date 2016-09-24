'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Review Schema
 */
var ReviewSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Review name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  comment:{ type: String,
    default: '',
    trim:true}
});

mongoose.model('Review', ReviewSchema);
