(function () {
  'use strict';

  // Ingredients controller
  angular
    .module('ingredients')
    .controller('IngredientsController', IngredientsController);

  IngredientsController.$inject = ['$http','$scope', '$state', 'Authentication', 'ingredientResolve','FileUploader','$timeout','$window'];

  function IngredientsController ($http,$scope, $state, Authentication, ingredient,FileUploader,$timeout,$window) {
    var vm = this;

    vm.authentication = Authentication;
    vm.ingredient = ingredient;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.imageURL = vm.IngredientImageURL;
    vm.uploadIngredientPicture = uploadProfilePicture;

    vm.cancelUpload = cancelUpload;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/ingredients/picture',
      alias: 'newIngredientPicture',

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
      $http.post("/api/ingredients/setImageId/"+vm.ingredient._id,{photoId:response}).success(function (data, status, headers, config) {
           


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
      console.log(response);

      // Clear upload buttons
      cancelUpload();

      // Show error message
      vm.error = response.message;
    }

    // Change user profile picture
    function uploadProfilePicture() {
      // Clear messages
      console.log(vm.uploader);
      vm.success = vm.error = null;
      vm.uploader.uploadAll();
    }

    // Cancel the upload process
    function cancelUpload() {
      vm.uploader.clearQueue();
     // vm.imageURL = vm.user.profileImageURL;
    }
    // Remove existing Ingredient
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.ingredient.$remove($state.go('ingredients.list'));
      }
    }

    // Save Ingredient
    function save(isValid) {
      uploadProfilePicture();
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.ingredientForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.ingredient._id) {
        vm.ingredient.$update(successCallback, errorCallback);
      } else {
        vm.ingredient.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
       
        $state.go('ingredients.view', {
          ingredientId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
