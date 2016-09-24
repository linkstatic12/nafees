'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Dish = mongoose.model('Dish'),
   multer = require('multer'),
  config = require(path.resolve('./config/config')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Dish
 */
exports.create = function(req, res) {
  
  var dish = new Dish(req.body);
  dish.user = req.user;

  dish.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(dish);
    }
  });
};

/**
 * Show the current Dish
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var dish = req.dish ? req.dish.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  dish.isCurrentUserOwner = req.user && dish.user && dish.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(dish);
};

/**
 * Update a Dish
 */
exports.update = function(req, res) {
  var dish = req.dish ;

  dish = _.extend(dish , req.body);

  dish.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(dish);
    }
  });
};

/**
 * Delete an Dish
 */
exports.delete = function(req, res) {
  var dish = req.dish ;

  dish.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(dish);
    }
  });
};

/**
 * List of Dishes
 */
exports.list = function(req, res) { 
  Dish.find().sort('-created').populate('user', 'displayName').exec(function(err, dishes) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(dishes);
    }
  });
};

/**
 * Dish middleware
 */
exports.dishByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Dish is invalid'
    });
  }

  Dish.findById(id).populate('user', 'displayName').exec(function (err, dish) {
    if (err) {
      return next(err);
    } else if (!dish) {
      return res.status(404).send({
        message: 'No Dish with that identifier has been found'
      });
    }
    req.dish = dish;
    next();
  });
};

exports.setImageId = function(req,res)
{

var dish = req.dish;
dish.img=req.body.photoId;
  dish.save(function (saveError) {
          if (saveError) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(saveError)
            });
          } else {
            res.json("SUCCESS");
          }
        });

}
exports.SavePicture = function (req,res)
{
 var user = req.user;
  var upload = multer(config.uploads.dishUpload).single('newCusinePicture');

  var profileUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;
 
  // Filtering to upload only images
  upload.fileFilter = profileUploadFileFilter;
console.log("WOW");
  if (user) {
    upload(req, res, function (uploadError) {
     
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading profile picture'
        });
      } else {
        console.log("THIS SHLD WORK");
        res.json(config.uploads.dishUpload.dest + req.file.filename);
        
      }
    });
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
  
}


exports.LikeDish = function(req,res)
{

  var dish = req.dish;
  dish.likes = dish.likes + 1; 
  dish.save(function (saveError) {
          if (saveError) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(saveError)
            });
          } else {
            res.json("SUCCESS");
          }
        });

}


exports.DishesThroughCuisineId = function(req,res)

{

Dish.find({cuisine:req.body.id}).populate('ingredients').exec(function(err,Dishes){

res.json(Dishes);


});

}