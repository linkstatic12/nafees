(function () {
  'use strict';

  angular
    .module('orders')
    .controller('BillingController', BillingController);

  BillingController.$inject = ['$scope','Authentication','OrdersService','Socket','amMoment','$http'];

  function BillingController($scope,Authentication,OrdersService,Socket,amMoment,$http) {
   
   $scope.FromDate;
   $scope.ToDate;
  var vm = this;
  $scope.total =0;
   vm.Dummy = null;

  $scope.Search = function()
  {
 if(new Date($scope.FromDate) > new Date($scope.ToDate)){
     console.log("WOW");
     
    }
    else
    {
console.log("FML");
        $scope.total =0;
         vm.orders=[];
       
         for(var i=0;i<vm.Dummy.length;i++)
            {
                  console.log(new Date(vm.Dummy[i].created));
              if((new Date(vm.Dummy[i].created) >= new Date($scope.FromDate)) && (new Date(vm.Dummy[i].created)<= new Date($scope.ToDate)) )
                    { 
                      vm.orders.push(vm.Dummy[i]);
                      console.log(vm.Dummy[i]);
                      $scope.total = $scope.total + vm.Dummy[i].totalPrice;
                      console.log($scope.total);
                    }


              
            }




    }
  


  }
  console.log("HELLO");
   $http.get("/api/billing").success(function (data, status, headers, config) {
           
vm.orders =data;
 vm.Dummy = data;
  for(var i=0;i<vm.Dummy.length;i++)
  {
console.log(vm.Dummy[i]);
 $scope.total = $scope.total + vm.Dummy[i].totalPrice;

  }
            })
            .error(function (data, status, header, config) {
            });

    
       
  }
})();
