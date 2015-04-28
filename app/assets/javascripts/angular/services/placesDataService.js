///**
//* Created by Ryan on 11/04/15.
//*/
//
//// this service communicattes with out RESTful service layer
//
//'use strict';
///*
//* The $http service is a core Angular service that facilitates
//* communication with the remote HTTP servers via the browser's
//* XMLHttpRequest object or via JSONP
//*
//* toaster- a third party service which is JavaScript non blocking notification service
//* to confugure use: https://github.com/jirikavi/AngularJS-Toaster
//*/
//app.factory('placesDataService', function ($http, toaster) {
//
//    var serviceBase = '/api/places/';
//    var placesDataFactory = {};
//    var userInContext = null; // decide if there is a user to bookmark places or not
//
//    var _getUserInCtx = function () {
//        return userInContext;
//    };
//
//    var _setUserInCtx = function (userInCtx) {
//        userInContext = userInCtx;
//    };
//
//
//    /*
//     * _savePlace which is responsible to issue HTTP Post request to our RESTful API
//     * process venue to take needed properties
//     */
//
//    /*
//     * the request payload body will contain JSON object matches the data model we defined in our API.
//     */
//    var _savePlace = function (venue) {
//
//        var miniVenue = {
//            userName: userInContext,
//            venueID: venue.id,
//            venueName: venue.name,
//            address: venue.location.address,
//            category: venue.categories[0].shortName,
//            rating: venue.rating
//        };
//
//
//        /*
//         *  .then promise to manipulate and access the returned response directly in the service,
//         *  so if the response is 200 OK we are displaying success notification message, if the
//         *  response is not 200 OK, for example 304 Not modified, then we are returning a
//         *  notification that place already bookmarked for this user
//         */
//        return $http.post(serviceBase, miniVenue).then(
//
//            function (results) {
//                toaster.pop('success', "Bookmarked Successfully", "Place saved to your bookmark!");
//            },
//            function (results) {
//                if (results.status == 304) {
//                    toaster.pop('note', "Already Bookmarked", "Already bookmarked for user: " + miniVenue.userName);
//                }
//                else {
//                    toaster.pop('error', "Faield to Bookmark", "Something went wrong while saving :-(");
//                }
//                return results;
//            });
//    };
//
//   /*
//    * This function retrieves the list of bookedmarked places for a user,
//    * and also checks if username have been used before
//    */
//    var _getUserPlaces = function (userName, pageIndex, pageSize) {
//
//        return $http.get(serviceBase + userName, { params: { page: pageIndex, pageSize: pageSize } }).then(function (results) {
//            return results;
//        });
//    };
//
//    var _userExists = function (userName) {
//        return $http.get("/api/users/" + userName).then(function (results) {
//            return results.data;
//        });
//    };
//
//    placesDataFactory.getUserInContext = _getUserInCtx;
//    placesDataFactory.setUserInContext = _setUserInCtx;
//    placesDataFactory.getUserPlaces = _getUserPlaces;
//    placesDataFactory.userExists = _userExists;
//    placesDataFactory.savePlace = _savePlace;
//
//    return placesDataFactory
//});