angular.module('myApp')

.controller('SignupCtrl', function($scope, $auth, $state, toaster) {
  $scope.signup = function() {
      $auth.submitRegistration($scope.registrationForm);
  };
});