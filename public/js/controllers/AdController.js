/**
 * Created by Karim on 12.04.2016.
 */

angular.module('courseApp')

    .controller('AdController', ['$scope', '$rootScope', '$state', 'AdFactory', function($scope, $rootScope, $state, AdFactory) {

        $scope.adSchema = {
            name: '',
            description: '',
            img: '',
            price: ''
        };

        $scope.errorMessage = '';

        $scope.post = function() {
            AdFactory.getAds().save($scope.adSchema,
                function() {
                    $state.go('app');
                },
                function(response) {
                    $scope.errorMessage = response.status + ' ' + response.statusText;
                }
            );
        };

    }])
;