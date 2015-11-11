describe('SignupCtrl', function() {
  beforeEach(module('myApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){   
    $controller = _$controller_;
  }));

    it('has $scope.signup', function() {
      var $scope = {};
      var controller = $controller('SignupCtrl', { $scope: $scope });
      expect($scope.signup).toBeDefined();
    });
});