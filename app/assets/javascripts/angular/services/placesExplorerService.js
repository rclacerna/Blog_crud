/**
 * Created by Ryan on 11/04/15.
 */

//responsible to send HTTP requests to Foursquare explore places API

var requestParms = {
    clientId: "UF2YRKCGJHHOVUY5T0MBETLPQLGQDOCRSYA51U4VXHKOJUWM",
    clientSecret: "J25KDXHPNCO450HNNNDPHU1B2F0LPN0J2YWM2VCXSY21ZO3F",
    version: "20131230"
};

app.factory('placesExplorerService', function ($resource) {
    var requestUri = 'https://api.foursquare.com/v2/venues/:action';

    return $resource(requestUri, {
            action: 'explore',
            client_id: requestParms.clientId,
            client_secret: requestParms.clientSecret,
            v: requestParms.version,
            venuePhotos: '1',
            callback: 'JSON_CALLBACK'
        },
        {
            get: { method: 'JSONP' }
        });
});
//