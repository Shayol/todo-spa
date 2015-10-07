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
      templateUrl: "assets/templates/projects.html",
      controller: "ProjectsCtrl"
    })
    .state('/new_project', {
      url: "/projects/new",
      templateUrl: "assets/templates/new_project.html",
      controller: "NewProjectCtrl"
    });
});

myApp.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('/api');
  RestangularProvider.setRequestSuffix('.json');
  RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
      var extractedData;
      if (operation === "getList") {
        extractedData = data.projects;
      } else {
        extractedData = data;
      }
      return extractedData;
    });
//   Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
//     if(response.status === 403) {
//         refreshAccesstoken().then(function() {
//             // Repeat the request and then call the handlers the usual way.
//             $http(response.config).then(responseHandler, deferred.reject);
//             // Be aware that no request interceptors are called this way.
//         });

//         return false; // error handled
//     }

//     return true; // error not handled
// });
});

myApp.controller('MainCtrl', function($scope, Restangular) {});

myApp.controller('NewProjectCtrl', function($scope, $state, Restangular) {
  $scope.addProject = function(project) {
    Restangular.all("projects").post(project);
    $state.go('/projects');
  };
});



myApp.controller('ProjectsCtrl', function($scope, Restangular) {
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
});