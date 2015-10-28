angular.module("myApp")

  .controller('TaskCtrl', function($scope, $filter, Restangular) {

  $scope.comments = $scope.task.comments;
  $scope.toggleComments = false;

  $scope.refreshComments = function () {
    $scope.comments = Restangular.one("tasks", $scope.task.id).all("comments").getList().$object;
  };

  $scope.toggleDone = function(task) {
    task.done = !task.done;
    Restangular.one("tasks", task.id).patch(task).then(function(){
    });
  };
  
  $scope.removeTask = function(task) {
    Restangular.one('tasks', task.id).remove().then(function() {
      var index = $scope.tasks.indexOf(task);
      if (index > -1) $scope.tasks.splice(index, 1);
    });
  };

  $scope.updateTask = function(task) {
    Restangular.one('tasks', task.id).patch(task).then(function(){
    });
  };

  if ($scope.task.deadline)  $scope.task.deadline = new Date($scope.task.deadline);
  if (!$scope.task.deadline) $scope.task.deadline = new Date();
});