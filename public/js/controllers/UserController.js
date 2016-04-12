/**
 * Created by Karim on 10.04.2016.
 */

angular.module('courseApp')

    .controller('UserController', ['$scope', '$rootScope', '$state', 'UserFactory', 'SessionFactory', function($scope, $rootScope, $state,
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

        $scope.register = function() {

        };

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

        $scope.AdButton = function() {
            console.log($rootScope.user);
            if($rootScope.user != null)
                $state.go('app.adEdit');
            else
                $state.go('app.login');
        };

    }])
;