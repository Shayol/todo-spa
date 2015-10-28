angular.module("myApp")

  .controller('ProjectCtrl', function($scope, Restangular) {
  $scope.removeProject = function() {
      $scope.project.remove().then(function() {
        var index = $scope.projects.indexOf($scope.project);
        if (index > -1) $scope.projects.splice(index, 1);
      });
    };

    $scope.updateProject = function() {
      $scope.project.save().then(function(){
      });
    };

    $scope.tasks = $scope.project.tasks;

    $scope.refreshTasks = function() {
      $scope.tasks = Restangular.one("projects", $scope.project.id).all("tasks").getList().$object;
    };

    $scope.addTask = function(newTask) {
      $scope.project.all("tasks").post(newTask).then(function(task){
        $scope.tasks.push(task);
        //$scope.refreshTasks();
      });
    };


  });