(function () {
  'use strict';

  // Cuisines controller
  angular
    .module('cuisines')
    .controller('CuisinesController', CuisinesController);

  CuisinesController.$inject = ['$http','$scope', '$state', 'Authentication', 'cuisineResolve','FileUploader','$timeout','$window'];

  function CuisinesController ($http,$scope, $state, Authentication, cuisine,FileUploader,$timeout,$window) {
    var vm = this;
    
    vm.authentication = Authentication;
    vm.cuisine = cuisine;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.imageURL = vm.CuisineImageURL;
    vm.uploadCuisinePicture = uploadProfilePicture;

    vm.cancelUpload = cancelUpload;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/cuisine/picture',
      alias: 'newCusinePicture',

      onAfterAddingFile: onAfterAddingFile,
      onSuccessItem: onSuccessItem,
      onErrorItem: onErrorItem
    });

    // Set file uploader image filter
    vm.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // Called after the user selected a new picture file
    function onAfterAddingFile(fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            vm.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    }
 
    // Called after the user has successfully uploaded a new picture
    function onSuccessItem(fileItem, response, status, headers) {
      // Show success message
      vm.success = true;
      console.log(response);
      $http.post("/api/cuisines/setImageId/"+vm.cuisine._id,{photoId:response}).success(function (data, status, headers, config) {
           


            })
            .error(function (data, status, header, config) {
            });
      // Populate user object
      vm.user = Authentication.user = response;

      // Clear upload buttons
      cancelUpload();
    }

    // Called after the user has failed to uploaded a new picture
    function onErrorItem(fileItem, response, status, headers) {
      // Clear upload buttons
      cancelUpload();

      // Show error message
      vm.error = response.message;
    }

    // Change user profile picture
    function uploadProfilePicture(cuisine) {
      // Clear messages
      vm.success = vm.error = null;
      vm.uploader.uploadAll();
    }

    // Cancel the upload process
    function cancelUpload() {
      vm.uploader.clearQueue();
     // vm.imageURL = vm.user.profileImageURL;
    }
    // Remove existing Cuisine
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.cuisine.$remove($state.go('cuisines.list'));
      }
    }

    // Save Cuisine
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.cuisineForm');
        return false;
      }
      
      // TODO: move create/update logic to service
      if (vm.cuisine._id) {
        vm.cuisine.$update(successCallback, errorCallback);
      } else {
        vm.cuisine.$save(successCallback, errorCallback);
      }

      function successCallback(res) {

         uploadProfilePicture(res);
        $state.go('cuisines.list', {
          cuisineId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
