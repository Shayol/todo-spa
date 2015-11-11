describe("NewProjectCtrl", function() {
  beforeEach(module("myApp"));

  var $controller;
  var $httpBackend = null;

  beforeEach(inject(function($rootScope, _$controller_, _$httpBackend_){   
    $scope = $rootScope.$new();
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    //$state = _$state_;
  }));
 

  it ("has $scope.addProject method", function() {
    var ctrl = $controller('NewProjectCtrl', $scope: $scope);
    expect($scope.addProject).toBeDefined();
  });
});