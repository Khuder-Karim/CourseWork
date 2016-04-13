/**
 * Created by Karim on 12.04.2016.
 */

angular.module('courseApp')

    .controller('AdController', ['$scope', '$rootScope', '$state', 'AdFactory', function($scope, $rootScope, $state, AdFactory) {
        $scope.adSchema = {};

        AdFactory.getAds().query(
            function(response) {
                $scope.ads = response;
            },
            function(response) {
                console.log("Error: " + response.status + " " + response.statusText);
            }
        );
        //$scope.post = function() {
        //    AdFactory.getAds().save($scope.adSchema,
        //        function() {
        //            $state.go('app');
        //        },
        //        function(response) {
        //            $scope.errorMessage = response.status + ' ' + response.statusText;
        //        }
        //    );
        //};

        $scope.Submit = function() {
            var uploadUrl = '/ad';
            AdFactory.post(uploadUrl, $scope.adSchema);
        }

    }])
;