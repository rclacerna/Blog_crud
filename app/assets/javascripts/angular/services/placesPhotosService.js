/**
 * Created by Ryan on 11/04/15.
 */
/*
* To get images from thr Foursquare API
* */

'use strict';

var requestParms = {
    clientId: "UF2YRKCGJHHOVUY5T0MBETLPQLGQDOCRSYA51U4VXHKOJUWM",
    clientSecret: "J25KDXHPNCO450HNNNDPHU1B2F0LPN0J2YWM2VCXSY21ZO3F",
    version: "20131230"
};

app.factory('placesPhotosService', function ($resource) {

    var requestUri = 'https://api.foursquare.com/v2/venues/:venueId/:action';

    return $resource(requestUri,
        {
            action: 'photos',
            client_id: requestParms.clientId,
            client_secret: requestParms.clientSecret,
            v: requestParms.version,
            limit: '9', // how many will be used
            callback: 'JSON_CALLBACK'
        },
        {
            get: { method: 'JSONP' }
        });

});