/**
 * Created by Ryan on 11/04/15.
 */


'use strict';
app.controller('placesExplorerController', function ($scope, placesExplorerService, placesPhotosService, $filter, $modal) {

    /*
     * (exploreNearby, exploreQuery, places array, etc…)
     *  will be used for two-way data binding
     * between view “placesresults.html” and the model
     */

    $scope.exploreNearby = "Dublin";
    $scope.exploreQuery = "";
    $scope.filterValue = "";

    $scope.places = [];
    $scope.filteredPlaces = [];
    $scope.filteredPlacesCount = 0;

    //paging
    $scope.totalRecordsCount = 0;
    $scope.pageSize = 10;
    $scope.currentPage = 1;

    init();

    function init() {

        createWatche();
        getPlaces();
    }

    function getPlaces() {

        var offset = ($scope.pageSize) * ($scope.currentPage - 1);

        /*
         * we can pass any number of arguments to the get method,
         * and all those arguments (i.e. near, query, limit, etc..)
         * will be translated to query string (key, value) pairs,
         */
        placesExplorerService.get({ near: $scope.exploreNearby, query: $scope.exploreQuery, limit: $scope.pageSize, offset: offset }, function (placesResult) {

            if (placesResult.response.groups) {
                $scope.places = placesResult.response.groups[0].items;
                $scope.totalRecordsCount = placesResult.response.totalResults;
                filterPlaces('');
            }
            else {
                $scope.places = [];
                $scope.totalRecordsCount = 0;
            }
        });
    }

    function filterPlaces(filterInput) {
        //using the custom filter from /filters/placeNameCategoryFilter.js
        $scope.filteredPlaces = $filter("placeNameCategoryFilter")($scope.places, filterInput);
        $scope.filteredPlacesCount = $scope.filteredPlaces.length;
    }

    function createWatche() {

        /*
         * listener for on the “filterValue” attribute of the scope,
         * this listener gets fired when the value of this attribute
         * has changed.
         */
        $scope.$watch("filterValue", function (filterInput) {
            filterPlaces(filterInput);
        });
    }
    // “doSearch()” which will be called on the explore button click
    $scope.doSearch = function () {

        $scope.currentPage = 1;
        getPlaces();
    };

    /*
     * pageChanged() which will be called once the page at the
     * pagination control change.
     */
    $scope.pageChanged = function (page) {

        $scope.currentPage = page;
        getPlaces();
    };

// show categories of photos from a venue
    $scope.showVenuePhotos = function (venueId, venueName) {

        placesPhotosService.get({ venueId: venueId }, function (photosResult) {

            var modalInstance = $modal.open({ //$modal service from Angular UI bootstrap
                templateUrl: '/assets/angular/views/placesphotos.html',
                controller: 'placesPhotosController',
                resolve: {
                    venueName: function () {
                        return venueName;
                    },
                    venuePhotos: function () {
                        return photosResult.response.photos.items;
                    }
                }
            });

            modalInstance.result.then(function () {
                //$scope.selected = selectedItem;
            }, function () {
                //alert('Modal dismissed at: ' + new Date());
            });

        });


    };

    /*
     * Multiple helper functions have been added, those
     * functions are used to build some thumbnails image source.
     */
    $scope.buildCategoryIcon = function (icon) {

        return icon.prefix + '44' + icon.suffix;
    };

    $scope.buildVenueThumbnail = function (photo) {

        return photo.items[0].prefix + '128x128' + photo.items[0].suffix;
    };

});

$(document).ready(function(){

    $(window).scroll(function(e){
       var el = $('.fixedElement');
        if ($(this).scrollTop() > 200 && el.css('position') != 'fixed'){
            $('.fixedElement').css({'position': 'fixed', 'top': '0px'});
        }

        if ($(this).scrollTop() < 200 && el.css('position') == 'fixed')
        {
            $('.fixedElement').css({'position': 'static', 'top': '0px'});
        }
    });

});
