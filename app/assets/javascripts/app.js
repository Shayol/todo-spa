var myApp = angular.module('myApp', ['ng-rails-csrf', 'ng-token-auth', 'templates', 'restangular', 'ui.router', 'xeditable']);

myApp.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/projects");
  //
  // Now set up the states
  $stateProvider
    .state('/projects', {
      url: "/projects",
      templateUrl: "assets/templates/projects.html.erb",
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

myApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

myApp.controller('MainCtrl', function($scope, Restangular) {});

myApp.controller('NewProjectCtrl', function($scope, $state, Restangular) {
  $scope.addProject = function(project) {
    Restangular.all("projects").post(project);
    $state.go('/projects');
  };
});



myApp.controller('ProjectsCtrl', function($scope, Restangular) {
  $scope.projects = Restangular.all('projects').getList().$object;
  $scope.removeProject = function(project) {
    project.remove().then(function() {
      var index = $scope.projects.indexOf(project);
      if (index > -1) $scope.projects.splice(index, 1);
    });
  };
  $scope.updateProject = function(project) {
    project.save();
  };
  $scope.addTask = function(project, newTask) {
    project.all("tasks").post(newTask).then(function(){
      $scope.projects[$scope.projects.indexOf(project)].tasks.push(newTask);
    });
  };
});