angular.module("myApp")

.controller('MainCtrl', function($scope, Restangular, $state, toaster, $auth) {
  $scope.projects = Restangular.all('projects').getList().$object;

  $scope.signOut = function() {
    $auth.signOut();
  };

  $scope.$on('auth:logout-success', function(ev) {
    $state.go("/sign-in");
    toaster.success("Sign out", "Signed out successfully.");
  });

  $scope.$on('auth:logout-error', function(ev, reason) {
    toaster.error("Sign out", "Logout failed because of " + reason.errors[0]);
  });
  
  $scope.$on('auth:login-success', function(ev, user) {
    $state.go("/projects");
    toaster.success("Login", "Successfully logged in.");
  });

  $scope.$on('auth:login-error', function(ev, reason) {
    toaster.error("Authentication error", "Authentication failed because of " + reason.errors[0]);
  });

  $scope.$on('auth:registration-email-error', function(ev, reason) {
    toaster.error("Sign in via email error", "Authentication failed because of " + reason.errors[0]);
  });

  $scope.$on('auth:registration-email-success', function(ev, message) {
    state.go("/projects");
    toaster.success("Signup", "Successfully signed up in via email.");
  });

  $scope.$on('auth:oauth-registration', function(ev, user) {
    state.go("/projects");
    toaster.success("Signup", "Successfully signed up in via facebook.");
});

  $scope.$on('auth:validation-error', function(ev, reason) {
    $state.go("/sign-in");
    toaster.error("Validation error", "Error in the validation process.");
  });

  $scope.$on('auth:invalid', function(ev, reason) {
    $state.go("/sign-in");
    toaster.error("Validation error", "Invalid token.");
});



});