var myApp = angular.module('myApp', ['ng-token-auth', 'templates', 'ngCookies', 'restangular', 'ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/projects");
  //
  // Now set up the states
  $stateProvider
    .state('projects', {
      url: "/projects",
      templateUrl: "projects.html",
      controller: "MainCtrl"
    });
});

myApp.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('/api');
  RestangularProvider.setRequestSuffix('.json');
});







myApp.controller('MainCtrl', function($scope, Restangular) {
  //   // First way of creating a Restangular object. Just saying the base URL
  // var baseAccounts = Restangular.all('projects');

  // // This will query /accounts and return a promise.
  // baseAccounts.getList().then(function(accounts) {
  //   $scope.allAccounts = accounts;
  // });

  // // Does a GET to /accounts
  // // Returns an empty array by default. Once a value is returned from the server
  // // that array is filled with those values. So you can use this in your template
  $scope.projects = Restangular.all('projects').getList().$object;
  $scope.addProject = function(project) {
    Restangular.all("projects").post(project);
  };
});