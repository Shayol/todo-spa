var myApp = angular.module('myApp', ['ngDraggable', 'ngAnimate', 'toaster', 
                                     'ng-token-auth', 'templates', 
                                     'restangular', 'ui.router', 
                                     'xeditable', 'ui.bootstrap', 
                                     'angularFileUpload']);

myApp.config(function($authProvider) {
  $authProvider.configure({
      apiUrl: ""
  });
});
myApp.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/sign-in");

  $stateProvider

    .state('/sign-in', {
      url: "/sign-in",
      templateUrl: "assets/templates/login.html",
      controller: "LoginCtrl"
    })
    .state('/sign-up', {
      url: "/sign-up",
      templateUrl: "assets/templates/signup.html",
      controller: "SignupCtrl"
    })
    .state('/projects', {
      url: "/projects",
      templateUrl: "assets/templates/projects.html.erb",
      controller: "MainCtrl",
      resolve: {
        auth: function($auth) {
          return $auth.validateUser();
        }
      }
    })
    .state('/new_project', {
      url: "/projects/new",
      templateUrl: "assets/templates/new_project.html",
      controller: "NewProjectCtrl",
      resolve: {
        auth: function($auth) {
          return $auth.validateUser();
        }
      }
    });
});

myApp.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('/api');
  RestangularProvider.setRequestSuffix('.json');
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

myApp.run(function(editableOptions, editableThemes, $auth, $state) {
  $auth.validateUser().then(function(){ 
    $state.go('/projects');
  });
  //editableThemes.bs3.inputClass = 'input-sm';
  //editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

myApp.directive('task', function() {
  return {
    templateUrl: "assets/templates/_task.html"
  };
});

myApp.directive('comment', function() {
  return {
    templateUrl: "assets/templates/_comment.html"
  };
});

//myApp.directive('newComment', function() {
  //return {
    //templateUrl: "assets/templates/_newComment.html"
  //};
//});










