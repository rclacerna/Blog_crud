///**
// * Created by Ryan on 11/04/15.
// */
//// user controller
//'use strict';
//app.controller('userContextController', function ($scope, $modalInstance, placesDataService, venue) {
//
//    $scope.venue = venue;
//    $scope.user = { userName: "" };
//
//    $scope.close = function () {
//        $modalInstance.dismiss('cancel');
//    };
//
//    $scope.saveUser = function () {
//
//        placesDataService.setUserInContext($scope.user.userName);
//
//        placesDataService.savePlace(venue).then(
//            function () {
//                $scope.close();
//            },
//            function () {
//                alert("Error occured");
//            });
//    };
//
//
//    //book marking places
//    $scope.bookmarkPlace = function (venue) {
//        /*
//         * This function checks if the variable named “userInContext”
//         * in service “placesDataService” is not null,
//         * */
//        if (!placesDataService.getUserInContext()) {
//
//            var modalInstance = $modal.open({
//                templateUrl: 'views/userprofile.html',
//                controller: 'userContextController',
//                resolve: {
//                    venue: function () {
//                        return venue;
//                    }
//                }
//            });
//        }
//        /*
//         *   we save the place directly by calling placesDataService.savePlace(venue)
//         * */
//        else {
//            placesDataService.savePlace(venue).then(
//                function (results) {
//                    // Do nothing as toaster showing from service
//                });
//        }
//
//    };
//
//});