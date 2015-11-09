angular.module("myApp")

.service('CommentsService', function(Restangular){
  this.newProject = function(project) {
    Restangular.all("projects").post(project);
  };
});