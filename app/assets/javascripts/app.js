var myApp = angular.module('myApp', ['ngAnimate', 'toaster', 'ng-rails-csrf', 'ng-token-auth', 'templates', 'restangular', 'ui.router', 'xeditable', 'ui.bootstrap', 'angularFileUpload']);

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
      controller: "ProjectsCtrl",
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

myApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

myApp.controller('MainCtrl', function($scope, Restangular, $state, toaster, $auth) {
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
    toaster.success("Login", "Successfully logged in via email.");
  });

  $scope.$on('auth:login-error', function(ev, reason) {
    toaster.error("Authentication error", "Authentication failed because of " + reason.errors[0]);
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

myApp.controller('NewProjectCtrl', function($scope, $state, Restangular) {
  $scope.addProject = function(project) {
    Restangular.all("projects").post(project);
    $state.go('/projects');
  };
});



myApp.controller('ProjectsCtrl', function($scope, Restangular) {
  $scope.projects = Restangular.all('projects').getList().$object;

});

myApp.controller('ProjectCtrl', function($scope, Restangular) {
$scope.removeProject = function() {
    $scope.project.remove().then(function() {
      var index = $scope.projects.indexOf($scope.project);
      if (index > -1) $scope.projects.splice(index, 1);
    });
  };

  $scope.updateProject = function() {
    $scope.project.save().then(function(){
    });
  };

  $scope.tasks = $scope.project.tasks;

  $scope.refreshTasks = function() {
    $scope.tasks = Restangular.one("projects", $scope.project.id).all("tasks").getList().$object;
  };

  $scope.addTask = function(newTask) {
    $scope.project.all("tasks").post(newTask).then(function(task){
      $scope.tasks.push(task);
      //$scope.refreshTasks();
    });
  };


});



myApp.controller('TaskCtrl', function($scope, Restangular) {

  $scope.comments = $scope.task.comments;
  $scope.toggleComments = false;

  $scope.refreshComments = function () {
    $scope.comments = Restangular.one("tasks", $scope.task.id).all("comments").getList().$object;
  };

  $scope.toggleDone = function(task) {
    task.done = task.done === false ? true : false;
    Restangular.one("tasks", task.id).patch(task).then(function(){
    });
  };
  $scope.removeTask = function(task) {
    Restangular.one('tasks', task.id).remove().then(function() {
      var index = $scope.tasks.indexOf(task);
      if (index > -1) $scope.tasks.splice(index, 1);
    });
  };

  $scope.updateTask = function(task) {
    Restangular.one('tasks', task.id).patch(task).then(function(){
    });
  };

});

myApp.controller('CommentCtrl', function($scope, Restangular, FileUploader) {


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

myApp.controller('NewCommentCtrl', function($scope, Restangular) {

  $scope.addComment = function(newComment) {
      Restangular.one("tasks", $scope.task.id).all("comments").post(newComment).then(function(comment){
      $scope.comments.push(comment);
      //$scope.$parent.refreshComments();
      });
    };

  });

myApp.controller('LoginCtrl', function($scope, $auth, $state, toaster) {
  $scope.login = function() {
      $auth.submitLogin($scope.loginForm);
    };
});

myApp.controller('SignupCtrl', function($scope, $auth, $state, toaster) {
  $scope.signup = function() {
      $auth.submitRegistration($scope.registrationForm);
    };
});