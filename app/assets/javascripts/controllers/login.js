angular.module('myApp')

.controller('LoginCtrl', function($scope, $auth, $state, toaster) {
  $scope.login = function() {
      $auth.submitLogin($scope.loginForm)
      .then(function(resp) {
        toaster.success("Logged in with email.");
        $state.go("/projects");
      })
      .catch(function(resp) {
        angular.forEach(resp.errors, function(msg){
          toaster.error(msg);
        });           
      });
    };
    
  $scope.authenticate = function() {
    $auth.authenticate('facebook')
      .then(function(resp) {
        toaster.success("Logged in with Facebook.");
        $state.go("/projects");
      })
      .catch(function(resp) {
        angular.forEach(resp.errors, function(msg){
          toaster.error(msg);
        });           
      });
  };
});