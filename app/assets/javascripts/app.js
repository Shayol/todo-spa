var myApp = angular.module('myApp', ['ng-rails-csrf', 'ng-token-auth', 'templates', 'restangular', 'ui.router', 'xeditable', 'ui.bootstrap']);

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
    // .state('/projects.new_task', {
    //   url: "/projects/:id/tasks/new",
    //   templateUrl: "assets/templates/new_task.html",
    //   controller: "ProjectsCtrl"
    // });
});

myApp.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('/api');
  RestangularProvider.setRequestSuffix('.json');
  RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
      var extractedData;
      if (operation === "getList") {
        extractedData = data.projects;
        if (!extractedData) extractedData = data.tasks;
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

myApp.controller('MainCtrl', function($scope, Restangular, $state) {
  // $state.transitionTo('/projects.new_task');
});

myApp.controller('NewProjectCtrl', function($scope, $state, Restangular) {
  $scope.addProject = function(project) {
    Restangular.all("projects").post(project);
    $state.go('/projects');
  };
});

// myApp.controller('NewTaskCtrl', function($scope, $state, Restangular) {
//   $scope.addTask = function(project, newTask) {
//     project.all("tasks").post(newTask).then(function(){
//       $scope.projects[$scope.projects.indexOf(project)].tasks.push(newTask);
//     });
//   };
// });



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

  refreshTasks = function() {
    $scope.tasks = $scope.project.all("tasks").getList().$object;
  };

  $scope.addTask = function(newTask) {
    $scope.project.all("tasks").post(newTask).then(function(task){
      // $scope.copyNewTask = angular.copy(newTask)
      // $scope.projects[$scope.projects.indexOf(project)].tasks.push($scope.copyNewTask);
      // $scope.newTask = {};
      // $scope.copyNewTask = null;
     // refreshTasks();
     // $scope.tasks.push(task);
    });
  };


});



myApp.controller('TaskCtrl', function($scope, Restangular) {

  $scope.comments = $scope.task.comments;
  $scope.toggleComments = false;

  $scope.toggleDone = function(task) {
    task.done = task.done === false ? true : false;
    Restangular.one("tasks", task.id).patch(task).then(function(){
    });
  };
  $scope.removeTask = function(task) {
    Restangular.one('tasks', task.id).remove().then(function() {
      var project_index = $scope.projects.indexOf($scope.project);
      var index = $scope.projects[project_index].tasks.indexOf(task);
      if (index > -1) $scope.projects[project_index].tasks.splice(index, 1);
    });
  };

  $scope.updateTask = function(task) {
    Restangular.one('tasks', task.id).patch(task).then(function(){
    });
  };

});

myApp.controller('CommentCtrl', function($scope, Restangular) {


  $scope.removeComment = function(comment) {
    Restangular.one('comments', comment.id).remove().then(function() {
      // var project_index = $scope.projects.indexOf($scope.project);
      // var index = $scope.projects[project_index].tasks.indexOf(task);
      // if (index > -1) $scope.projects[project_index].tasks.splice(index, 1);
    });
  };

  $scope.updateComment = function(comment) {
    Restangular.one('comment', comment.id).patch(comment).then(function(){
    });
  };

});

myApp.controller('NewCommentCtrl', function($scope, Restangular) {

$scope.addComment = function(newComment) {
    $scope.task.all("comments").post(newComment).then(function(){
      // $scope.copyNewTask = angular.copy(newTask)
      // $scope.projects[$scope.projects.indexOf(project)].tasks.push($scope.copyNewTask);
      // $scope.newTask = {};
      // $scope.copyNewTask = null;
     // refreshTasks();
     // $scope.tasks.push(task);
    });
  };

  });