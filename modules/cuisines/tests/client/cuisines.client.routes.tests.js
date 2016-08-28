(function () {
  'use strict';

  describe('Cuisines Route Tests', function () {
    // Initialize global variables
    var $scope,
      CuisinesService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _CuisinesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      CuisinesService = _CuisinesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('cuisines');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/cuisines');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          CuisinesController,
          mockCuisine;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('cuisines.view');
          $templateCache.put('modules/cuisines/client/views/view-cuisine.client.view.html', '');

          // create mock Cuisine
          mockCuisine = new CuisinesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Cuisine Name'
          });

          //Initialize Controller
          CuisinesController = $controller('CuisinesController as vm', {
            $scope: $scope,
            cuisineResolve: mockCuisine
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:cuisineId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.cuisineResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            cuisineId: 1
          })).toEqual('/cuisines/1');
        }));

        it('should attach an Cuisine to the controller scope', function () {
          expect($scope.vm.cuisine._id).toBe(mockCuisine._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/cuisines/client/views/view-cuisine.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          CuisinesController,
          mockCuisine;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('cuisines.create');
          $templateCache.put('modules/cuisines/client/views/form-cuisine.client.view.html', '');

          // create mock Cuisine
          mockCuisine = new CuisinesService();

          //Initialize Controller
          CuisinesController = $controller('CuisinesController as vm', {
            $scope: $scope,
            cuisineResolve: mockCuisine
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.cuisineResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/cuisines/create');
        }));

        it('should attach an Cuisine to the controller scope', function () {
          expect($scope.vm.cuisine._id).toBe(mockCuisine._id);
          expect($scope.vm.cuisine._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/cuisines/client/views/form-cuisine.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          CuisinesController,
          mockCuisine;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('cuisines.edit');
          $templateCache.put('modules/cuisines/client/views/form-cuisine.client.view.html', '');

          // create mock Cuisine
          mockCuisine = new CuisinesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Cuisine Name'
          });

          //Initialize Controller
          CuisinesController = $controller('CuisinesController as vm', {
            $scope: $scope,
            cuisineResolve: mockCuisine
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:cuisineId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.cuisineResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            cuisineId: 1
          })).toEqual('/cuisines/1/edit');
        }));

        it('should attach an Cuisine to the controller scope', function () {
          expect($scope.vm.cuisine._id).toBe(mockCuisine._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/cuisines/client/views/form-cuisine.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
