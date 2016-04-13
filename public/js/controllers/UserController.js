/**
 * Created by Karim on 10.04.2016.
 */

angular.module('courseApp')

    .controller('UserController', ['$stateParams', '$scope', '$rootScope', '$state', 'UserFactory', 'SessionFactory', function($stateParams, $scope, $rootScope, $state,
                                                                                                 UserFactory, SessionFactory) {

        $scope.userObject = {
            username: '',
            password: ''
        };

        $scope.registerData = {
            username: '',
            password: '',
            email: '',
            phoneNumber: ''
        };
        $scope.SellerCheckBox = false;

        $scope.errorMessage = '';

        $scope.logout = function() {
            UserFactory.logout().save(
                function() {
                    SessionFactory.getSession();
                    $state.go('app');
                },
                function(err) {
                    console.log(err);
                }
            );
        };

        $scope.login = function() {
            UserFactory.login().save($scope.userObject,
                function() {
                    SessionFactory.getSession();
                    $state.go('app');
                },
                function(err) {
                    $scope.errorMessage = err.data.message;
                }
            );
        };

        $scope.register = function() {
            UserFactory.register().save($scope.registerData,
                function() {
                    $state.go('app');
                },
                function(err) {
                    $scope.errorMessage = err.data.message;
                }
            );
        };


        $scope.ProxyAdButton = function() {
            if($rootScope.user != null) {
                if(!$rootScope.user.email)
                    console.log("Вы авторизированы как покупатель");
                else
                    $state.go('app.adEdit');
            } else {
                $state.go('app.login');
            }
        };

    }])
;