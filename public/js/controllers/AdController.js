/**
 * Created by Karim on 12.04.2016.
 */

angular.module('courseApp')

    .controller('AdController', ['$scope', '$rootScope', '$state', 'AdFactory', 'SubscribeFactory', 'SessionFactory', function($scope, $rootScope, $state, AdFactory, SubscribeFactory, SessionFactory) {
        $scope.adSchema = {};

        AdFactory.getAds().query(
            function(response) {
                $scope.ads = response;
            },
            function(response) {
                console.log("Error: " + response.status + " " + response.statusText);
            }
        );

        $scope.Submit = function() {
            var uploadUrl = '/ad';
            AdFactory.post(uploadUrl, $scope.adSchema);
        };

        $scope.subscribe = function(adId) {
            SubscribeFactory.subscribe().save({id: adId}, {}, function() {
                console.log("subscribe");
                SessionFactory.getSession();
                $state.reload();
            });
        };

        $scope.unsubscribe = function(adId) {
            SubscribeFactory.unsubscribe().save({id: adId}, {}, function() {
                console.log("unsubscribe");
                SessionFactory.getSession();
                $state.reload();
            });
        };

        $scope.isSubscription = function(adId) {
            var res = false;
            $rootScope.user.liked.forEach(function(ad) {
                if(ad._id == adId)
                    res = true;
            });
            return res;
        };

    }])
;