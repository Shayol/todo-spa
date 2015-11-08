describe('LoginCtrl', function() {
  beforeEach(module('myApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    
    $controller = _$controller_;
  }));

  describe('$scope.login', function() {
    it('has login', function() {
      var $scope = {};
      var controller = $controller('LoginCtrl', { $scope: $scope });
      expect($scope.login).toBeDefined();
    });
  });
});