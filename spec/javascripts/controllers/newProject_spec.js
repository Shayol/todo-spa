describe('NewProjectCtrl', function() {
  beforeEach(module('myApp'));

  //var $controller;
  var $scope = {};
  $httpBackend = null;

  beforeEach(inject(function($controller, _$httpBackend_){   
    //$controller = _$controller_;
    $httpBackend = _$httpBackend_;
  }));
 

  it ("has $scope.addProject method", function() {
    var ctrl = $controller('NewProjectCtrl', $scope: $scope);
    expect($scope.addProject).toBeDefined();
  });
});

  //describe ".create", ->
    //it "calls ProjectService.addProject", ->
      //$httpBackend.expectPOST("/api/v1/projects.json")
      //scope.create()