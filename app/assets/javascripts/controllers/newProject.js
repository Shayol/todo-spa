angular.module("myApp")

.controller('NewProjectCtrl', function($scope, $state, ProjectsService) {
  $scope.addProject = function(project) {
    ProjectsService.newProject(project);
    $state.go('/projects');
  };
});