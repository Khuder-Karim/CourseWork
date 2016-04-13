/**
 * Created by Karim on 12.04.2016.
 */

angular.module('courseApp')
    .constant('baseURL', "http://localhost:3000/")
    .service('AdFactory', ['$http', '$state', '$resource', 'baseURL', function($http, $state, $resource, baseURL) {

        this.getAds = function() {
            return $resource(baseURL+'ad/:id');
        };

        this.post = function(uploadUrl, data) {
            var fd = new FormData();

            for(var key in data)
                fd.append(key, data[key]);

            $http.post(uploadUrl, fd, {
                transformRequest: angular.indentity,
                headers: { 'Content-Type': undefined }
            }).then(
                function() {
                    $state.go('app');
                }
            );
        }

    }])
;