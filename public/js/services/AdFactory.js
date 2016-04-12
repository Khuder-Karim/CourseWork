/**
 * Created by Karim on 12.04.2016.
 */

angular.module('courseApp')

    .constant('baseURL', "http://localhost:3000/")

    .service('AdFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        this.getAds = function() {
            return $resource(baseURL+'ad/:id');
        };

    }])
;