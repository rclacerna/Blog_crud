///**
//* Created by Ryan on 28/04/15.
//*/
////
////var mycrudapp = angular.module('mycrudapp',
////    ['ngRoute', 'ngResource']);
////factory
//app.factory('Blogs',
//    ['$resource',function($resource){
//        return $resource('/blogs.json', {},{
//            query: { method: 'GET', isArray: true },
//            create: { method: 'POST' }
//        })
//    }]);
//
//app.factory('Blog', ['$resource', function($resource){
//    return $resource('/blogs/:id.json', {}, {
//        show: { method: 'GET' },
//        update: { method: 'PUT', params: {id: '@id'} },
//        delete: { method: 'DELETE', params: {id: '@id'} }
//    });
//}]);
//
//// This is the Routes Section
//app.config([
//    '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
//        $routeProvider.when('/blogs',{
//            templateUrl: '/templates/index.html',
//            controller: 'BlogListCtr'
//        });
//        $routeProvider.when('/blogs/new', {
//            templateUrl: '/templates/new.html',
//            controller: 'BlogAddCtr'
//        });
//        $routeProvider.when('/blogs/:id/edit', {
//            templateUrl: '/templates/edit.html',
//            controller: 'BlogUpdateCtr'
//        });
//        $routeProvider.otherwise({
//            redirectTo: '/blogs'
//        });
//    }
//]);
//
////controllers
//app.controller("BlogListCtr", ['$scope', '$http', '$resource', 'Blogs', 'Blog', '$location', function($scope, $http, $resource,
//                                                                                                                     Blogs, Blog, $location) {
//
//    $scope.blogs = Blogs.query();
//
//    $scope.deleteBlog = function (blogId) {
//        if (confirm("Are you sure you want to delete this blog?")){
//            Blog.delete({ id: blogId }, function(){
//                $scope.blogs = Blogs.query();
//                $location.path('/');
//            });
//        }
//    };
//}]);
//
//app.controller("BlogAddCtr", ['$scope', '$resource', 'Blogs', '$location', function($scope, $resource, Blogs, $location) {
//    $scope.blog = {}
//    $scope.save = function () {
//        if ($scope.blogForm.$valid){
//            console.log('Here' + $scope.blog);
//            //Students.create({student: $scope.student}, function(){
//            Blogs.create($scope.blog, function(){
//                $location.path('/');
//            }, function(error){
//                console.log(error)
//            });
//        }
//    }
//}]);
//
//app.controller("BlogUpdateCtr", ['$scope', '$resource', 'Blog', '$location', '$routeParams', function($scope, $resource, Blog, $location,
//                                                                                                                  $routeParams) {
//    $scope.blog = Blog.get({id: $routeParams.id})
//    $scope.update = function(){
//        if ($scope.blogForm.$valid){
//            console.log('Here2' + $scope.blog);
//            Blog.update($scope.blog,function(){
//                $location.path('/');
//            }, function(error) {
//                console.log(error)
//            });
//        }
//    };
//}]);