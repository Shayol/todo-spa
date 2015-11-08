describe('LoginCtrl', function() {
  beforeEach(module('myApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){   
    $controller = _$controller_;
  }));

    it('has $scope.login', function() {
      var $scope = {};
      var controller = $controller('LoginCtrl', { $scope: $scope });
      expect($scope.login).toBeDefined();
    });

    it('has $scope.authenticate', function() {
      var $scope = {};
      var controller = $controller('LoginCtrl', { $scope: $scope });
      expect($scope.authenticate).toBeDefined();
    });
});