/**
 * Created by Ryan on 11/04/15.
 */

var app = angular.module('FoursquareApp', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ngAnimate', 'weatherControllers', 'weatherServices', 'ui-notification','angular-loading-bar']);
//app.config(function ($routeProvider) {
//
//
//    //$routeProvider.otherwise({ redirectTo: "/explore" });
//
//
//
//app.config(function ($routeProvider) {
//
//    $routeProvider.when("/home", {
//        //controller: "myPlacesController",
//        templateUrl: "assets/angular/views/home.html"
//    });
//});


// This is the Routes Section
app.config([
    '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.when("/", {// URL “/explore” and mapped it to the view “placesresults.html”,
            controller: "placesExplorerController",//invokes the controller “placesExplorerController” where we can write our business logic for this view
            templateUrl: "assets/angular/views/placesresults.html"
        });
        $routeProvider.when("/explore", {// URL “/explore” and mapped it to the view “placesresults.html”,
            controller: "placesExplorerController",//invokes the controller “placesExplorerController” where we can write our business logic for this view
            templateUrl: "assets/angular/views/placesresults.html"
        });
        $routeProvider.when('/weather', {
            controller: 'GetWeatherCtrl',
            templateUrl: 'assets/angular/views/weather.html'
        });

        $routeProvider.when('/blog',{
            templateUrl: '/templates/blogs/index.html',
            controller: 'BlogListCtr'
        });
        $routeProvider.when('/blogs/new', {
            templateUrl: '/templates/blogs/new.html',
            controller: 'BlogAddCtr'
        });
        $routeProvider.when('/blogs/:id/edit', {
            templateUrl: '/templates/blogs/edit.html',
            controller: 'BlogUpdateCtr'
        });
        $routeProvider.otherwise({
            redirectTo: '/blog'
        });
    }
]);

// ======================= notification controller ==============

app.controller('notificationController', function($scope, Notification) {

    $scope.primary = function() {
        Notification('Primary notification');
    };

    $scope.error = function() {
        Notification.error('Please fill out the highlighted fields');
    };

    $scope.success = function() {
        Notification.success('Success notification');
    };

    $scope.info = function() {
    };
    $scope.info_two = function() {
    };

    $scope.warning = function() {
        Notification.warning('Warning notification');
    };

    // ==
    $scope.primaryTitle = function() {
        Notification({message: 'Lets begin your adventures', title: '<b>Welcome to the ExplorerApp!</b>'});
    };
    // ==

    $scope.errorTime = function() {
        Notification.error({message: 'Error notification 1s', delay: 1000});
    };

    $scope.successTime = function() {
        Notification.success({message: 'Success notification 20s', delay: 20000});
    };

    // ==
    $scope.successHtml = function() {
        Notification.success({message: 'Success notification<br>Some other <b>content</b><br><a href="https://github.com/alexcrack/angular-ui-notification">This is a link</a><br><img src="https://angularjs.org/img/AngularJS-small.png">', title: 'Html content'});
    };

    $scope.errorHtml = function() {
        Notification.error({message: '<b>Error</b> <s>notification</s>', title: '<i>Html</i> <u>message</u>'});
    };
//blog update
    $scope.update_success_notification = function() {
        Notification.success('Blog updated, thank you!');
    };
    //blog save notification
    $scope.save_success_notification = function() {
        Notification.success('New blog have been saved, thank you!');
    };
    //delete notification
    $scope.delete_blog_notification = function() {
        Notification.warning('Blog deleted, thank you!');
    };

    //== weather notification
    $scope.weather_notification = function() {
        Notification.success({message: 'Click here to search for a<b> place</b><br><a href="#/explore">in <b>Explore</b></a>', title: 'You like the weather?', delay: 10000});
    };
    // explore notifications
    $scope.explore_notification = function(){

        Notification.success({message: 'Simply type your current<b> location,</b></br>and a desired <b>place</b> <br><br> Or click here to check <a href="#/weather"><b>weather</b> ', title: 'Ready to explore?', delay: 6000});
        Notification({message: 'Lets begin your adventures', title: '<b>Welcome to the ExplorerApp!</b>'});

    };
    // blog welcome notification
    $scope.blog_notification = function() {
        Notification.success({message: 'Write about your rescent <b> adventures</b><br><a href="#/blogs/new"><br> <b>Click here</b> to blog</a>', title: 'Start blogging', delay: 10000});
    };
    $scope.blog_new_notification = function() {
        Notification.success({message: 'Simply enter your: <br><b>- Firstname</b><br> <b>- Lastname</b> <br><b>- Blog title</b><br><b>- Content</b> <br><br>click <b>submit</b>', title: 'Start blogging', delay: 10000});
    };
});

// ============== end of notification controller =====================



// =========== blog controller, routes & fatory ============

app.factory('Blogs', ['$resource',function($resource){
    return $resource('/blogs.json', {},{
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
}]);

//
//
//});
app.factory('Blog', ['$resource', function($resource){
    return $resource('/blogs/:id.json', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    });
}]);


app.controller("BlogListCtr", ['$scope', '$http', '$resource', 'Blogs', 'Blog', '$location', function($scope, $http, $resource, Blogs, Blog, $location) {

    $scope.blogs = Blogs.query();

    $scope.deleteBlog = function (blogId) {
        if (confirm("Are you sure you want to delete this blog?")){
            Blog.delete({ id: blogId }, function(){
                $scope.delete_blog_notification();
                $scope.blogs = Blogs.query();
                $location.path('/blog');
            });
        }
    };

}]);

//save
app.controller("BlogAddCtr", ['$scope', '$resource', 'Blogs', '$location', function($scope, $resource, Blogs, $location) {
    $scope.blog = {};
    $scope.save = function () {
        if ($scope.blogForm.$valid){
            console.log('Here' + $scope.blog);
            $scope.save_success_notification();
            //Students.create({student: $scope.student}, function(){
            Blogs.create($scope.blog, function(){
                $location.path('/blog');
            }, function(error){
                console.log(error)
            });
        }
    }
}]);
// update
app.controller("BlogUpdateCtr", ['$scope', '$resource', 'Blog', '$location', '$routeParams', function($scope, $resource, Blog, $location, $routeParams) {
    $scope.blog = Blog.get({id: $routeParams.id});
    $scope.update = function(){
        if ($scope.blogForm.$valid){
            $scope.update_success_notification();
            console.log('Here2' + $scope.blog);
            Blog.update($scope.blog,function(){
                $location.path('/blog');

            }, function(error) {
                console.log(error)
            });
        }
    };
}]);
//===========================end of blog stuff ======================