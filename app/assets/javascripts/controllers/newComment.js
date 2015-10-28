angular.module('myApp')

.controller('NewCommentCtrl', function($scope, Restangular) {

  $scope.addComment = function(newComment) {
      Restangular.one("tasks", $scope.task.id).all("comments").post(newComment).then(function(comment){
      $scope.comments.push(comment);
      //$scope.$parent.refreshComments();
      });
    };
  });