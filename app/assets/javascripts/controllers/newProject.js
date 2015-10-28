angular.module("myApp")

.controller('NewProjectCtrl', function($scope, $state, Restangular) {
  $scope.addProject = function(project) {
    Restangular.all("projects").post(project);
    $state.go('/projects');
  };
});