angular.module("myApp")

.controller('CommentCtrl', function($scope, Restangular, FileUploader) {

  $scope.removeComment = function(comment) {
    Restangular.one('comments', comment.id).remove().then(function() {
      index = $scope.comments.indexOf(comment);
      if (index > -1) $scope.comments.splice(index, 1);
    });
  };

  $scope.updateComment = function(comment) {
    Restangular.one('comment', comment.id).patch(comment).then(function(){
    });
  };

  $scope.uploader = new FileUploader({url: 'api/comments/' + $scope.comment.id + '/attachments.json'});

});