//var mycrudapp = angular.module('FoursquareApp', ['ngRoute', 'ngResource']);

// Factory
//app.factory('Students', ['$resource',function($resource){
//  return $resource('/students.json', {},{
//    query: { method: 'GET', isArray: true },
//    create: { method: 'POST' }
//  })
//}]);
//
//app.factory('Student', ['$resource', function($resource){
//  return $resource('/students/:id.json', {}, {
//    show: { method: 'GET' },
//    update: { method: 'PUT', params: {id: '@id'} },
//    delete: { method: 'DELETE', params: {id: '@id'} }
//  });
//}]);

// Routes Section
//mycrudapp.config([
// '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
// $routeProvider.when('/students',{
//    templateUrl: '/templates/students/index.html',
//    controller: 'StudentListCtr'
// });
//
// $routeProvider.when('/students/new', {
//   templateUrl: '/templates/students/new.html',
//   controller: 'StudentAddCtr'
// });
//
// $routeProvider.when('/students/:id/edit', {
//   templateUrl: '/templates/students/edit.html',
//   controller: "StudentUpdateCtr"
// });
//
// $routeProvider.otherwise({
//   redirectTo: '/students'
// });
//
//    }]);

/*mycrudapp.controller("StudentListCtr", ['$scope', '$resource', 'Students', 'Student', '$location', function($scope, $resource, Students, Student, $location) {
  console.log('Student List Controller');
  $scope.students = Students.query(); // Request students json object from rails
}]);*/

//
////SAVE
//app.controller("StudentAddCtr", ['$scope', '$resource', 'Students', '$location', function($scope, $resource, Students, $location) {
//  $scope.student = {}
//  $scope.save = function () {
//    if ($scope.studentForm.$valid){
//      console.log('Here' + $scope.student);
//      //Students.create({student: $scope.student}, function(){
//      Students.create($scope.student, function(){
//      $location.path('/');
//    }, function(error){
//      console.log(error)
//    });
//  }
// }
//}]);
//
////UPDATE
//app.controller("StudentUpdateCtr", ['$scope', '$resource', 'Student', '$location', '$routeParams', function($scope, $resource, Student, $location, $routeParams) {
//   $scope.student = Student.get({id: $routeParams.id})
//   $scope.update = function(){
//     if ($scope.studentForm.$valid){
//	console.log('Here2' + $scope.student);
//       Student.update($scope.student,function(){
//         $location.path('/');
//       }, function(error) {
//         console.log(error)
//      });
//     }
//   };
//}]);
//
////DELETE
//app.controller("StudentListCtr", ['$scope', '$http', '$resource', 'Students', 'Student', '$location', function($scope, $http, $resource, Students, Student, $location) {
// //$scope is like @ in rails...wher eyou can access the instance valiable int the view
//  $scope.students = Students.query();
//
//  $scope.deleteStudent = function (studentId) {
//    if (confirm("Are you sure you want to delete this student?")){
//      Student.delete({ id: studentId }, function(){
//        $scope.students = Students.query();
//        $location.path('/');
//      });
//    }
//  };
//}]);


