'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Cuisine = mongoose.model('Cuisine'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Cuisine
 */
exports.create = function(req, res) {
  var cuisine = new Cuisine(req.body);
  cuisine.user = req.user;

  cuisine.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(cuisine);
    }
  });
};

/**
 * Show the current Cuisine
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var cuisine = req.cuisine ? req.cuisine.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  cuisine.isCurrentUserOwner = req.user && cuisine.user && cuisine.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(cuisine);
};

/**
 * Update a Cuisine
 */
exports.update = function(req, res) {
  var cuisine = req.cuisine ;

  cuisine = _.extend(cuisine , req.body);

  cuisine.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(cuisine);
    }
  });
};

/**
 * Delete an Cuisine
 */
exports.delete = function(req, res) {
  var cuisine = req.cuisine ;

  cuisine.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(cuisine);
    }
  });
};

/**
 * List of Cuisines
 */
exports.list = function(req, res) { 
  Cuisine.find().sort('-created').populate('user', 'displayName').exec(function(err, cuisines) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(cuisines);
    }
  });
};

/**
 * Cuisine middleware
 */
exports.cuisineByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Cuisine is invalid'
    });
  }

  Cuisine.findById(id).populate('user', 'displayName').exec(function (err, cuisine) {
    if (err) {
      return next(err);
    } else if (!cuisine) {
      return res.status(404).send({
        message: 'No Cuisine with that identifier has been found'
      });
    }
    req.cuisine = cuisine;
    next();
  });
};



exports.setImageId = function(req,res)
{

var cuisine = req.cuisine;
cuisine.img=req.body.photoId;
  cuisine.save(function (saveError) {
          if (saveError) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(saveError)
            });
          } else {
            res.json("SUCCESS");
          }
        });

}
/**
 * Cuisine picture
 */
exports.changeCuisinePicture = function (req, res) {
  var user = req.user;
  var upload = multer(config.uploads.cuisineUpload).single('newCusinePicture');

  var profileUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;
 
  // Filtering to upload only images
  upload.fileFilter = profileUploadFileFilter;

  if (user) {
    upload(req, res, function (uploadError) {
     
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading profile picture'
        });
      } else {
        res.json(config.uploads.cuisineUpload.dest + req.file.filename);
        
      }
    });
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
};