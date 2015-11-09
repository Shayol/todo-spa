angular.module("myApp")

.service('ProjectsService', function(Restangular){
  this.newProject = function(project) {
    Restangular.all("projects").post(project);
  };
});