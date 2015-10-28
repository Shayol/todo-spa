angular.module('myApp')

.controller('LoginCtrl', function($scope, $auth, $state, toaster) {
  $scope.login = function() {
      $auth.submitLogin($scope.loginForm);
    };
  $scope.authenticate = function() {
    $auth.authenticate('facebook')
      .then(function(resp) {
        toaster.success("Logged in with Facebook.");
        $state.go("/projects");
      })
      .catch(function(resp) {

      });
  };
});