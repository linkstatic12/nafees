(function () {
  'use strict';

  // Dishes controller
  angular
    .module('dishes')
    .controller('DishesController', DishesController);

  DishesController.$inject = ['$rootScope','$scope', '$state', 'Authentication', 'dishResolve','$http','FileUploader','$timeout','$window'];

  function DishesController ($rootScope,$scope, $state, Authentication, dish,$http,FileUploader,$timeout,$window) {
    var vm = this;
 $rootScope.topbarActive = true;
    vm.authentication = Authentication;
    vm.dish = dish;
    vm.dish.price = 0;
    vm.dish.additional_price = 0;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    $scope.opt= [];
    vm.imageURL = vm.CuisineImageURL;
    vm.uploadCuisinePicture = uploadProfilePicture;

    vm.cancelUpload = cancelUpload;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/dish/picture',
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
      $http.post("/api/dishes/setImageId/"+vm.dish._id,{photoId:response}).success(function (data, status, headers, config) {
           


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
    function uploadProfilePicture() {
      // Clear messages
      vm.success = vm.error = null;
      vm.uploader.uploadAll();
    }

    // Cancel the upload process
    function cancelUpload() {
      vm.uploader.clearQueue();
     // vm.imageURL = vm.user.profileImageURL;
    }
  $http.get('/api/ingredients').success(function (data, status, headers, config) {
       for(var i in data)
         $scope.opt.push(data[i]);
       $http.get('/api/cuisines').success(function(data,status,headers,config){
         $scope.cuisines = data;


       });   
  });
    $scope.items = [];

        $scope.add = function () {
          $scope.items.push({ 
            
            quantity:0,
             name: ""
          });
        }
    // Remove existing Dish
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.dish.$remove($state.go('dishes.list'));
      }
    }

    $scope.$watch('vm.dish.additional_price', function (newVal, oldVal) { 
   vm.dish.totalPrice = parseFloat(vm.dish.price) +parseFloat(vm.dish.price*0.1);
   vm.dish.additional_price = parseFloat(vm.dish.price*0.1);


    },true);

    
$scope.$watch('items', function (newVal, oldVal) { 
$scope.price = 0;
for(var i=0;i<newVal.length;i++)
{
   for(var j=0;j<$scope.opt.length;j++)
         {
               if(newVal[i].name == $scope.opt[j]._id)
                     {
                     
                      $scope.price =$scope.price+ ($scope.opt[j].price*newVal[i].quantity);
                      console.log($scope.price);
                      break;
                     }

         }


}
vm.dish.price = $scope.price;
vm.dish.totalPrice = parseFloat(vm.dish.price) +parseFloat(vm.dish.price*0.1);
vm.dish.additional_price = parseFloat(vm.dish.price*0.1);

   }, true);
    // Save Dish
    function save(isValid) {

        vm.dish.ingredients =  $scope.items;

        
      if (!isValid) { 
      
        $scope.$broadcast('show-errors-check-validity', 'vm.form.dishForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.dish._id) {
        vm.dish.$update(successCallback, errorCallback);
      } else {
       
        vm.dish.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
         uploadProfilePicture();
        $state.go('dishes.view', {
          dishId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
