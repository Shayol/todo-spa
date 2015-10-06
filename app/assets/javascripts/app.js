var myApp = angular.module('myApp', ['ng-rails-csrf', 'ng-token-auth', 'templates', 'restangular', 'ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/projects");
  //
  // Now set up the states
  $stateProvider
    .state('/projects', {
      url: "/projects",
      template: "<form novalidate><input type='text' ng-model='project.title' /><input type='submit' ng-click='addProject(project)' value='Submit'></form><h1>HELLO! bkkkkkk</h1><ul><li ng-repeat='project in projects'>{{ project.title }}</li></ul>"
      //templateUrl: "projects.html"
      // controller: "MainCtrl"
    });
});

myApp.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('/api');
  RestangularProvider.setRequestSuffix('.json');
  // RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
  //     var extractedData;
  //     if (operation === "getList") {
  //       extractedData = data.result;
  //     } else {
  //       extractedData = data;
  //     }
  //     return extractedData;
  //   });
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
  $scope.projects = Restangular.all('projects').getList();
  $scope.addProject = function(project) {
    Restangular.all("projects").post(project);
  };
});