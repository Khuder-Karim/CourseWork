/**
 * Created by Karim on 14.04.2016.
 */
angular.module('courseApp')
    .service('SubscribeFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        this.subscribe = function() {
            return $resource(baseURL+'ad/:id/subscribe');
        };

        this.unsubscribe = function(idAd) {
            return $resource(baseURL+'ad/:id/unsubscribe');
        };

    }])
;